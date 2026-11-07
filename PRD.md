# PRD Orka: platform koordinasi ormawa

Status: draf 1.0. Keputusan D sudah dikonfirmasi pengguna; rincian A/Q ada dalam daftar keputusan.

## Masalah

Ormawa kampus belum memiliki informasi kegiatan dan pemakaian ruangan yang terintegrasi. Pengurus kesulitan memilih bulan proker karena tidak mengetahui rencana ormawa lain. Pemakaian ruangan dikoordinasikan melalui chat atau surat sehingga potensi bentrokan terlambat diketahui.

Semua jenis masalah awal dianggap penting. Setelah penggalian, kebutuhan rapat dipersempit menjadi pencatatan pemakaian ruangan. Pengguna tidak memerlukan data orang atau isi rapat.

## Tujuan

- Pengurus dapat melihat kepadatan rencana proker satu tahun akademik sebelum menentukan jadwal.
- Pengurus dapat melihat pemakaian ruangan yang telah dicatat serta status pengajuannya.
- Pengurus mengetahui bentrokan sebelum menandai pemakaian sebagai disetujui.
- BEM membantu adopsi dan mengelola akses pengurus lintas periode.

Platform tidak menjamin seluruh jadwal kampus tercatat atau seluruh bentrokan hilang. Kualitas informasi bergantung pada pembaruan PIC dan cakupan pemakaian yang diketahui.

## Pengguna

| Peran | Kebutuhan |
| --- | --- |
| Mahasiswa umum | Melihat kalender proker dan pemakaian ruangan tanpa hak mengubah |
| PIC ormawa | Memasukkan serta memperbarui agenda milik ormawanya, menghubungi PIC lain |
| Pengelola BEM | Memverifikasi PIC, memelihara ruangan dan periode, membantu peninjauan sengketa |

Cakupan awal langsung satu kampus kecil dengan kurang dari 10 ormawa. Setiap ormawa wajib memiliki satu akun Google resmi bersama untuk pengelolaan, diverifikasi BEM (D-37). Masing-masing menunjuk 1 sampai 2 PIC sebagai penanggung jawab operasional. Admin kampus diperkirakan belum ikut pada versi awal.

## Kebutuhan fungsional

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-01 | Ringkasan 12 bulan tahun akademik dengan bulan awal diatur BEM | Wajib |
| FR-02 | Detail bulan, filter ormawa, nama proker, dan jadwal | Wajib |
| FR-03 | Proker tentatif dapat dicatat hanya dengan bulan | Wajib |
| FR-04 | Satu proker memiliki beberapa jadwal kegiatan | Wajib |
| FR-05 | Kolaborasi dicatat sekali dengan satu ormawa pengelola utama | Wajib |
| FR-06 | Pencatatan pemakaian ruangan sejak rencana awal | Wajib |
| FR-07 | Status rencana, menunggu keputusan, disetujui, ditolak, dibatalkan | Wajib |
| FR-08 | Deteksi bentrokan ruangan dan penanganan laporan izin ganda | Wajib |
| FR-09 | Konfirmasi masih direncanakan dan pembatalan otomatis 7 hari | Wajib |
| FR-10 | Satu proker opsional terhubung ke beberapa pemakaian ruangan | Wajib |
| FR-11 | Perubahan/penghapusan jadwal membatalkan pemakaian nonterminal terkait; pembatalan sisa kegiatan mempertahankan sesi terlaksana dan riwayatnya (D-49) | Wajib |
| FR-12 | Kontak WhatsApp PIC untuk koordinasi | Wajib; hanya PIC/BEM terverifikasi, sesuai persetujuan pemilik nomor (D-35) |
| FR-13 | Login akun Google resmi bersama, verifikasi kaitan akun dengan ormawa oleh BEM, pencabutan akses, dan pengelolaan BEM | Wajib |
| FR-14 | Riwayat perubahan dengan akun resmi pengubah dan waktu; tanpa klaim identitas individu pemakai akun bersama | Wajib |
| FR-15 | Arsip periode lama dan waktu pembaruan terakhir | Wajib |
| FR-16 | Timeline pengerjaan opsional, terpisah dari pelaksanaan; presisi tanggal/bulan, lintas periode, dan ketidakpastian terlihat (D-46) | Wajib |
| FR-17 | Revisi, penundaan tanpa tanggal pengganti, pembatalan sebagian, serta tinjauan dampak per sesi (D-47/D-49) | Wajib |
| FR-18 | BEM mencatat ruangan tidak tersedia berdasarkan informasi kampus; PIC melaporkan kendala miliknya dan menentukan penyesuaian; pengajuan pada waktu penutupan diblokir (D-48) | Wajib |

Informasi proker cukup nama, penyelenggara, dan waktu. Jangan mewajibkan target peserta, estimasi panitia, anggaran, deskripsi panjang, atau proposal.

## Kualitas produk

- Kalender publik dapat dibaca tanpa login; login diperlukan untuk pengelolaan.
- Usulan A-10: antarmuka mengutamakan HP, tetap nyaman di desktop, bisa digunakan dengan keyboard, dan memberi label status selain warna.
- Kegagalan penyimpanan tidak boleh tampil sebagai sukses. Pengguna dapat mencoba ulang tanpa membuat duplikasi.
- Perubahan sensitif menampilkan dampak sebelum konfirmasi, khususnya pembatalan seluruh pemakaian terkait proker.
- Otorisasi dan validasi data berlaku ketika API dipanggil langsung.
- Waktu yang ditampilkan harus konsisten dengan zona waktu kampus; zona tersebut belum dikonfirmasi.
- Batas paket gratis dan pemulihan data menjadi bagian operasi, bukan janji ketersediaan tanpa gangguan.

## Di luar lingkup

- Agenda rapat privat, topik rapat, peserta, absensi, dan konflik jadwal individu.
- Pelarangan proker bersamaan atau perhitungan kapasitas SDM otomatis.
- Persetujuan izin oleh kampus di dalam aplikasi, integrasi jadwal kuliah, atau SSO kampus.
- Unggah bukti izin, proposal, anggaran, serta laporan pertanggungjawaban.
- Chat internal, pesan WhatsApp otomatis, dan pengingat rencana kedaluwarsa.
- Aplikasi native, banyak kampus, serta rekomendasi jadwal berbasis AI.

## Uji coba dan hasil

Uji coba satu bulan mencakup seluruh ormawa. Sasaran pengguna: setiap ormawa punya PIC, mengisi rencana proker, serta rutin memperbarui pemakaian ruangan. PIC mengecek mingguan.

Catat jumlah ormawa terdaftar/aktif, kelengkapan kalender, bentrokan terdeteksi sebelum kegiatan, bentrokan nyata yang tetap terjadi, dan catatan kedaluwarsa. Tidak ada baseline atau persentase penurunan bentrokan yang sudah terbukti. BEM dapat merekap evaluasi manual; dashboard analitik bukan syarat versi awal.

## Syarat siap uji coba

Alur utama dan kriteria kritis di ACCEPTANCE_CRITERIA.md lulus, pengelola BEM ditunjuk, data dasar kampus diisi, privasi kontak sesuai D-35 diterapkan, serta pemulihan akses dan data dijelaskan kepada pengelola.
