# Hasil revisi UI kalender Orka

Tanggal: 28 Oktober 2026. Otorisasi D-44: pengguna meminta penerapan rencana dropdown custom, logo ormawa bertumpuk, serta kalender detail. Palet muted teal dan status redup D-43 dipertahankan. Ini masih prototipe UI/UX dengan data fiktif, bukan aplikasi operasional.

## Perubahan

- Semua dropdown dalam cakupan paket memakai komponen custom: periode, filter ormawa, skenario UI, dan contoh ormawa dalam modal formulir. Radix Select dipakai sebagai primitive aksesibilitas; panel di dalam modal tetap berada dalam dialog tersebut.
- Logo SVG fiktif dibuat khusus sebagai placeholder. Kartu bulan menampilkan penyelenggara unik yang sudah ditentukan pada skenario, empat logo bertumpuk dan `+N` bila lebih banyak. Nama lengkap tersedia pada nama aksesibel kartu dan legenda detail. Ruang uji UI dapat memaksa monogram fallback untuk review.
- Klik bulan membuka halaman kalender tanggal, dengan navigasi bulan, filter/periode, legenda warna, pilihan Kalender/Agenda, serta modal detail proker. Kembali mempertahankan periode/filter dan memulihkan fokus ke kartu bulan.
- Blok mengikuti rentang jadwal contoh, menunjukkan lanjutan minggu/bulan, dan memakai warna pengelola utama dengan logo seluruh penyelenggara pada kolaborasi. Jadwal terpisah tetap terpisah. Tanggal padat menampilkan tiga bar lalu `+N lainnya`, yang membuka daftar lengkap tanggal tersebut.
- HP membuka Agenda secara default; Kalender tetap tersedia. Memilih tanggal memindahkan fokus ke daftar lengkap di bawah kalender. Proker hanya-bulan tetap terpisah dalam “Tanggal belum ditentukan”.

## Skenario yang dapat dicoba

Oktober 2026 memiliki delapan proker unik dan satu rencana tentatif. Lokakarya memiliki dua jadwal terpisah; karena itu jumlah occurrence di Agenda berbeda dari jumlah proker unik pada kartu. Pada 18 Oktober terdapat lima jadwal contoh, tiga bar terlihat dan dua lainnya tersedia lewat overflow. Malam apresiasi berakhir 19 Oktober pukul 00.00 tetapi hanya mewarnai 18 Oktober. Ruang karya bersama berlangsung 30 Oktober–2 November, dengan penanda lanjutan pada kedua bulan.

April menampilkan kolaborasi BEM Contoh + Hima A Contoh dalam satu blok. Januari/Juli serta arsip contoh tetap kosong. Filter Hima A menampilkan skenario terpilih beserta kolaboratornya. Semua nama, logo, warna identitas, jadwal, dan jumlah bersifat fiktif.

## Batas teknis

Grid tanggal, penempatan bar, daftar tanggal, rentang, overflow, dan hasil filter disimpan sebagai fixture statis di prototype/src/calendar-fixtures.ts. Script authoring offline prototype/scripts/generate-calendar-fixtures.mjs menyiapkan contoh tersebut; script tidak diimpor ke browser. Tidak ada algoritma kalender/bentrokan/otorisasi/pembatalan, API, Auth nyata, persistence, atau backend pada prototipe. Data contoh yang disalin ke fixture bukan sumber aturan produksi.

State browser hanya mengelola presentasi: halaman aktif, pilihan dropdown/tampilan, tanggal terpilih, fokus, dan modal. Node.js 24 pada lingkungan ini dapat menjalankan script authoring TypeScript fixtures. Tidak ada migration, layanan cloud, atau deployment.

## Pemeriksaan

| Kriteria | Hasil |
| --- | --- |
| UX-R01 | Palet D-43 tetap dipakai secara terbatas; status dan warna identitas dijelaskan terpisah |
| UX-R02 | Dropdown custom diperiksa dengan klik, ArrowDown, Home/End, Enter, pencarian ketik, Escape, dan Tab. Dalam modal: Escape menutup dropdown saja, fokus kembali ke trigger; Tab keluar ke kontrol berikutnya dalam dialog |
| UX-R03 | Kartu Oktober menampilkan empat logo +1, nama lima penyelenggara pada label aksesibel; filter mengubah contoh penyelenggara, fallback menghasilkan monogram dan dapat dikembalikan |
| UX-R04 | Kalender → bulan → detail, kembali, navigasi Oktober/November, dan filter diperiksa. HP default Agenda; grid ringkas dan daftar tanggal dapat dibuka |
| UX-R05 | Bar lintas minggu/bulan, dua jadwal terpisah, overflow 18 Oktober → lima jadwal, serta detail tengah malam diperiksa; invariannya juga diperiksa melalui npm run check |
| UX-R06 | Warna tetap per ormawa; kolaborasi menggunakan satu blok dan seluruh penyelenggara; tentative tidak masuk fixture grid |
| UX-R07 | Sebagian: viewport 360/375/768/1280 diperiksa tanpa overflow horizontal pada keadaan yang ditinjau; navigasi panah tanggal diperiksa. Kontras teks identitas 5,21–5,96:1. Zoom browser 200%, pembaca layar, keyboard layar perangkat fisik, dan emulasi reduced motion OS belum diperiksa langsung. CSS reduced motion tersedia |
| UX-R08 | Pemeriksaan sumber memastikan batas tanpa API/persistence/integrasi data tetap berlaku; label fiktif/tidak tersimpan dipertahankan |

Build TypeScript/Vite, format, konsistensi fixture, serta pemeriksaan kontras token dan identitas dijalankan. Tidak ada AC backend/keamanan/konkurensi yang diluluskan. Review visual pengguna atas hasil revisi ini masih diperlukan; keseluruhan fase UI/UX termasuk halaman ruangan/kelola belum selesai.

## Bukti tampilan

- [Kalender tahunan dan logo](prototype/review/revision-year.jpg)
- [Kalender detail dan rentang](prototype/review/revision-calendar.jpg)
- [Dropdown custom](prototype/review/revision-dropdown.jpg)
- [Agenda HP](prototype/review/revision-mobile-agenda.jpg)
- [Daftar tanggal padat pada HP](prototype/review/revision-mobile-day.jpg)

Langkah berikutnya adalah review revisi ini, menyelesaikan pemeriksaan aksesibilitas yang tersisa, dan melanjutkan UI pemakaian ruangan/formulir/kelola sesuai arahan pengguna. Integrasi data tetap tahap terpisah.
