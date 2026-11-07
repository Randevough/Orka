# Review paket Kelola ormawa/PIC

Tanggal: 7 November 2026. Acuan D-39/D-55/D-56/D-57; tahap 3–4 IMPLEMENTATION_PLAN.md. Paket 2 tersedia untuk review lokal. UI/UX keseluruhan belum selesai; paket BEM menyusul.

## Hasil

- Masuk dengan Google membuka hasil simulasi akses. Pilihan review mencakup akun aktif, belum diverifikasi, akses dicabut, login gagal dan login dibatalkan. Tidak menghubungi Google. Hasil ditandai Simulasi akses.
- Akun contoh aktif membuka Kelola ormawa dengan identitas Hima A Contoh. Navigasi publik tetap tersedia; Keluar mengembalikan tampilan publik. Akun belum diverifikasi/dicabut melihat status akses tanpa kontrol pengelolaan.
- Dashboard memprioritaskan tindak lanjut penutupan ruangan dan konfirmasi rencana. Tab Proker, Pemakaian ruangan dan Riwayat menampilkan fixture milik sendiri/kolaborasi. Tidak ada dashboard analitik.
- Formulir tambah proker berisi nama, periode, pengelola utama tetap, kolaborator, pengerjaan opsional dan beberapa sesi. Sesi dapat memakai tanggal/jam pasti atau bulan tentatif. Akhir pengerjaan belum pasti ditampilkan eksplisit.
- Edit informasi menjaga sesi lama; nama/kolaborator dan tambahan sesi ditinjau terpisah. Perubahan pengerjaan/jadwal, penundaan dan pembatalan memakai ProgramDialog/revisi yang sudah ada agar dampak ruangan tetap terlihat. Kolaborasi yang dikelola BEM tidak menyediakan edit melalui tampilan Hima A.
- Pemakaian menyediakan detail, edit rencana, laporan izin, konfirmasi masih direncanakan, pembatalan satu pemakaian, pengganti dan tindak lanjut PIC. Memakai ulang UsageForm/UsageDetail dan RoomCoordination, tanpa menyalin dialog paket sebelumnya.
- Edit planned/pending mempertahankan label status sebelumnya. Pengganti approved dimulai sebagai Rencana dengan izin tersendiri; catatan asal tetap ditampilkan. Pemakaian dibatalkan karena kedaluwarsa hanya menawarkan catatan baru, bukan konfirmasi/pemulihan.
- Contoh izin bertentangan membuka tinjauan laporan BEM dan mempertahankan status sebelumnya. Tidak mengizinkan persetujuan kedua atau mengirim laporan sungguhan.
- Riwayat menyebut akun organisasi dan sistem, tanpa identitas pengurus individual. Tidak ada email/nomor pribadi yang ditambahkan.
- Pilihan arsip menampilkan contoh kosong hanya-baca. Arsip historis berisi catatan belum dibuat.

## Cara mencoba

1. Buka server Vite dan pilih Masuk → Masuk dengan Google → Buka kelola ormawa. Ini simulasi akun aktif.
2. Coba Tambah proker, Edit informasi, Lihat detail → Revisi jadwal, dan tab Pemakaian ruangan/Riwayat.
3. Untuk variasi login, buka Ruang uji akses pada dialog masuk sebelum mencoba Google.
4. Di Kelola ormawa, Ruang uji UI menyediakan keadaan akses, halaman dan hasil tinjauan. Periode arsip dipilih melalui Periode kelola.

Skenario dipilih secara eksplisit; hasil tidak dihitung dari input. Contoh konflik izin hanya memengaruhi laporan ruangan; revisi ProgramDialog mempertahankan pemilih skenario miliknya. Tidak ada validator tanggal, kewenangan, transisi status, bentrokan atau kedaluwarsa di browser. Formulir dan daftar tidak menjadi CRUD lokal; reload mereset tampilan dan semua hasil simpan tetap simulasi.

## Pemeriksaan

| Area | Hasil dan batas |
| --- | --- |
| Build/check/format | `npm run build`, `npm run check`, `npm run format:check` lulus. Check mencakup batas tanpa API/persistence, kontras token dan hubungan fixture PIC |
| Konsistensi fixture | ID unik; proker mencakup Hima A sebagai pengelola/kolaborator; item edit dimiliki pengelola utama Hima A; semua pemakaian milik Hima A; status terminal tidak menawarkan konfirmasi/perubahan izin/pembatalan ulang |
| Login dan akses | Aktif → kelola → keluar; gagal/dibatalkan menampilkan hasil tanpa akses baru. Tampilan belum diverifikasi/dicabut tidak memiliki Tambah proker |
| Proker | Tambah dengan kolaborator, pengerjaan akhir belum pasti, dua sesi pasti/tentatif; hapus isian tambahan; kembali mempertahankan nama. Simpan menghasilkan pesan simulasi. Edit menjaga sesi lama; kolaborator tidak mendapat Revisi jadwal. Revisi pembatalan dibuka sampai tinjauan pemakaian terdampak |
| Pemakaian | Edit memuat interval fixture dan mempertahankan pending; pengganti menampilkan Rencana. Konfirmasi, laporan approved normal dan pembatalan satu pemakaian dicoba sampai hasil simulasi. Contoh konflik tidak menawarkan Simpan laporan izin dan membuka laporan peninjauan sampai hasil simulasi |
| Keadaan | Gagal muat → coba lagi, kosong, memuat, normal, arsip. Formulir proker gagal simpan mempertahankan isian; versi berubah dan akses dicabut menonaktifkan Simpan |
| Integrasi | Tindak lanjut PIC membuka dialog lama; tombol publik setelah simulasi masuk kembali ke Kelola; Riwayat memakai akun organisasi. Log browser akhir tanpa warning/error |
| Responsif | Dashboard pada lebar 360, 768, 1280 dan mendatar 812 × 375; daftar pemakaian dan formulir proker pada 360. Tidak ditemukan overflow horizontal halaman; lebar scroll/konten dialog sama pada ukuran yang diperiksa |
| Keyboard | Judul tinjauan menerima fokus, Shift+Tab menuju tombol terakhir; Escape menutup dropdown periode di dalam formulir tanpa menutup dialog. Isian nama panjang tetap membungkus pada tinjauan |

UX-P01–UX-P08 dinilai pada paket ini secara parsial, bukan kelulusan seluruh fase. Belum audit pembaca layar, zoom 200%, reduced motion OS, atau keyboard layar HP fisik. AC otorisasi, data, audit dan konkurensi tetap belum diuji.

## Batas dan berikutnya

Seluruh tanggal, akun, catatan, status dan tenggat adalah fixture fiktif. Tidak ada perhitungan tenggat, pengiriman laporan, persistence, Auth, database atau deployment. Q-01/Q-04–Q-07/Q-10–Q-12 tetap perlu diselesaikan sebelum integrasi terkait. Build masih memberi peringatan chunk statis sekitar 594 kB (gzip 133 kB); belum dipisah.

Paket berikutnya: Kelola platform/BEM, meliputi ormawa dan akses, ruangan, periode, sengketa dan arsip; gunakan ulang koordinasi ruangan yang sudah tersedia.

## Bukti tampilan

- [Kelola desktop](prototype/review/manage-desktop.jpg)
- [Pemakaian PIC pada HP](prototype/review/manage-mobile.jpg)
- [Tinjauan proker pada HP](prototype/review/manage-form-mobile.jpg)
