# Aturan bisnis

Dokumen ini memakai identifier BR agar implementasi dan pengujian dapat menautkan aturan yang sama. D/A/Q merujuk ke daftar keputusan.

## Kalender proker

- **BR-01:** Periode utama adalah tahun akademik 12 bulan dengan bulan awal diatur BEM.
- **BR-02:** Proker boleh memiliki jadwal tentatif dengan ketelitian bulan; jangan mengarang tanggal 1 untuk tampilan seolah tanggal sudah pasti.
- **BR-03:** Satu proker memiliki beberapa jadwal kegiatan. Kalender menempatkannya pada bulan dengan kegiatan yang tercatat.
- **BR-04:** A-01 mengusulkan jumlah pada ringkasan sebagai jumlah proker unik per bulan. Banyak jadwal dari proker yang sama pada bulan itu dihitung satu. Proker dibatalkan dikeluarkan dari hitungan aktif, tetapi riwayat tetap tersedia.
- **BR-05:** Jadwal proker bersamaan tidak dilarang. Kepadatan adalah informasi, bukan klaim bentrokan SDM.
- **BR-06:** Semua penyelenggara kolaborasi tercantum, tetapi hanya PIC ormawa pengelola utama yang mengubah proker. Penyelenggara lain tidak otomatis memperoleh hak edit.
- **BR-07:** Perubahan oleh PIC langsung tampil dan menghasilkan audit. BEM tidak menjadi gerbang persetujuan proker.

## Ruangan dan interval waktu

- **BR-08:** Pemakaian membutuhkan ruangan serta waktu mulai dan selesai yang pasti. Waktu akhir harus sesudah waktu mulai. Persiapan dan beres-beres termasuk di dalam interval tersebut.
- **BR-09:** Bentrok hanya jika room_id sama dan interval bertumpang tindih. A-02: gunakan interval [mulai, selesai); 09.00 sampai 10.00 dan 10.00 sampai 11.00 tidak bertabrakan.
- **BR-10:** Rencana muncul sejak dibuat, dengan label belum diajukan. Urutan pencatatan tidak memberi prioritas izin.
- **BR-11:** Rencana/menunggu keputusan boleh bertabrakan dengan sesamanya, disertai peringatan dan jalur kontak PIC.
- **BR-12:** Pemakaian disetujui memblokir pembuatan atau pemindahan pemakaian lain pada slot yang bertabrakan. Arahkan pengguna memilih slot lain. Kegiatan pada hari sama dengan ruangan/jam berbeda tetap sah.
- **BR-13:** Dua pengajuan yang sudah tercatat dapat melaporkan izin bertentangan. Persetujuan kedua tidak boleh tersimpan sebagai disetujui. Simpan permintaan peninjauan beserta laporan PIC; BEM membantu klarifikasi melalui kampus. Status sebelumnya dipertahankan sampai penyelesaian, dengan penanda sengketa.
- **BR-14:** PIC melaporkan hasil izin tanpa unggah bukti. Setiap transisi merekam akun resmi pengubah dan waktu; akun bersama tidak mengidentifikasi individu pemakainya (D-37). BEM bukan pemberi izin resmi.
- **BR-15:** Tidak adanya catatan diberi label “Belum ada pemakaian tercatat”. Jangan menyebutnya jaminan ruangan tersedia.

## Status pemakaian

| Status tersimpan | Label | Makna |
| --- | --- | --- |
| planned | Rencana | Belum diajukan ke kampus |
| pending | Menunggu keputusan | PIC sudah mengajukan lewat jalur resmi |
| approved | Disetujui | PIC melaporkan telah mendapat izin |
| rejected | Ditolak | PIC melaporkan izin ditolak |
| cancelled | Dibatalkan | Dibatalkan pengguna/sistem; sebab disimpan |

Usulan A-03 untuk transisi normal:

| Dari | Ke | Syarat |
| --- | --- | --- |
| planned | pending | PIC menyatakan pengajuan sudah dilakukan |
| planned/pending | approved | PIC sudah punya izin; lulus pemeriksaan bentrokan |
| planned/pending | rejected | PIC melaporkan penolakan |
| planned/pending/approved | cancelled | PIC membatalkan atau aturan pembatalan terkait proker berlaku |
| planned/pending | cancelled | Sistem menemukan batas 7 hari telah lewat |

