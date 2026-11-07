# Panduan desain Orka

Pembaruan dokumen: 1 November 2026. Acuan aktif: **D-55 — Ultramarine + paper**. Karakter tetap clean, tegas, sedikit playful. Fase UI statis D-39; revisi ini tidak menambah logika data.

Dokumen ini menjadi acuan visual aktif. Jika catatan eksplorasi atau usulan lama berbeda, gunakan keputusan D-55 di sini: netral dominan, satu aksen ultramarine, teks lebih besar, dropdown solid, dan warna status yang terkalibrasi. Detail aturan produk tetap mengikuti dokumen bisnis terkait.

## Identitas visual aktif

Fondasi Cal.com tetap dipertahankan: panel putih, garis tipis, struktur sederhana. Pengguna menyederhanakan kombinasi D-54: ink blue dikeluarkan dari tinta/struktur dan varian biru lain tidak dipakai sebagai aksen tambahan. Ultramarine `#002FA7` menjadi satu biru brand, di atas paper `#F8F6F0` dan panel putih. Teks menggunakan charcoal netral `#252525`, metadata `#62615F`.

- Aksen: titik wordmark, fokus, navigasi aktif, angka penting, serta garis pendek. Tombol utama ultramarine dengan teks putih; hover memakai versi gelap dari hue yang sama.
- Tidak ada bidang warna besar pada kalender. Semua bar memakai hue ultramarine yang sama, bidang paper yang tipis, dan garis identitas. **Nama/logo membedakan penyelenggara**, bukan lima hue biru yang berdekatan.
- Logo brand contoh tetap multicolor dan tidak diwarnai ulang.
- Warning memakai amber `#855C09 / #FBF3D9`, danger merah bata `#AD3438 / #FCF0EF`, info ultramarine `#002FA7 / #F0F3FC`, success hijau zaitun redup `#46614C / #F0F5EF`. Status selalu berlabel; warna bukan satu-satunya pembeda.

## Tipografi operasional

Geist tetap dipakai. Teks isi/aksi utama dan dropdown default **16 px**, label **15 px**, keterangan dan badge minimal **14 px**. Token `--font-body`, `--font-label`, dan `--font-small` terpusat di tokens.css. Tidak mengecilkan teks HP menjadi 8–12 px. Judul tetap memakai hierarki 17–36 px sesuai konteks.

Saat teks membesar, ruang ikut menyesuaikan: bar kalender minimal 32 px, Timeline memakai kolom identitas 280 px dengan area waktu yang dapat digulir, dan tombol modal panjang boleh turun baris pada HP. Jangan memaksakan semua isi masuk dengan mengecilkan font.

## Dropdown custom

- Trigger hover/terbuka: ultramarine solid, teks dan ikon garis putih.
- Item terpilih, hover, pressed, serta highlight keyboard: ultramarine solid dengan label, deskripsi dan check putih. Logo brand tetap berwarna di wadah putih.
- Item: teks 16 px, line-height 1,5, padding 14 px, margin vertikal 4 px, tinggi minimal 52 px. Panel padding 8 px, viewport padding vertikal 4 px.
- Highlight keyboard memiliki garis putih di dalam item agar fokus tetap terbaca saat item terpilih juga berwarna biru. Enter/arrows/Escape/Tab dan fokus modal tetap mengikuti komponen yang ada.
- Isi panjang membungkus; panel dibatasi viewport dan bisa digulir. Dropdown tidak memotong dialog atau menutupnya saat Escape hanya dimaksudkan menutup pilihan.

## Token warna produk

Sumber implementasi: [tokens.css](prototype/src/tokens.css). Nama di bawah sama dengan variabel prototipe.

