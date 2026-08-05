# Grand Sharon Residence Landing Page

Landing page statis siap pakai untuk GitHub Pages, Cloudflare Pages, Netlify, atau hosting biasa.

## 1. Pengaturan wajib

Buka `script.js`, lalu ganti:

```js
whatsappNumber: '6281234567890'
```

Gunakan format internasional tanpa tanda `+`. Contoh nomor 0812-1234-5678 menjadi:

```js
whatsappNumber: '6281212345678'
```

Di `index.html`, ganti juga nomor telepon dummy:

```html
<a href="tel:+622200000000">...</a>
```

## 2. Upload ke GitHub Pages

1. Ekstrak file ZIP.
2. Login ke GitHub dan buat repository baru, misalnya `grand-sharon-landing`.
3. Pilih **Add file → Upload files**.
4. Upload isi folder ini langsung ke root repository: `index.html`, `styles.css`, `script.js`, folder `assets`, dan `README.md`.
5. Klik **Commit changes**.
6. Buka **Settings → Pages**.
7. Pada **Source**, pilih **Deploy from a branch**.
8. Pilih branch **main** dan folder **/(root)**, kemudian **Save**.
9. Tunggu 1–5 menit. URL biasanya berbentuk:
   `https://USERNAME.github.io/grand-sharon-landing/`

## 3. Tracking iklan

Kode sudah menyediakan pemicu event setelah form dikirim:

- `gtag('event', 'generate_lead')` untuk Google Analytics/Google Ads
- `fbq('track', 'Lead')` untuk Meta Pixel

Tambahkan snippet resmi GA4/GTM/Meta Pixel ke bagian `<head>` di `index.html` agar event aktif.

## 4. Catatan penting

- Harga, promo, spesifikasi, dan akses lokasi harus diverifikasi sebelum publikasi.
- Form tidak menyimpan data ke database; form langsung membuka WhatsApp.
- Untuk menyimpan leads ke Google Sheets/CRM, gunakan endpoint seperti Google Apps Script, Formspree, Make, Zapier, atau backend sendiri.
- Gambar dapat diganti dengan mempertahankan nama file pada folder `assets`, atau ubah path di `index.html`.
