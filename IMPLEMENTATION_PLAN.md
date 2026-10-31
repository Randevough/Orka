# Rencana pengerjaan Orka

Revisi: 28 Oktober 2026. Urutan mengikuti D-39: desain dan UX interaktif terlebih dahulu, kemudian integrasi data dan aturan bisnis. D-40 kini mengizinkan paket pertama prototipe UI; lihat [PROTOTYPE_PROGRESS.md](PROTOTYPE_PROGRESS.md). Roadmap tidak otomatis mengizinkan perluasan ke backend, layanan cloud, atau deployment. Tidak ada estimasi hari yang disepakati.

## Tujuan dan urutan

Hasil pertama adalah prototipe UI yang dapat dibuka dan diklik di browser, mengikuti Cal.com dari [DESIGN.md](DESIGN.md). Pengguna dapat menilai halaman, navigasi, tombol, modal, animasi, dan kondisi tampilan sebelum data sungguhan dihubungkan.

| Tahap | Fokus | Hasil yang direview |
| --- | --- | --- |
| 0 | Persiapan desain | Peta halaman, inventaris komponen, skenario visual fiktif |
| 1 | Fondasi visual dan interaksi | Komponen beserta keadaan dan animasinya |
| 2 | Halaman publik | Kalender tahunan, detail bulan/proker, pemakaian ruangan |
| 3 | Halaman kelola dan alur klik | Formulir, modal, halaman akses, tampilan PIC/BEM |
| 4 | Penyempurnaan dan review UI/UX | Prototipe responsif dengan seluruh skenario visual |
| 5 | Fondasi database dan akses | Migration, Auth, RLS, audit, transaksi, pengujian nyata |
| 6 | Integrasi alur operasional | UI tersambung ke data dan aturan bisnis secara bertahap |
| 7 | Verifikasi akhir dan pilot | Kriteria produk terbukti dan operasi siap |

Tahap 0–4 adalah fase UI/UX. Tahap 5–7 adalah fase aplikasi dengan data. Review tahap 4 dan instruksi melanjutkan integrasi data menjadi batas untuk masuk tahap 5. Jangan mengerjakan database sambil menyelesaikan prototipe.

## Batas fase UI/UX: tanpa logika data

**Boleh dibuat ketika prototipe diminta:**

- React + Vite + TypeScript untuk halaman/komponen; styling mengikuti DESIGN.md. Tailwind/shadcn/ui tetap usulan A-11.
- Navigasi, buka/tutup modal, dropdown, tab, accordion, pilihan tanggal/filter secara visual, serta input sementara.
- State lokal presentasi: modal terbuka, tab aktif, pilihan kontrol, nilai yang sedang diketik. Ini diperlukan agar UI bisa diklik, bukan penyimpanan data operasional.
- Konten fiktif statis dan skenario yang sudah disiapkan. Filter boleh membuka contoh hasil yang ditentukan sebelumnya, tanpa mesin query atau perhitungan hitungan kalender.
- Simulasi loading, kosong, gagal, sukses, konflik, serta akses dicabut lewat pemilih skenario khusus prototipe yang terpisah dari navigasi produk.

**Ditunda sampai fase data:** Supabase SDK/klien, API, database, migration SQL, Auth/OAuth nyata, RLS, audit, Cron, kredensial, proyek cloud, dan penyimpanan catatan. Jangan menggantinya dengan localStorage/IndexedDB, backend palsu, mock server, atau sistem CRUD lokal. Perhitungan bentrokan, kedaluwarsa, izin akses, transisi status, hitungan unik, tanggal/zona waktu, dan pembatalan terkait proker juga ditunda.

D-45 menghapus penanda preview/data dummy dari tampilan utama; catat status fiktif/tidak tersimpan pada dokumentasi pengembangan. Tombol Simpan hanya membuka hasil simulasi berlabel, tanpa menambah/mengubah daftar. Reload mengembalikan tampilan awal. Google/WhatsApp hanya pratinjau nonaktif atau skenario simulasi, tanpa menghubungi layanan nyata. Pesan sukses simulasi tidak boleh mengesankan transaksi, izin, atau pembatalan nyata telah terjadi.

