# Hasil paket pertama UI/UX Orka

Status terbaru D-58: tiga paket UI (ruangan, kelola PIC, kelola platform/BEM) tersedia untuk review lokal. PLATFORM_UI_REVIEW.md memuat hasil terbaru dan batas pengujian. Fase UI/UX keseluruhan belum dinyatakan selesai.

Status terbaru D-57: Kelola ormawa/PIC, tambah/edit proker, pemakaian dan riwayat tersedia untuk review. Rincian pemeriksaan dan batas ada pada MANAGE_UI_REVIEW.md. Fase UI/UX keseluruhan belum selesai.

Status terbaru 7 November 2026: paket pemakaian ruangan D-56 tersedia untuk review; lihat ROOMS_UI_REVIEW.md. Isi di bawah adalah riwayat paket pertama. Fase UI/UX keseluruhan masih belum selesai.

Tanggal: 28 Oktober 2026. Acuan D-38/D-39/D-40 dan tahap 0–2 IMPLEMENTATION_PLAN.md. Status: fondasi komponen dan kalender tahunan tersedia untuk review; fase UI/UX keseluruhan belum selesai dan belum siap integrasi data.

Kode berada di [prototype/](prototype/README.md), terpisah dari dokumen planning. Dokumen tetap di akar paket ini; paket planning belum dipindah ke repositori aplikasi lain. Bila kelak dipindah, ikuti instruksi penempatan docs/ pada AGENTS.md.

## Hasil yang tersedia

Perubahan terbaru D-45 menghapus banner preview/data dummy, penanda pratinjau pada dialog/detail, dan footer prototipe dari tampilan utama. Data tetap fixture fiktif tanpa integrasi. Catatan pemeriksaan penanda yang terlihat pada paket pertama di bawah merupakan riwayat dan telah digantikan preferensi D-45.

- Token terpusat, Geist Variable lokal, komponen UI, animasi pressed/hover/modal, dan susunan responsif mengikuti karakter Cal.com.
- Kalender tahunan 12 bulan, skenario filter statis, serta arsip contoh kosong.
- Pratinjau detail bulan/proker melalui modal; daftar membedakan jadwal pasti dan tanggal belum ditentukan.
- Modal panduan, simulasi masuk, dan contoh ringkas pemakaian ruangan. Navigasi ruangan belum membuka halaman produk lengkap.
- Ruang uji UI dan katalog komponen dengan input sementara, hasil simpan simulasi, badge status, alert, serta toast.

Komponen kecil/metadata menggunakan beberapa ukuran 10–13 px untuk hierarki sekunder; judul proker di kartu 14 px dan input 16 px. Ini variasi prototipe dari ukuran usulan DESIGN.md dan perlu dinilai saat review keterbacaan, bukan dianggap keputusan visual final. Nama lengkap proker yang diringkas di kartu tersedia melalui modal, tidak bergantung pada hover.

## Pemeriksaan yang dilakukan

| Pemeriksaan | Hasil dan cakupan |
| --- | --- |
| TypeScript + build Vite | Lulus melalui `npm run build` |
| Konsistensi fixture dan batas prototipe | Lulus `npm run check`: 12 bulan, jumlah/tentatif statis konsisten, tidak ada API/persistence/integrasi Supabase pada sumber UI |
| Kontras pasangan token | Teks utama 16,10:1, muted di putih 6,23:1, muted di page 5,82:1, primary 15,52:1, status 5,91–8,01:1, border kontrol 3,72:1, fokus 5,17:1. Bukan audit semua piksel pada setiap keadaan |
| Filter contoh | Hima A Contoh membuka jumlah Oktober 2 proker/1 tentatif; Reset mengembalikan contoh semua ormawa |
| Skenario visual | Kosong: 12 kartu kosong; memuat: 12 skeleton dan aria-busy; gagal: pesan terpisah dan Coba lagi kembali ke normal |
| Modal dan fokus | Buka bulan/detail proker, Escape, penguncian scroll dan pengembalian fokus diperiksa. Focus trap Shift+Tab/Tab diperbaiki setelah temuan awal dan diuji ulang pada dialog komponen. Tiga siklus buka/tutup berulang tidak meninggalkan dialog atau scroll terkunci; detail proker memindahkan fokus ke judul baru |
| Formulir simulasi | Input dapat diketik; tombol menampilkan simulasi tidak tersimpan; reload kembali ke kondisi awal |
| Responsif | Diperiksa pada viewport browser 360/375, 768, 1280 CSS px serta orientasi mendatar 812 × 375; tidak ditemukan overflow horizontal pada keadaan yang ditinjau |
| Konsol browser | Tidak ada warning/error pada pemeriksaan akhir setelah perbaikan |

