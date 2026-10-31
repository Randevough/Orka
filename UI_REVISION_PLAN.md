# Rencana revisi UI Orka — paket kedua

Tanggal: 28 Oktober 2026. Status: rencana revisi D-41. Aksen muted teal dan palet status redup kini diterapkan melalui D-43, menggantikan percobaan apricot D-42. Dropdown custom, logo bertumpuk, dan kalender detail kini diterapkan melalui D-44; hasil/batas pemeriksaan ada di [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md). Rincian yang disebut usulan belum menjadi keputusan final pengguna.

## Hasil yang ingin dicapai

Pertahankan tampilan bersih ala Cal.com, dengan sedikit karakter warna dan identitas ormawa yang lebih terlihat. Kalender tahunan tetap memberi gambaran 12 bulan. Detail bulan memperlihatkan tanggal serta rentang kegiatan melalui blok warna per ormawa.

| Permintaan pengguna | Rencana |
| --- | --- |
| Sedikit warna aksen | Warna brand terbatas pada elemen kecil/aktif; bidang utama tetap netral |
| Dropdown custom | Ganti dropdown native dengan komponen visual konsisten yang tetap bisa dipakai melalui keyboard |
| Logo ormawa di setiap bulan | Logo penyelenggara tampil berjajar dengan sedikit overlap pada kartu bulan |
| Kalender detail dengan rentang berwarna | Buka bulan ke halaman kalender tanggal; tiap jadwal pasti mempunyai blok sesuai rentang dan identitas ormawa |

Dokumen ini melengkapi [DESIGN.md](DESIGN.md), [UX_SPEC.md](UX_SPEC.md), dan [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md). D-44 kini mengizinkan penerapan revisi UI dalam rencana ini; palet aktif tetap mengikuti D-43. Tidak ada integrasi/logika data, perubahan aturan izin, deployment, atau pengambilan logo asli.

## 1. Aksen warna secukupnya

Pilihan aktif D-43: **muted teal** `#4D8582`, bidang `#EDF6F4`, garis `#CFE1DD`, dan fokus teal gelap `#376E6B`. Percobaan apricot D-42 sudah diganti. Informasi memakai plum, warning ochre, dan error berry sesuai DESIGN.md; teks/ikon tetap menjelaskan maknanya. Teks di bidang aksen tetap charcoal/muted dengan kontras yang diuji.

Penempatan awal: ikon pengantar kecil, navigasi aktif, indikator tanggal terpilih, serta pilihan aktif pada dropdown. Tombol utama tetap gelap dan kartu tetap putih. Hindari mewarnai seluruh header, latar halaman, atau seluruh kartu bulan. Fokus keyboard tetap jelas; aksen dekoratif bukan pengganti indikator fokus.

Pisahkan tiga fungsi warna: **aksen brand**, **identitas ormawa**, dan **status izin**. Teal bukan label ruangan tersedia. Badge izin tetap mengikuti makna dan pasangan warna dalam DESIGN.md. Warna blok proker menunjukkan penyelenggara, bukan tingkat kepadatan atau konflik.

## 2. Dropdown custom

Cakupan: pemilih tahun akademik, filter ormawa, pemilih skenario di Ruang uji UI, serta contoh select dalam katalog komponen. Jangan menyisakan dropdown native yang membuat gaya terlihat berbeda pada paket ini. Pemilih tanggal kalender merupakan kontrol terpisah, bukan alasan menambah datepicker ke semua field.

Tampilan: trigger berbingkai tipis, label/nilai jelas, chevron, dan panel putih membulat dengan bayangan ringan. Pilihan aktif memakai centang dan bidang aksen lembut. Opsi ormawa dapat memuat logo kecil serta nama; periode arsip memuat penanda arsip. Panel menyesuaikan sisi yang masih memiliki ruang, lebarnya mengikuti isi/trigger secara wajar, dan daftar panjang dapat digulir.

Perilaku wajib: buka dengan klik/Enter/Space; navigasi panah, Home/End, dan pencarian ketik untuk pilihan; Enter memilih; Escape membatalkan/menutup dan mengembalikan fokus; klik di luar menutup; Tab tidak terjebak. State selected dan focused berbeda, dengan nama/keadaan aksesibel yang benar. Implementasi memakai pola select/combobox single-select yang aksesibel, bukan sekadar daftar tombol berpenampilan menu. Tidak menambah multi-select pada revisi ini.

Animasi usulan 120–160 ms dengan fade/pergeseran kecil; reduced motion menghilangkan pergeseran. Di dalam modal, panel harus berada dalam lingkup fokus dialog dan tidak terpotong atau dipindahkan ke luar area interaktif modal. Pilihan masih membuka skenario statis; tidak melakukan query.

## 3. Logo ormawa bertumpuk pada kartu bulan

Letakkan deretan logo setelah judul/isi ringkas, dekat bagian jumlah proker. Usulan bentuk: lingkaran 28 px, bidang putih dengan ring 2 px, overlap sekitar 6 px. Logo ditampilkan utuh dengan object-fit contain; jangan memotong lambang yang bukan lingkaran. Overlap tidak mengubah posisi elemen di sekitarnya ketika hover.

