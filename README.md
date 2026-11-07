# Project Orka: planning platform koordinasi ormawa

Versi: 1.0 | Tanggal: 27 Oktober 2026 | Status: draf planning untuk review pemilik produk.

Nama proyek dan produk adalah **Orka**, sesuai keputusan pemilik produk (D-32). Nama kampus belum ditentukan. Paket ini memuat dokumen planning dan [prototipe UI pertama](prototype/README.md) yang diizinkan melalui D-40; belum ada aplikasi dengan integrasi data.

## Tujuan

Memberi manusia dan AI agent acuan yang sama untuk membangun kalender proker dan pencatatan pemakaian ruangan bagi seluruh ormawa di satu kampus kecil, dengan perkiraan kurang dari 10 ormawa.

## Urutan baca untuk AI agent

1. [AGENTS.md](AGENTS.md): batas tugas, urutan kerja, dan aturan perubahan.
2. [PRD.md](PRD.md): masalah, pengguna, fitur, dan batas produk.
3. [DECISIONS_AND_OPEN_QUESTIONS.md](DECISIONS_AND_OPEN_QUESTIONS.md): keputusan pengguna, usulan, dan hal yang belum pasti.
4. [BUSINESS_RULES.md](BUSINESS_RULES.md): status, bentrokan, pembatalan, dan perpindahan.
5. [DATA_MODEL.md](DATA_MODEL.md) dan [ACCESS_CONTROL.md](ACCESS_CONTROL.md): data dan kewenangan.
6. [USER_FLOWS.md](USER_FLOWS.md) dan [UX_SPEC.md](UX_SPEC.md): alur serta isi halaman.
7. [ARCHITECTURE.md](ARCHITECTURE.md): rancangan teknis dan hosting.
8. [ACCEPTANCE_CRITERIA.md](ACCEPTANCE_CRITERIA.md): hasil yang harus bisa dibuktikan.
9. [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md): UI/UX interaktif lebih dahulu (D-39), dilanjutkan integrasi data setelah review dan instruksi terkait.
10. [OPERATIONS.md](OPERATIONS.md): persiapan uji coba dan serah terima.
11. [DESIGN.md](DESIGN.md): panduan visual Orka terinspirasi Cal.com (D-38); detail token/komponen masih usulan A-14.
12. [DESIGN_REFERENCES.md](DESIGN_REFERENCES.md): konteks riset dan alternatif sebelum pemilihan acuan Cal.com.
13. [PROTOTYPE_PROGRESS.md](PROTOTYPE_PROGRESS.md): hasil, pemeriksaan, dan batas paket UI pertama.
14. [UI_REVISION_PLAN.md](UI_REVISION_PLAN.md): planning feedback D-41 untuk aksen, dropdown custom, logo ormawa bertumpuk, dan kalender detail rentang berwarna.
15. [UI_REVISION_REVIEW.md](UI_REVISION_REVIEW.md): hasil penerapan revisi D-44 dan batas pemeriksaan paket kalender terbaru.
16. [TIMELINE_UX_PLAN.md](TIMELINE_UX_PLAN.md): rancangan pengerjaan vs pelaksanaan, penundaan, pembatalan sebagian, serta ruangan tidak tersedia (D-46–D-49).
17. [TIMELINE_UI_REVIEW.md](TIMELINE_UI_REVIEW.md): hasil implementasi UI statis D-50, cara mencoba alur PIC/BEM, bukti, dan batas pemeriksaan.
18. [PALETTE_REVIEW.md](PALETTE_REVIEW.md): riwayat penerapan ultramarine + ink blue D-54, kontras, dan bukti visual sebelum revisi D-55.
19. [UI_READABILITY_REVIEW.md](UI_READABILITY_REVIEW.md): palet aktif D-55 ultramarine + paper, pembesaran teks, dropdown solid dan kalibrasi status. Catatan D-54 sebelumnya menjadi riwayat.

## Cara membaca status keputusan

- **D**: keputusan pengguna dalam percakapan, sudah menjadi acuan.
- **A**: usulan rancangan dari penyusun; boleh dipakai untuk prototipe, belum menjadi keputusan pengguna.
- **Q**: pertanyaan terbuka. Dokumen menyebut dampak dan kapan jawabannya dibutuhkan.

Dokumen ini tidak menganggap seluruh detail teknis telah disetujui. Lihat daftar D/A/Q sebelum membuat asumsi baru.

## Pembagian sumber kebenaran

| Topik | Acuan utama |
| --- | --- |
| Lingkup dan kebutuhan | PRD.md |
| Status dan perilaku bisnis | BUSINESS_RULES.md |
| Fakta keputusan dan pertanyaan terbuka | DECISIONS_AND_OPEN_QUESTIONS.md |
| Struktur penyimpanan | DATA_MODEL.md |
| Visibilitas dan kewenangan | ACCESS_CONTROL.md |
| Arah visual, token, dan komponen | DESIGN.md |
| Platform dan implementasi teknis | ARCHITECTURE.md |
| Verifikasi hasil | ACCEPTANCE_CRITERIA.md |

Instruksi terbaru pemilik produk mengungguli dokumen. Jika perubahan memengaruhi beberapa dokumen, perbarui semuanya dalam pekerjaan yang sama. Jangan menyelesaikan kontradiksi dengan menambah fitur tanpa penjelasan.

## Batas yang tidak boleh terlupakan

- Stack terpilih: React, Vite, TypeScript, Supabase, Cloudflare Pages.
- Halaman kalender proker dan pemakaian ruangan publik tanpa login. Pengelolaan memakai satu akun Google resmi bersama per ormawa yang diverifikasi BEM (D-37); audit mencatat akun organisasi.
- Tidak ada agenda rapat privat, pembahasan rapat, daftar hadir, atau bentrokan individu.
- Kalender proker membantu membaca kepadatan; tidak menghitung ketersediaan SDM.
- Status izin berasal dari laporan PIC. Kampus tetap memberi keputusan melalui jalur di luar platform.
- Dua rapat pada hari yang sama sah selama ruangan berbeda atau interval waktunya tidak bertabrakan.
- Masa kedaluwarsa 7 hari hanya untuk rencana pemakaian ruangan yang belum disetujui, bukan proker.
- D-40 mengizinkan paket pertama prototipe UI/UX tanpa data nyata. Pembuatan akun layanan, integrasi backend, dan publikasi belum diminta.
