# Rancangan timeline dan penyesuaian kegiatan Orka

Tanggal: 31 Oktober 2026. Status: rancangan acuan; prototipe statis diterapkan melalui D-50. Keputusan produk D-46–D-49; detail tampilan A-16. Dokumen ini melengkapi DESIGN.md dan UX_SPEC.md dengan palet muted teal D-43. Semua contoh di bawah fiktif.

Pembaruan D-50: pengguna kemudian meminta implementasi prototipe. Paket UI statis kini tersedia; hasil dan perbedaan cakupan dicatat di [TIMELINE_UI_REVIEW.md](TIMELINE_UI_REVIEW.md). Dokumen ini mempertahankan rancangan sebagai acuan, bukan bukti bahwa seluruh tahap sudah lulus.

## Tujuan dan batas

Pengunjung dapat membedakan lamanya pengerjaan proker dari waktu pelaksanaannya. PIC dapat memahami dampak revisi sebelum mengonfirmasi, termasuk ketika proposal belum disetujui, ruang tidak tersedia, atau sebagian sesi dibatalkan.

Paket tetap fase UI/UX D-39: fixture statis, navigasi, input sementara, dropdown custom, modal, dan animasi. Tidak ada API, Auth, persistence, perhitungan tanggal/bentrokan, pembatalan otomatis, atau transisi bisnis yang benar-benar dijalankan. Permintaan awal hanya merancang; instruksi berikutnya D-50 mengizinkan implementasi prototipe tersebut.

## Pisahkan empat informasi

| Informasi | Makna | Penyajian |
| --- | --- | --- |
| Pengerjaan | Rentang persiapan sampai akhir pengerjaan; opsional, tanpa tahapan tugas | Bar lembut pada Timeline; presisi tanggal/bulan disebut eksplisit |
| Pelaksanaan | Satu atau beberapa sesi kegiatan; tanggal pasti, bulan tentatif, atau ditunda tanpa pengganti | Kalender/Agenda dan daftar sesi di detail proker |
| Izin ruangan | Rencana, menunggu keputusan, disetujui, ditolak, dibatalkan | Badge status izin pada catatan pemakaian |
| Kondisi pemakaian | Ruangan tidak tersedia dan pemakaian perlu ditindaklanjuti | Penanda “Perlu penyesuaian”, berdampingan dengan status izin |

“Disetujui · Perlu penyesuaian” berarti izin pernah dilaporkan disetujui, tetapi pemakaian saat ini terkendala. UI tidak menyatakan ruangan dapat dipakai. Membuka kembali ruangan tidak otomatis membuktikan izin berlaku ulang.

## Peta layar

Kalender Proker memakai pilihan tampilan **Ringkasan / Timeline / Kalender** dalam konteks navigasi yang sama. Periode dan filter ormawa dipertahankan saat berpindah. Pilihan ini usulan tata letak, bukan tiga fitur kalender terpisah.

### Ringkasan tahunan

- Tiap kartu bulan memisahkan “Dalam pengerjaan” dan “Ada pelaksanaan”. Masing-masing menghitung proker unik; keduanya bisa memuat proker yang sama dan tidak dijumlahkan menjadi total.
- “Ada pelaksanaan” mencakup sesi pasti dan bulan tentatif yang masih aktif. Sesi ditunda tanpa bulan pengganti tidak ditempatkan pada bulan lama.
- Tampilkan “N proker belum mengisi timeline” pada tingkat periode/filter. Proker dengan akhir belum pasti mendapat keterangan terpisah; jangan menghitungnya seolah memiliki akhir yang diketahui.
- Logo bertumpuk mengikuti D-44. Usulan: susunan logo menunjukkan gabungan ormawa pada dua indikator bulan, dengan nama lengkap melalui tombol daftar aksesibel. Detail bulan membedakan sumber pengerjaan/pelaksanaan.
- Kepadatan hanya berupa angka dan daftar kegiatan. Tidak ada batas jumlah acara atau klaim ketersediaan SDM.

### Timeline pengerjaan

Desktop: satu baris per proker, kolom kiri berisi logo, nama, dan ormawa pengelola; kolom kanan berisi bulan dalam periode terpilih. Kolom identitas tetap terlihat saat area waktu digulir. Header bulan konsisten dengan periode akademik.

- Bar pengerjaan memakai warna ormawa yang dilembutkan; tanggal pelaksanaan ditandai simbol/badge berbeda dengan teks aksesibel. Kolaborasi tetap satu baris dengan seluruh penyelenggara.
- Rentang hanya-bulan memakai gaya arsiran/garis putus-putus dan label “Perkiraan bulan”; jangan menggambar tanggal pasti.
- Rentang lintas periode dipotong pada viewport dengan penanda lanjut. Detail tetap menunjukkan rentang lengkap dan satu identitas proker.
- Akhir belum pasti memakai ujung terbuka dan label “Akhir belum pasti”. Bagian masa depan yang belum diketahui tidak diisi sebagai rentang pasti atau dihitung aktif di semua bulan. Rumus hitungan untuk rentang terbuka masih Q-10.
- Proker tanpa timeline berada di bagian “Timeline belum diisi”; jangan membuat bar dari tanggal pelaksanaannya.
- Klik bar/nama membuka detail proker. Tidak ada drag untuk mengubah tanggal.

