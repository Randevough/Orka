# Instruksi bagi AI agent

## Konteks kerja

Nama proyek dan produk adalah Orka (D-32).

Bangun pemahaman dari README, PRD, aturan bisnis, dan daftar keputusan sebelum mengerjakan perubahan. Bahasa antarmuka dan dokumentasi produk adalah Bahasa Indonesia. Gunakan istilah ormawa, proker, PIC, dan BEM secara konsisten.

Dokumen ini berada dalam paket planning. Jika paket dipindah ke repositori aplikasi, tempatkan AGENTS.md di akar repositori dan dokumen lainnya di docs/, lalu sesuaikan tautan. Jangan berasumsi instruksi ini otomatis berlaku di direktori induk paket.

## Otorisasi saat ini

D-55 menggantikan palet D-54 dengan ultramarine + paper, tipografi lebih besar, dropdown solid dan kalibrasi status. Acuan aktif DESIGN.md dan UI_READABILITY_REVIEW.md; catatan D-54 di bawah adalah riwayat.

D-54 mengizinkan penerapan ultramarine + ink blue pada prototipe. Palet aktif dan batasnya mengikuti DESIGN.md/PALETTE_REVIEW.md; D-43 menjadi riwayat warna, bukan token aktif.

D-50 mengizinkan paket prototipe Timeline dan penyesuaian berdasarkan TIMELINE_UX_PLAN.md. Hasil parsial dan batasnya ada di TIMELINE_UI_REVIEW.md; tetap tanpa integrasi data, persistence, atau mesin aturan bisnis di browser.

Pemilik produk telah mengizinkan prototipe UI/UX (D-40), perubahan palet D-43, serta revisi dropdown custom/logo bertumpuk/kalender detail (D-44), dengan contoh statis di prototype/. Ikuti batas fase D-39. Jangan membuat integrasi data, migration SQL, proyek cloud, atau deployment hanya karena roadmap memuatnya. Lanjutkan cakupan lain ketika diminta.

## Saat implementasi sudah diminta

Pengecualian fase UI/UX (D-39): jika yang diminta adalah prototipe antarmuka, ikuti tahap 0–4 IMPLEMENTATION_PLAN.md. Kerjakan visual, navigasi, animasi klik, modal, dan state lokal presentasi dengan skenario fiktif statis. Jangan menambahkan API/Auth nyata, database, persistence, atau logika aturan bisnis. Kewajiban satu alur lengkap database–hak akses–UI di bawah berlaku saat integrasi data diminta, bukan pada prototipe UI/UX. Kelulusan prototipe tidak membuktikan keamanan atau konkurensi aplikasi. Permintaan mengubah rencana saja bukan instruksi mulai coding.

1. Baca dokumen yang terkait fitur dan acceptance criteria-nya.
2. Nyatakan cakupan pekerjaan dan A/Q yang relevan. Tanyakan hanya keputusan yang memblokir pekerjaan tersebut; bagian lain dapat berlanjut.
3. Gunakan React + Vite + TypeScript, Supabase, dan Cloudflare Pages. Jangan mengganti stack ke Next.js, MongoDB, atau backend terpisah tanpa arahan pengguna.
4. Kerjakan satu alur lengkap, termasuk database, hak akses, UI, dan pengujian yang diperlukan.
5. Uji aturan penting dengan database nyata di lingkungan pengembangan. Mock UI tidak membuktikan keamanan atau pencegahan bentrokan.
6. Laporkan hasil, pemeriksaan yang dilakukan, keterbatasan, dan perubahan dokumen.

## Aturan implementasi

- Kunci otorisasi ada di database. Menyembunyikan tombol tidak menggantikan RLS atau pemeriksaan dalam fungsi database.
- Jangan menaruh service-role key, kredensial OAuth, atau password database di frontend maupun variabel VITE_.
- Semua perubahan pemakaian ruangan memakai jalur transaksi yang sama agar pemeriksaan bentrokan tidak bisa dilewati lewat REST langsung.
- Pembatalan terkait proker, pelepasan slot, dan pencatatan audit harus berhasil bersama atau gagal bersama.
- D-37 menggantikan larangan akun bersama: akses pengelolaan ormawa memakai akun Google resmi bersama milik ormawa yang diverifikasi BEM. Serah terima akses dilakukan di luar aplikasi; jangan menyimpan password atau kode pemulihan di Orka/dokumen proyek. Audit mengidentifikasi akun organisasi, bukan individu pemakainya.
- Jangan menambah pengingat, unggah bukti izin, chat internal, AI penjadwalan, atau tracking individu. Fitur tersebut tidak termasuk versi awal.
- Jangan menambah Realtime, ORM, state manager global, atau Edge Function jika kebutuhan fitur sudah terpenuhi dengan fasilitas yang ada.
- Jangan memakai data pribadi atau nama kampus rekaan sebagai data faktual. Data contoh harus ditandai fiktif.
- Batasi hasil kalender sesuai periode dan filter. Jangan memuat seluruh arsip untuk setiap kunjungan.
- Jangan memakai ping buatan untuk menghindari kebijakan penjedaan paket gratis.

## Standar pemeliharaan

Usulan struktur modul ada di ARCHITECTURE.md. Pusatkan tipe status, label, dan aturan waktu; hindari menyalin logika bentrokan ke tiap halaman. Simpan perubahan database sebagai migration berversi ketika implementasi dimulai.

Perubahan aturan bisnis wajib menyertakan perubahan acceptance criteria. Pengujian minimum berfokus pada izin akses, konkurensi pemakaian ruangan, pembatalan, dan tanggal. Hindari tes yang hanya mengulang struktur komponen.

## Penyerahan

Jangan menyatakan selesai jika akses lintas ormawa masih bocor, dua persetujuan bertabrakan masih bisa tersimpan, atau fitur hanya berjalan dengan akses administrator. Jangan menyatakan gratis selamanya. Jelaskan kuota dan kondisi operasi berdasarkan sumber resmi terbaru.
