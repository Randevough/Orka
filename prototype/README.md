# Prototipe UI Orka

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

## Yang dapat dicoba

- Kalender 12 bulan dan filter skenario Semua ormawa/Hima A Contoh.
- Periode aktif contoh dan arsip kosong contoh, tanpa perhitungan tanggal.
- Klik bulan → modal daftar → detail proker; jadwal tentatif tidak diberi tanggal palsu.
- Panduan membaca kalender, masuk simulasi, dan pratinjau ringkas ruangan.
- Ruang uji UI di bawah kalender: normal, kosong, memuat, gagal, serta katalog komponen.
- Komponen tombol, badge, input, select, radio, checkbox, modal, alert, dan toast simulasi. Gunakan Tab/Shift+Tab dan Escape untuk mencoba dialog.

Semua nama, hitungan, dan jadwal adalah fiktif. Input hanya sementara. Tombol simulasi simpan tidak mengubah daftar; reload mengembalikan skenario awal. Loading merupakan keadaan demo yang dipilih secara eksplisit, bukan permintaan jaringan.

Revisi D-44 menambahkan dropdown custom Radix Select, logo SVG fiktif bertumpuk/fallback, dan halaman kalender bulan berwarna dengan rentang, overflow tanggal, serta Agenda untuk HP. Oktober memuat skenario lintas minggu/bulan dan tanggal padat; April memuat kolaborasi. Kalender detail memakai fixture statis; script authoring `scripts/generate-calendar-fixtures.mjs` menyiapkan contoh secara offline dan tidak dimuat browser. Jalankan script tersebut hanya ketika memperbarui fixture contoh, lalu format dan periksa ulang hasilnya.

Halaman ruangan lengkap, formulir produk lengkap, kelola PIC/BEM, serta login nyata belum dibuat. Tampilan publik ini tidak membuktikan otorisasi, pencegahan bentrokan, atau pembatalan atomik. Lihat [hasil paket pertama](../PROTOTYPE_PROGRESS.md) dan [hasil revisi kalender](../UI_REVISION_REVIEW.md).
