# Keputusan, usulan, dan pertanyaan terbuka

## D: keputusan dari pengguna

| ID | Keputusan |
| --- | --- |
| D-01 | Cakupan awal seluruh kampus kecil dengan kurang dari 10 ormawa |
| D-02 | BEM/forum antarormawa membantu adopsi; BEM menunjuk pengelola platform |
| D-03 | Kalender proker membantu melihat bulan padat dan potensi perebutan SDM |
| D-04 | Nama acara dan waktu cukup; tidak perlu nama individu, target peserta, atau estimasi panitia |
| D-05 | Rencana proker masuk sejak baru diketahui bulannya dengan status tentatif |
| D-06 | Tahun akademik dipakai; bulan awal diatur BEM; ringkasan tahunan dapat dibuka ke detail bulan |
| D-07 | Satu proker dapat memiliki beberapa jadwal kegiatan |
| D-08 | Kolaborasi dicatat sekali; satu ormawa menjadi pengelola utama |
| D-09 | Proker boleh terhubung ke banyak pemakaian ruangan; masing-masing izin terpisah |
| D-10 | Agenda rapat privat dihapus; rapat cukup berupa pemakaian ruangan |
| D-11 | Semua mahasiswa bisa membaca kalender tanpa login; pengisian oleh PIC melalui akun resmi bersama sesuai D-37 |
| D-12 | Izin ruangan tetap melalui chat/surat/jalur resmi kampus; admin kampus belum ikut |
| D-13 | Rencana ruangan muncul sejak dicatat, meski belum diajukan |
| D-14 | Dua rencana belum disetujui boleh bertabrakan dengan peringatan dan kontak PIC |
| D-15 | Slot approved menolak pengajuan baru yang bertabrakan |
| D-16 | Dua laporan izin bertentangan ditinjau BEM bersama PIC; persetujuan kedua ditahan |
| D-17 | Bentrok hanya ruangan sama dan waktu beririsan; hari sama bukan masalah |
| D-18 | PIC melaporkan status izin tanpa unggah bukti; akun pengubah dan waktu tercatat. Untuk akun bersama, identitas individu pemakai tidak dapat dipastikan (D-37) |
| D-19 | Seluruh waktu persiapan dan beres-beres termasuk waktu pemakaian |
| D-20 | Pemindahan pemakaian mandiri memakai rencana pengganti; slot lama tetap sampai perpindahan pasti |
| D-21 | Rencana belum disetujui batal otomatis 7 hari sejak pembaruan/konfirmasi terakhir |
| D-22 | Tidak ada pengingat; jelaskan aturan 7 hari saat membuat rencana |
| D-23 | PIC mengecek mingguan; waktu pembaruan terakhir terlihat |
| D-24 | Slot tanpa data dilabeli belum ada pemakaian tercatat, tetap perlu cek resmi |
| D-25 | Koordinasi lewat kontak WhatsApp PIC; tidak perlu diskusi internal aplikasi |
| D-26 | Perubahan data oleh PIC langsung tampil tanpa pemeriksaan BEM terlebih dahulu |
| D-27 | Jika proker dibatalkan, semua pemakaian ruangan nonterminal terkait dibatalkan otomatis. Perubahan jadwal mengikuti D-33; pembatalan sisa setelah sebagian terlaksana disempurnakan D-49 agar riwayat terlaksana dipertahankan |
| D-28 | Data/arsip tetap milik ormawa. Verifikasi akun resmi, pencabutan kewenangan, dan serah terima pengurus mengikuti D-37 |
| D-29 | Uji coba satu bulan, seluruh ormawa mengisi dan memperbarui; evaluasi bentrokan bersama |
| D-30 | Stack akhir React + Vite + Supabase + Cloudflare Pages; pilihan Next.js/MongoDB ditinggalkan |
| D-31 | Pengguna masih meminta planning; permintaan terbaru adalah PRD dan Markdown untuk AI agent |
| D-32 | Nama proyek dan produk adalah Orka, ditetapkan pengguna pada 27 Oktober 2026; cakupan pekerjaan tetap planning |
| D-33 | Perubahan/penghapusan satu jadwal hanya membatalkan pemakaian ruangan nonterminal yang terkait jadwal itu, termasuk approved; kaitan ruangan dibuat per jadwal. Penambahan jadwal tidak membatalkan ruangan jadwal lain |
| D-34 | Kebijakan batal otomatis setelah 7 hari tanpa pembaruan/konfirmasi PIC tetap berlaku untuk planned/pending, tanpa pengingat otomatis; definisi tepat 168 jam masih A-04 |
| D-35 | Kontak WhatsApp hanya terlihat oleh PIC/BEM terverifikasi dan memakai nomor yang pemiliknya setujui untuk koordinasi |
| D-36 | Pada 28 Oktober 2026 pengguna menyerahkan pemilihan metode login kepada agent dengan mempertimbangkan beban proyek dan kemudahan. Pilihan rancangan: Google saja melalui Supabase Auth untuk versi awal; verifikasi PIC oleh BEM tetap wajib. Sebelum pilot, pastikan akun Google dapat dipakai seluruh PIC/BEM; alternatif ditinjau bila ada kendala nyata |

