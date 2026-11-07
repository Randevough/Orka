# Hak akses dan privasi

Status: matriks berikut menggabungkan keputusan pengguna dan rancangan A-08. Detail yang belum disepakati tercatat sebagai Q.

## Prinsip

Mahasiswa dapat membaca kalender tanpa akun. Pengelolaan ormawa wajib memakai akun Google resmi bersama, dengan kaitan ke satu ormawa yang diverifikasi BEM (D-37). Akun pribadi dan akun belum diverifikasi tidak mendapat hak pengelolaan. Membership di dokumen ini berarti kewenangan akun resmi atas ormawa, bukan identitas pengurus individual. Identitas BEM sebagai ormawa tidak otomatis memberikan hak administrator platform.

## Matriks akses

| Tindakan | Publik | Login belum diverifikasi | PIC aktif | Pengelola BEM |
| --- | --- | --- | --- | --- |
| Baca kalender proker dan pemakaian publik | Ya | Ya | Ya | Ya |
| Tambah/edit proker | Tidak | Tidak | Hanya ormawa pengelola utama | Tidak otomatis; gunakan hak PIC jika ditunjuk |
| Tambah/edit pemakaian ruangan | Tidak | Tidak | Hanya ormawa pemakai | Tidak otomatis sebagai pemberi izin |
| Lihat kontak PIC untuk koordinasi | Tidak | Tidak | Ya, sesuai persetujuan kontak | Ya, sesuai persetujuan kontak |
| Kelola ormawa/ruangan/periode | Tidak | Tidak | Tidak | Ya |
| Catat/koreksi ruangan tidak tersedia berdasarkan informasi kampus | Tidak | Tidak | Tidak | Ya; detail Q-11 |
| Laporkan kendala dan tindak lanjuti pemakaian | Tidak | Tidak | Milik sendiri; revisi proker hanya pengelola utama | Catat penutupan dan bantu koordinasi, bukan pemberi izin |
| Verifikasi/cabut PIC | Tidak | Tidak | Tidak | Ya |
| Lihat audit operasional | Tidak | Tidak | Data yang menjadi kewenangannya | Seluruh data operasional yang perlu ditinjau |
| Buka laporan bentrokan izin | Tidak | Tidak | Pemakaian milik sendiri | Bantu meninjau |
| Selesaikan peninjauan sengketa | Tidak | Tidak | Koordinasi dan koreksi milik sendiri | Catat hasil; hak koreksi langsung menunggu Q-05 |
| Ubah/hapus audit | Tidak | Tidak | Tidak | Tidak |

Perubahan/penghapusan jadwal membatalkan hanya pemakaian terkait jadwal itu lewat fungsi khusus, termasuk pemakaian penyelenggara kolaborasi lain. Pembatalan seluruh proker sebelum pelaksanaan membatalkan seluruh pemakaian nonterminal terkait; pembatalan sisa mempertahankan sesi terlaksana dan riwayatnya (D-49). Fungsi wajib memeriksa kepemilikan proker dan mencatat dampak setiap pemakaian. Hak ini tidak memberi PIC akses edit umum ke pemakaian ormawa lain. Penutupan BEM menandai semua pemakaian terdampak melalui jalur khusus; PIC tidak dapat menghapus dampak wajib atau membuka kembali ruang secara global (D-48).

## Pelaksanaan otorisasi

- Aktifkan RLS untuk tabel yang terpapar API. Abaikan actor_id/owner yang dikirim browser jika tidak sesuai akun dan membership.
- Hak istimewa disimpan di tabel yang hanya dapat dimutasi melalui jalur pengelola terkontrol. Pengguna tidak dapat menaikkan perannya lewat profile atau metadata yang bisa diedit sendiri.
- Periksa membership aktif di database pada setiap mutasi, bukan hanya ketika login atau dari peran lama dalam token.
- Batasi DML langsung pada room_usages, program_occurrences, audit, serta data administratif yang memerlukan transaksi lintas tabel.
- Fungsi transaksi harus memeriksa actor, membership, perubahan yang diizinkan, versi, dan periode arsip. SECURITY DEFINER jika diperlukan memakai search_path aman, nama objek berkualifikasi, serta GRANT minimum; jangan membuka semua fungsi untuk anon.
- Perubahan kontak atau profil tidak boleh menjadi cara menyentuh tenggat pemakaian ruangan.
- Jalur Cron terpisah dari permintaan browser; hanya menjalankan pembatalan kedaluwarsa dan audit yang diizinkan.

## Privasi

- Tidak ada isi rapat, nama peserta, absensi, atau alasan privat kegiatan.
- Publik tidak melihat email autentikasi, identitas personal pengubah, metadata akun, dan riwayat audit lengkap.
- Audit internal mencatat akun resmi pengubah dan ormawanya; tidak dapat memastikan pengurus individual yang memakai akun bersama. Email login tidak wajib ditayangkan ke pengunjung.
- WhatsApp memakai kontak yang memang bersedia dipakai untuk koordinasi. Nomor pribadi PIC belum otomatis boleh dipublikasikan ke internet.
- D-35: database/API membatasi kontak ke PIC/BEM terverifikasi dengan persetujuan pemilik nomor. Publik dan akun belum diverifikasi tidak dapat membaca nomor maupun tautan WhatsApp yang memuat nomor.
- Tidak ada unggah bukti izin; jangan membuat bucket untuk dokumen izin.

## Pengujian minimum

Gunakan anon, akun belum diverifikasi, PIC A, PIC B, PIC kolaborator, PIC yang aksesnya dicabut, dan pengelola BEM. Uji API langsung dengan setiap peran. Pastikan PIC A gagal mengubah proker milik B meski UUID-nya diketahui. Pastikan pencabutan akses efektif tanpa menunggu logout.
