# Rancangan data

Status: usulan teknis A-08 berdasarkan kebutuhan yang disepakati. Ini spesifikasi konseptual, bukan migration siap dijalankan. Gunakan PostgreSQL Supabase.

## Konvensi

- Primary key UUID; waktu kejadian memakai timestamptz dan disimpan sebagai instan UTC.
- Tanggal/bulan tentatif memakai tipe date dengan penanda presisi, bukan timestamp palsu.
- Penyajian memakai zona waktu kampus yang dikonfigurasi. Asia/Jakarta hanya usulan, bukan lokasi kampus yang sudah diketahui.
- created_at, updated_at, created_by, dan updated_by diperlukan pada data operasional. Sistem dapat bertindak dengan actor_type=system tanpa mengarang user_id.
- Identitas akun berasal dari auth.users; data publik tidak mengakses tabel autentikasi.
- Audit bersifat append-only. Atribut sistem dan actor berasal dari konteks database, bukan nilai yang dipercaya dari browser.

## Entitas

| Entitas | Kolom utama | Catatan |
| --- | --- | --- |
| campus_settings | id, timezone, contact_visibility | Satu kampus; tidak membuat arsitektur multitenant |
| academic_periods | id, label, start_month, starts_on, ends_on, archived_at | Periode 12 bulan; label dan bulan awal dikelola BEM |
| organizations | id, name, short_name, is_active | Termasuk BEM sebagai organisasi bila memiliki proker sendiri |
| profiles | user_id, display_name | Tidak publik secara default; peran tidak berasal dari field bebas edit |
| platform_admins | user_id, granted_by, granted_at, revoked_at | Hak pengelola BEM dipisahkan dari status anggota BEM |
| organization_memberships | id, organization_id, user_id, verified_by, verified_at, revoked_at | Kaitan akun Google resmi bersama ke ormawa; maksimal satu akun aktif per ormawa dan satu ormawa aktif per akun (D-37) |
| organization_contacts | organization_id, whatsapp_number, consent_recorded_at | Akses publik belum diputuskan; jangan gabungkan dengan profil publik |
| programs | id, academic_period_id, name, owner_organization_id, status, cancelled_at | Status usulan: tentative, scheduled, cancelled |
| program_organizations | program_id, organization_id | Daftar penyelenggara; pemilik wajib termasuk |
| program_occurrences | id, program_id, precision, month, starts_at, ends_at | Satu proker memiliki banyak jadwal |
| rooms | id, name, location_label, is_active | Tidak perlu kapasitas, tarif, atau fasilitas yang belum diminta |
| room_usages | id, organization_id, room_id, program_id?, program_occurrence_id?, starts_at, ends_at, status, last_confirmed_at, expires_at?, cancellation_reason?, replaces_usage_id?, version | Pemakaian mandiri tanpa kaitan; pemakaian terkait proker wajib menunjuk satu jadwal proker itu (D-33) |
| conflict_reviews | id, requested_usage_id, conflicting_usage_id, reported_by, opened_at, resolved_at?, resolution_note?, resolved_by? | Merekam laporan izin kedua tanpa mengubah statusnya menjadi approved |
| audit_events | id, entity_type, entity_id, action, actor_type, actor_id?, occurred_at, before_data, after_data, reason?, operation_id | Tidak boleh mengandung token, password, atau salinan profil yang tidak diperlukan |

Kolom sebelum/sesudah audit dibatasi pada field operasional yang diperlukan. Catatan resolusi tidak memuat isi rapat atau bukti dokumen izin.

D-37: user_id/actor_id merujuk akun resmi bersama untuk tindakan pengelolaan ormawa; display_name bukan identitas pengurus individual yang terbukti. Simpan kaitan akun historis agar pergantian akun resmi tidak menghilangkan atribusi audit. PIC operasional tidak membutuhkan akun pribadi atau tabel pelacakan individu. Verifikasi akun dan penggantian kaitannya dilakukan BEM melalui transaksi yang menjaga keunikan akun aktif; tidak cukup memeriksa nama/email yang dikirim browser.

## Aturan jadwal proker