## D-37: akun resmi bersama ormawa

Pada 28 Oktober 2026 pengguna memilih akun bersama agar akses tersentralisasi. Setiap ormawa wajib memiliki satu akun email/Google resmi yang dipakai bersama pengurus berwenang untuk mengelola data ormawanya. BEM memverifikasi hubungan akun resmi dengan ormawa; login saja tidak memberi hak menulis. Akun pribadi tidak dipakai untuk mengubah data ormawa. Pilihan ini menggantikan rancangan akun pribadi dan batas dua akun PIC; 1 sampai 2 PIC tetap dapat ditunjuk sebagai penanggung jawab operasional tanpa akun individual di Orka.

Google melalui Supabase Auth (D-36) tetap dipakai, kini dengan akun resmi ormawa. Audit mencatat akun resmi, ormawa, tindakan, dan waktu; tidak mengklaim mengidentifikasi individu pengguna akun bersama. Saat pergantian pengurus, akun dan data tetap sama; akses Google serta pemulihannya diserahterimakan di luar Orka. Prosedur operasi harus mencakup pengakhiran sesi Orka lama, bukan hanya pergantian password Google. Password dan kode pemulihan tidak disimpan di aplikasi atau dokumen proyek.

Halaman kalender proker dan pemakaian ruangan tetap publik tanpa login. Kontak WhatsApp tetap terbatas pada akun resmi terverifikasi dan pengelola BEM sesuai D-35. Akun resmi BEM sebagai ormawa tidak otomatis menjadi administrator platform; pemberian hak administrator tetap terkontrol.

## D-38: acuan visual Cal.com

Pada 28 Oktober 2026 pengguna memilih desain Cal.com sebagai acuan visual Orka setelah riset referensi. [DESIGN.md](DESIGN.md) menerjemahkannya menjadi tampilan terang netral, panel berbingkai tipis, tipografi tegas, dan tombol utama gelap. Detail token/ukuran/komponen adalah usulan A-14 untuk prototipe; pilihan acuan tidak berarti menyetujui setiap nilai atau menambah fitur Cal.com. Panduan GitMastery mandiri tetap untuk proyek lain. Cakupan pekerjaan tetap planning.

## D-39: UI/UX interaktif sebelum logika data

Pada 28 Oktober 2026 pengguna meminta implementation plan dirapikan dengan tahap pertama berfokus pada desain dan UX, termasuk animasi klik tombol, modal popup, serta seluruh interaksi antarmuka tanpa logika data. IMPLEMENTATION_PLAN.md membagi fase UI/UX dan fase integrasi data. State lokal presentasi serta skenario fiktif statis boleh dipakai agar prototipe bisa diklik; penyimpanan, API/Auth nyata, database, dan perhitungan aturan bisnis ditunda. Permintaan saat ini adalah perubahan dokumen rencana, bukan instruksi mulai coding. Review prototipe mendahului instruksi melanjutkan integrasi data.

