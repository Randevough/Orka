# Review paket Kelola platform/BEM

Tanggal: 7 November 2026. Acuan D-39/D-55/D-56/D-58, UX_SPEC dan ACCESS_CONTROL. Paket 3 tersedia untuk review lokal. Tiga paket UI yang direncanakan kini tersedia, tetapi kelulusan fase UI/UX keseluruhan dan kesiapan integrasi belum dinyatakan.

## Hasil

- Ruang uji akses pada dialog masuk menambahkan Pengelola platform BEM. Hasilnya tetap Simulasi akses, tanpa menghubungi Google atau memberikan kewenangan nyata.
- Akun contoh pengelola mendapat navigasi Kelola platform. PIC Hima A tetap memakai Kelola ormawa dan tidak mendapat navigasi platform. Verifikasi akun ormawa tidak menawarkan pemberian hak pengelola platform.
- Tindak lanjut BEM berfokus pada akun menunggu verifikasi, informasi penutupan aula, serta laporan izin bertentangan. Tidak menambahkan analitik atau pengingat.
- Ormawa & akses: daftar/filter akun, tambah/edit ormawa, data akun resmi, persetujuan kontak, verifikasi dan pencabutan. Semua email memakai domain `.invalid`; tidak ada nomor, password atau data pengguna nyata. Verifikasi/pencabutan melewati pemeriksaan sasaran dan dampak.
- Ruangan: tambah/edit nama/lokasi/status pencatatan, contoh nonaktif, serta informasi penutupan. Alur penutupan memakai RoomCoordination BEM yang sudah ada. Pembukaan kembali mencatat informasi dan menegaskan tidak memulihkan pemakaian atau menyalin izin secara otomatis.
- Periode & arsip: siapkan/edit periode mendatang, tinjau penetapan periode utama, tinjau pengarsipan, dan buka arsip lama. Rincian pengelolaan periode adalah usulan tampilan, bukan keputusan baru tentang perpindahan jadwal atau koreksi arsip.
- Arsip 2025/2026 memiliki contoh proker dan pemakaian lama, hanya-baca, tanpa edit/penghapusan.
- Peninjauan: lihat laporan kedua pihak dengan status sebelumnya; catat hasil klarifikasi/tindak lanjut. Tidak ada tombol memberi izin kedua atau mengoreksi langsung status pihak lain. Rekam sengketa adalah kasus review khusus yang tidak menambah hitungan kalender publik.
- Riwayat pengelolaan menyebut akun organisasi dan waktu contoh; tidak menyediakan edit audit atau mengklaim pengurus individual.
- Navigasi bagian menjadi dropdown pada HP. Semua formulir memakai pola isi → tinjau dampak → hasil simulasi, tanpa mengubah daftar/riwayat.

## Cara mencoba

1. Pilih Masuk. Buka Ruang uji akses → Skenario masuk → Pengelola platform BEM.
2. Pilih Masuk dengan Google → Buka kelola platform. Tidak ada autentikasi atau layanan eksternal yang dipanggil.
3. Coba Tindak lanjut, Ormawa & akses, Ruangan, Periode & arsip, Peninjauan, dan Riwayat.
4. Ruang uji UI menyediakan akun BEM tanpa hak platform, hak dicabut, memuat/kosong/gagal, gagal simpan, versi berubah, serta akun terkait ormawa lain.

Hasil tinjauan formulir dipilih sebagai contoh dan tidak dihitung dari input. Alur penutupan yang dipakai ulang mempertahankan skenario review miliknya. Tidak ada perhitungan bentrokan, validasi periode, mesin kewenangan, penyimpanan, pengiriman laporan atau perubahan status sungguhan. Isian dan pilihan hanya state presentasi; reload mereset tampilan.

## Pemeriksaan

