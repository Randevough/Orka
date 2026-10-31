# Panduan desain Orka

Tanggal: 28 Oktober 2026. Arah visual: terinspirasi Cal.com, dipilih pengguna (D-38). Token dan rincian komponen di sini merupakan usulan A-14 untuk prototipe dan review visual.

Urutan D-39: tinjau desain, animasi tombol, modal, navigasi, dan seluruh keadaan tampilan dengan skenario fiktif statis terlebih dahulu. Rincian tahap dan perilaku gerak/modal ada di [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md); logika data serta integrasi layanan dikerjakan setelah fase UI/UX direview dan diminta dilanjutkan.

## Arah desain

Orka memakai tampilan terang, netral, dan tertata: kanvas abu-abu sangat muda, panel putih, garis tipis, judul tegas, serta tombol utama gelap. Feedback D-41 meminta tambahan aksen kecil, dropdown custom, logo ormawa bertumpuk, dan kalender detail berwarna per ormawa. D-43 mengganti apricot dengan muted teal serta palet info/plum, warning/ochre, dan error/berry pada prototipe; revisi dropdown/logo/kalender D-44 mengikuti [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md), dengan hasil di [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md). Warna dipakai terbatas untuk aksen, identitas penyelenggara, dan status yang maknanya terpisah.