| Token | Nilai | Peran |
| --- | --- | --- |
| `--page` | `#F8F6F0` | Kanvas putih kertas |
| `--surface` | `#FFF` | Panel, kartu, dialog |
| `--subtle` | `#F3F2EE` | Hover netral |
| `--border` | `#E4E2DD` | Garis dekoratif |
| `--control-border` | `#7D8592` | Batas kontrol |
| `--text` | `#252525` | Charcoal untuk teks utama |
| `--muted` | `#62615F` | Metadata |
| `--primary` | `#002FA7` | Tombol ultramarine |
| `--primary-hover` | `#002581` | Hover tombol utama |
| `--on-primary` | `#FFF` | Teks tombol utama |
| `--focus` | `#002FA7` | Fokus keyboard |
| `--accent` | `#002FA7` | Aksen ultramarine |
| `--accent-soft` | `#F1F3FA` | Bidang netral untuk pilihan kecil |
| `--accent-border` | `#D5DCF0` | Garis aksen halus |
| `--info-text` | `#002FA7` | Teks informasi |
| `--info-bg` | `#F0F3FC` | Bidang informasi |
| `--warning-text` | `#855C09` | Teks peringatan |
| `--warning-bg` | `#FBF3D9` | Bidang peringatan |
| `--success-text` | `#46614C` | Teks disetujui/berhasil |
| `--success-bg` | `#F0F5EF` | Bidang disetujui/berhasil |
| `--danger-text` | `#AD3438` | Teks kesalahan/risiko |
| `--danger-bg` | `#FCF0EF` | Bidang kesalahan/risiko |

Teks biasa minimal 4,5:1 dan fokus/kontrol bermakna 3:1. Token diperiksa melalui script check; UI aktual tetap perlu review pada kondisi fokus/hover/modal. Jangan menambahkan biru neon, gradient dekoratif, atau bayangan warna tanpa kebutuhan.

## Logo dan warna ormawa

Logo Google, Slack, Figma, Discord dan GitHub dipakai sebagai pengganti visual contoh (D-51). Aset lokal, sumber serta lisensi ada di [SOURCES.md](prototype/public/logos/SOURCES.md); nama/data ormawa tetap fiktif. Jangan mengganti warna internal logo mengikuti aksen Orka.

Semua key kategori pada revision.css memakai ultramarine yang sama pada bidang mendekati paper. Nama class lama blue/violet/rose/ochre/teal hanya identifier internal fixture. Logo bertumpuk dan fallback mengikuti D-44; kolaborasi tetap satu kegiatan dengan semua penyelenggara.

## Halaman dan interaksi lanjutan

[TIMELINE_UX_PLAN.md](TIMELINE_UX_PLAN.md) mengatur pemisahan pengerjaan/pelaksanaan dan modal revisi. [TIMELINE_UI_REVIEW.md](TIMELINE_UI_REVIEW.md) mencatat hasil paket statis D-50. [UI_READABILITY_REVIEW.md](UI_READABILITY_REVIEW.md) mencatat hasil D-55; PALETTE_REVIEW.md mempertahankan riwayat D-54. UX_SPEC.md mengatur isi, BUSINESS_RULES.md aturan produk, dan ACCESS_CONTROL.md kewenangan; warna tidak mengubahnya.

## Referensi dan riwayat

