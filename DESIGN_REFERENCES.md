# Referensi dan pilihan arah visual Orka

Tanggal riset: 28 Oktober 2026. Status: catatan riset sebelum pemilihan acuan. Pengguna kemudian memilih Cal.com (D-38); panduan visual aktif ada di [DESIGN.md](DESIGN.md). Alternatif dan rekomendasi awal di bawah disimpan sebagai konteks, bukan arahan aktif. Belum ada aplikasi atau desain final yang dibuat.

Dokumen ini khusus Orka (D-32), berdasarkan PRD dan UX_SPEC. Panduan GitMastery mandiri dari percakapan sebelumnya merupakan dokumen untuk proyek lain; preferensi tersebut tidak otomatis berlaku pada Orka. Q-09 tetap terbuka.

## Kebutuhan yang menentukan bentuk desain

- Mahasiswa membuka kalender tanpa login; halaman awal langsung menyajikan kalender proker, bukan dashboard statistik atau landing page panjang.
- Ringkasan 12 bulan membantu membaca kepadatan tahun akademik. Detail bulan harus membedakan jadwal pasti dari rencana yang baru diketahui bulannya.
- PIC mengelola data lewat akun resmi ormawa. BEM memiliki alat kelola sesuai kewenangan, bukan peran pemberi izin kampus.
- Pemakaian ruangan perlu menunjukkan interval, status laporan PIC, waktu pembaruan, dan bentrokan dengan jelas.
- HP memakai daftar yang terbaca; grid waktu desktop tidak diperkecil begitu saja ke layar HP.

## Referensi yang ditinjau

Tinjauan visual langsung mencakup Luma Discover serta screenshot produk pada halaman pemasaran Notion Calendar dan Cal.com. Ini bukan audit aplikasi setelah login. Duolingo dipakai sebagai referensi prinsip bentuk dari artikel resminya. Deskripsi dan adaptasi di kolom terakhir merupakan penilaian desain untuk Orka.

