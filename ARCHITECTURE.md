# Rancangan teknis dan hosting

Stack utama sudah dipilih pengguna. Detail implementasi berikut adalah usulan A-08/A-11, bukan kode yang sudah dibuat atau diuji.

D-39 menetapkan fase awal UI/UX tanpa logika data; lihat [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md). Pada prototipe, React/Vite/TypeScript hanya memakai skenario fiktif statis dan state lokal presentasi. Susunan Supabase, Auth, transaksi, dan Cron di bawah berlaku pada fase integrasi data setelah review UI/UX dan instruksi melanjutkan; tidak perlu disiapkan untuk menilai animasi tombol atau modal.

## Susunan layanan

| Lapisan | Pilihan | Tanggung jawab |
| --- | --- | --- |
| Frontend | React + Vite, usulan TypeScript | Kalender, formulir, navigasi, dan tampilan berdasarkan hak pengguna |
| Komponen | Usulan Tailwind CSS + shadcn/ui | Formulir, tabel, dialog, dan kontrol yang konsisten |
| Hosting | Cloudflare Pages | Menyajikan hasil build frontend dan preview perubahan |
| Data | Supabase PostgreSQL | Data operasional, constraint, transaksi, audit, dan query kalender |
| Login | Supabase Auth dengan Google | Google saja untuk versi awal (D-36); hak PIC tetap melalui verifikasi BEM |
| Otorisasi | RLS + fungsi transaksi dengan akses terbatas | Hak PIC/BEM serta perlindungan dari API langsung |
| Otomatisasi | Supabase Cron | Pembatalan rencana kedaluwarsa serta audit sistem |
| Koordinasi | Tautan WhatsApp | Percakapan dilakukan pengguna di luar platform |

Browser memuat frontend dari Cloudflare Pages dan mengakses Supabase lewat SDK. Tidak ada koneksi PostgreSQL langsung dari browser, server Express terpisah, atau API di Cloudflare Pages Functions pada rancangan awal. Cron berjalan di Supabase, bukan mengandalkan laptop pengembang.

D-37 menetapkan satu akun Google resmi bersama per ormawa. Verifikasi BEM mengikat akun tersebut ke satu ormawa; jangan memberi hak dari nama akun, domain email, atau klaim browser saja. Audit mengidentifikasi akun organisasi, bukan individu. Rancang dan uji pengakhiran seluruh sesi Orka pada serah terima sebelum pilot; mekanisme final harus menolak permintaan API dari sesi lama sesuai AC-26. Pergantian password Google tidak menjadi asumsi pencabutan sesi Supabase. Ini kebutuhan rancangan, belum implementasi yang diuji.

## Pembacaan dan perubahan

Pilihan login ditetapkan melalui delegasi pengguna pada 28 Oktober 2026 (D-36). Gunakan alur pengalihan Google OAuth melalui SDK Supabase yang sudah dibutuhkan aplikasi; tidak perlu menambah SDK Google terpisah untuk alur ini. Ini mengurangi jumlah alur formulir, reset password, serta pengiriman email autentikasi yang harus dikelola. Ukuran build dan kecepatan login belum diukur. Konfigurasi OAuth Google, redirect yang diizinkan, dan penyimpanan secret di sisi layanan tetap diperlukan. Sebelum pilot, pastikan seluruh PIC/BEM dapat memakai akun Google. Kegagalan atau pembatalan login harus dapat dicoba ulang; login berhasil tidak otomatis memberi hak PIC/BEM.

