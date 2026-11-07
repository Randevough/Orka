# Operasi, pilot, dan serah terima

Dokumen ini menjelaskan kebutuhan operasional yang harus disiapkan. Akun, backup, Cron, dan deployment belum dibuat.

## Sebelum pilot

- Tetapkan penanggung jawab BEM, pengelola teknis, dan penerus pemulihan akun layanan. Jangan mengandalkan satu mahasiswa tanpa jalur serah terima.
- Siapkan daftar ormawa, PIC, ruangan, zona waktu, dan awal tahun akademik yang benar.
- Terapkan kontak WhatsApp hanya untuk PIC/BEM terverifikasi (D-35) dan catat persetujuan pemilik kontak.
- Jelaskan bahwa kalender tidak otomatis berisi jadwal kuliah/kegiatan non-ormawa dan status approved adalah laporan PIC.
- Jelaskan rencana belum disetujui batal setelah 7 hari tanpa pembaruan; tidak ada pengingat.
- Jelaskan perubahan/penghapusan jadwal hanya membatalkan pemakaian terkait jadwal itu; pembatalan sebelum pelaksanaan membatalkan seluruh pemakaian nonterminal terkait. Pembatalan sisa mempertahankan sesi terlaksana dan riwayatnya (D-49). Perubahan pengerjaan saja tidak membatalkan ruangan. Koordinasi izin tetap di luar aplikasi.
- Jelaskan peran BEM mencatat ruangan tidak tersedia berdasarkan informasi kampus dan PIC menindaklanjuti pemakaian perlu penyesuaian. Pembukaan kembali tidak otomatis memulihkan izin/catatan batal; prosedur rinci menunggu Q-11 sebelum pilot fitur ini.
- Tetapkan jalur laporan kesalahan atau sengketa di luar aplikasi; kontaknya menunggu penunjukan BEM.

## Pengelolaan rutin

PIC mengecek agenda mingguan dan memperbarui perkembangan izin. BEM meninjau akses, catatan yang dipersoalkan, serta data dasar ruangan/periode. Pengelola teknis mengecek keberhasilan Cron, penggunaan kuota, dan kegagalan aplikasi.

Usulan proses A-12: tinjau kuota dan hasil backup mingguan selama pilot. Ini pekerjaan pengelola, bukan fitur notifikasi aplikasi atau otomasi yang sudah dibuat.

## Pencadangan dan pemulihan

Jangan menyebut audit sebagai backup. Tentukan mekanisme ekspor/backup sesuai fasilitas paket Supabase yang tersedia saat peluncuran. Verifikasi apa yang tercakup, lokasi penyimpanan, siapa yang dapat mengambil, dan apakah pemulihan Auth membutuhkan langkah tersendiri.

Usulan awal: ekspor sebelum migration atau perubahan data massal serta backup berkala selama pilot. Simpan salinan di tempat terbatas yang bisa diteruskan pengelola; jangan menyimpan dump berisi data asli ke repositori publik.

Sebelum pilot, pulihkan salinan di lingkungan pengujian dan periksa proker, jadwal, pemakaian, membership, audit, serta akses akun. Catat waktu pemulihan yang benar-benar terukur; belum ada target pemulihan resmi yang disepakati.

## Bila Supabase dijeda atau bermasalah

1. UI menampilkan layanan data tidak tersedia; jangan menampilkan kalender kosong sebagai slot bebas.
2. PIC memakai jalur koordinasi kampus yang sudah ada untuk kebutuhan mendesak.
3. Pengelola memeriksa dashboard layanan dan memulihkan proyek sesuai prosedur penyedia.
4. Rekonsiliasi rencana kedaluwarsa dan konflik sebelum membuka kembali perubahan data jika diperlukan.
5. Jangan menghidupkan kembali rencana lama atau mengklaim Cron tetap berjalan selama jeda.

Tidak menjalankan ping palsu untuk mempertahankan paket gratis. Jika jeda tidak dapat diterima untuk layanan resmi, evaluasi kebutuhan anggaran.

## Pilot satu bulan

| Catatan | Cara memperoleh |
| --- | --- |
| Ormawa sudah punya PIC | Daftar membership terverifikasi dibanding daftar ormawa |
| Kalender proker terisi | PIC memastikan rencana periode sudah masuk |
| Pembaruan rutin | Waktu pembaruan dan konfirmasi pemakaian |
| Bentrokan ditemukan sebelum acara | Rekap kasus oleh BEM dan PIC |
| Bentrokan tetap terjadi | Catat penyebab: belum diinput, salah waktu, izin eksternal, atau aturan aplikasi |
| Pembatalan otomatis yang tidak diinginkan | Tinjau apakah kebijakan 7 hari sesuai proses kampus |

Belum ada baseline kuantitatif. Evaluasi tidak boleh mengklaim penurunan bentrokan tanpa data pembanding. BEM dapat memakai rekap manual; ekspor dashboard analitik tidak wajib dibuat untuk pilot.

## Pergantian pengurus dan pengembang

- Serahterimakan akses akun Google resmi bersama ormawa dan pemulihannya di luar Orka; perbarui kontak koordinasi. Akun dan data tetap sama selama akun resmi tidak diganti (D-37).
- Akhiri seluruh sesi Orka lama dengan prosedur terkontrol dan uji penolakan sesi lama sebelum pilot. Jangan menganggap pergantian password Google otomatis mengakhiri sesi Orka. Pengurus baru masuk kembali melalui akun resmi.
- Jika akun resmi diganti, BEM memverifikasi pengganti dan mencabut kaitan akun lama secara atomik; riwayat akun lama dipertahankan dalam audit.
- Serahkan akses repositori, Cloudflare, Supabase, pengaturan OAuth, serta lokasi backup lewat mekanisme resmi layanan.
- Perbarui pemulihan akun dan rahasia yang perlu diganti; jangan menyerahkan password bersama melalui dokumen proyek.
- Sertakan README, cara menjalankan lokal, migration, variabel lingkungan contoh tanpa secret, dan prosedur publikasi ketika implementasi sudah ada.
- Data periode lama tetap tersimpan dan dapat dibaca sebagai arsip sesuai kebijakan yang disepakati.