Acuan utama adalah [Cal.com](https://cal.com/), berdasarkan tampilan halaman utama dan contoh panel penjadwalan yang ditinjau pada 28 Oktober 2026. Yang diadaptasi adalah karakter visual dan pemisahan panelnya. Nilai token berikut adalah usulan Orka, bukan klaim token resmi Cal.com. Logo, aset, dan salinan teks Cal.com tidak digunakan sebagai aset Orka.

[DESIGN_REFERENCES.md](DESIGN_REFERENCES.md) menyimpan konteks riset. Dokumen ini menjadi acuan visual aktif. [UX_SPEC.md](UX_SPEC.md) mengatur isi/interaksi, [BUSINESS_RULES.md](BUSINESS_RULES.md) mengatur perilaku, dan [ACCESS_CONTROL.md](ACCESS_CONTROL.md) mengatur kewenangan. Cakupan tetap dokumen planning.

## Prinsip komposisi

- Konten utama dekat bagian atas: navigasi, judul, periode/filter, lalu kalender atau daftar pemakaian.
- Panel terasa ringan dengan bingkai dan pemisah; bayangan hanya membantu membedakan lapisan.
- Satu tindakan utama yang gelap pada setiap area kerja; tindakan lain memakai outline atau teks.
- Judul tegas dan singkat, sedangkan nama proker dan data tetap mudah dibaca.
- Warna status digunakan dalam bidang kecil berlabel; kalender tidak menjadi kumpulan kartu berwarna penuh.

Tidak diperlukan hero pemasaran besar, ilustrasi 3D, judul arcade, neon, bayangan tombol bertingkat, atau elemen permainan. GitMastery tetap referensi proyek lain. Pilihan ini tidak menambah fitur booking otomatis, pengingat, atau sinkronisasi dari Cal.com.

## Token warna

| Token semantik | Nilai usulan | Peran |
| --- | --- | --- |
| `--color-page` | `#F7F7F8` | Latar halaman |
| `--color-surface` | `#FFFFFF` | Panel, kartu, formulir, dialog |
| `--color-surface-subtle` | `#F1F2F4` | Header panel, hover ringan, kontrol nonaktif |
| `--color-border` | `#E1E3E7` | Bingkai dekoratif dan pemisah |
| `--color-control-border` | `#7D8592` | Batas kontrol yang harus jelas |
| `--color-text` | `#202124` | Teks utama |
| `--color-text-muted` | `#596170` | Metadata dan bantuan |
| `--color-primary` | `#242424` | Tombol utama dan tanggal terpilih |
| `--color-primary-hover` | `#383838` | Hover tombol utama |
| `--color-on-primary` | `#FFFFFF` | Teks/ikon di atas primary |
| `--color-focus` | `#376E6B` | Fokus keyboard dan tautan teks; teal gelap |
| `--color-accent` | `#4D8582` | Muted teal dekoratif |
| `--color-accent-soft` | `#EDF6F4` | Bidang teal pucat pada navigasi/tab aktif dan ikon pengantar |
| `--color-accent-border` | `#CFE1DD` | Bingkai dekoratif aksen |
| `--color-info-text` / `--color-info-bg` | `#695477` / `#F4F0F7` | Informasi/rencana; plum lembut |
| `--color-warning-text` / `--color-warning-bg` | `#786126` / `#F7F2E6` | Menunggu keputusan/peringatan; ochre redup |
| `--color-success-text` / `--color-success-bg` | `#166534` / `#F0FDF4` | Disetujui dan hasil berhasil |
| `--color-danger-text` / `--color-danger-bg` | `#965066` / `#FAF0F3` | Ditolak, kesalahan, dan tindakan berisiko; berry |

Teks utama/muted ditempatkan di atas page atau surface. Badge memakai pasangan teks/latar statusnya. Primary memakai on-primary. Border dekoratif tidak menjadi satu-satunya batas input; pakai control-border jika batas tersebut diperlukan untuk mengenali kontrol.

Simpan token sebagai CSS variables terpusat saat implementasi (prototipe memakai nama singkat seperti --accent). Mode terang menjadi dasar prototipe; pengalih tema tidak diwajibkan. Palet aktif mengikuti D-43. Teks di atas bidang aksen tetap gelap; tombol utama charcoal dipertahankan dan fokus memakai teal gelap yang kontras. Informasi, warning, dan error selalu disertai label/ikon, bukan hanya warna. Identitas warna ormawa diminta melalui D-41; harus disertai nama/logo dan tidak menggantikan badge status. Dropdown custom, logo bertumpuk, dan kalender rentang telah diterapkan sebagai prototipe D-44; lihat UI_REVISION_REVIEW.md.

## Tipografi, jarak, dan bentuk

Font usulan: Geist Sans dengan fallback `system-ui, sans-serif`. Pilihan ini untuk keterbacaan Orka, bukan klaim font resmi Cal.com. Verifikasi lisensi dan pemuatan font saat implementasi. Tidak perlu menambah font khusus hanya untuk menyerupai logo referensi.

| Peran | Ukuran dan bobot usulan |
| --- | --- |
| Judul halaman | 28 px HP, 32–36 px desktop; 700; line-height 1,2 |
| Judul bagian | 20–24 px; 600–700; line-height 1,3 |
| Judul kartu | 16–18 px; 600; line-height 1,4 |
| Isi dan input | 16 px; 400–500; line-height 1,5 |
| Label, tombol, metadata | 14 px; 500–600; line-height 1,4–1,5 |

Gunakan angka tabular pada jam/jumlah. Nama proker, penyelenggara, dan label panjang membungkus; jangan hanya menyediakan informasi penting saat hover.

- Skala jarak: 4, 8, 12, 16, 24, 32, 48 px.
- Konten maksimal 1200 px; formulir tunggal maksimal sekitar 680 px.
- Gutter 16 px pada HP, 24 px tablet, 32 px desktop. Padding panel 16–24 px.
- Radius: kontrol 8–10 px, kartu 12–16 px, dialog 16 px. Pil untuk filter ringkas dan badge.
- Bingkai 1 px. Bayangan panel penting: `0 1px 3px rgb(16 24 40 / 0.06)`; dialog boleh lebih kuat.
- Ikon SVG garis konsisten, 20 px untuk kontrol dan 24 px untuk konteks utama, stroke sekitar 1,75–2 px.

## Tata letak dan navigasi

Publik melihat nama Orka, Kalender proker, Pemakaian ruangan, dan Masuk. Akun terverifikasi mendapat Kelola ormawa; pengelola BEM mendapat Kelola platform. Identitas ormawa yang diwakili akun terlihat pada halaman kelola. Logo Orka belum ditetapkan; nama teks cukup untuk prototipe.

Desktop memakai navigasi horizontal dan area isi lebar. Pada HP, pertahankan label Kalender proker dan Pemakaian ruangan, dengan menu untuk tujuan tambahan. Navigasi tidak menutupi fokus atau isi. Tidak perlu sidebar permanen pada halaman publik yang hanya memiliki dua tujuan utama.

Breakpoint usulan: di bawah 640 px untuk HP, 640–1023 px untuk tablet, mulai 1024 px untuk desktop. Susunan mengikuti kebutuhan isi, bukan sekadar mengecilkan layout desktop.

## Kalender proker dan detail

**Kalender tahunan:** judul “Kalender proker”, tahun akademik, filter ormawa, lalu 12 kartu bulan. Desktop empat kolom, tablet dua, HP satu. Urutan bulan mengikuti awal periode yang diatur BEM. Setiap kartu menyebut nama bulan dan jumlah proker, dengan penanda tentatif bila ada. A-01 tentang hitungan unik tetap menunggu keputusan terkait.

Kartu bulan berupa panel putih dengan header kecil, jumlah tegas, dan teks pendukung singkat. Hover memakai surface-subtle; fokus memiliki ring. Seluruh kartu boleh menjadi satu tautan yang namanya mencakup bulan dan jumlah. Hindari tombol bersarang di dalam tautan kartu. Semua bulan dapat dibuka, termasuk bulan kosong.

**Detail bulan:** D-41 meminta kalender tanggal dengan blok rentang berwarna sesuai ormawa. A-15 mengusulkan halaman detail penuh dengan pilihan Kalender/Agenda, navigasi kembali, bulan/periode, filter, legenda identitas, dan modal detail proker. Kartu tahunan menampilkan logo penyelenggara dengan overlap kecil. Perilaku rentang, kolaborasi, logo/fallback, overflow, dan HP dirinci di UI_REVISION_PLAN.md. Pisahkan “Tanggal belum ditentukan” dari grid; jadwal hanya-bulan tidak diberi tanggal rekaan. Proker bersamaan tetap sah dan tidak ditampilkan sebagai konflik SDM.

**Detail proker:** nama, penyelenggara, ormawa pengelola utama, jadwal, status proker, dan pemakaian ruangan terkait. Kegiatan berkolaborasi tidak digandakan. Tidak ada poster wajib, proposal, anggaran, atau daftar peserta.

## Pemakaian ruangan

Bagian atas memuat tanggal/rentang, filter ruangan, dan konteks periode. Hasil dibatasi periode/filter tersebut. Pada HP, tampilkan daftar dengan interval mulai–selesai, ruangan, ormawa, status, dan waktu pembaruan. Desktop boleh memakai panel dua bagian: kontrol tanggal/ruangan yang ringkas dan hasil yang lebih lebar. Grid waktu opsional jika tetap terbaca; bukan syarat interaksi.

Tanggal aktif memakai bidang primary dan teks putih. Hari ini memakai label/outline yang berbeda dari tanggal terpilih. Jangan memakai warna hijau untuk mengartikan slot pasti tersedia. Slot kosong berbunyi “Belum ada pemakaian tercatat. Tetap cek dan urus izin melalui jalur kampus.”

| Data | Tampilan |
| --- | --- |
| `planned` | Badge info: “Rencana”; penjelas “Belum diajukan ke kampus” |
| `pending` | Badge warning: “Menunggu keputusan”; menurut pembaruan PIC |
| `approved` | Badge success: “Disetujui”; “Dilaporkan oleh PIC” |
| `rejected` | Badge danger: “Ditolak” |
| `cancelled` | Badge netral: “Dibatalkan”; alasan pada detail |
| Sengketa | Penanda tambahan warning: “Perlu peninjauan”; status izin tetap ditampilkan |
| Arsip | Label arsip dekat periode; aksi edit mengikuti kebijakan arsip final |

Kepadatan proker berbeda dari status ruangan. Gunakan jumlah/penanda netral untuk kepadatan, jangan meminjam warna bahaya sebagai larangan proker. Tidak ada status izin baru “Selesai” hanya karena waktunya sudah lewat. Zona waktu mengikuti konfigurasi kampus (Q-01).

## Komponen dan perilaku

| Komponen | Aturan |
| --- | --- |
| Tombol utama | Bidang gelap, teks putih, tinggi target 44 px; label menyebut aksi seperti “Simpan proker” |
| Tombol sekunder | Putih/outline dengan teks utama; aksi ringan boleh berupa teks |
| Tindakan berisiko | Aksen danger dan label spesifik; dampak dijelaskan sebelum konfirmasi |
| Input | Label terlihat, tinggi sekitar 44 px, bingkai kontrol, bantuan dan kesalahan dekat field |
| Filter | Nilai terpilih terbaca; pemilihan aktif memiliki indikator selain warna; hapus filter tersedia bila relevan |
| Dialog | Judul, dampak, kembali, dan aksi lanjut jelas; isi panjang dapat digulir |
| Notifikasi | Kalimat konkret; pesan penting tetap tersedia pada konteks halaman |

Keadaan interaktif wajib: default, hover, pressed, focus-visible, disabled, loading, error, sukses. Hover memakai perubahan warna/bingkai; pressed tidak menggeser layout. Focus-visible memakai ring focus 2 px dengan offset 2 px. Disabled memakai semantik kontrol nonaktif dan alasan bila diperlukan. Loading menyebut tindakan seperti “Menyimpan…” dan mencegah pengiriman berulang.

Formulir proker mendukung “Bulan saja” serta “Tanggal dan jam pasti” per jadwal. Formulir ruangan meminta waktu pasti, termasuk persiapan dan beres-beres. Kaitan proker opsional; jika dipilih wajib menunjuk jadwal terkait. Aturan 7 hari dan tanggal kedaluwarsa terlihat pada rencana/menunggu keputusan; approved tidak terkena kedaluwarsa tersebut. Tidak ada pengingat baru atau countdown dekoratif.

Dialog perubahan jadwal menampilkan nama ruangan, interval, status, dan ormawa setiap pemakaian terdampak. Perubahan/penghapusan satu jadwal hanya membatalkan pemakaian nonterminal terkait jadwal itu sesuai D-33. Pembatalan seluruh proker mencakup seluruh pemakaian nonterminal terkait. Label akhir spesifik, misalnya “Batalkan 3 pemakaian terkait” (contoh fiktif). Sesudah berhasil, tampilkan instruksi koordinasi pembatalan izin melalui jalur resmi kampus.

## Akses, keadaan data, dan bahasa

Halaman publik terbaca tanpa login. Halaman masuk menyebut “Gunakan akun Google resmi ormawa”. Login saja tidak memberi hak tulis. Akun belum diverifikasi atau dicabut mendapat penjelasan akses yang sesuai. Kontak WhatsApp hanya ditampilkan kepada PIC/BEM terverifikasi sesuai D-35; jangan memasukkan nomor ke payload/HTML publik lalu sekadar menyembunyikannya. Audit mencatat akun resmi ormawa sesuai D-37, tanpa mengklaim identitas pengurus individual.

- Memuat: struktur stabil, indikator dan teks yang dapat diakses; skeleton tanpa kedipan berlebihan.
- Kosong: sebutkan konteks periode/filter; jangan menyimpulkan ruangan pasti tersedia atau kampus tidak punya kegiatan.
- Gagal memuat: pesan dan “Coba lagi”; tidak berubah menjadi keadaan kosong.
- Data lama: waktu pembaruan/indikasi data belum termuat ulang terlihat; jangan mengklaim kondisi terkini.
- Gagal menyimpan: pertahankan isian; kesalahan dekat field dan ringkasan jika banyak.
- Bentrokan/konflik versi: tampilkan informasi terbaru dan tindakan selanjutnya; jangan menampilkan sukses sebelum simpan berhasil.

Bahasa antarmuka dan dokumentasi produk adalah Bahasa Indonesia. Gunakan ormawa, proker, PIC, dan BEM secara konsisten. Nama kampus, organisasi, ruangan, dan jadwal contoh harus ditandai fiktif jika belum data nyata.

## Aksesibilitas dan pemeriksaan desain

Target kontras teks biasa minimal 4,5:1, teks besar 3:1, serta kontrol/ikon bermakna 3:1 terhadap bidang bersebelahan. Ukur hasil aktual termasuk hover/opacity; token bukan bukti bahwa UI sudah lulus. Status memakai teks selain warna. Ikon dekoratif tidak dibacakan; tombol ikon memiliki nama aksesibel.

Semua tindakan tersedia lewat keyboard. Dialog menjaga fokus, menyediakan cara menutup, dan mengembalikan fokus ke pemicu. Pesan dinamis diumumkan secara proporsional. Tidak ada interaksi yang hanya mengandalkan drag atau hover. Transisi ringan 120–160 ms; hormati reduced motion dan hindari gerak dekoratif terus-menerus.

Saat prototipe/implementasi tersedia, periksa:

1. Kalender, daftar ruangan, formulir, dan dialog pada lebar 360, 768, dan 1280 CSS px serta zoom 200%.
2. Nama panjang, kolaborasi banyak penyelenggara, jadwal tentatif, bulan kosong, dan periode arsip tetap terbaca.
3. Fokus keyboard terlihat, dialog tidak menyembunyikan tindakan, dan target sentuh diusahakan minimal 44 × 44 CSS px.
4. Kontras aktual, label status, font fallback, reduced motion, serta kondisi memuat/kosong/gagal/sukses.
5. Tidak ada klaim izin resmi, ruangan pasti tersedia, atau identitas individu dari akun bersama yang timbul dari tampilan.

Pemeriksaan ini melengkapi AC-19/21/24/29/30/31 dalam [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md). Keamanan dan konkurensi tetap membutuhkan pengujian database/API saat implementasi. Paket UI pertama telah dibuat melalui D-40; hasil dan batas pengujiannya ada di [PROTOTYPE_PROGRESS.md](PROTOTYPE_PROGRESS.md). Detail visual masih menunggu review pengguna.
