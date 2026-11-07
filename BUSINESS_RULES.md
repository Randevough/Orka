# Aturan bisnis

Dokumen ini memakai identifier BR agar implementasi dan pengujian dapat menautkan aturan yang sama. D/A/Q merujuk ke daftar keputusan.

## Kalender proker

- **BR-01:** Periode utama adalah tahun akademik 12 bulan dengan bulan awal diatur BEM.
- **BR-02:** Proker boleh memiliki jadwal tentatif dengan ketelitian bulan; jangan mengarang tanggal 1 untuk tampilan seolah tanggal sudah pasti.
- **BR-03:** Satu proker memiliki beberapa jadwal kegiatan. Kalender menempatkannya pada bulan dengan kegiatan yang tercatat.
- **BR-04:** D-46: ringkasan memisahkan jumlah proker unik “Dalam pengerjaan” dan “Ada pelaksanaan” per bulan; keduanya tidak dijumlahkan menjadi total. Banyak sesi pada bulan sama tetap satu proker. Pelaksanaan yang dibatalkan/ditunda tanpa pengganti tidak dihitung aktif pada bulan lama; riwayat tetap ada. Timeline kosong dihitung terpisah, bukan diasumsikan nol kegiatan. Rentang akhir belum pasti mengikuti Q-10.
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
- **BR-22:** Jika satu jadwal proker diubah atau dihapus, hanya pemakaian nonterminal terkait jadwal tersebut yang dibatalkan otomatis, termasuk approved (D-33). Pembatalan seluruh proker sebelum pelaksanaan membatalkan seluruh pemakaian nonterminal terkait. Jika sebagian sesi sudah terlaksana, pembatalan sisa mempertahankan sesi dan catatan historis yang terlaksana; hanya sesi tersisa yang dibatalkan beserta pemakaian nonterminal terkait (D-49). Pengguna melihat daftar dampak sebelum menyimpan; PIC mengajukan ulang jika masih memerlukan ruangan.
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

## Timeline pengerjaan dan perubahan pelaksanaan (D-46–D-49)

- **BR-32:** Pengerjaan mencakup persiapan sampai akhir pengerjaan, terpisah dari satu atau beberapa sesi pelaksanaan. Rentang opsional, boleh presisi bulan atau tanggal, tanpa fase/tugas/milestone. Timeline kosong tidak diisi otomatis dari sesi pelaksanaan.
- **BR-33:** Jika rentang pengerjaan diisi, seluruh pelaksanaan aktif yang diketahui harus tercakup sesuai presisinya. Pemindahan pelaksanaan ke luar rentang meminta koreksi eksplisit sebelum menyimpan; jangan memperpanjang otomatis. Perubahan pengerjaan saja tidak memicu pembatalan ruangan BR-22.
- **BR-34:** Pengerjaan boleh lintas periode akademik dengan satu identitas proker dan rentang utuh. Tampilan terpilih hanya memotong rentang dengan penanda lanjut. Kebijakan koreksi arsip dan pelaksanaan lintas periode tetap Q-06.
- **BR-35:** Proposal belum disetujui dapat ditangani dengan revisi proker yang sama dan tetap aktif. Awal pengerjaan yang sudah berjalan dipertahankan; akhir disesuaikan eksplisit. Jika proposal akhirnya ditolak, PIC memilih revisi atau pembatalan. Orka tidak menambah proses persetujuan proposal.
- **BR-36:** Penundaan tanpa tanggal pengganti mempertahankan proker aktif; sesi berlabel ditunda, tanggal lama masuk riwayat dan tidak tampil sebagai pelaksanaan aktif. Awal pengerjaan tetap; akhir boleh belum pasti. Pemakaian nonterminal pada jadwal lama dibatalkan dan slot dilepas setelah penundaan dikonfirmasi. Pengganti memakai catatan izin baru.
- **BR-37:** Sesi yang sudah terlaksana tidak dibatalkan sebagai bagian pembatalan sisa. Ringkasan proker menyatakan “Selesai sebagian—sisa dibatalkan”. Penetapan terlaksana tidak disimpulkan hanya dari lewatnya tanggal; mekanisme pencatatannya masih Q-12.

## Ruangan tidak tersedia dan penyesuaian (D-48)

- **BR-38:** Pengelola BEM mencatat ruangan tidak tersedia berdasarkan informasi kampus. PIC melaporkan kendala pemakaian miliknya tanpa kewenangan membuat penutupan global. BEM tetap bukan pemberi izin kampus.
- **BR-39:** Pemakaian yang beririsan dengan penutupan wajib ditandai “Perlu penyesuaian”; penanda ini terpisah dari status izin. Penutupan memblokir pengajuan/pemindahan/persetujuan pada ruang dan waktu tersebut tanpa otomatis membatalkan proker atau seluruh pemakaian. Detail rentang, pencabutan, dan izin ulang dituntaskan melalui Q-11 sebelum integrasi.
- **BR-40:** PIC menentukan ganti ruangan, geser jadwal, tunda, atau batal sesuai kasus. Pemakaian langsung terdampak tidak boleh diabaikan; PIC pengelola boleh memperluas revisi ke sesi lain dengan konfirmasi eksplisit. Kewenangan milik sendiri dan pengelola utama tetap berlaku.
- **BR-41:** Pindah ruangan pada waktu pelaksanaan yang sama tidak mengubah sesi proker. Catatan pengganti menyimpan hubungan ke catatan lama dan memerlukan izin tersendiri; approved tidak disalin. Riwayat lama dipertahankan. Retensi slot lama mengikuti BR-21, tetapi penutupan tetap menghalangi penggunaan ruang tersebut; penundaan/ubah jadwal mengikuti BR-22/36.
- **BR-42:** Ketika ruangan dibuka kembali, PIC memastikan ulang izin. Pemakaian yang sudah dibatalkan atau diganti tidak dipulihkan otomatis. Kepadatan lintas proker hanya diinformasikan; tidak ada larangan atau persetujuan BEM tambahan hanya karena proker berbarengan.