## D-40: mulai paket pertama prototipe

Pada 28 Oktober 2026 pengguna mengizinkan langkah yang ditawarkan: React/Vite/TypeScript, token visual Cal.com, komponen beserta animasi klik/modal, navigasi, dan kalender 12 bulan dengan contoh statis. Skill ui-ux-pro-max diminta. Kode prototipe berada di prototype/; hasil dan batas pemeriksaan dicatat di PROTOTYPE_PROGRESS.md. Ini izin implementasi UI paket pertama, tanpa integrasi/logika data, layanan cloud, atau deployment. Halaman berikutnya mengikuti review dan arahan lanjutan.

## D-41: revisi visual dan kalender detail — planning

Pada 28 Oktober 2026 pengguna menyukai kebersihan prototipe tetapi meminta sedikit aksen warna, dropdown custom, logo ormawa berjejer dengan overlap kecil pada tiap kartu bulan yang memiliki proker, serta kalender detail yang memperlihatkan rentang tanggal kegiatan melalui blok warna sesuai ormawa. Pengguna meminta planning terlebih dahulu, bukan implementasi revisi. Rencana ada di [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md); rincian A-15 tetap usulan. Proker tentatif, kolaborasi, hak akses, dan batas tanpa logika data tetap mengikuti dokumen produk.

## D-42: aksen apricot lembut

Pengguna meminta orange yang lebih soft dan tidak terasa panas, lalu mengizinkan penerapan apricot muted `#DDA57D`, bidang peach `#FBF2EA`, dan garis `#EED9C8`. Aksen diterapkan tipis pada navigasi aktif, ikon kecil, titik dekoratif, dan pilihan tab prototipe. Teks tetap gelap, tombol utama charcoal, dan warna status tidak diubah. Keputusan ini menggantikan usulan teal A-15; bukan instruksi menerapkan dropdown custom, logo, atau kalender detail sekaligus.

## D-43: muted teal dan status dengan warna redup

Pengguna membolehkan sage atau muted teal, lalu meminta warna warning/error/info biru diganti agar tidak terlalu umum. Agent memilih muted teal `#4D8582` dengan bidang `#EDF6F4` dan garis `#CFE1DD`, menggantikan apricot D-42. Informasi memakai plum `#695477 / #F4F0F7`, warning ochre `#786126 / #F7F2E6`, error berry `#965066 / #FAF0F3`; fokus memakai teal gelap `#376E6B`. Label dan ikon mempertahankan makna, tombol utama charcoal dan success tetap dipertahankan. Perubahan terbatas pada palet; revisi dropdown/logo/kalender belum ikut diterapkan.

## D-44: terapkan rencana revisi kalender

Pengguna meminta penerapan rencana yang dibuat sebelum percobaan warna: dropdown custom, logo ormawa bertumpuk, serta kalender detail tanggal/rentang dengan warna per ormawa. Palet D-43 dipertahankan. Rincian A-15 digunakan untuk prototipe yang dapat direview, termasuk fixture statis, contoh logo fiktif/fallback, kolaborasi satu blok, dan Agenda pada HP. Hasil ada di [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md). Izin ini tidak mencakup integrasi data, upload logo nyata, layanan cloud, atau deployment.

## D-45: hilangkan penanda preview dari UI dan gali timeline proker

Pengguna meminta seluruh teks preview/pratinjau dan penanda data dummy yang mengganggu tampilan dihilangkan, karena pengembangan hanya dilakukan olehnya. Banner, keterangan dialog/detail, dan penanda footer dihapus dari tampilan utama; status fixture/dummy tetap dicatat pada dokumentasi pengembangan. Ini bukan perubahan dari prototipe menjadi aplikasi operasional atau izin integrasi data. Nama organisasi fiktif tetap memakai penamaan Contoh.