Tampilkan setiap penyelenggara unik satu kali pada bulan itu, termasuk kolaborator, meskipun punya beberapa proker. Urutan usulan alfabetis dan konsisten, bukan berdasarkan popularitas. Maksimal empat logo lalu `+N` untuk sisanya; detail bulan menampilkan seluruh nama. Filter memakai kumpulan proker yang ditampilkan; jika proker kolaborasi masih tampil, semua penyelenggaranya tetap dicantumkan. Ini usulan perilaku A-15 untuk review, bukan mesin filter yang dibuat sekarang.

Deretan logo merupakan informasi dalam kartu, bukan kumpulan tombol terselubung di dalam tombol kartu bulan. Nama seluruh ormawa tersedia bagi pembaca layar dan dalam detail bulan; tooltip boleh membantu pengguna pointer tetapi bukan satu-satunya cara mengetahui identitas. Bulan kosong tidak menampilkan logo atau avatar hiasan.

Gunakan logo placeholder fiktif atau monogram dengan label contoh pada prototipe. Jika logo belum ada/gagal dimuat, gunakan inisial yang stabil dan nama ormawa. Jangan memakai gambar acak sebagai logo kampus/ormawa sebenarnya. Fitur unggah logo, penyimpanan aset, serta pemeliharaan warna identitas direncanakan kemudian; tidak menambah upload pada paket UI ini.

## 4. Detail bulan sebagai kalender tanggal

Usulan alur: **kalender tahunan → halaman detail bulan → modal detail proker**. Detail bulan tidak lagi terbatas pada modal daftar sempit. URL final belum dikunci; pada prototipe cukup navigasi presentasi tanpa data sungguhan.

Bagian halaman: kembali ke kalender tahunan, nama bulan/tahun, filter ormawa, navigasi bulan sebelumnya/berikutnya, pilihan tampilan Kalender/Agenda, legenda ormawa, kalender, serta bagian tentatif. Konteks periode/filter dipertahankan saat kembali. Batas navigasi mengikuti periode contoh; tidak membuka seluruh arsip sekaligus.

**Desktop:** grid tujuh kolom, usulan urutan Senin–Minggu. Setiap sel menyebut angka tanggal; tanggal di luar bulan dibedakan secara visual. Hari ini dan tanggal terpilih memakai penanda berbeda, hanya bila sesuai skenario contoh. Kalender menerima label nama bulan dan navigasi keyboard yang tidak memaksa pengguna menekan Tab untuk setiap tanggal sebelum keluar.

**HP:** usulan default Agenda agar nama dan rentang tetap terbaca, dengan pilihan Kalender yang tetap tersedia. Grid kalender dibuat ringkas dengan blok berwarna dan nama singkat bila muat. Memilih tanggal menampilkan daftar lengkap di bawahnya. Rentang dan penyelenggara harus tetap terbaca melalui agenda/detail; informasi tidak bergantung pada tooltip. Tidak ada overflow horizontal halaman, dan tidak menjejalkan label lengkap ke sel sempit.

### Blok rentang proker

- Satu jadwal pasti menjadi satu rentang yang menyebut nama proker, ormawa, serta tanggal/jam pada nama aksesibel dan detailnya.
- Kegiatan satu hari menggunakan blok satu tanggal. Kegiatan beberapa hari memakai bar horizontal dari awal sampai akhir, dipotong menjadi segmen lanjutan jika melewati pergantian baris minggu atau bulan. Awal/akhir dan kelanjutannya harus dapat dibedakan.
- Jangan menghubungkan beberapa jadwal terpisah menjadi satu bar panjang melalui hari yang tidak memiliki kegiatan. Banyak jadwal dari proker yang sama tetap mengikuti rentang masing-masing.
- Batas interval eksklusif dan zona waktu mengikuti rancangan waktu yang berlaku; kegiatan yang berakhir tepat tengah malam tidak menandai hari berikutnya sebagai hari kegiatan. Prototipe memakai segmen/tanggal yang sudah disiapkan, tanpa menghitungnya.
- Kegiatan pada tanggal sama ditumpuk dalam baris terpisah. Usulan maksimal tiga bar terlihat pada desktop lalu “+N lainnya”; klik membuka daftar tanggal itu. Tidak menolak proker bersamaan atau menyebutnya konflik SDM.
- Tanggal tanpa catatan menyebut belum ada proker tercatat, bukan klaim tidak ada kegiatan kampus.

### Identitas warna ormawa dan kolaborasi

Usulan palet contoh menggunakan bidang pastel dengan teks gelap dan garis awal lebih tegas: biru `#EFF6FF / #1E40AF`, violet `#F5F3FF / #5B21B6`, amber `#FFFBEB / #92400E`, teal `#F0FDFA / #115E59`. Ini identitas fiktif untuk review; tidak dianggap warna resmi organisasi mana pun.

Satu ormawa memakai warna yang sama pada semua bulan, legenda, logo fallback, dan blok jadwal. Warna tidak berubah berdasarkan urutan filter. Nama/logo tetap hadir karena warna saja tidak cukup untuk mengenali penyelenggara. Palet final harus tetap membedakan kurang dari 10 ormawa tanpa mengandalkan hue semata.

