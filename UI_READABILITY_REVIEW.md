# Review keterbacaan, dropdown dan palet D-55

Tanggal: 31 Oktober 2026. Paket UI statis; acuan visual aktif DESIGN.md. D-55 menyederhanakan palet D-54 dan memperbaiki teks/dropdown, tanpa integrasi data atau perubahan aturan bisnis.

## Perubahan

- Isi proker dan kontrol utama default 16 px; label 15 px; keterangan, badge, legenda dan kalender yang sebelumnya 8–12 px kini minimal 14 px melalui token terpusat. Tidak mengganti font Geist.
- Ruang kalender ikut membesar: bar 32 px, minggu lebih tinggi. Timeline memiliki area horizontal dengan kolom identitas 280 px, bar 44 px, serta daftar HP. Teks panjang tetap bisa dibaca melalui detail.
- Dropdown: trigger hover/terbuka dan item selected/highlighted/hover/pressed memakai ultramarine solid dengan teks putih. Deskripsi, check dan ikon garis ikut putih; gambar logo brand mempertahankan warna aslinya.
- Item memakai padding 14 px, margin atas/bawah 4 px, tinggi minimal 52 px. Panel padding 8 px, viewport padding vertikal 4 px. Fokus keyboard memiliki garis putih di dalam item.
- Palet aktif ultramarine `#002FA7`, paper `#F8F6F0`, panel putih, charcoal `#252525`. Ink blue serta lima tone biru kategori tidak lagi dipakai. Nama/logo menjadi pembeda penyelenggara, legenda disesuaikan.
- Info `#002FA7 / #F0F3FC`, warning amber `#855C09 / #FBF3D9`, danger merah bata `#AD3438 / #FCF0EF`, success zaitun redup `#46614C / #F0F5EF`.
- Tombol modal panjang dapat turun baris di HP agar tidak terpotong saat font diperbesar.

## Pemeriksaan

Check dan build lulus. Rasio teks/bidang: utama/putih 15,33:1, putih/ultramarine 10,69:1, info 9,64:1, warning 5,36:1, danger 5,67:1, success 6,18:1. Muted/paper 5,72:1. Semua warna bar memakai pasangan yang sama, rasio 9,97:1.

Walkthrough browser:

- 1280 px: Ringkasan tidak meluber horizontal; computed style mengonfirmasi isi proker 16 px, metadata/badge 14 px, dropdown 16 px.
- Dropdown tahun akademik: selected serta highlight ArrowDown biru solid/putih; deskripsi selected ikut putih. Padding/margin aktual sesuai spesifikasi. Escape menutup pilihan.
- 360 px: Ringkasan, kalender/Agenda, formulir revisi dan tinjauan dampak tidak meluber horizontal. Tidak ditemukan teks daun terlihat di dialog formulir dengan ukuran di bawah 14 px pada kondisi yang diperiksa.
- Dropdown di dalam modal: selected biru solid, Escape menutup dropdown dan mempertahankan dialog. Tombol dampak panjang tersusun dua baris terpisah yang tetap muat.
- 768 px: Timeline menampung scroll pada area waktunya, tanpa overflow halaman.
- Badge status diperiksa pada dialog katalog komponen: label/bidang mengikuti pasangan baru dan ukuran 14 px.

Hover pointer dan pressed memakai aturan CSS yang sama dengan selected/highlighted. Computed style yang diperiksa secara interaktif adalah keadaan selected, open, serta highlight keyboard; tidak mengklaim pengujian pointer menyeluruh. Zoom 200%, screen reader, reduced motion OS dan keyboard layar HP belum diuji ulang. Ini bukan kelulusan seluruh UX-P/UX-T atau AC backend.

## Bukti

- [Desktop](prototype/review/paper-type-desktop.jpg)
- [Dropdown solid](prototype/review/paper-type-dropdown.jpg)
- [Formulir HP](prototype/review/paper-type-mobile-form.jpg)
- [Status](prototype/review/paper-type-status.jpg)

Tidak ada API, persistence, deployment atau perubahan data operasional. Peringatan chunk statis sekitar 541 kB tetap seperti paket sebelumnya.