Rejected/cancelled adalah terminal dalam usulan awal. Untuk mencoba lagi, buat catatan baru dengan referensi catatan lama. Jangan memakai status selesai atau sengketa sebagai tambahan status izin; masa lalu ditentukan dari waktu, sengketa disimpan terpisah.

## Kedaluwarsa

- **BR-16:** planned/pending kedaluwarsa setelah 7 hari sejak pembaruan substantif atau konfirmasi “Masih direncanakan” oleh PIC. approved tidak kedaluwarsa.
- **BR-17:** Tidak ada pengingat hari kelima, email, atau WhatsApp otomatis. Formulir dan daftar kelola menjelaskan aturan 7 hari dan tanggal kedaluwarsa.
- **BR-18:** A-04: 7 hari berarti 168 jam dari last_confirmed_at. Pembacaan, kunjungan halaman, pekerjaan sistem, dan perubahan audit tidak memperpanjang masa tersebut.
- **BR-19:** Rencana yang telah melewati batas tidak diperlakukan sebagai rencana aktif meski pekerjaan terjadwal terlambat. Semua jalur baca dan perubahan harus menghormati expired_at. Pembatalan yang tersimpan tetap menyimpan alasan expired.
- **BR-20:** Konfirmasi setelah batas lewat tidak menghidupkan kembali catatan. PIC membuat rencana baru. Kalender proker tidak terkena aturan 7 hari.

## Perpindahan dan keterkaitan proker

- **BR-21:** Pemakaian approved yang dipindah secara mandiri dibuat sebagai rencana pengganti. Slot lama tetap tercatat sampai perpindahan pasti dan PIC membatalkannya. Persetujuan baru tidak otomatis berlaku untuk slot lama atau sebaliknya.
- **BR-22:** Jika satu jadwal proker diubah atau dihapus, hanya pemakaian nonterminal terkait jadwal tersebut yang dibatalkan otomatis, termasuk approved (D-33). Jika seluruh proker dibatalkan, seluruh pemakaian nonterminal terkait proker dibatalkan. Pengguna melihat daftar dampak sebelum menyimpan; PIC mengajukan ulang jika masih memerlukan ruangan.
- **BR-23:** BR-22 mengungguli BR-21 untuk tindakan mengubah jadwal proker. Jangan mempertahankan ruangan lama secara otomatis pada jalur tersebut.
- **BR-24:** Pembatalan dalam platform bukan pencabutan izin di kampus. Setelah tindakan, tampilkan instruksi mengabari jalur resmi kampus. Jangan menunggu konfirmasi eksternal sebelum menerapkan keputusan pembatalan platform yang sudah disepakati pengguna.
- **BR-25:** D-33: perubahan bulan, tanggal, jam, atau penghapusan jadwal memicu BR-22 hanya untuk pemakaian yang terkait jadwal itu. Penambahan jadwal tidak membatalkan pemakaian jadwal lain. Perubahan nama/penyelenggara saja tidak memicu pembatalan. Pemakaian terkait proker wajib menunjuk jadwal tertentu.
- **BR-26:** Pembatalan terkait proker, perubahan kalender, dan audit berjalan dalam satu transaksi. Kegagalan satu langkah membatalkan semua perubahan.

## Tata kelola

- **BR-27:** Satu akun Google resmi bersama per ormawa menjadi akun pengelolaan setelah diverifikasi BEM (D-37). Satu akun pengelolaan hanya mewakili satu ormawa. PIC merupakan penanggung jawab operasional, bukan akun individual dengan batas dua membership aktif.
- **BR-28:** Pencabutan kewenangan akun resmi berlaku pada operasi berikutnya meski sesi login masih aktif. Pergantian pengurus mempertahankan akun resmi dan data; akhiri sesi Orka lama sebagai bagian serah terima. Mengganti password Google saja tidak dianggap bukti sesi Orka sudah berakhir. Orka tidak dapat membedakan pengurus lama dan baru yang memakai akun sama.
- **BR-29:** PIC mengecek informasi mingguan; aplikasi menampilkan waktu pembaruan/konfirmasi terakhir. Pengecekan ini bukan pengingat otomatis.
- **BR-30:** Data periode lama tersedia sebagai arsip. A-06 mengusulkan arsip hanya-baca melalui UI normal dan koreksi terkontrol BEM jika diperlukan.
- **BR-31:** Tidak ada penghapusan permanen data operasional melalui UI MVP. Gunakan pembatalan, penonaktifan, atau arsip agar riwayat keputusan dapat ditelusuri. Ini usulan A-07.