Untuk kolaborasi, usulan satu blok memakai warna **ormawa pengelola utama**, dengan deretan logo/nama semua penyelenggara dan label kolaborasi pada detail. Jangan menggandakan satu kegiatan menjadi beberapa blok berwarna seolah acara berbeda. Pilihan ini perlu review visual; tidak mengubah hak edit D-08.

### Jadwal tentatif

Proker hanya-bulan ditempatkan di bagian “Tanggal belum ditentukan” di luar grid tanggal. Gunakan logo/warna identitas yang sama, badge Tentatif, serta keterangan bulan. Jangan mewarnai satu bulan penuh, membuat tanggal 1 rekaan, atau menyiratkan rentang yang sudah pasti.

## 5. Urutan implementasi setelah diminta

| Urutan | Cakupan | Bukti review |
| --- | --- | --- |
| 1 | Token aksen dan identitas ormawa contoh; logo fallback | Halaman tetap dominan netral; aksen/status/identitas tidak tertukar |
| 2 | Komponen dropdown custom di seluruh lokasi paket | Klik, keyboard, Escape, panel dalam modal, daftar panjang, reduced motion |
| 3 | Deretan logo pada kartu bulan | Kosong, satu ormawa, beberapa, kolaborasi, lebih dari empat, logo gagal |
| 4 | Halaman detail bulan dan toggle Kalender/Agenda | Kembali/periode/filter, desktop/HP, tanggal terpilih, bulan kosong |
| 5 | Contoh bar rentang dan detail proker | Satu hari, beberapa hari, lintas minggu/bulan, jadwal terpisah, kolaborasi, tentatif, tanggal padat |
| 6 | Pemeriksaan visual dan aksesibilitas | Viewport 360/768/1280, zoom 200%, keyboard, kontras, reduced motion; screenshot review |

Seluruh tanggal, bar, segmentasi, jumlah logo unik, `+N`, dan hasil filter disiapkan sebagai fixture statis. Tidak menambahkan algoritma kalender/penempatan rentang, persistence, Auth, API, atau database pada fase UI ini. Komponen dapat memakai state presentasi untuk pilihan tampilan, tanggal, dropdown, serta modal.

## 6. Kriteria review paket kedua

| ID | Hasil yang harus terlihat saat prototipe dibuat |
| --- | --- |
| UX-R01 | Aksen muncul terbatas; dasar bersih Cal.com dan tombol utama gelap tetap terjaga; token/status/identitas dapat dibedakan |
| UX-R02 | Seluruh dropdown yang dicakup memakai komponen custom konsisten, dengan label, pilihan aktif, navigasi keyboard, Escape, penutupan luar, dan fokus yang benar termasuk dalam modal |
| UX-R03 | Kartu bulan menampilkan logo penyelenggara tanpa duplikasi; overlap tidak merusak layout; fallback dan `+N` terbaca; identitas lengkap tersedia tanpa hover |
| UX-R04 | Membuka bulan menampilkan kalender tanggal dan Agenda; navigasi kembali mempertahankan konteks; HP menampilkan nama/rentang lengkap lewat daftar/detail |
| UX-R05 | Rentang beberapa hari dan lanjutan minggu/bulan jelas; jadwal terpisah tidak tersambung palsu; kegiatan pada tanggal sama tidak saling menutupi |
| UX-R06 | Identitas warna konsisten; kolaborasi satu blok dengan seluruh penyelenggara; jadwal tentatif tetap di luar grid tanpa tanggal pasti palsu |
| UX-R07 | Seluruh skenario dapat ditinjau pada viewport yang ditentukan, keyboard, zoom, dan reduced motion; pasangan warna aktual diuji dan tidak ada interaksi hanya-hover |
| UX-R08 | D-45: status fiktif/tidak tersimpan tetap terdokumentasi tanpa penanda preview di tampilan utama; kode hanya berisi interaksi presentasi dan fixture statis, tanpa logika data/integrasi |

UX-R01 telah diterapkan terbatas dan paletnya diperbarui melalui D-43 pada navigasi aktif, ikon pengantar/periode, titik dekoratif, dan pilihan tab katalog komponen; kontras pasangan teks di atas bidang teal pucat dan latar status serta build sudah diperiksa. Review seluruh keadaan visual masih berlanjut. Penerapan dan status pemeriksaan UX-R02–UX-R08 kini dicatat di UI_REVISION_REVIEW.md; UX-R07 masih memiliki pemeriksaan yang belum dilakukan. Tidak meluluskan AC backend.

## Hal yang masih berupa usulan

Ukuran/limit logo, warna pengelola utama untuk kolaborasi, tiga bar sebelum overflow, hari awal minggu, dan default Agenda pada HP adalah A-15. Aksen aktif mengikuti muted teal D-43, menggantikan apricot D-42. Aset logo nyata serta penanggung jawab pemeliharaan identitas perlu ditentukan sebelum integrasi. Tidak ada keputusan ini yang memblokir contoh fiktif.
