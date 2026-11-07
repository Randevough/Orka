# Kriteria penerimaan dan skenario uji

Dokumen ini adalah spesifikasi pengujian aplikasi yang akan datang. Belum ada aplikasi operasional atau pengujian backend yang dijalankan. Prototipe UI paket pertama sudah diperiksa secara terbatas; lihat [PROTOTYPE_PROGRESS.md](PROTOTYPE_PROGRESS.md). Kriteria yang bergantung pada A/Q baru menjadi final setelah keputusan terkait ditetapkan.

Semua contoh memakai organisasi/ruangan fiktif. Kriteria kritis harus diuji melalui database/API nyata pada lingkungan pengembangan, termasuk permintaan bersamaan.

| ID | Acuan | Skenario dan hasil yang diharapkan |
| --- | --- | --- |
| AC-01 | FR-01/02 | Pengunjung tanpa login melihat 12 bulan periode terpilih dan detail bulan; filter ormawa memengaruhi daftar serta hitungan |
| AC-02 | FR-03 | PIC memasukkan proker hanya-bulan; kalender tidak menampilkan tanggal pasti rekaan |
| AC-03 | FR-04, D-46 | Satu proker punya dua jadwal dalam bulan sama dan satu jadwal bulan berikutnya; hitungan pelaksanaan unik satu pada masing-masing bulan |
| AC-04 | FR-05 | Kolaborasi tercatat sekali, semua penyelenggara terlihat, hanya PIC pemilik dapat mengubah |
| AC-05 | BR-05 | Dua proker pada waktu sama boleh tersimpan; tidak ada blok konflik SDM |
| AC-06 | FR-06/07 | Rencana ruangan baru langsung terlihat publik, label belum diajukan, lalu PIC dapat melaporkan pending/approved tanpa unggah bukti |
| AC-07 | BR-09 | Ruangan sama 09.00 sampai 11.00 dan 10.00 sampai 12.00 bertabrakan; waktu sama ruangan berbeda tidak |
| AC-08 | A-02 | Ruangan sama 09.00 sampai 10.00 dan 10.00 sampai 11.00 tidak bertabrakan |
| AC-09 | BR-11 | Dua rencana planned/pending bertabrakan dapat disimpan dengan peringatan |
| AC-10 | BR-12 | Ada approved pada 09.00 sampai 11.00; pembuatan baru atau pemindahan planned/pending ke slot itu ditolak dari UI dan API |
| AC-11 | BR-13 | Dua rencana sudah ada; setelah yang pertama approved, persetujuan kedua ditahan dan laporan peninjauan tersimpan |
| AC-12 | BR-12/13 | Dua permintaan persetujuan bersamaan pada slot yang sama menghasilkan maksimal satu approved; tidak ada persetujuan ganda meski UI keduanya semula melihat slot bebas |
| AC-13 | BR-12 | Pembuatan rencana dan persetujuan pemakaian lain berjalan bersamaan; urutan transaksi konsisten dan tidak melewati aturan approved |
| AC-14 | BR-14, D-37 | Audit perubahan status menyimpan akun resmi dan waktu dari konteks server; actor palsu dari browser tidak diterima. Audit tidak mengklaim identitas pengurus individual pengguna akun bersama |
| AC-15 | BR-16/18 | planned/pending sebelum 168 jam masih aktif; tepat melewati batas dianggap batal; approved tetap aktif meski lama tidak diperbarui |
| AC-16 | BR-18 | Membuka halaman, pembacaan API, dan pekerjaan sistem tidak memperpanjang expires_at |
| AC-17 | BR-19/20 | Cron tertunda: pembacaan dan mutasi tetap menganggap rencana lewat tenggat batal; konfirmasi terlambat tidak menghidupkannya |
| AC-18 | BR-19 | Cron dijalankan ulang setelah sebagian pekerjaan selesai; tidak ada pembatalan/audit ganda |
| AC-19 | BR-17 | Tidak ada pengingat otomatis; aturan 7 hari dan waktu kedaluwarsa terlihat saat membuat/mengelola rencana |
| AC-20 | BR-21 | Pemakaian approved dibuatkan pengganti nonberirisan; slot lama tetap sampai PIC membatalkannya; tidak diam-diam memindahkan izin |
| AC-21 | BR-22/23, D-33/D-49 | Ubah/hapus jadwal A: hanya pemakaian nonterminal jadwal A dibatalkan, termasuk approved kolaborator; pemakaian jadwal B tetap. Batalkan seluruh proker sebelum pelaksanaan: seluruh pemakaian nonterminal terkait dibatalkan. Pembatalan sisa setelah sebagian terlaksana mengikuti AC-39 |
| AC-22 | BR-25, D-33 | Edit nama atau tambah jadwal baru tidak membatalkan pemakaian jadwal lain. API menolak kaitan pemakaian ke jadwal milik proker berbeda atau kaitan proker tanpa jadwal |
| AC-23 | BR-26 | Sisipkan kegagalan di tengah perubahan proker; jadwal, pemakaian, dan audit seluruhnya rollback |
| AC-24 | BR-26 | Data pemakaian terkait berubah setelah pratinjau dampak; simpan menolak versi lama dan meminta konfirmasi dampak terbaru |
| AC-25 | FR-13, D-36 | Masuk dengan Google berhasil; login gagal/dibatalkan dapat dicoba ulang tanpa pemberian hak. Akun belum diverifikasi tidak bisa menulis; PIC A tidak bisa menulis milik B dengan mengubah ID pada API |
| AC-26 | BR-27/28, D-37 | Dua verifikasi akun resmi bersamaan tidak menghasilkan dua akun aktif untuk satu ormawa atau satu akun untuk dua ormawa. Akun dicabut tidak dapat menulis lewat sesi lama. Pergantian pengurus dengan akun sama mempertahankan data/arsip; pengakhiran sesi Orka lama diuji melalui API, bukan hanya logout UI atau penggantian password Google |
| AC-27 | FR-14 | Browser tidak dapat menulis/menghapus audit atau mengangkat diri menjadi admin |
| AC-28 | FR-15, A-06 | Arsip tetap terbaca; edit normal periode arsip ditolak sesuai keputusan arsip final |
| AC-29 | BR-15 | Slot tanpa catatan tidak diberi klaim pasti tersedia; gagal memuat tidak ditampilkan sebagai kosong |
| AC-30 | ACCESS_CONTROL, D-35 | Publik dan akun belum diverifikasi tidak dapat membaca nomor/tautan WhatsApp lewat API langsung; PIC/BEM aktif dapat membaca kontak yang disetujui. Query publik tidak mengungkap email, user_id PIC, atau audit mentah |
| AC-31 | UX_SPEC | Form dapat dipakai dengan keyboard; status tidak dibedakan hanya lewat warna; daftar kalender terbaca di HP |
| AC-32 | ARCHITECTURE | Hasil build tidak memuat service-role key/secret; reload tautan halaman dalam Cloudflare Pages tidak menjadi 404 |
| AC-33 | Q-01 | Pergantian hari/bulan dan jadwal melintasi tengah malam memakai zona kampus secara konsisten |
| AC-34 | BR-32/33, D-46 | Timeline opsional dan presisi bulan tidak mengarang tanggal; pelaksanaan di luar rentang terisi meminta koreksi eksplisit. Perubahan pengerjaan saja tidak membatalkan pemakaian. Validasi campuran presisi menunggu Q-10 |
| AC-35 | BR-04/34, D-46 | Hitung proker unik terpisah per indikator pengerjaan/pelaksanaan; filter dan kolaborasi tidak menggandakan. Rentang lintas periode tetap satu proker dengan rentang lengkap; timeline kosong ditandai. Rentang terbuka menunggu Q-10 |
| AC-36 | BR-35/36, D-47 | Proposal belum disetujui: revisi proker sama, awal pengerjaan dipertahankan. Penundaan tanpa pengganti mengarsipkan tanggal lama dari kalender aktif, membatalkan pemakaian lama dan melepas slot secara atomik. Penolakan proposal tidak otomatis membatalkan proker |
| AC-37 | BR-38–40, D-48 | PIC tidak dapat membuat penutupan global lewat API; BEM dapat mencatat. Semua pemakaian beririsan ditandai perlu penyesuaian tanpa mengganti status izin/proker. PIC dapat memperluas revisi sesuai haknya, tidak mengabaikan dampak wajib |
| AC-38 | BR-39/42, Q-11 | Pengajuan/pemindahan/persetujuan saat penutupan ditolak lewat UI/API, termasuk jika berjalan bersamaan dengan pencatatan penutupan. Pembukaan kembali tidak memulihkan catatan batal/diganti atau otomatis membuktikan izin ulang. Rincian penyelesaian menunggu Q-11 |
| AC-39 | BR-37, D-49, Q-12 | Dua sesi terlaksana dan dua dibatalkan: hasil lama serta riwayat pemakaiannya utuh, hanya sisa beserta pemakaian nonterminal terkait dibatalkan. Ringkasan selesai sebagian; tanggal lewat saja tidak membuktikan terlaksana |
| AC-40 | BR-41/42, D-48/49 | Ganti ruang dengan waktu sama tidak mengubah pelaksanaan; izin pengganti tidak mewarisi approved. Proker lain berbarengan hanya menjadi informasi, tidak mewajibkan persetujuan BEM karena kepadatan |

