# Review ultramarine + ink blue Orka

Catatan historis D-54. Palet aktif sudah diganti melalui D-55 menjadi ultramarine + paper dengan teks lebih besar dan dropdown solid; lihat [UI_READABILITY_REVIEW.md](UI_READABILITY_REVIEW.md). Angka dan screenshot di bawah menggambarkan paket D-54.

Tanggal: 31 Oktober 2026. Otorisasi D-54: pengguna meminta kombinasi ultramarine dan ink blue dibuat bekerja pada prototipe. Rincian token adalah pilihan implementasi agent untuk direview. Fondasi UI, data fiktif statis, dan batas D-39 tetap berlaku.

## Hasil penerapan

- Ultramarine `#002FA7`: aksen kecil, titik wordmark, angka pengerjaan, fokus dan penanda aktif.
- Ink blue `#151B3C`: teks utama, judul dan tombol utama; hover tombol `#252E55`.
- Kanvas putih kertas `#F8F7F4`, panel putih. Navigasi aktif bergaris ultramarine, ikon pengantar/periode memakai wadah putih. Detail pengerjaan memakai panel putih dan garis kecil di sisi kiri.
- Warna kategori ormawa ditenangkan menjadi ultramarine/indigo ink/steel/slate/deep ink; bar memakai bidang mendekati netral dan garis identitas. Nama/logo dan legenda tetap tersedia karena tone berdekatan tidak cukup sebagai pembeda tunggal.
- Logo Google, Slack, Figma, Discord dan GitHub tetap memakai warna internal asli; fallback masih inisial ormawa. Key class lama violet/rose/ochre/teal adalah identifier internal, bukan hue aktif.
- Info ink abu-abu, approved slate, warning cokelat redup dan danger berry redup. Label tetap menjadi sumber makna, bukan warna.
- DESIGN.md dirapikan menjadi satu palet aktif. Opsi teal/pastel/blue sebelumnya dipertahankan hanya pada riwayat eksplorasi.

## Pemeriksaan yang dijalankan

`npm run check` dan `npm run build` lulus. TypeScript/build serta konsistensi fixture/batas tanpa akses data tetap lulus. Build masih memberi peringatan ukuran chunk statis sekitar 541 kB, sebagaimana paket UI sebelumnya.

| Pasangan | Kontras |
| --- | --- |
| Ink blue / putih | 16,75:1 |
| Putih / tombol ink blue | 16,75:1 |
| Putih / hover tombol | 13,12:1 |
| Muted / kanvas | 5,79:1 |
| Fokus ultramarine / putih | 10,69:1 |
| Fokus / accent-soft | 9,89:1 |
| Info / bidang info | 6,58:1 |
| Warning / bidang warning | 5,53:1 |
| Success / bidang success | 7,46:1 |
| Danger / bidang danger | 5,36:1 |

Lima tone teks ormawa pada bidang masing-masing: 10,07 / 6,74 / 5,71 / 5,29 / 11,50:1. Ini pengukuran pasangan token, bukan sertifikasi seluruh UI.

Walkthrough browser memeriksa Ringkasan, kalender detail, status dalam dialog, lebar 1280 dan 360 px. Tidak ada overflow horizontal pada kondisi yang diperiksa. Computed style memastikan judul/tombol memakai ink blue dan titik wordmark ultramarine; warna kalender serta status ikut berubah. Dialog komponen dibuka/ditutup dengan Escape. Tidak ada perubahan mekanisme dropdown/fokus atau logika data pada revisi ini.

Zoom 200%, screen reader, reduced motion OS dan keyboard layar HP belum diuji ulang. AC keamanan/konkurensi tetap belum diuji karena tidak ada integrasi data.

## Bukti visual

- [Ringkasan desktop](prototype/review/ultramarine-ink-desktop.jpg)
- [Kalender detail](prototype/review/ultramarine-ink-calendar.jpg)
- [Ringkasan HP](prototype/review/ultramarine-ink-mobile.jpg)
- [Status dan dialog HP](prototype/review/ultramarine-ink-status.jpg)

Tidak ada deployment. Perubahan palet tidak menyimpan data atau mengubah aturan proker/izin.
