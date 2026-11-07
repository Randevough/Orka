# Prototipe UI Orka

Palet aktif **D-55: ultramarine + paper**. Isi/kontrol default 16 px, label 15 px, keterangan minimal 14 px. Dropdown hover/active solid biru dengan teks putih dan jarak lega. Lihat [DESIGN.md](../DESIGN.md) dan [hasil review D-55](../UI_READABILITY_REVIEW.md).

Logo brand contoh tetap lokal dan multicolor; sumber ada di [SOURCES.md](public/logos/SOURCES.md). File design-exploration/ merupakan riwayat perbandingan, bukan palet produk aktif.

Sesuai D-45, penanda preview/pratinjau/data dummy di tampilan utama dihapus. Status pengembangan dicatat di sini: seluruh isi tetap fiktif/statis, input tidak tersimpan, dan layanan nyata belum terhubung. Penghapusan label tidak menambah perilaku data.

Paket pertama UI/UX, diizinkan melalui D-40. React + Vite + TypeScript, CSS biasa, dan Geist Variable yang di-host lokal melalui paket Fontsource (SIL Open Font License 1.1; lisensi tersedia dalam paket). Tanpa Supabase, API, Auth nyata, persistence, atau logika aturan bisnis.

## Menjalankan lokal

Gunakan Node.js 22.18+ atau Node.js 24 LTS agar pemeriksaan TypeScript melalui Node berjalan. Lingkungan yang diperiksa memakai Node.js 24.21.0.

```powershell
cd C:\Users\USER\Desktop\ormawa-planning\prototype
npm ci
npm run dev
```

Buka alamat lokal yang dicetak Vite. Preview hanya di-bind ke `127.0.0.1`. Tidak ada deployment atau akun layanan yang diperlukan.

```powershell
npm run check
npm run build
npm run format:check
```

`check` memeriksa konsistensi skenario fiktif, larangan akses data pada sumber prototipe, serta kontras pasangan token. Ini tidak menggantikan walkthrough browser atau pengujian keamanan aplikasi. `build` menjalankan pemeriksaan TypeScript dan build Vite.

## Timeline dan penyesuaian D-50

Pilihan Ringkasan / Timeline / Kalender ada di atas halaman. Timeline memakai dataset fiktif yang konsisten dengan kalender; hitungan pengerjaan, logo, posisi bar, dan penanda pelaksanaan ditulis sebagai fixture. `node scripts/generate-timeline-fixtures.mjs` menyiapkan fixture offline; jalankan format/check setelah mengubahnya, bukan dari browser.

Di **Ruang uji UI**, pilih kasus timeline lalu **Buka alur PIC** untuk mencoba modal revisi. Tersedia pula **Penutupan ruangan · BEM** dan **Tindak lanjut ruangan · PIC**. Publik hanya melihat detail, tanpa edit. Semua input sementara; konfirmasi membuka hasil tinjauan UI, tidak menyimpan atau mengirim laporan. Pemeriksaan tanggal/konflik versi pada menu internal adalah contoh tampilan tetap, bukan validator.

Lihat [hasil review Timeline](../TIMELINE_UI_REVIEW.md) untuk pemeriksaan, screenshot, dan batas UX-T. Formulir produk lengkap, database, Auth dan hak akses nyata belum tersedia.

## Yang dapat dicoba

- Kalender 12 bulan dan filter skenario Semua ormawa/Hima A Contoh.
- Periode aktif contoh dan arsip kosong contoh, tanpa perhitungan tanggal.
- Klik bulan → halaman kalender/Agenda → detail proker; jadwal tentatif tidak diberi tanggal palsu.
- Panduan membaca kalender, masuk simulasi, dan pratinjau ringkas ruangan.
- Ruang uji UI di bawah kalender: normal, kosong, memuat, gagal, serta katalog komponen.
- Komponen tombol, badge, input, select, radio, checkbox, modal, alert, dan toast simulasi. Gunakan Tab/Shift+Tab dan Escape untuk mencoba dialog.

Semua nama, hitungan, dan jadwal adalah fiktif. Input hanya sementara. Tombol simulasi simpan tidak mengubah daftar; reload mengembalikan skenario awal. Loading merupakan keadaan demo yang dipilih secara eksplisit, bukan permintaan jaringan.

Revisi D-44 menambahkan dropdown custom Radix Select, logo SVG fiktif bertumpuk/fallback, dan halaman kalender bulan berwarna dengan rentang, overflow tanggal, serta Agenda untuk HP. Oktober memuat skenario lintas minggu/bulan dan tanggal padat; April memuat kolaborasi. Kalender detail memakai fixture statis; script authoring `scripts/generate-calendar-fixtures.mjs` menyiapkan contoh secara offline dan tidak dimuat browser. Jalankan script tersebut hanya ketika memperbarui fixture contoh, lalu format dan periksa ulang hasilnya.

Halaman ruangan lengkap, formulir produk lengkap, kelola PIC/BEM, serta login nyata belum dibuat. Tampilan publik ini tidak membuktikan otorisasi, pencegahan bentrokan, atau pembatalan atomik. Lihat [hasil paket pertama](../PROTOTYPE_PROGRESS.md) dan [hasil revisi kalender](../UI_REVISION_REVIEW.md).