AC-34–AC-40 adalah target aplikasi, seluruhnya belum diuji. AC yang menunggu Q belum final untuk integrasi. Uji konkurensi dan rollback wajib mencakup penutupan, pembuatan pemakaian, revisi, serta perubahan izin melalui jalur transaksi yang sama.

## Kriteria rancangan dan prototipe Timeline

Rancangan ada di [TIMELINE_UX_PLAN.md](TIMELINE_UX_PLAN.md). Prototipe D-50 telah menerapkan paket UI statis; status masing-masing UX-T dan batas pemeriksaannya ada di [TIMELINE_UI_REVIEW.md](TIMELINE_UI_REVIEW.md). UX-T hanya menilai presentasi skenario, bukan kebenaran aturan backend.

| ID | Hasil yang direview |
| --- | --- |
| UX-T01 | Ringkasan memisahkan dua indikator tanpa menjumlahkan; timeline kosong/akhir belum pasti terlihat; logo dan filter konsisten pada skenario |
| UX-T02 | Timeline baris per proker, presisi bulan, kolaborasi satu baris, lintas periode dengan penanda lanjut, serta daftar HP dapat dibaca tanpa drag |
| UX-T03 | Kalender hanya menunjukkan pelaksanaan; rentang persiapan tidak memenuhi grid, sesi ditunda tidak muncul aktif pada tanggal lama |
| UX-T04 | Detail memisahkan pengerjaan, pelaksanaan, izin dan perlu penyesuaian; sebagian terlaksana/ditunda/batal tidak disamakan |
| UX-T05 | Modal revisi memperlihatkan nilai lama/baru dan dampak per sesi/ruangan; pengerjaan saja tidak membatalkan izin pada contoh; kembali mempertahankan input sementara |
| UX-T06 | Skenario penutupan membedakan dampak wajib dan perluasan PIC; pengganti perlu izin baru, pembukaan kembali tidak otomatis memulihkan catatan |
| UX-T07 | TL-S01–TL-S09 dapat direview, termasuk penundaan tanpa tanggal, pembatalan sebagian, konflik versi dan keadaan kosong/gagal; semuanya fixture tanpa CRUD/mesin aturan bisnis |
| UX-T08 | Keyboard, fokus modal/dropdown, reduced motion, kontras dan 360/768/1280 px serta zoom 200% diperiksa; status tidak bergantung warna, tombol HP terjangkau |