## Tahap 0 — Persiapan desain

Baca README, PRD, DESIGN, UX_SPEC, aturan bisnis, dan daftar D/A/Q. Siapkan peta layar, inventaris komponen, serta skenario statis: bulan kosong/padat, jadwal tentatif, kolaborasi, semua status ruangan, sengketa, dan arsip. Nama organisasi/ruangan serta tanggal contoh diberi label fiktif.

Acuan: D-38/D-39 dan A-10/A-14. Q-01/Q-09 tidak memblokir prototipe; gunakan konfigurasi contoh yang ditandai. Q terkait aturan data tetap terbuka dan tidak diselesaikan melalui logika tersembunyi.

**Pintu selesai:** semua halaman UX_SPEC memiliki tujuan review dan skenario, serta batas simulasi tercatat. Keputusan administratif tidak menahan review desain yang tidak bergantung padanya.

## Tahap 1 — Fondasi visual dan interaksi

Mulai kode setelah ada instruksi membuat prototipe. Pusatkan token warna, tipografi, spasi, radius, bayangan, dan gerak. Buat halaman pratinjau komponen untuk review internal, bukan fitur produk.

| Komponen | Keadaan/interaksi yang dapat ditinjau |
| --- | --- |
| Tombol utama, sekunder, teks, berisiko, ikon | Default, hover, pressed/on-click, focus-visible, disabled, loading |
| Input, textarea, select, radio, checkbox | Kosong, terisi, fokus, disabled, bantuan, contoh error; tanpa validator bisnis |
| Filter, dropdown, pemilih tanggal, tab | Buka/tutup, nilai visual terpilih, keyboard, menu tidak terpotong |
| Kartu bulan, baris proker, kartu ruangan | Hover, fokus, dipilih bila relevan, nama panjang, metadata/badge |
| Modal/dialog dan konfirmasi | Masuk/keluar, overlay, fokus, Escape, tutup/kembali, isi panjang |
| Toast, alert, skeleton, empty/error state | Pesan, ikon, penempatan, pengumuman aksesibel, coba lagi simulasi |
| Navigasi desktop dan HP | Halaman aktif, menu tambahan, perpindahan halaman dan fokus |

**Pintu selesai:** komponen memiliki keadaan yang relevan, mengikuti DESIGN.md, dan bisa dioperasikan dengan keyboard. Tidak ada koneksi data atau dependensi backend.

## Tahap 2 — Halaman publik

Feedback D-41 menempatkan revisi kalender sebagai paket berikutnya sebelum perluasan UI lain: aksen kecil → dropdown custom → logo bertumpuk → halaman kalender bulan/rentang berwarna → review responsif/aksesibilitas. Ikuti [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md), termasuk kriteria UX-R. D-44 kini mengizinkan implementasi revisi prototipe ini; hasilnya ada di [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md).

1. Kalender proker tahunan: 12 kartu bulan, periode, filter dengan contoh hasil statis.
2. Detail bulan: jadwal pasti, bagian “Tanggal belum ditentukan”, kolaborasi, kondisi kosong.
3. Detail proker: penyelenggara, jadwal, status, pemakaian terkait fiktif.
4. Pemakaian ruangan: tanggal/rentang, ruangan, daftar interval/status; grid desktop hanya jika membantu.
5. Detail pemakaian: ruangan/ormawa, waktu, laporan status PIC, pembaruan terakhir, penanda sengketa.

**Pintu selesai:** kalender → bulan → proker dan daftar ruangan → detail → kembali dapat diklik. Isi statis terbaca pada HP/desktop; slot tanpa catatan tidak disebut pasti tersedia. Publik tidak memerlukan login nyata.

## Tahap 3 — Halaman kelola dan alur klik

