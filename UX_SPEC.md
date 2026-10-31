# Spesifikasi halaman dan interaksi

Status: usulan A-10. Nama produk adalah Orka (D-32). Dokumen ini menjelaskan isi dan perilaku halaman. Acuan visual Cal.com dipilih pengguna (D-38); token dan komponen di [DESIGN.md](DESIGN.md) merupakan usulan A-14 yang perlu ditinjau pada prototipe.

## Navigasi

Untuk fase UI/UX D-39, seluruh isi dan keadaan halaman di bawah disajikan sebagai skenario fiktif statis. Navigasi, input sementara, animasi, dan buka/tutup modal dapat dicoba; tindakan data hanya membuka hasil simulasi berlabel. Tidak ada penyimpanan, pemeriksaan bentrokan, otorisasi nyata, atau panggilan layanan. IMPLEMENTATION_PLAN.md mengatur urutan dan batasnya.

Publik: Kalender Proker, Pemakaian Ruangan, Masuk.

PIC setelah login: navigasi publik ditambah Kelola Ormawa. BEM dengan hak pengelola mendapat Kelola Platform. Tidak perlu dashboard statistik sebagai halaman pertama.

## Halaman

| Halaman | Isi dan tindakan utama |
| --- | --- |
| Kalender proker | Pemilih tahun akademik, filter ormawa, 12 kartu bulan, jumlah proker per bulan, penanda tentatif |
| Detail bulan | Kalender tanggal dengan blok rentang berwarna per ormawa (D-41), usulan pilihan Kalender/Agenda; bagian jadwal hanya-bulan terpisah; penyaring tetap berlaku |
| Detail proker | Nama, seluruh penyelenggara, pemilik, jadwal kegiatan, status, dan pemakaian ruangan terkait |
| Pemakaian ruangan | Pemilih tanggal/rentang dan ruangan, daftar/grid waktu, ormawa, status, waktu pembaruan |
| Detail pemakaian | Ruangan, rentang pemakaian, ormawa, status, kaitan proker, kontak sesuai kewenangan |
| Kelola ormawa | Proker milik sendiri, pemakaian milik sendiri, tambah/edit, konfirmasi masih direncanakan, pembatalan, riwayat terkait |
| Kelola platform | Ormawa, verifikasi/pencabutan PIC, kontak, ruangan, periode, laporan sengketa, arsip |
| Masuk/status akses | Tombol Masuk dengan Google (D-36), status belum diverifikasi, pesan akses dicabut, keluar; login gagal/dibatalkan dapat dicoba ulang |

Halaman masuk menjelaskan “Gunakan akun Google resmi ormawa”. Setelah diverifikasi, halaman kelola menampilkan ormawa yang diwakili akun tersebut. Audit berlabel akun ormawa, tanpa nama pengurus individual yang diasumsikan. Halaman publik tidak mewajibkan login (D-37).

Rute URL final bukan keputusan produk. Usulan /kalender, /ruangan, /kelola, /admin cukup sebagai kerangka; jangan mengunci URL sebelum kebutuhan routing ditinjau.

## Revisi UI yang direncanakan (D-41)

Lihat [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md) untuk aksen kecil, dropdown custom, logo penyelenggara bertumpuk pada kartu bulan, dan kalender detail tanggal/rentang. Rincian A-15 kini diterapkan pada prototipe melalui D-44 untuk review, dengan hasil pemeriksaan pada [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md). Detail kalender menampilkan rentang jadwal yang memang tercatat; beberapa jadwal terpisah tidak dihubungkan menjadi rentang palsu. Kolaborasi tetap satu kegiatan dengan seluruh penyelenggara; proker hanya-bulan tetap di luar grid tanggal. Interaksi prototipe kelak memakai fixture statis, tanpa logika kalender/data nyata.

## Formulir proker

Wajib: nama, periode akademik, ormawa pengelola, daftar penyelenggara, dan minimal satu jadwal kegiatan. Untuk tiap jadwal, pilih “Bulan saja” atau “Tanggal dan jam pasti”. Tidak ada formulir isi rapat, kebutuhan SDM, proposal, atau anggaran.

Pemakaian ruangan ditambahkan sebagai catatan terkait yang terpisah; mengisi proker tidak otomatis memesan ruangan. Saat jadwal proker diubah/dihapus, hanya pemakaian terkait jadwal itu yang dibatalkan. Pembatalan proker membatalkan seluruh pemakaian nonterminal terkait. Dialog dampak memuat nama ruangan, waktu, status, dan ormawa pencatat untuk setiap pemakaian yang dibatalkan.

## Formulir pemakaian ruangan

Wajib: ormawa pemakai, ruangan, mulai, selesai. Kontak ditarik dari kontak ormawa yang disetujui, bukan meminta nomor pribadi baru setiap kali. Kaitan proker opsional; jika dipilih, wajib memilih satu jadwal proker tersebut. Waktu harus mencakup persiapan dan beres-beres.

Tampilkan kebijakan kedaluwarsa di dekat tombol simpan. Pemeriksaan awal membantu memilih slot, tetapi hasil simpan database menentukan apakah tindakan berhasil.

## Bahasa status

- “Rencana · belum diajukan ke kampus”
- “Menunggu keputusan · menurut pembaruan PIC”
- “Disetujui · dilaporkan oleh PIC”
- “Belum ada pemakaian tercatat. Tetap cek dan urus izin melalui jalur kampus.”
- “Rencana ini dibatalkan karena tidak diperbarui selama 7 hari.”
- “Jadwal ruangan bertabrakan dengan pemakaian yang sudah disetujui.”
- “Pembatalan di platform tidak menggantikan koordinasi pembatalan izin dengan kampus.”

## Kondisi wajib pada setiap halaman data

Tampilkan kondisi memuat, kosong, gagal memuat, tidak berwenang, serta berhasil/gagal menyimpan. Jangan menampilkan data lama sebagai ketersediaan terbaru tanpa penjelasan. Jika data bentrokan berubah ketika menyimpan, muat ulang detail dan jelaskan perubahan.

Setelah pembatalan sistem atau perubahan akses, tombol yang sudah terbuka tidak boleh tetap berhasil memakai asumsi lama. Konflik versi meminta pengguna memuat ulang, bukan menimpa diam-diam.

## Aksesibilitas dan HP

- Pada HP, tampilkan daftar waktu yang terbaca tanpa mengandalkan grid lebar atau drag-and-drop.
- Kartu bulan tetap menyebut nama bulan dan jumlah; warna bukan satu-satunya penanda kepadatan.
- Formulir mempunyai label, pesan kesalahan di field terkait, urutan fokus, dan kontrol yang bisa dipakai dengan keyboard.
- Dialog konfirmasi menyebut dampak nyata, misalnya “Batalkan 3 pemakaian ruangan terkait”.
- Arsip dibedakan dari periode aktif dan tidak menyediakan edit normal.