Pengguna menegaskan proker dan rapat berbeda, menyoroti kepadatan proker lintas ormawa, memberi contoh timeline 12 Juni–12 Oktober, dan meminta sesi grilling sebelum memilih enhancement berikutnya. Hasil discovery lanjutan dicatat pada D-46–D-49 di bawah; belum diimplementasikan.

## D-46: pengerjaan terpisah dari pelaksanaan

Pengguna memilih enhancement timeline proker lebih dahulu. Satu rentang pengerjaan opsional mencakup persiapan sampai akhir pengerjaan, tanpa fase/tugas rinci; boleh presisi bulan atau tanggal. Pelaksanaan tetap berupa sesi terpisah. Ringkasan bulanan membedakan “Dalam pengerjaan” dan “Ada pelaksanaan”, dengan jumlah proker unik dan tanpa ambang kepadatan/konflik SDM. Timeline yang belum diisi disebut eksplisit. Timeline publik cukup nama, ormawa, dan waktu; rapat tetap sebatas pemakaian ruangan.

Tampilan Timeline berbaris per proker terpisah dari Kalender pelaksanaan. Rentang boleh lintas periode, tetap satu proker dengan rentang lengkap dan penanda lanjut pada potongan tampilan. Rentang terisi harus mencakup pelaksanaan; tanggal pelaksanaan yang keluar rentang meminta koreksi eksplisit. Perubahan pengerjaan saja tidak membatalkan ruangan. Ini tidak menyelesaikan seluruh kebijakan arsip/pelaksanaan lintas periode Q-06.

## D-47: penundaan dan proposal

Proposal belum disetujui: pertahankan proker aktif dan revisi jadwal, dengan awal pengerjaan yang sudah berjalan tetap tercatat. Penundaan tanpa pengganti diperbolehkan: pelaksanaan berlabel ditunda, tanggal lama masuk riwayat, akhir pengerjaan boleh belum pasti. Pemakaian tanggal lama dibatalkan dan slot dilepas. Jika proposal akhirnya ditolak, PIC memilih revisi atau pembatalan; tidak ada alur persetujuan proposal di aplikasi. Kebijakan pelepasan slot dan pilihan revisi/pembatalan dipilih agent atas delegasi pengguna “pilih semua berdasarkan logic bisnis” lalu dirangkum dalam percakapan.

## D-48: ruangan tidak tersedia dan keputusan PIC

BEM mencatat ruangan tidak tersedia berdasarkan informasi kampus; PIC melaporkan kendala miliknya. Pemakaian terdampak berlabel “Perlu penyesuaian”, pengajuan baru pada waktu penutupan dicegah; proker tetap aktif. PIC menentukan ganti ruang, geser jadwal, tunda, atau batal sesuai kasus, dan boleh memperluas penyesuaian ke sesi lain. Pemakaian langsung terdampak tetap wajib ditandai; aturan wajib ini dipilih agent melalui delegasi yang sama. Pengganti memakai catatan izin baru; riwayat lama disimpan. Pembukaan kembali memerlukan PIC memastikan ulang izin, tanpa memulihkan catatan dibatalkan/diganti otomatis. Penutupan bukan kewenangan BEM memberi/mencabut izin kampus.

## D-49: pembatalan sebagian dan kepadatan

Jika sebagian sesi sudah terlaksana, pertahankan hasilnya dan batalkan sisa sesi beserta pemakaian terkait; ringkasan “Selesai sebagian—sisa dibatalkan”. Jadwal pengganti yang berbarengan dengan proker lain tetap boleh, dengan informasi kepadatan; larangan mengikuti aturan ruangan, bukan kapasitas SDM.

Pada 31 Oktober 2026 pengguna meminta rancangan terlebih dahulu. [TIMELINE_UX_PLAN.md](TIMELINE_UX_PLAN.md) merinci layar, modal, skenario, dan urutan paket UI. Permintaan ini bukan instruksi coding, integrasi, atau deployment.