## Kriteria prototipe UI/UX (D-39)

UX-P menilai fase antarmuka tanpa logika data pada tahap 0–4 IMPLEMENTATION_PLAN.md. Kriteria ini terpisah dari AC aplikasi di atas. Lulus UX-P tidak membuat AC keamanan, penyimpanan, tanggal, bentrokan, atau pembatalan menjadi lulus. Status pemeriksaan paket pertama tersedia di PROTOTYPE_PROGRESS.md; fase UI/UX keseluruhan belum selesai.

| ID | Skenario dan hasil yang diharapkan |
| --- | --- |
| UX-P01 | Semua layar UX_SPEC yang direncanakan dapat dibuka; alur kalender → bulan → proker dan daftar ruangan → detail → kembali jelas. Tampilan PIC/BEM/akses dapat ditinjau melalui pemilih skenario prototipe yang terpisah dari navigasi produk |
| UX-P02 | Tombol menampilkan hover, pressed/on-click, fokus, disabled, dan loading; aksi memiliki respons navigasi/dialog/simulasi yang jelas, tanpa pergeseran layout atau pengiriman berulang |
| UX-P03 | Modal/popover membuka dan menutup dengan animasi singkat; dialog mengelola fokus, Tab, Escape, scroll, dan pengembalian fokus. Klik berulang tidak meninggalkan overlay atau scroll terkunci; dialog formulir/konfirmasi tidak tertutup karena klik backdrop |
| UX-P04 | Input sementara, select/filter visual, tab, dan pilihan mode jadwal dapat dioperasikan; contoh hasil/error disediakan sebagai skenario statis tanpa validator/perhitungan bisnis atau CRUD |
| UX-P05 | Skenario memuat, kosong, gagal, sukses simulasi, seluruh status ruangan, sengketa, arsip, jadwal tentatif, dan dialog dampak dapat direview; gagal memuat berbeda dari kosong, dan status memakai label selain warna |
| UX-P06 | Halaman, menu, formulir, serta dialog terbaca pada lebar 360/768/1280 CSS px dan zoom 200%; nama panjang/kolaborasi tidak menutupi tindakan; keyboard layar HP tidak menghalangi akses ke tombol dialog |
| UX-P07 | Navigasi keyboard, fokus terlihat, nama aksesibel, kontras aktual sesuai DESIGN.md, dan reduced motion diperiksa. Reduced motion meniadakan translasi/skala dekoratif tanpa menyembunyikan perubahan keadaan |
| UX-P08 | D-45: status fiktif/tidak tersimpan terdokumentasi; penanda preview di tampilan utama dihapus. Simpan hanya membuka hasil simulasi; reload mereset tampilan. Inspeksi kode, storage, dan jaringan memastikan tidak ada API/Auth nyata, persistence, backend palsu, atau logika bentrokan/kedaluwarsa/hak akses. Tombol Google/WhatsApp tidak menghubungi layanan nyata |