- [Centre Pompidou tentang ultramarine Yves Klein](https://www.centrepompidou.fr/en/pompidou-plus/magazine/article/the-untold-story-of-the-international-klein-blue-ikb-of-yves-klein): referensi intensitas warna; hex digital Orka adalah adaptasi.
- [SPIN × MUBI, wawancara 2019](https://www.itsnicethat.com/articles/spin-tony-brook-efe-cakarel-graphic-design-180219): referensi identitas yang konsisten; tidak menyalin motif/logo MUBI.
- [Dropbox Brand Color](https://brand.dropbox.com/color): pasangan biru/netral untuk riset; bukan palet aktif yang dipilih.
- A-17–A-20 disimpan sebagai riwayat eksplorasi; bukan arahan warna aktif. Papan riset A-21 ada di [blue-references.html](prototype/design-exploration/blue-references.html). DESIGN_REFERENCES.md memuat riset awal sebelum pemilihan Cal.com.

## Tipografi, jarak, dan bentuk

Font aktif prototipe: Geist Sans, dimuat lokal melalui Fontsource, dengan fallback `system-ui, sans-serif`. Pilihan ini untuk keterbacaan Orka, bukan klaim font resmi Cal.com. Pertahankan lisensi aset font saat distribusi. Tidak perlu menambah font khusus hanya untuk menyerupai logo referensi.

| Peran | Ukuran dan bobot usulan |
| --- | --- |
| Judul halaman | 28 px HP, 32–36 px desktop; 700; line-height 1,2 |
| Judul bagian | 20–24 px; 600–700; line-height 1,3 |
| Judul kartu | 16–18 px; 600; line-height 1,4 |
| Isi dan input | 16 px; 400–500; line-height 1,5 |
| Tombol dan pilihan dropdown | 16 px; 500–600; line-height 1,5 |
| Label formulir | 15 px; 500–600; line-height 1,5 |
| Metadata, bantuan, badge | Minimal 14 px; 400–600; line-height 1,4–1,6 |

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

**Kalender tahunan:** judul “Kalender proker”, tahun akademik, filter ormawa, lalu 12 kartu bulan. Desktop empat kolom, tablet dua, HP satu. Urutan bulan mengikuti awal periode yang diatur BEM. D-46 memisahkan hitungan unik “Dalam pengerjaan” dan “Ada pelaksanaan”; timeline kosong dan akhir belum pasti terlihat. Rincian tampilan mengikuti TIMELINE_UX_PLAN.md; paket statis D-50 sudah tersedia dengan hasil pada TIMELINE_UI_REVIEW.md.

Kartu bulan berupa panel putih dengan header kecil, jumlah tegas, dan teks pendukung singkat. Hover memakai surface-subtle; fokus memiliki ring. Seluruh kartu boleh menjadi satu tautan yang namanya mencakup bulan dan jumlah. Hindari tombol bersarang di dalam tautan kartu. Semua bulan dapat dibuka, termasuk bulan kosong.

**Detail bulan:** kalender tanggal menampilkan blok rentang kegiatan. Mengikuti D-55, semua bar memakai ultramarine yang sama pada bidang mendekati paper; logo dan nama mengidentifikasi ormawa. Permintaan warna per ormawa pada D-41 menjadi riwayat. Sediakan pilihan Kalender/Agenda, navigasi kembali, bulan/periode, filter, legenda identitas, dan modal detail proker. Kartu tahunan menampilkan logo penyelenggara dengan overlap kecil. Perilaku rentang, kolaborasi, logo/fallback, overflow, dan HP dirinci di UI_REVISION_PLAN.md, dengan warna mengikuti dokumen ini. Pisahkan “Tanggal belum ditentukan” dari grid; jadwal hanya-bulan tidak diberi tanggal rekaan. Proker bersamaan tetap sah dan tidak ditampilkan sebagai konflik SDM.

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
| Tombol utama | Ultramarine `--primary`, teks putih, tinggi target minimal 44 px; label menyebut aksi seperti “Simpan proker” |
| Tombol sekunder | Putih/outline dengan teks utama; aksi ringan boleh berupa teks |
| Tindakan berisiko | Aksen danger dan label spesifik; dampak dijelaskan sebelum konfirmasi |
| Input | Label terlihat, tinggi sekitar 44 px, bingkai kontrol, bantuan dan kesalahan dekat field |
| Filter | Nilai terpilih terbaca; pemilihan aktif memiliki indikator selain warna; hapus filter tersedia bila relevan |
| Dialog | Judul, dampak, kembali, dan aksi lanjut jelas; isi panjang dapat digulir |
| Notifikasi | Kalimat konkret; pesan penting tetap tersedia pada konteks halaman |

Keadaan interaktif wajib: default, hover, pressed, focus-visible, disabled, loading, error, sukses. Hover memakai perubahan warna/bingkai; pressed tidak menggeser layout. Focus-visible memakai ring focus 2 px dengan offset 2 px. Disabled memakai semantik kontrol nonaktif dan alasan bila diperlukan. Loading menyebut tindakan seperti “Menyimpan…” dan mencegah pengiriman berulang.

Formulir proker mendukung “Bulan saja” serta “Tanggal dan jam pasti” per jadwal. Formulir ruangan meminta waktu pasti, termasuk persiapan dan beres-beres. Kaitan proker opsional; jika dipilih wajib menunjuk jadwal terkait. Aturan 7 hari dan tanggal kedaluwarsa terlihat pada rencana/menunggu keputusan; approved tidak terkena kedaluwarsa tersebut. Tidak ada pengingat baru atau countdown dekoratif.

Dialog perubahan jadwal menampilkan nama ruangan, interval, status, dan ormawa setiap pemakaian terdampak. Perubahan/penghapusan satu jadwal hanya membatalkan pemakaian nonterminal terkait jadwal itu sesuai D-33. Pembatalan sebelum pelaksanaan mencakup seluruh pemakaian nonterminal terkait; pembatalan sisa mempertahankan sesi terlaksana dan riwayatnya (D-49). Perubahan pengerjaan saja tidak membatalkan pemakaian. Label akhir spesifik, misalnya “Batalkan 3 pemakaian terkait” (contoh fiktif). Sesudah berhasil, tampilkan instruksi koordinasi pembatalan izin melalui jalur resmi kampus.

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