## D-50: implementasikan prototipe timeline dan penyesuaian

Pada 31 Oktober 2026 pengguna meminta “proceed” setelah rancangan D-46–D-49 disimpan. Otorisasi mencakup prototipe UI statis: ringkasan dua indikator, Timeline, detail proker, modal revisi/dampak, serta skenario penutupan BEM dan tindak lanjut PIC. Batas D-39 tetap berlaku. Hasil serta pemeriksaan parsial UX-T ada di [TIMELINE_UI_REVIEW.md](TIMELINE_UI_REVIEW.md). Tidak mencakup integrasi data atau deployment.

## D-51: logo brand nyata dan eksplorasi tone teal

Pengguna meminta logo Google, Slack, dan brand lain menggantikan logo ormawa contoh. Aset Google/Slack/Figma/GitHub dari koleksi Devicon dan simbol Discord dari halaman brand resmi disimpan lokal; identitas data ormawa tetap fiktif. Pengguna kemudian menegaskan tetap ingin keluarga teal dengan tone lain yang lebih berkarakter. Logo diterapkan; warna produk belum diganti. Pilihan tone dan jumlah warna bar/status masih dibahas melalui A-17.

Pengguna selanjutnya memilih netral dominan dengan sedikit warna: logo tetap berwarna, bar kalender tipis dan konsisten, badge mengutamakan ikon/teks dan sedikit warna. Tone teal final dan nilai warna status belum dipilih; perubahan token produk masih menunggu pemilihan tone.

## D-52: keluar dari keluarga teal

Setelah membandingkan tiga tone teal, pengguna meminta eksplorasi warna di luar keluarga teal. Ini menggantikan arah eksplorasi teal D-51. Netral dominan, sedikit warna, dan logo brand tetap berlaku. A-17 menjadi riwayat; alternatif non-teal A-18 belum dipilih dan token produk belum diganti.

## D-53: eksplorasi keluarga blue

Pengguna membolehkan arah keluarga blue dan sekitarnya, lalu meminta alternatif lebih lanjut. Tetap clean, tegas, sedikit playful, netral dominan dan warna solid yang dipakai hemat. Cornflower Blue, Azure Blue, dan Indigo Blue adalah A-20 untuk dibandingkan; belum ada pilihan hue final atau penerapan token baru.

## D-54: terapkan kombinasi ultramarine dan ink blue

Pengguna menyukai kombinasi ultramarine dan ink blue dari papan riset, lalu meminta “coba make it works”. Terapkan pada prototipe: ultramarine untuk aksen/fokus, ink blue untuk teks/tombol/struktur, panel putih dan kanvas netral. Agent memilih token rinci dan menenangkan warna ormawa serta status sesuai preferensi netral dominan, warna sedikit. Logo brand tetap multicolor. D-54 menggantikan palet aktif D-43; rincian implementasi ada di DESIGN.md dan pemeriksaan pada PALETTE_REVIEW.md. Tidak mencakup integrasi data atau deployment.

## D-55: ultramarine + paper, tipografi lebih besar dan dropdown solid

Pengguna menilai banyak teks terlalu kecil, memilih ultramarine + paper agar biru tidak terlalu banyak dicampur, meminta hover/active dropdown biru solid dengan teks putih dan jarak vertikal item yang lega, serta kalibrasi ulang kuning/merah/info. D-55 menggantikan kombinasi ink blue D-54 sebagai palet aktif. Implementasi memakai teks charcoal, satu hue ultramarine pada UI/bar, status amber/merah bata/info ultramarine, dan skala teks operasional 14/15/16 px. Penyelenggara dibedakan melalui nama/logo; warna kategori lama tidak lagi menjadi pembeda. Hasil pada UI_READABILITY_REVIEW.md. Tetap prototipe tanpa integrasi data.

## D-56: lanjut paket UI pemakaian ruangan

