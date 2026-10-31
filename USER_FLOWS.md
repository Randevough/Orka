# Alur pengguna

Setiap alur merujuk aturan di BUSINESS_RULES.md dan fitur di PRD.md.

## UF-01: mahasiswa membaca kepadatan proker

1. Buka kalender publik tanpa login.
2. Pilih tahun akademik dan, jika perlu, filter ormawa.
3. Lihat jumlah proker aktif per bulan.
4. Buka bulan untuk melihat nama proker, penyelenggara, dan waktu yang diketahui.
5. Buka detail proker untuk seluruh rangkaian kegiatan serta pemakaian ruangan terkait yang boleh dibaca publik.

Bedakan “Tidak ada proker tercatat” dari jaminan tidak ada kegiatan kampus. Jika data gagal dimuat, tampilkan kesalahan, bukan kalender kosong.

## UF-02: PIC memasukkan proker tentatif

1. Login memakai akun Google resmi bersama yang kaitan ormawanya telah diverifikasi BEM.
2. Ormawa pengelola ditentukan dari kewenangan akun resmi; browser tidak boleh memilih ormawa lain untuk mengambil hak edit.
3. Isi nama proker, penyelenggara, dan minimal satu jadwal kegiatan.
4. Pilih bulan saja jika tanggal belum pasti. Tidak perlu target peserta atau estimasi SDM.
5. Simpan; kalender publik langsung diperbarui dan audit tercatat.
6. Saat waktu pasti diketahui, ubah jadwal. Jika sudah terhubung ruangan, masuk UF-06 sebelum menyimpan.

## UF-03: mencatat pemakaian dan hasil izin

1. PIC membuka kalender ruangan. Slot tanpa catatan memakai label yang tidak menjamin ketersediaan.
2. Pilih ruangan dan seluruh waktu pemakaian, termasuk persiapan/beres-beres.
3. Isi ormawa pemakai, kontak koordinasi, dan kaitan opsional ke proker beserta jadwalnya.
4. Sistem memeriksa ulang konflik ketika menyimpan.
5. Jika hanya bertabrakan dengan planned/pending, tetap boleh disimpan dengan peringatan dan kontak terkait.
6. Jika bertabrakan dengan approved, tolak penyimpanan dan tawarkan perubahan ruang/waktu.
7. Rencana tampil publik. PIC mengurus izin melalui chat atau surat di luar platform.
8. PIC memperbarui ke pending, approved, atau rejected sesuai perkembangan. Tidak ada unggah bukti.
9. Transisi ke approved memeriksa ulang konflik dan menghasilkan audit.

## UF-04: dua laporan izin yang bertentangan

Contoh berikut fiktif: A dan B sudah mencatat rencana aula Selasa 10.00 sampai 12.00. A menandai approved. B kemudian melaporkan juga memiliki izin.

1. B mencoba mengubah status rencana yang sudah ada ke approved.
2. Database menolak persetujuan kedua dan menyimpan laporan peninjauan.
3. B melihat status lama dan penanda “Perlu klarifikasi izin”, bukan approved palsu.
4. PIC berkoordinasi lewat WhatsApp; BEM membantu mengecek ke pihak kampus.
5. Setelah hasil jelas, PIC yang terkait membatalkan atau memperbaiki pemakaiannya. BEM mencatat hasil peninjauan.
6. Pengajuan yang sah dapat ditandai approved setelah slot tidak lagi bertentangan.

Skenario ini tidak melarang A dan B memakai ruangan berbeda atau jam yang tidak bertumpang tindih.

## UF-05: memindahkan pemakaian ruangan secara mandiri

1. PIC membuka pemakaian approved dan memilih buat rencana pengganti.
2. Isi ruangan atau waktu baru. Catatan pengganti menyimpan hubungan ke catatan lama.
3. Catatan lama tetap aktif; slot baru diperiksa sesuai aturan biasa.
4. PIC mengurus izin slot baru di luar aplikasi.
5. Setelah perpindahan pasti, PIC memperbarui slot baru dan membatalkan slot lama.

Untuk interval pengganti yang masih bertumpang tindih pada ruangan sama dengan slot approved lama, jangan melewati constraint. Penanganan perpindahan parsial menunggu Q-04; versi awal dapat meminta PIC mengurus pembatalan lama lebih dahulu dengan penjelasan dampak.

## UF-06: memindahkan atau membatalkan proker

1. PIC ormawa pengelola utama mengubah jadwal atau membatalkan proker.
2. Untuk perubahan/penghapusan jadwal, sistem menampilkan pemakaian terkait jadwal itu saja. Untuk pembatalan proker, tampilkan seluruh pemakaian nonterminal terkait. Daftar mencakup approved dan milik penyelenggara lain.
3. PIC melihat pesan bahwa izin di kampus tidak dibatalkan otomatis.
4. Setelah konfirmasi, perubahan proker, pembatalan pemakaian nonterminal terdampak, dan audit disimpan atomik.
5. Jika ada perubahan data bersamaan, batalkan penyimpanan, muat ulang dampak, dan minta konfirmasi lagi.
6. PIC mengurus koordinasi eksternal dan membuat pemakaian baru jika diperlukan.

Jangan menampilkan konfirmasi untuk edit nama yang tidak mengubah jadwal. Penambahan jadwal tidak membatalkan pemakaian jadwal lain (D-33).

## UF-07: rencana tetap berlaku atau kedaluwarsa

1. PIC melihat last_confirmed_at dan waktu kedaluwarsa di daftar kelola.
2. Sebelum 7 hari lewat, PIC dapat memperbarui rencana atau memilih “Masih direncanakan”.
3. Jika batas lewat, rencana efektif dibatalkan tanpa pengingat.
4. Cron mematerialisasi status dan audit; keterlambatan Cron tidak menjadikan rencana kedaluwarsa aktif kembali.
5. Untuk melanjutkan rencana yang sudah batal, buat catatan baru.

## UF-08: pergantian PIC

1. Pengurus lama dan baru menyerahterimakan akses akun Google resmi bersama serta pemulihannya di luar Orka. Jangan menulis password atau kode pemulihan di dokumen proyek.
2. Akhiri seluruh sesi Orka lama melalui prosedur terkontrol; pengurus baru masuk kembali dengan akun resmi yang sama. Pergantian password Google saja tidak menggantikan langkah ini.
3. Akun, kewenangan ormawa, dan arsip tetap sama. Audit mencatat akun resmi, tanpa klaim identitas pengurus individual.
4. Jika akun resmi harus diganti, BEM mencabut kaitan akun lama dan memverifikasi penggantinya dalam satu transaksi; maksimal satu akun pengelolaan aktif per ormawa. Kewenangan lama ditolak pada operasi berikutnya meski sesi masih aktif.
5. Prosedur pengakhiran sesi harus diuji sebelum pilot. Orka tidak dapat mencabut akses satu individu secara terpisah selama ia masih memiliki akses ke akun bersama.