- Masuk dan contoh akses belum diverifikasi, aktif, dicabut. Pergantian peran hanya pemilih skenario prototipe, bukan otorisasi.
- Kelola ormawa: daftar proker/pemakaian, tambah/edit, riwayat contoh, konfirmasi “Masih direncanakan”, pembatalan.
- Formulir proker: bulan saja/tanggal pasti, beberapa jadwal, penyelenggara, kaitan ruangan. Kontrol mengubah tampilan field tanpa menyimpan entitas.
- Formulir ruangan: input sementara, pilihan contoh proker/jadwal, penjelasan persiapan/beres-beres serta aturan 7 hari.
- Modal dampak: contoh perubahan satu jadwal, pembatalan proker, pemakaian mandiri, dan bentrokan. Daftar dampak sudah ditentukan, bukan dihitung.
- Kelola platform BEM: tampilan ormawa/akun resmi, ruangan, periode, sengketa, arsip, beserta formulir/dialog contoh sesuai UX_SPEC.

**Pintu selesai:** setiap CTA merespons dengan navigasi, dialog, atau hasil simulasi berlabel. Kontak memakai placeholder nonaktif; audit memakai akun organisasi fiktif. Tidak ada tombol yang seolah menyimpan sungguhan.

## Aturan animasi dan modal untuk tahap 1–4

Angka berikut usulan awal review; simpan sebagai token bersama dan sesuaikan DESIGN.md bila berubah.

| Interaksi | Perilaku usulan |
| --- | --- |
| Hover/fokus tombol | Warna/border 120–160 ms; fokus segera terlihat |
| Klik/pressed | Feedback segera selama pointer/key ditekan; warna lebih gelap, skala isi maksimal 0,98 opsional, tanpa pergeseran layout |
| Dropdown/popover | Opacity/perpindahan maksimal 4 px selama 120–160 ms; posisi tetap dalam viewport |
| Modal masuk | Overlay fade dan panel opacity/translate maksimal 8 px selama 160–200 ms |
| Modal keluar | Sekitar 120–160 ms; tidak menahan interaksi lebih lama dari perlu |
| Toast | Kemunculan singkat, waktu baca cukup; pesan penting juga ada di konteks halaman |
| Pergantian halaman/tab | Ringan, tanpa menyapu kalender atau menunda akses konten |
| Reduced motion | Matikan translasi/skala dan gerak dekoratif; keadaan tetap jelas |

Modal memindahkan fokus ke judul/elemen awal yang sesuai, menahan Tab di dalam dialog, dan mengembalikan fokus ke pemicu saat ditutup. Escape serta tombol tutup tersedia. Modal formulir/konfirmasi tidak tertutup hanya karena klik backdrop; dialog informasi boleh jika konsisten. Latar tidak menerima fokus/scroll. Isi panjang dapat digulir; pada HP tombol tetap terjangkau saat keyboard layar terbuka. Drawer/sheet, jika digunakan, memiliki pengelolaan fokus setara.

Klik cepat berulang tidak boleh meninggalkan overlay, modal tertahan, atau scroll terkunci. Utamakan CSS dan state lokal untuk interaksi ini; tidak perlu library animasi besar atau state manager global.

## Tahap 4 — Penyempurnaan dan review UI/UX

Periksa seluruh halaman dengan konten panjang, skenario berbeda, viewport 360/768/1280 CSS px, zoom 200%, keyboard, serta reduced motion. Ukur kontras aktual. Menu/modal tidak terpotong, nama panjang tidak menutupi aksi, dan tindakan tidak bergantung hanya pada hover.

**Penyerahan:** prototipe lokal yang bisa dibuka, daftar layar/skenario, screenshot HP/desktop, hasil UX-P pada [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md), catatan feedback dan revisi DESIGN/UX_SPEC. Deployment tetap memerlukan instruksi pengguna.