Pada 7 November 2026, pengguna menyetujui rencana tiga paket UI melalui instruksi “gas”: pemakaian ruangan → kelola ormawa/PIC → kelola platform/BEM. Pengerjaan dimulai dari paket pemakaian ruangan untuk review lokal: agenda publik, detail, formulir dan tinjauan sampai hasil simulasi. Tetap mengikuti D-39 dan palet D-55, tanpa integrasi data, penyimpanan, Auth nyata atau deployment. Hasil paket pertama dicatat pada ROOMS_UI_REVIEW.md; paket berikutnya belum dinyatakan selesai.

## D-57: lanjut paket Kelola ormawa/PIC

Pada 7 November 2026, pengguna meminta “Lanjut” setelah paket ruangan D-56. Paket berikutnya mengikuti rencana yang telah disetujui: Kelola ormawa/PIC, status akses, tambah/edit proker, pemakaian, konfirmasi dan riwayat. Dialog revisi/koordinasi yang ada dipakai ulang. Hasil statis dicatat pada MANAGE_UI_REVIEW.md; bukan izin membuat Auth nyata, database atau deployment. Paket BEM tetap berikutnya.

## D-58: lanjut paket Kelola platform/BEM

Pada 7 November 2026, pengguna meminta “lanjut” setelah paket Kelola ormawa/PIC D-57. Pengerjaan mengikuti paket ketiga yang sudah disetujui: pengelolaan BEM, akun/ormawa, ruangan, periode/arsip, peninjauan dan riwayat. Hasil prototipe tercatat pada PLATFORM_UI_REVIEW.md. Permintaan ini tidak menetapkan Q-05/Q-06/Q-11, tidak mengizinkan layanan/data nyata, dan tidak menyatakan seluruh fase UI/UX lulus.

## A: daftar usulan

Pembaruan D-53: A-20 juga belum disukai karena terlalu umum/kurang khas. Pengguna belum memiliki brand acuan dan meminta agent mencari referensi internet. A-21 membandingkan ultramarine/putih kertas, core palette Dropbox, dan pelajaran motif identitas MUBI; semuanya usulan, belum persetujuan hue atau bentuk.

Pembaruan D-52: pengguna menolak pula ketiga opsi pastel A-18. Vibe yang dipilih adalah clean, tegas, sedikit playful; masalah utama pilihan sebelumnya adalah terlalu pastel/pucat. A-17/A-18 dipertahankan sebagai riwayat; A-19 adalah eksplorasi aktif. Belum ada hue final atau izin penerapan palet baru.