HP: default daftar proker dengan rentang tertulis, status, dan sesi berikutnya jika diketahui. Timeline horizontal opsional, bukan satu-satunya cara membaca. Tidak mengecilkan 12 bulan menjadi teks yang sulit dibaca.

### Kalender pelaksanaan

Pertahankan kalender detail D-44: bar hanya pada tanggal pelaksanaan yang tercatat, warna berdasarkan ormawa pengelola utama, satu blok untuk kolaborasi, Agenda sebagai default HP. Rentang pengerjaan tidak menutupi grid pelaksanaan.

Bagian terpisah “Tanggal belum ditentukan” memuat bulan tentatif. Bagian “Ditunda · tanggal pengganti belum ditentukan” dapat dibuka dari ringkasan periode/daftar proker; jangan memasukkannya ke tanggal lama sebagai acara aktif. Tanggal lama tersedia pada riwayat, tidak hilang.

### Detail proker

Urutan isi: nama dan penyelenggara → ringkasan status → Pengerjaan → Pelaksanaan → Pemakaian ruangan → Riwayat ringkas yang diizinkan. Publik hanya melihat informasi operasional yang boleh dipublikasikan, bukan audit mentah, kontak privat, atau alasan internal.

- Pengerjaan: awal, akhir/presisi, atau “Timeline belum diisi” / “Akhir belum pasti”.
- Pelaksanaan: daftar sesi dengan waktu, status, dan pemakaian terkait. Sesi terlaksana, ditunda, dibatalkan, serta sesi mendatang tetap dibedakan.
- “Selesai sebagian—sisa dibatalkan” adalah ringkasan hasil yang dipilih berdasarkan catatan sesi, bukan berarti proker berjalan normal sampai akhir.
- PIC pengelola utama mendapatkan “Revisi jadwal” dan “Batalkan sesi/sisa kegiatan”. Pemakaian milik kolaborator tetap mengikuti hak editnya; kewenangan khusus pembatalan terkait jadwal tidak membuka edit umum lintas ormawa.

## Modal revisi jadwal

Gunakan satu dialog bertahap agar konteks tidak hilang. Desktop maksimal sekitar 720 px; HP panel memenuhi area yang tersedia, isi bisa digulir dan tombol tetap terjangkau. Gunakan komponen dialog/dropdown yang sudah ada. Semua ukuran detail masih usulan A-16.

1. **Pilih perubahan.** Ubah pengerjaan saja, revisi pelaksanaan, tunda tanpa tanggal pengganti, atau batalkan sesi/sisa kegiatan. Tampilkan sesi yang sudah terlaksana sebagai riwayat yang tidak ikut dipilih untuk pembatalan sisa.
2. **Isi rencana.** Tampilkan nilai lama dan baru. Awal pengerjaan yang sudah berjalan dipertahankan saat penundaan; koreksi kesalahan input merupakan tindakan koreksi tersendiri, bukan pergeseran otomatis. Rentang pengerjaan tetap opsional. Jika diisi, pelaksanaan harus tercakup dengan memperhatikan presisinya.
3. **Tinjau dampak.** Kelompokkan “Tetap”, “Berubah”, “Dibatalkan”, dan “Perlu dicatat ulang”. Cantumkan sesi, ruang, waktu, status izin, dan ormawa pencatat. Perubahan pengerjaan saja menyebut tidak ada pemakaian dibatalkan. Tanggal pelaksanaan di luar timeline meminta koreksi eksplisit; jangan memperpanjang diam-diam.
4. **Konfirmasi.** Label sesuai tindakan, misalnya “Konfirmasi revisi” atau “Batalkan 2 pemakaian”. Kembali mempertahankan input sementara. Jika versi data berubah kelak, tampilkan dampak terbaru dan minta konfirmasi ulang; prototipe hanya menampilkan skenario statisnya.

Animasi mengikuti token yang ada: pressed segera, transisi ringan 120–200 ms, fokus terlihat, Escape, pengembalian fokus, dan reduced motion. Formulir tidak tertutup oleh klik backdrop. Hindari modal bertumpuk.

## Ruangan tidak tersedia

### BEM mencatat

BEM memilih ruang, rentang pasti, dan alasan operasional singkat berdasarkan informasi kampus. Sebelum konfirmasi, tampilkan pemakaian terdampak termasuk lintas ormawa. Ini pencatatan informasi kampus, bukan BEM memberikan atau mencabut izin kampus.