Acuan pilihan: [Supabase Google sign-in](https://supabase.com/docs/guides/auth/social-login/auth-google) dan [pengiriman email Auth melalui SMTP](https://supabase.com/docs/guides/auth/auth-smtp), diperiksa 28 Oktober 2026. Pengiriman email autentikasi produksi membutuhkan konfigurasi layanan pengirim yang sesuai; pilihan Google menghindari kebutuhan alur email/password pada versi awal.

Pembacaan kalender menggunakan proyeksi publik terbatas, disaring menurut periode dan ormawa/ruangan. PIC dan BEM memakai query yang tunduk pada RLS.

Mutasi lintas aturan menggunakan fungsi database dengan tujuan spesifik, misalnya membuat pemakaian, memperbarui status, mengonfirmasi rencana, mengganti jadwal proker, dan mengganti PIC. Nama fungsi final bebas ditentukan saat implementasi. Jangan membuat endpoint generik yang mengizinkan semua kolom diubah.

Seluruh mutasi yang memengaruhi bentrokan memakai transaksi, pemeriksaan kewenangan, lock konsisten, constraint approved, dan audit. UI memberi pratinjau, database memberikan hasil final. Riwayat tidak ditulis lewat permintaan browser terpisah setelah penyimpanan utama.

## Kedaluwarsa tanpa bergantung pada ketepatan Cron

- last_confirmed_at dan expires_at menjadi sumber evaluasi tenggat.
- Cron berkala mengubah planned/pending yang kedaluwarsa menjadi cancelled dan menulis alasan expired.
- Proyeksi baca dan fungsi mutasi memperlakukan tenggat lewat sebagai dibatalkan meski Cron belum sempat menulis. UI tidak boleh tetap menyebutnya aktif.
- Cron aman dijalankan ulang dan tidak menghasilkan audit pembatalan ganda.
- Setelah proyek Supabase dipulihkan dari jeda, jalankan rekonsiliasi sebelum menerima perubahan baru jika diperlukan. Jangan menghidupkan rencana lama hanya karena Cron tidak berjalan saat jeda.

## Struktur kode usulan

| Lokasi | Isi |
| --- | --- |
| src/app/ | Routing, sesi, dan susunan halaman |
| src/features/programs/ | Kalender proker dan editor jadwal |
| src/features/room-usages/ | Pemakaian, konflik, dan tindakan status |
| src/features/admin/ | Ormawa, PIC, periode, ruangan, dan peninjauan |
| src/components/ui/ | Komponen antarmuka bersama |
| src/lib/ | Klien Supabase, format tanggal, tipe, dan helper kecil |
| supabase/migrations/ | Perubahan skema, constraint, fungsi, dan kebijakan berversi |
| tests/ | Pengujian aturan penting dan alur pengguna |
| docs/ | Paket spesifikasi ini setelah dipindah ke repositori aplikasi |

Jangan membuat lapisan repository/service/factory untuk setiap tabel secara otomatis. Tambahkan abstraksi ketika ada pemakaian berulang yang nyata. Gunakan generated database types bila tersedia pada workflow implementasi.

## Rahasia dan lingkungan

- Frontend hanya memakai URL proyek dan publishable/anon key yang memang untuk klien, dengan RLS aktif.
- Service-role key, secret OAuth, password database, dan token deployment tidak masuk hasil build atau repositori.
- Daftarkan redirect Auth yang tepat untuk lokal, preview yang diizinkan, dan produksi. Jangan membuka redirect wildcard yang tidak diperlukan.
- A-12: satu proyek Supabase Free untuk uji coba dan pengembangan lokal untuk perubahan berisiko. Pemisahan proyek pengembangan/produksi perlu disesuaikan kuota akun; jangan memigrasikan data uji ke data asli tanpa pemisahan.
- Gunakan migration dan data contoh fiktif; jangan mengubah skema produksi hanya lewat dashboard tanpa jejak berversi.

## Hosting gratis dan batas nyata

Informasi diperiksa pada 27 Oktober 2026; baca ulang sumber resmi sebelum membuat akun atau meluncurkan.

| Layanan | Acuan paket gratis | Implikasi |
| --- | --- | --- |
| Supabase | 500 MB database dan 50.000 MAU pada halaman harga | Perkiraan cukup untuk uji coba berbasis teks; ukuran audit dan query publik tetap memakai kuota |
| Supabase | Proyek Free dapat dijeda setelah aktivitas rendah selama 7 hari | Bukan jaminan tersedia terus saat libur; login dan Cron bergantung pada proyek aktif |
| Cloudflare Pages | 500 build/bulan dan banyak pengelola pada Free | Cocok untuk website statis serta serah terima tim; kuota Supabase tetap terpisah |
| Domain | Alamat bawaan hosting | Tidak perlu membeli domain untuk uji coba; domain sendiri opsional dan dapat berbiaya |

Target Rp0/bulan adalah target uji coba dalam kuota, bukan hasil pengukuran beban atau kontrak layanan. Tidak memasang kartu/menaikkan paket/mengaktifkan fitur berbayar tanpa instruksi pengguna. Pertimbangkan database berbayar ketika perlu jaminan operasi yang lebih baik atau kuota terlampaui.

## Sumber resmi

- [Supabase Pricing](https://supabase.com/pricing)
- [Penjedaan proyek Free](https://supabase.com/docs/guides/platform/free-project-pausing)
- [Supabase Auth dan RLS](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Cron](https://supabase.com/docs/guides/cron)
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Pages](https://www.cloudflare.com/en-gb/developer-platform/products/pages/)

Tidak ada versi dependency yang dikunci dalam planning. Saat implementasi, pilih versi stabil yang saling cocok berdasarkan dokumentasi resmi terbaru, simpan lockfile, dan catat keputusan bila ada perubahan besar.