## Status UX-P untuk keseluruhan fase

| ID | Status | Catatan |
| --- | --- | --- |
| UX-P01 | Sebagian | Kalender/modal tersedia; halaman ruangan lengkap, kelola ormawa/platform dan skenario seluruh peran belum dibuat |
| UX-P02 | Sebagian | Keadaan komponen tersedia; review visual seluruh CTA produk menunggu halaman berikutnya |
| UX-P03 | Sebagian | Dialog paket pertama diuji; seluruh dialog formulir/konfirmasi produk belum dibuat |
| UX-P04 | Sebagian | Kontrol dan formulir contoh tersedia; formulir proker/ruangan lengkap belum dibuat |
| UX-P05 | Sebagian | Skenario kalender dan feedback tersedia; seluruh arsip/sengketa/dampak operasional belum lengkap |
| UX-P06 | Sebagian | Viewport di atas diperiksa; zoom browser 200% dan keyboard layar perangkat fisik belum diuji |
| UX-P07 | Sebagian | Keyboard/fokus dan kontras token diperiksa; emulasi preferensi OS reduced motion serta pembaca layar belum diuji. CSS reduced motion tersedia |
| UX-P08 | Lulus untuk paket ini | Skenario statis, label jelas, input sementara, tanpa operasi data nyata. Harus diperiksa ulang ketika cakupan bertambah |

Tidak ada AC backend/keamanan/konkurensi yang dinyatakan lulus. Pengguna telah meninjau paket pertama, menyukai tampilan bersihnya, dan meminta revisi D-41. [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md) mencatat planning aksen, dropdown custom, logo bertumpuk, serta kalender detail; revisi tersebut kini diterapkan melalui D-44; lihat [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md) untuk hasil terbaru.

## Bukti tampilan

Palet aktif kini mengikuti D-43 dan menggantikan apricot: muted teal, informasi plum, warning ochre, serta error berry. Build, format, batas kode prototipe, dan pemeriksaan kontras lulus. Rasio teks/latar status: info 5,95:1, warning 5,32:1, error 5,18:1; fokus di atas surface 5,83:1. [Contoh status](prototype/review/palette-muted-status.jpg) dan [halaman kalender](prototype/review/accent-muted-teal.jpg) memperlihatkan palet terbaru. Catatan apricot berikut disimpan sebagai riwayat.

Revisi aksen D-42: apricot/peach diterapkan terbatas pada navigasi aktif, ikon pengantar dan periode, titik dekoratif, serta tab aktif katalog komponen. Tombol utama tetap charcoal. `format:check`, `check`, dan build lulus; teks utama/peach 14,56:1 dan muted/peach 5,64:1. Dropdown custom, logo, dan kalender detail tetap belum diterapkan. Bukti revisi ada di [screenshot apricot](prototype/review/accent-apricot-desktop.jpg).

- [Desktop 1280](prototype/review/desktop-1280.jpg)
- [HP 375](prototype/review/mobile-375.jpg)
- [Tablet 768](prototype/review/tablet-768.jpg)
- [Dialog formulir HP 360](prototype/review/form-mobile-360.jpg)

## Berikutnya setelah review paket ini

Palet aktif kini ultramarine + ink blue melalui D-54. Rujuk [PALETTE_REVIEW.md](PALETTE_REVIEW.md) dan DESIGN.md untuk nilai serta pemeriksaan terbaru; rasio/warna paket terdahulu di atas tetap catatan historis.

Pembaruan D-50: paket Timeline, detail proker, revisi, dan skenario penutupan/tindak lanjut ruangan sudah tersedia. Review terbaru mengikuti [TIMELINE_UI_REVIEW.md](TIMELINE_UI_REVIEW.md); hasil lama di dokumen ini tetap catatan paket pertama.

Revisi kalender/dropdown/logo D-44 telah tersedia; prioritaskan review hasil pada UI_REVISION_REVIEW.md. Halaman pemakaian ruangan serta formulir produk, lalu kelola ormawa/BEM menyusul sesuai tahap 2–4. Integrasi data tetap menunggu review UI/UX dan instruksi terkait.