**Pintu selesai:** UX-P01–UX-P08 lulus, masalah yang menghalangi review ditangani, dan pengguna telah meninjau alur utama. Sebut hasilnya “prototipe UI/UX siap integrasi”. AC keamanan, data, dan konkurensi tetap belum diuji. Integrasi data baru dimulai setelah diminta.

## Tahap 5 — Fondasi database dan akses

Konfirmasi Q yang memblokir fitur terkait: definisi A-01/A-02/A-04, zona waktu, pengganti beririsan, kewenangan sengketa BEM, bootstrap admin. Keputusan lain menyusul sesuai tenggatnya. Siapkan migration, entitas, Google Auth D-36/D-37, verifikasi akun resmi, RLS, audit, jalur transaksi dan constraint sesuai ARCHITECTURE. Gunakan data fiktif pada lingkungan pengembangan; jangan mengaktifkan mutasi UI sebelum penegakan database siap.

**Pintu selesai:** AC-25/26/27/30 lulus melalui database/API nyata; akses lintas ormawa, promosi diri, dan sesi dicabut ditolak. Ketersediaan akun Google resmi divalidasi sebelum pilot.

## Tahap 6 — Integrasi alur operasional

| Urutan | Alur lengkap | Pintu selesai |
| --- | --- | --- |
| 6A | Pemakaian publik → rencana → laporan status, bentrokan, peninjauan, pengganti, kontak, audit | AC-06–AC-14 dan AC-20, termasuk persetujuan bersamaan pada database nyata |
| 6B | Kalender → tentatif/pasti → kolaborasi → kaitan jadwal/ruangan → perubahan/pembatalan atomik, konflik versi | AC-01–AC-05 dan AC-21–AC-24 |
| 6C | Konfirmasi → kedaluwarsa → Cron idempoten → proyeksi jika Cron terlambat; tata kelola BEM dan arsip | AC-15–AC-19 dan AC-28; izin/tanggal terkait juga diverifikasi |

Setiap urutan menghubungkan UI hasil review dengan database, hak akses, dan pengujian relevan. Ganti skenario statis dengan hasil layanan nyata pada alur itu. Pemilih skenario/peran prototipe tidak masuk aplikasi operasional. Sukses simulasi tidak menjadi fallback kegagalan jaringan.

## Tahap 7 — Verifikasi akhir dan pilot

- Ulangi pemeriksaan UI/UX pada integrasi; loading/error/akses mengikuti respons nyata.
- Buktikan seluruh AC wajib, termasuk zona waktu AC-33 dan keamanan build/deep link AC-32.
- Konfirmasi Q sebelum pilot, data dasar asli, pengelola BEM, akun resmi ormawa, serta pemilik/penerus akun layanan.
- Uji pemulihan data dan pengakhiran sesi saat serah terima. Dokumentasikan operasi/kuota berdasarkan sumber resmi terbaru saat persiapan pilot.
- Publikasi hanya saat diinstruksikan; pilot satu bulan sesuai PRD.

**Pintu selesai:** kriteria wajib lulus dengan bukti, tidak ada kebocoran akses lintas ormawa atau persetujuan ruangan ganda, pengelola memahami batas laporan izin dan kondisi operasi layanan. Prototipe bukan bukti keamanan backend.

## Format tugas dan pelaporan

Tugas UI/UX menyebut tahap, layar/komponen, skenario fiktif, perilaku klik/gerak, viewport, serta UX-P yang dituju. Tugas integrasi menyebut FR/BR/AC, A/Q yang diputuskan, batas perubahan, dan bukti database/API. Laporkan hasil, pemeriksaan yang benar-benar dilakukan, keterbatasan, serta perubahan dokumen.

Contoh tugas awal masa depan: “Kerjakan tahap 1–2 mengikuti DESIGN.md: komponen, animasi klik/modal, dan halaman publik dengan skenario fiktif statis. State lokal hanya untuk presentasi. Tanpa Supabase, API, persistence, atau perhitungan aturan bisnis. Laporkan pemeriksaan UI/UX.” Contoh ini bukan instruksi mulai coding pada revisi dokumen ini.