Catat hasil per UX-P sebagai lulus, gagal, atau belum diuji beserta viewport/skenario dan bukti relevan. Utamakan walkthrough browser serta pemeriksaan aksesibilitas/kontras yang sesuai; tidak perlu tes yang hanya mengulang struktur komponen atau tes database pada fase tanpa database.

## Kriteria revisi visual dan kalender detail (D-41)

UX-R01–UX-R08 pada [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md) menjadi kriteria review aksen, dropdown custom, logo bertumpuk, kalender rentang, warna kolaborasi, tentatif, aksesibilitas, dan batas skenario statis. Revisi prototipe telah diterapkan melalui D-44; hasil per kriteria dan keterbatasannya ada di [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md). Ini tambahan kriteria UI, bukan perubahan aturan bentrokan/izin atau bukti kelulusan AC backend. Detail A-15 harus ditinjau bersama prototipe ketika revisi diminta.

## Pemeriksaan yang proporsional

- Unit test untuk perhitungan interval, pembentukan bulan, serta batas kedaluwarsa yang dipakai UI.
- Integration test database untuk RLS, transaksi, constraint, konflik versi, dan kondisi bersamaan. Dua transaksi harus benar-benar bersamaan, bukan dua pemanggilan berurutan yang diberi label konkurensi.
- Uji alur pengguna untuk baca kalender, tambah tentatif, rencana ruangan sampai approved, pembatalan terkait proker, dan pencabutan PIC.
- Smoke test pada Cloudflare Pages serta Supabase yang dikonfigurasi untuk uji coba.

Sebelum pilot, catat hasil per AC: lulus, gagal, belum diuji, atau menunggu keputusan. Jangan mengubah “belum diuji” menjadi “lulus” berdasarkan pembacaan kode saja.
