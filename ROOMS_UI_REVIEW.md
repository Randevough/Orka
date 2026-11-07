# Review paket UI pemakaian ruangan

Tanggal: 7 November 2026. Acuan D-39/D-55/D-56 dan tahap 2–4 IMPLEMENTATION_PLAN.md. Paket 1 tersedia untuk review lokal; fase UI/UX keseluruhan belum selesai.

## Hasil

- Navigasi Pemakaian ruangan membuka halaman agenda tersendiri. Kalender, Timeline dan dialog sebelumnya dipertahankan. Judul dokumen dan navigasi aktif mengikuti halaman.
- Agenda menampilkan rentang tanggal, filter ruangan/ormawa, status izin, pembaruan terakhir dan detail. Pilihan membuka dataset statis yang disiapkan untuk dua minggu, dua ruangan dan contoh filter Hima A; bukan pemilih tanggal bebas atau query data.
- Detail memisahkan interval pemakaian termasuk persiapan/beres-beres dari sesi proker. Semua lima status izin tersedia; penanda peninjauan dan perlu penyesuaian terpisah dari izin. Kontak pribadi tidak ditampilkan kepada publik.
- Informasi penutupan aula 20–22 November memakai skenario fiktif yang sama dengan paket koordinasi ruangan. Dataset ruangan mencakup pemakaian mandiri dan kasus review khusus; tidak mengubah hitungan kalender proker utama.
- Publik membuka simulasi masuk lewat Masuk untuk mencatat. Formulir PIC dibuka melalui Ruang uji UI, tanpa memberikan akses nyata.
- Formulir: ormawa pencatat tetap Hima A, keperluan, ruangan, mulai/selesai, pemakaian mandiri atau satu sesi proker. Isian dipertahankan saat kembali dari tinjauan; kontak menggunakan penjelasan kontak resmi ormawa, bukan nomor pribadi baru.
- Tinjauan menampilkan input sementara dan kebijakan 7 hari. Simpan membuka hasil simulasi berlabel; daftar tidak berubah. Pilihan hasil mencakup rencana lain beririsan, izin disetujui, penutupan, gagal simpan dan akses dicabut.
- Skenario memuat, kosong, gagal muat dengan coba lagi, serta arsip kosong hanya-baca tersedia. Arsip tidak menyediakan tombol formulir PIC aktif. Arsip berisi catatan historis belum dibuat pada paket ini.

## Cara mencoba

1. Jalankan `npm run dev` dari prototype/ dan buka alamat Vite.
2. Pilih Pemakaian ruangan; coba filter dan Lihat detail.
3. Buka Ruang uji UI di bawah halaman. Pilih skenario halaman atau hasil tinjauan PIC.
4. Buka formulir pemakaian · PIC → isi rencana → tinjau → kembali atau simpan simulasi.

Skenario konflik/penutupan/akses dicabut sudah ditentukan oleh pemilih review. Mengganti input tidak menghitung ulang hasil atau melepaskan blokir. Pengujian tanggal, kesesuaian sesi dengan interval, zona waktu, bentrokan dan kewenangan menunggu fase data. Isian kosong juga tidak menjalankan validasi bisnis pada prototipe ini.

## Pemeriksaan

| Area | Bukti dan batas |
| --- | --- |
| Build dan format | `npm run build`, `npm run check`, `npm run format:check` lulus |
| Dataset statis | Check memastikan ID unik, cakupan kelima status, indeks valid, filter/ruangan/ormawa/rentang konsisten, dan penanda tambahan tidak mengganti status izin |
| UX-P01, paket ruangan | Agenda → detail → tutup; navigasi kalender ↔ ruangan; tombol masuk membuka dialog akses |
| UX-P03/04, formulir | Input diubah; kaitan sesi dipilih; kembali mempertahankan input; tinjauan memfokuskan judul; Shift+Tab dari judul kembali ke tombol terakhir; Escape pada dropdown tidak menutup dialog |
| UX-P05, keadaan | Gagal muat dan coba lagi, kosong, memuat, arsip; semua opsi hasil tinjauan dicoba. Izin disetujui/penutupan/akses dicabut memblokir Simpan; rencana lain beririsan tetap mengizinkan; gagal simpan mempertahankan isian |
| UX-P06, responsif | Lebar 360, 768, 1280 dan mendatar 812 × 375 diperiksa; tidak ditemukan overflow horizontal halaman. Pada formulir 360 px, lebar scroll dialog sama dengan lebar kontennya |
| UX-P07, sebagian | Fokus dialog/dropdown diperiksa; memakai komponen dan token yang sama. Check kontras token lulus. Belum audit pembaca layar, zoom 200%, reduced motion OS, atau keyboard layar perangkat fisik |
| UX-P08 | Check sumber melarang API/Auth, persistence dan aturan waktu nyata. Hasil simpan menyebut simulasi dan daftar tidak berubah; log browser akhir tanpa warning/error |

Tidak menyatakan seluruh UX-P atau AC backend lulus. Build memberi peringatan chunk statis sekitar 561 kB (gzip sekitar 127 kB); belum dilakukan pemisahan bundle.

## Berikutnya

Review paket ruangan ini, lalu lanjut paket Kelola ormawa/PIC: daftar milik sendiri, tambah/edit proker, pembaruan izin, konfirmasi dan riwayat. Paket BEM menyusul. Database, login Google nyata, kontak nyata, penyimpanan, pengujian konkurensi dan deployment belum dibuat.

## Bukti tampilan

- [Agenda desktop](prototype/review/rooms-desktop.jpg)
- [Agenda HP](prototype/review/rooms-mobile.jpg)