| ID | Usulan | Alasan |
| --- | --- | --- |
| A-01 | Hitungan unik sudah ditegaskan melalui D-46; pisahkan pengerjaan dan pelaksanaan | Detail rentang akhir belum pasti tetap Q-10 |
| A-02 | Interval [mulai, selesai) | Acara berurutan tanpa jeda tambahan tetap bisa dicatat; persiapan sudah termasuk |
| A-03 | Transisi status seperti BUSINESS_RULES; status terminal dibuat ulang jika diperlukan | Riwayat jelas dan pemulihan rencana tidak tersembunyi |
| A-04 | 7 hari = 168 jam; konfirmasi setelah lewat ditolak | Membuat batas waktu konsisten untuk backend dan UI |
| A-05 | Usulan pembatalan seluruh ruangan pada setiap perubahan jadwal sudah digantikan D-33 | Gunakan kaitan pemakaian per jadwal |
| A-06 | Arsip hanya-baca melalui UI normal | Menjaga data antarperiode |
| A-07 | Pembatalan/penonaktifan menggantikan hapus permanen | Mendukung audit dan pemulihan |
| A-08 | Entitas, RLS, transaksi, lock, constraint, audit dalam spesifikasi teknis | Menegakkan kebutuhan produk saat akses bersamaan |
| A-09 | Satu periode utama per proker | Mempermudah kalender awal; lintas periode perlu keputusan |
| A-10 | Susunan halaman, desain mengutamakan HP, label, dan kondisi UI | Dasar rancangan sebelum visual final |
| A-11 | TypeScript, Tailwind, dan shadcn/ui melengkapi stack utama | Pilihan login Google melalui Supabase Auth ditetapkan melalui delegasi D-36 |
| A-12 | Pengembangan lokal + satu proyek Free untuk pilot | Mengurangi biaya; pemisahan data tetap diperlukan |
| A-13 | Bootstrap admin pertama secara manual; admin BEM aktif mengelola penerus lewat jalur terkontrol | Tidak membuka pendaftaran admin publik |
| A-14 | Token, tipografi, layout responsif, dan komponen dalam DESIGN.md | Adaptasi acuan Cal.com (D-38) ke kalender proker dan pemakaian ruangan; tinjau lewat prototipe |
| A-15 | Rincian UI_REVISION_PLAN.md: logo 28 px overlap 6 px maksimal empat, detail bulan berupa halaman, warna pengelola utama untuk kolaborasi, overflow tiga bar, Senin–Minggu, default Agenda pada HP | Diterapkan pada prototipe melalui D-44 untuk review; palet aktif mengikuti D-43, detail visual masih dapat direvisi |
| A-16 | Susunan layar, penanda presisi/rentang terbuka, modal revisi bertahap, pemisahan kondisi pemakaian dari izin, dan rancangan konseptual dalam TIMELINE_UX_PLAN.md | Terjemahan D-46–D-49 untuk review; belum implementasi atau keputusan schema final |
| A-17 | Petrol Teal, Lagoon Teal, atau Evergreen Teal serta pengurangan bidang warna; perbandingan pada DESIGN.md dan prototype/design-exploration/teal-options.html | Menjawab permintaan karakter teal baru; belum diterapkan pada token produk |
| A-18 | Iris, Butter Yellow, atau Dusty Rose; perbandingan pada DESIGN.md dan prototype/design-exploration/accent-options.html | Eksplorasi aktif setelah penolakan keluarga teal D-52; belum keputusan warna final |
| A-19 | Cobalt Blue, Signal Red, atau Acid Lime dengan aksen solid terbatas dan panel netral; prototype/design-exploration/bold-options.html | Mengikuti pilihan clean, tegas, sedikit playful; A-17/A-18 sudah ditolak, A-19 belum dipilih |
| A-20 | Cornflower Blue, Azure Blue, Indigo Blue; prototype/design-exploration/blue-options.html | Eksplorasi aktif mengikuti keluarga blue D-53; token produk belum diganti |
| A-21 | Riset ultramarine Yves Klein, pasangan warna Dropbox, dan motif identitas SPIN × MUBI; prototype/design-exploration/blue-references.html | Alternatif A-20 belum cocok; mencari karakter dari pasangan warna dan penanda sendiri. Nilai yang bukan token sumber diberi label usulan Orka |

## Q: pertanyaan terbuka

Ini daftar pekerjaan review, bukan permintaan agar pengguna menjawab semuanya sebelum pekerjaan lain dapat berjalan. Gunakan data fiktif/default yang ditandai hanya untuk prototipe. Jangan mengubah Q menjadi keputusan D tanpa jawaban pengguna.