- precision=month: month berisi bulan kalender sebenarnya, starts_at/ends_at kosong. UI cukup menulis “Tanggal belum ditentukan”. Jika tanggal teknis menyimpan hari pertama bulan, jangan menampilkannya sebagai tanggal acara.
- precision=exact: starts_at dan ends_at terisi dan valid; month tidak menjadi sumber kebenaran kedua. Waktu akhir wajib setelah awal.
- Proker dapat memuat jadwal tentatif dan pasti sekaligus. Usulan status induk: tentative jika masih ada jadwal hanya-bulan, scheduled jika semua jadwal pasti, cancelled jika dibatalkan.
- Program yang dibatalkan mempertahankan seluruh jadwal untuk audit/arsip.
- Jadwal yang melewati pergantian bulan muncul pada bulan-bulan yang bersinggungan; akhir interval eksklusif.
- A-09: satu proker memiliki satu periode utama. Kegiatan lintas tahun akademik belum diputuskan; jangan diam-diam menggandakan proker atau membuang jadwalnya. Lihat Q-06.

## Keterkaitan dan integritas

- Foreign key mencegah referensi ke ormawa, proker, ruangan, atau profil yang tidak ada.
- organization_id pada pemakaian terkait proker harus merupakan penyelenggara proker saat catatan dibuat. Kewenangan edit pemakaian tetap mengikuti organization_id pemakaian, bukan semata pemilik proker.
- program_id dan program_occurrence_id keduanya kosong untuk pemakaian mandiri, atau keduanya terisi dan merujuk jadwal dari proker yang sama. Tegakkan integritas ini di database. Jadwal yang dihapus dari kalender tetap dipertahankan sebagai catatan nonaktif untuk referensi dan audit.
- Perubahan/penghapusan jadwal oleh pemilik hanya membatalkan pemakaian terkait jadwal itu, termasuk milik kolaborator; pembatalan proker membatalkan seluruh pemakaian nonterminal terkait. Transaksi khusus diaudit dan merupakan pengecualian terbatas dari hak edit pemakaian milik sendiri.
- Penghapusan penyelenggara yang masih punya pemakaian aktif harus ditolak atau diselesaikan eksplisit, bukan meninggalkan referensi tanpa pemilik.
- Pemilik proker tidak dapat diganti melalui update umum. Transfer kepemilikan bukan fitur MVP.
- Penonaktifan ruangan/ormawa tidak menghapus sejarah. A-07: hentikan pembuatan catatan baru; selesaikan pemakaian mendatang melalui tindakan eksplisit.
- Waktu mulai/selesai pemakaian approved tidak dapat diubah langsung. Gunakan alur pengganti BR-21.
- last_confirmed_at hanya berubah oleh pembaruan substantif PIC atau tombol konfirmasi. Audit dan kerja Cron tidak menyentuhnya.
- expires_at berlaku untuk planned/pending; approved tidak memakai tenggat aktif.

## Konkurensi

1. Constraint database menolak dua room_usages berstatus approved dengan room_id sama dan rentang waktu beririsan. Usulan: exclusion constraint pada room_id dan tstzrange dengan batas [).
2. Seluruh mutasi pemakaian mengambil lock pada baris rooms terkait sebelum membaca konflik dan menyimpan. Untuk beberapa ruangan, ambil lock menurut urutan ID agar tidak saling mengunci tanpa batas.
3. Constraint approved saja tidak cukup untuk BR-12: pembuatan planned/pending juga harus mengecek approved dalam transaksi yang sama.
4. UI tidak boleh menganggap hasil pemeriksaan sebelum klik simpan sebagai jaminan. Database memeriksa ulang.
5. Perubahan proker/jadwal beserta pembatalan pemakaian terdampak memakai urutan lock konsisten. Jika konflik versi atau keterkaitan berubah sejak pratinjau dampak, muat ulang dan minta konfirmasi lagi.
6. Gunakan versi/optimistic concurrency untuk mencegah perubahan PIC kedua menimpa perubahan PIC pertama tanpa disadari.

## Indeks awal

Usulan indeks mengikuti query nyata: periode dan status proker, occurrence menurut program/waktu/bulan, pemakaian menurut room_id/waktu/status, membership aktif menurut user/ormawa, tenggat planned/pending, serta audit menurut entity_id/waktu. Jangan menambah indeks untuk seluruh kolom tanpa kebutuhan.

## Proyeksi publik

Publik membaca proyeksi dengan kolom yang diizinkan: nama ormawa/proker/ruangan, jadwal, status, dan waktu pembaruan. Proyeksi tidak membawa email login, user_id PIC, audit mentah, nomor WhatsApp, atau tautan yang memuat nomor (D-35).

View Supabase harus mempertahankan RLS atau memberi pembatasan publik secara eksplisit. Jangan berasumsi semua view otomatis menerapkan kebijakan tabel dasarnya. Tabel internal tetap tertutup untuk anon.