| Area | Hasil dan batas |
| --- | --- |
| Build/format/check | `npm run check`, `npm run build`, `npm run format:check` lulus. Batas tanpa API/persistence dan kontras token tetap diperiksa |
| Dataset | ID akun/ruangan/periode unik, email contoh unik/domain invalid, filter status sesuai, tepat satu periode utama pada fixture. Contoh sengketa memakai ruang/tanggal/waktu sama, organisasi berbeda dan hanya satu approved. Arsip berisi contoh |
| Masuk/navigasi | BEM → platform; keluar → PIC → tidak ada navigasi platform; masuk ulang BEM → platform. Tombol dari halaman pemakaian publik menuju kelola platform untuk akun BEM |
| Akun/ormawa | Verifikasi memerlukan centang pemeriksaan sasaran, lalu hasil simulasi. Tambah ormawa, kembali mempertahankan nama, hasil tidak mengubah daftar. Pencabutan sampai hasil simulasi; edit kontak menampilkan persetujuan dan pembatasan pembaca |
| Ruangan | Tambah ruangan, penutupan sampai daftar dampak dan hasil; pembukaan kembali sampai tinjauan dan hasil. Edit ruangan terbuka pada HP; Escape menutup dropdown status tanpa menutup dialog |
| Periode/arsip | Siapkan periode, edit periode mendatang sampai tinjauan, tetapkan utama dan arsipkan sampai hasil simulasi. Arsip proker/pemakaian bisa dibuka, tidak memiliki kontrol menulis |
| Sengketa/riwayat | Laporan menampilkan kedua status, tanpa tombol persetujuan izin. Catatan hasil ditinjau sampai hasil simulasi. Riwayat pengelolaan terbuka hanya-baca |
| Skenario gagal | Gagal muat → coba lagi; kosong/memuat terpisah. Gagal simpan menampilkan pesan dan mempertahankan isian. Versi berubah, hak dicabut dan akun terkait ormawa lain memblokir Simpan pada contoh yang diuji |
| Batas hak platform | Contoh akun BEM tanpa hak platform dan hak dicabut tidak menyediakan Tambah ormawa. Ini hanya pemeriksaan tampilan, bukan bukti penegakan otorisasi |
| Responsif | Lebar 360, 768, 1280 dan mendatar 812 × 375 diperiksa; tidak ditemukan overflow horizontal halaman pada keadaan yang ditinjau. Formulir nama panjang dan edit ruangan di 360 memiliki lebar scroll/konten dialog yang sama |
| Keyboard/log | Judul tinjauan menerima fokus; Shift+Tab dari judul menuju tombol terakhir. Dropdown di dialog menerima Escape. Log browser akhir tanpa warning/error |

UX-P dinilai per paket dan masih parsial untuk seluruh fase. Belum audit pembaca layar, zoom 200%, reduced motion OS atau keyboard layar HP fisik. AC keamanan, penyimpanan, verifikasi akun bersamaan, pencabutan sesi, audit dan konkurensi belum diuji. Build masih memberi peringatan chunk statis sekitar 626 kB (gzip 139 kB); belum dipisah.

## Batas keputusan dan langkah berikutnya

Q-01/Q-05/Q-06/Q-08/Q-11 tetap terbuka untuk konfigurasi kampus, bootstrap/penerus admin dan koreksi sengketa, arsip, kepemilikan layanan serta penutupan/pembukaan kembali. UI tidak mengangkat skenario contoh menjadi aturan bisnis baru.

Berikutnya adalah review menyeluruh tiga paket, penutupan temuan UI/aksesibilitas dan keputusan yang memblokir integrasi. Tidak membuat database, Auth, layanan cloud atau deployment dalam paket ini. Tidak menyatakan prototipe sudah aman atau siap operasional.

## Bukti tampilan

- [Dashboard BEM desktop](prototype/review/platform-desktop.jpg)
- [Pengelolaan ruangan HP](prototype/review/platform-mobile.jpg)
- [Tinjauan formulir HP](prototype/review/platform-form-mobile.jpg)