| ID | Pertanyaan | Kapan dibutuhkan | Usulan sementara |
| --- | --- | --- | --- |
| Q-01 | Nama kampus, zona waktu, bulan awal akademik, daftar ormawa/ruangan sebenarnya? Nama produk sudah ditetapkan: Orka (D-32). | Konfigurasi dan sebelum pilot | Data kampus fiktif yang ditandai; Asia/Jakarta hanya usulan |
| Q-02 | Google saja melalui akun resmi bersama (D-36/D-37). Apakah seluruh ormawa sudah memiliki akun Google resmi yang dapat digunakan? | Validasi saat persiapan pilot | Siapkan akun resmi sebelum pemberian kewenangan; alternatif hanya jika ada kendala nyata |
| Q-03 | Selesai: kontak hanya untuk PIC/BEM terverifikasi dengan persetujuan pemilik nomor (D-35) | Sudah diputuskan | Terapkan pembatasan pada database/API |
| Q-04 | Bagaimana pengganti ruangan yang sebagian beririsan dengan slot approved lama? Cakupan pembatalan jadwal sudah diputuskan D-33 | Sebelum implementasi pengganti beririsan | Tanpa pengecualian constraint approved |
| Q-05 | Siapa admin BEM pertama/penerus dan apakah BEM boleh mengoreksi status langsung saat sengketa? | Sebelum fitur admin/sengketa final | Bootstrap terkontrol; PIC mengoreksi miliknya, BEM mencatat hasil |
| Q-06 | Pengerjaan lintas periode sudah diizinkan D-46. Bagaimana pelaksanaan lintas periode dan batas koreksi arsip? | Sebelum integrasi lintas periode/arsip | Jangan menggandakan proker atau membuang jadwal; aturan arsip belum final |
| Q-07 | Hitungan unik sudah D-46. Setuju dengan interval berdampingan dan 168 jam pada A-02/A-04? | Review aturan sebelum implementasi terkait | Pakai untuk contoh/prototipe; dua definisi waktu belum keputusan pengguna |
| Q-08 | Siapa pemegang akun layanan, pemulih akses, dan penanggung jawab pencadangan? | Sebelum membuat layanan/pilot | Kepemilikan yang bisa diteruskan; tidak hanya satu akun pribadi tanpa penerus |
| Q-09 | Acuan Cal.com sudah dipilih (D-38). Apakah rincian A-14 sesuai saat review prototipe; bagaimana logo, nama domain, dan perangkat prioritas final? | Sebelum desain visual final | DESIGN.md sebagai draf; Bahasa Indonesia, web responsif, alamat bawaan hosting |
| Q-10 | Bagaimana hitungan pengerjaan per bulan saat akhir belum pasti, serta validasi campuran presisi bulan/tanggal? | Sebelum integrasi hitungan/validasi timeline | Tampilkan ketidakpastian, jangan isi semua bulan mendatang atau mengarang tanggal; fixture review eksplisit |
| Q-11 | Bagaimana rentang/penutupan tumpang tindih, koreksi/pencabutan oleh BEM, serta konfirmasi izin ulang dan pelepasan penanda penyesuaian? | Sebelum integrasi ruangan tidak tersedia | Penutupan memblokir pengajuan; riwayat dan status izin lama terpisah; tidak ada pemulihan otomatis |
| Q-12 | Bagaimana PIC mencatat sesi benar-benar terlaksana dan koreksi historisnya? | Sebelum integrasi hasil pelaksanaan | Jangan menyimpulkan terlaksana hanya karena tanggal lewat; prototipe memakai skenario eksplisit |

## Risiko yang perlu diuji

Discovery setelah D-45 sudah menghasilkan D-46–D-49. Pertanyaan turunan yang belum diputuskan dibatasi pada Q-06 dan Q-10–Q-12; tidak menahan rancangan visual dengan skenario eksplisit.

- PIC tidak memperbarui: kalender tidak lengkap dan rencana batal otomatis. Jelaskan proses sebelum pilot.
- Tanpa verifikasi kampus/bukti: status approved tetap laporan PIC, bukan bukti legal peminjaman.
- Kalender tidak mencakup semua kegiatan non-ormawa: slot kosong belum tentu tersedia.
- Pembatalan ruangan pada jadwal yang berubah atau seluruh proker yang dibatalkan: tampilkan dampak, audit, dan koordinasi eksternal.
- Free tier dijeda/kuota habis: layanan dan otomatisasi bisa berhenti; siapkan prosedur pemulihan.
- Dua PIC menyimpan bersamaan: perlu penegakan database, bukan hanya pemeriksaan frontend.
- Pergantian angkatan: akses, kontak, dan pemilik akun layanan harus dapat diteruskan.
