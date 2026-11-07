# Hasil paket UI Timeline Orka

Tanggal: 31 Oktober 2026. Otorisasi: pengguna meminta “proceed” setelah rancangan TIMELINE_UX_PLAN.md (D-50). Status: paket prototipe dapat direview secara lokal; fase UI/UX keseluruhan belum dinyatakan selesai.

## Perubahan

- Pilihan Ringkasan / Timeline / Kalender; periode dan filter dipertahankan, bulan terakhir diingat saat berpindah tampilan.
- Kartu bulan memisahkan pengerjaan dan pelaksanaan. Januari/Juli yang memiliki pengerjaan tetapi tanpa pelaksanaan tidak diberi klaim tidak ada proker.
- Timeline desktop dengan identitas tetap saat area waktu digulir, bar pengerjaan presisi bulan, penanda bulan pelaksanaan/tentatif, serta daftar yang terbaca pada HP.
- Detail proker memisahkan pengerjaan, sesi, izin, kondisi perlu penyesuaian, dan perubahan jadwal operasional. Tampilan publik tidak menyediakan edit.
- Ruang uji UI menyediakan skenario PIC untuk proposal belum disetujui, penundaan tanpa pengganti, tiga sesi terkena penutupan, pembatalan sebagian, serta kolaborasi lintas periode. Rentang terbuka/lintas periode ditinjau pada detail, bukan dihitung sebagai aktivitas semua bulan.
- Modal revisi tiga langkah: pilih tindakan, isi rencana, tinjau dampak. Pengerjaan saja, pindah pelaksanaan, tunda, batal sisa, dan pengganti ruangan dapat dicoba. Kembali mempertahankan input sementara; tombol konfirmasi hanya membuka hasil alur UI, tidak menyimpan.
- Contoh konflik versi dan pelaksanaan di luar timeline tersedia melalui Ruang uji UI di langkah dampak. Keduanya keadaan tampilan pilihan, bukan pemeriksaan terhadap input.
- Skenario BEM menampilkan formulir penutupan dan dampak lintas ormawa; skenario PIC menampilkan laporan kendala, tindak lanjut, serta pembukaan kembali yang memerlukan memastikan ulang izin.

## Cara review

Jalankan prototype/ sesuai README-nya. Pilih Timeline pada bagian atas kalender. Untuk alur kelola, buka **Ruang uji UI** di bawah halaman, pilih kasus, lalu **Buka alur PIC**. Tombol penutupan BEM dan tindak lanjut PIC ada di area review yang sama. Pemilih ini tidak memberi kewenangan sungguhan.

Dataset utama memakai 25 proker unik yang sama dengan kalender pelaksanaan, tiga belum mengisi pengerjaan. Filter Hima A mencakup kolaborasi dan satu timeline belum diisi. Kasus khusus penundaan/penutupan/lintas periode adalah skenario review terpisah, tidak ditambahkan diam-diam ke hitungan kalender utama.

## Pemeriksaan

| Kriteria | Hasil dan batas |
| --- | --- |
| UX-T01 | Lulus pada fixture: dua indikator, logo/filter, timeline belum diisi. Konsistensi hitungan dan cakupan kolaborasi diperiksa melalui script authoring/check, bukan perhitungan bisnis browser |
| UX-T02 | Sebagian: Timeline desktop/daftar HP, presisi bulan dan kolaborasi tersedia; lintas periode/akhir terbuka ditampilkan pada detail skenario review. Screen reader dan semua variasi nama panjang belum diuji |
| UX-T03 | Lulus pada fixture: kalender tetap memakai sesi pelaksanaan; penundaan pada detail skenario tidak menjadi acara aktif tanggal lama. Transisi antara dataset tidak dijalankan |
| UX-T04 | Lulus pada contoh: pengerjaan, sesi, status izin dan perlu penyesuaian terpisah. Dua sesi terlaksana dan sisa dibatalkan tetap terlihat |
| UX-T05 | Lulus pada alur statis: lima pilihan revisi tersedia, tiga alur pengerjaan/pelaksanaan/batal serta penundaan/pengganti dicoba sampai tinjauan/hasil. Konflik versi memblokir konfirmasi; contoh luar rentang meminta koreksi eksplisit. Tidak ada validator tanggal atau pembentukan dampak dari input |
| UX-T06 | Lulus pada contoh: BEM meninjau dua pemakaian, PIC memilih perluasan sesi, pengganti tidak mewarisi izin, pembukaan kembali menampilkan memastikan ulang. Perpindahan dialog PIC → detail hanya menyisakan satu dialog |
| UX-T07 | Sebagian: kasus utama tersedia, keadaan normal/kosong/memuat/gagal memakai kontrol skenario yang ada. Semua TL-S belum diuji secara menyeluruh; kepadatan tanpa larangan dipertahankan dari kalender sebelumnya |
| UX-T08 | Sebagian: lebar 360/768/1280 tidak meluber horizontal; dropdown ruangan diuji Enter/ArrowDown/Enter; fokus langkah dan pemulihan fokus dialog diperiksa. Kontras token/org lulus. Zoom 200%, screen reader, keyboard layar HP, dan reduced motion OS belum diuji |

Perintah `npm run check`, `npm run build`, serta `npm run format:check` lulus. Script check memeriksa identitas unik, cakupan pelaksanaan dalam fixture pengerjaan, hitungan/logo per bulan, status contoh penundaan/pembatalan sebagian, batas tanpa akses data, dan kontras. Log browser pada walkthrough terakhir tidak memuat error/warning.

Build memberi peringatan chunk JavaScript sekitar 541 kB (gzip sekitar 124 kB), karena fixture statis kalender dan layar review dikemas bersama. Tidak mengubah batas peringatan untuk menyembunyikannya. Pembagian bundle dapat ditinjau saat pola pemuatan data/aplikasi sudah ditentukan. Overflow akibat pilihan kasus panjang pada alat review HP sudah diperbaiki dan diperiksa ulang saat panel review maupun formulir terbuka.

## Bukti visual

- [Ringkasan HP](prototype/review/timeline-summary-mobile.jpg)
- [Detail dan penyesuaian HP](prototype/review/timeline-detail-mobile.jpg)
- [Formulir revisi HP](prototype/review/timeline-form-mobile.jpg)
- [Tinjauan revisi desktop](prototype/review/timeline-revision-desktop.jpg)
- [Timeline desktop](prototype/review/timeline-desktop.jpg)

## Batas fase

Input hanya state presentasi dan tidak mengubah daftar. Rentang penutupan BEM memakai nilai tetap pada contoh; alasan bisa diketik. Sesi/ruangan/indikator dan daftar dampak sudah disiapkan sebagai fixture. Script generate-timeline-fixtures.mjs hanya alat authoring offline; tidak dimuat browser. Tidak ada API/Auth, database, persistence, penghitung bentrokan/tanggal/kedaluwarsa, audit nyata, laporan yang dikirim, atau transaksi pembatalan.

AC-34–AC-40 tetap belum diuji pada aplikasi nyata. Q-06/Q-10–Q-12 tetap perlu dituntaskan sebelum integrasi terkait. Tidak ada deployment.