Pemakaian yang beririsan wajib ditandai “Perlu penyesuaian”; pengajuan/pemindahan/persetujuan ke waktu penutupan tidak boleh lolos. Penutupan tidak otomatis mengubah sesi proker atau membatalkan semua izin. Detail transaksi dan pembukaan kembali masih perlu dituntaskan sebelum fase data (Q-11).

### PIC menindaklanjuti

Daftar kelola menonjolkan pemakaian “Perlu penyesuaian”. PIC dapat melaporkan kendala miliknya tanpa membuat penutupan global, lalu memilih:

| Pilihan | Dampak |
| --- | --- |
| Ganti ruangan, waktu tetap | Pelaksanaan tetap; buat catatan pengganti dengan izin terpisah, simpan hubungan dan riwayat lama |
| Geser pelaksanaan | Pilih sesi yang direvisi; batalkan pemakaian terkait sesi yang berubah sesuai BR-22 |
| Tunda tanpa tanggal baru | Sesi aktif berlabel ditunda; tanggal lama masuk riwayat; batalkan pemakaian lama dan lepaskan slot |
| Batalkan sesi/sisa | Pertahankan sesi terlaksana; batalkan yang dipilih beserta pemakaian nonterminal terkait |

Semua pemakaian terdampak langsung tetap wajib ditandai. PIC dapat memperluas revisi ke sesi lain milik proker yang dikelolanya, tetapi tidak mengubah sesi itu tanpa konfirmasi. Sesi yang tidak dipilih tetap utuh. Bila PIC tidak memiliki kewenangan mengubah proker terkait, arahkan koordinasi dengan pengelola utama; jangan memperluas hak akses.

Ruangan dibuka kembali: tampilkan kebutuhan memastikan ulang izin. Catatan yang sudah dibatalkan/diganti tidak dipulihkan otomatis. Status izin pengganti tidak menyalin approved dari catatan lama.

## Skenario review fiktif

| ID | Skenario | Hal yang dinilai |
| --- | --- | --- |
| TL-S01 | Pengabdian Contoh: pengerjaan 12 Juni–12 Oktober; pelaksanaan mundur ke Desember karena proposal belum disetujui | Awal tetap; akhir direvisi eksplisit; dampak izin terlihat |
| TL-S02 | Pengabdian Contoh ditunda tanpa tanggal baru | Aktif dengan ketidakpastian; tanggal lama bukan acara aktif; slot lama dilepas |
| TL-S03 | Tiga sesi; hanya sesi kedua terkena penutupan aula, PIC ikut menggeser sesi ketiga | Terdampak wajib dibedakan dari perluasan pilihan PIC |
| TL-S04 | Ganti aula ke ruang lain pada jam sama | Jadwal tetap; izin pengganti baru; riwayat lama tersedia |
| TL-S05 | Aula dibuka lebih cepat setelah sebagian pemakaian dibatalkan | Tidak memulihkan catatan otomatis; konfirmasi izin ulang |
| TL-S06 | Dua sesi terlaksana, dua sesi berikutnya batal | Hasil lama tetap; ringkasan selesai sebagian |
| TL-S07 | Lima proker bersamaan dengan ruangan berbeda | Informasi kepadatan, tanpa blok kapasitas SDM |
| TL-S08 | Kolaborasi, lintas periode, presisi bulan, timeline kosong, akhir belum pasti | Tidak menggandakan proker atau mengarang ketepatan tanggal |
| TL-S09 | Perubahan pengerjaan saja dan konflik versi saat revisi | Tidak membatalkan izin; contoh dampak terbaru sebelum konfirmasi ulang |

## Urutan paket implementasi UI yang diusulkan

1. Ringkasan dua indikator, tampilan Timeline desktop/daftar HP, detail proker, dan skenario ketidakpastian. Review dulu pemahaman pengerjaan vs pelaksanaan.
2. Modal revisi dengan contoh dampak statis, penundaan, pembatalan sebagian, dan riwayat. Tidak menambahkan mesin aturan bisnis lokal.
3. Tampilan BEM untuk ruangan tidak tersedia dan tindak lanjut PIC, memakai skenario statis serta hasil keputusan Q-11 jika diperlukan.
4. Review keyboard, fokus, custom dropdown, 360/768/1280 px, zoom 200%, reduced motion, kontras, nama panjang, serta overflow tanggal/bulan.

Paket UI tidak memerlukan jawaban Q konfigurasi kampus. Q-10/Q-11 membatasi klaim logika dan integrasi; contoh visual yang eksplisit masih dapat dirancang. AC dan UX-T pada ACCEPTANCE_CRITERIA.md menjadi daftar review. Tidak ada fitur pengingat, unggah proposal, chat, atau tracking tugas/individu yang ditambahkan.