| Referensi | Pola yang relevan | Adaptasi untuk Orka |
| --- | --- | --- |
| [Luma Discover](https://luma.com/discover) | Daftar kegiatan dengan judul jelas, metadata waktu, pengelompokan bagian, dan navigasi ringkas | Detail bulan memakai baris proker yang mudah dipindai; urutan informasi: waktu, nama proker, penyelenggara. Poster tidak wajib |
| [Notion Calendar](https://www.notion.com/product/calendar) | Screenshot kalender dengan garis ringan, label ringkas, bidang kegiatan berwarna lembut, dan pemisahan navigasi dari isi | Ambil hierarki informasi dan ketenangan visual. Ringkasan Orka tetap 12 bulan, tidak wajib meniru kalender minggu |
| [Cal.com](https://cal.com/) | Contoh panel penjadwalan berbingkai, tanggal terpilih yang tegas, serta pemisahan informasi dan kalender | Filter tanggal/ruangan jelas, ringkasan waktu dekat tindakan simpan. Tidak mengadopsi klaim slot tersedia otomatis |
| [Duolingo: bahasa bentuk](https://blog.duolingo.com/shape-language-duolingos-art-style/) | Artikel resmi membahas bentuk membulat, warna cerah, dan ilustrasi yang ramah | Sedikit karakter pada tombol dan empty state; formulir, status, dan dialog dampak tetap lugas |

Tidak ada rencana mengintegrasikan layanan referensi. Fitur tiket, RSVP, unggah poster, sinkronisasi kalender, pengingat, konferensi video, leaderboard, XP, atau streak tidak ditambahkan melalui pemilihan gaya visual.

## Tiga pilihan arah

Seluruh HEX di bawah merupakan usulan palet Orka, bukan token hasil salinan situs referensi. Pasangan kontras perlu diukur pada desain aktual.

| Pilihan | Bentuk dan suasana | Palet awal | Pertimbangan |
| --- | --- | --- | --- |
| A — Terang dan ramah (rekomendasi) | Kanvas putih hangat, kartu putih membulat, aksen ungu, filter berbentuk pil, tombol berisi dengan kedalaman tipis | Latar `#F7F7FB`, surface `#FFFFFF`, teks `#202134`, utama `#6D4AFF`, aksen `#DDF5BB` | Cocok untuk kalender publik dan formulir PIC; karakter kampus terasa lewat aksen, tanpa dekorasi berlebihan |
| B — Gelap dan ekspresif | Kanvas ungu gelap, CTA lime, panel berbingkai, judul lebih tebal, bayangan tombol tegas | Latar `#101121`, surface `#1C1D35`, teks `#F5F3FF`, utama `#B9F34A`, aksen `#A995FF` | Paling dekat dengan karakter arcade; membutuhkan disiplin agar status dan CTA tidak bersaing |
| C — Papan kegiatan pastel | Kanvas krem, kartu seperti catatan dengan label bulan, garis tegas secukupnya, aksen coral dan lavender | Latar `#FAF7F0`, surface `#FFFFFF`, teks `#292733`, utama `#6546C8`, aksen `#FFB9A9` | Memberi kesan komunitas mahasiswa; perlu menjaga kerapian agar tidak terasa seperti kolase poster |

Rekomendasi A di sini merupakan usulan awal penyusun. Pengguna kemudian memilih acuan Cal.com; aksen ungu/hijau dan kedalaman tombol pada A tidak otomatis dibawa ke desain aktif. Ikuti DESIGN.md untuk rincian terkini. Jangan membangun tiga tema sekaligus hanya karena tiga alternatif ditampilkan di sini.

## Bentuk konkret untuk arah A

**Navigasi:** logo/nama Orka di kiri, Kalender proker dan Pemakaian ruangan sebagai dua tujuan publik utama, Masuk di kanan. Pada HP, nama kedua tujuan tetap terbaca. Sesudah login, tambahkan akses Kelola ormawa dan Kelola platform sesuai kewenangan.

**Kalender tahunan:** judul halaman pendek, pemilih tahun akademik, filter ormawa, lalu 12 kartu bulan. Desktop dapat memakai empat kolom; tablet dua kolom; HP satu kolom. Kartu berisi nama bulan dan jumlah proker sesuai definisi hitungan yang disepakati (A-01 belum final). Hindari kalender mini penuh angka tanggal di setiap kartu karena fokus awalnya kepadatan bulanan.

**Detail bulan:** judul bulan dan filter tetap terlihat; daftar proker menyebut tanggal/jam jika pasti. Rencana yang baru diketahui bulannya ditempatkan dalam bagian berlabel “Tanggal belum ditentukan”. Kolaborasi tetap satu proker dengan seluruh penyelenggara tercantum. Tidak perlu poster atau deskripsi panjang.

**Pemakaian ruangan:** tanggal/rentang dan ruangan berada di atas hasil. Daftar dikelompokkan secara jelas dengan jam mulai–selesai, ruangan, ormawa, badge status, dan pembaruan terakhir. Grid waktu dapat dipakai di desktop bila membantu, dengan daftar sebagai bentuk utama HP. Ruang tanpa catatan diberi teks “Belum ada pemakaian tercatat”, bukan “Tersedia”.

**Formulir:** satu kolom dengan lebar nyaman sekitar 640–720 px, label terlihat, bantuan dekat field, dan ringkasan kesalahan bila perlu. Formulir ruangan menjelaskan bahwa rentang termasuk persiapan/beres-beres serta aturan batal otomatis 7 hari. Kaitan proker tetap opsional; jika dipilih, pengguna memilih jadwal terkait.

**Dialog dampak:** panel tenang dengan judul tindakan, daftar pemakaian terkait yang akan dibatalkan, dan tombol berlabel spesifik. Jangan memakai ilustrasi ceria pada sengketa atau pembatalan. Pembatalan satu jadwal mengikuti D-33; bukan otomatis seluruh proker.

## Fondasi komponen yang diusulkan

- Font awal: satu keluarga sans seperti Geist Sans dengan fallback system-ui. Bobot 700 untuk judul, 400–500 untuk isi, 600 untuk label. Tidak wajib memakai Bungee dari panduan proyek lain.
- Ukuran: judul halaman 28–36 px, judul bagian 20–24 px, isi/input 16 px, metadata 14 px.
- Radius: kartu 16–20 px, tombol/input 10–12 px, filter/badge berbentuk pil.
- Spasi: kelipatan 4 px, padding kartu 16–24 px, gutter HP 16 px, konten maksimal sekitar 1200 px.
- Bayangan lembut pada kartu penting; tombol utama boleh memakai bayangan bawah 2 px untuk sentuhan playful. Elemen daftar biasa cukup dipisahkan jarak/garis.
- Ikon garis SVG konsisten. Kartu tidak seluruhnya diberi ikon, bayangan tebal, atau gradient.
- Warna ormawa selalu disertai nama; warna status memiliki fungsi terpisah. Kepadatan bulan berupa jumlah/intensitas, bukan merah berarti proker dilarang.

## Status dan batas akses

Rencana, Menunggu keputusan, Disetujui, Ditolak, dan Dibatalkan tetap mengikuti BUSINESS_RULES. Setiap badge memiliki teks; warna bukan satu-satunya pembeda. Sengketa menjadi penanda tambahan, bukan status izin baru. Label Disetujui menjelaskan bahwa status dilaporkan PIC.

Kontak WhatsApp hanya tampil kepada PIC/BEM terverifikasi sesuai D-35. Audit mengidentifikasi akun resmi ormawa sesuai D-37. Gaya visual tidak menggantikan kontrol akses database/API. Empty state, gagal memuat, dan data lama harus dapat dibedakan.

## Isi DESIGN.md setelah arah dipilih

1. Arah visual yang dipilih dan elemen referensi yang digunakan.
2. Token warna primitif/semantik, tipografi, spasi, radius, dan bayangan.
3. Komponen beserta keadaan hover, fokus, pressed, disabled, loading, error, dan sukses.
4. Susunan kalender tahunan, detail bulan/proker, pemakaian ruangan, formulir, serta halaman kelola/akses.
5. Perilaku responsif dan konten contoh yang ditandai fiktif.
6. Pemeriksaan kontras, keyboard, reduced motion, nama panjang, zoom, dan status tanpa warna.

Acuan visual telah dipilih melalui D-38. Review berikutnya menilai adaptasi Cal.com dalam DESIGN.md; Q-01/Q-09 tetap mengikuti daftar pertanyaan terbuka untuk hal yang belum diputuskan.
