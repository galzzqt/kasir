# Sistem Kasir - Halobis

Aplikasi sistem kasir modern yang dibangun dengan React dan Tailwind CSS, dirancang untuk kemudahan penggunaan dan efisiensi operasional.

## 🚀 Fitur Utama

- **Interface Modern**: Desain yang bersih dan profesional dengan Tailwind CSS
- **Responsif**: Berfungsi sempurna di desktop, tablet, dan mobile
- **Manajemen Produk**: Grid produk dengan kategori dan filter
- **Keranjang Belanja**: Sistem keranjang dengan kontrol kuantitas
- **Pembayaran**: Multiple metode pembayaran (Tunai, Kartu, QRIS, Transfer)
- **Riwayat Transaksi**: Tabel transaksi terbaru
- **Real-time Total**: Kalkulasi total otomatis

## 🛠️ Teknologi yang Digunakan

- **React 18**: Versi terbaru React untuk building user interfaces
- **Tailwind CSS**: Framework CSS utility-first untuk styling
- **JavaScript ES6+**: Fitur JavaScript modern
- **npm**: Package manager untuk dependency management

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd halobis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm start
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Struktur Project

```
src/
├── components/
│   └── CashierDisplay.js & CashierDisplay.css
├── App.js
├── App.css
├── index.js
└── index.css
```

## 🛒 Fitur Sistem Kasir

### Manajemen Produk
- Grid produk dengan kategori (Makanan, Minuman, Snack)
- Produk sample: Nasi Goreng, Mie Goreng, Es Teh, dll
- Filter kategori
- Kartu produk dengan harga dan kategori

### Keranjang Belanja
- Tambah/hapus item dengan kontrol kuantitas
- Kalkulasi total real-time
- Input nama pelanggan
- Pilihan metode pembayaran
- Fungsi kosongkan keranjang

### Pembayaran
- Multiple metode pembayaran
- Konfirmasi pembayaran
- Riwayat transaksi
- Animasi sukses

## 🎨 Kustomisasi

### Menambah Produk
Edit array `products` di `src/components/CashierDisplay.js`:
```javascript
const products = [
  { id: 1, name: 'Nama Produk', price: 15000, category: 'Kategori' },
  // ... produk lainnya
];
```

### Mengubah Styling
- Gunakan class Tailwind CSS untuk styling
- Custom CSS di `src/components/CashierDisplay.css`
- Update warna dan tema di file CSS

### Mengubah Kategori
Edit array kategori di komponen:
```javascript
{['Semua', 'Makanan', 'Minuman', 'Snack'].map(category => (
  // ... kode filter
))}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🚀 Deployment

### Build untuk Production
```bash
npm run build
```

### Deploy ke Netlify
1. Push kode ke GitHub
2. Connect repository ke Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy ke Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Jalankan: `vercel`
3. Ikuti petunjuk

## 📄 Scripts

- `npm start` - Menjalankan app dalam mode development
- `npm test` - Menjalankan test runner
- `npm run build` - Build app untuk production
- `npm run eject` - Eject dari Create React App (operasi satu arah)

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch: `git checkout -b feature-name`
3. Commit perubahan: `git commit -am 'Add feature'`
4. Push ke branch: `git push origin feature-name`
5. Submit pull request

## 📞 Kontak

- **Email**: info@halobis.com
- **Phone**: +62 21 1234 5678
- **Address**: Jl. Sudirman No. 123, Jakarta Pusat

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License.

## 🙏 Terima Kasih

Terima kasih telah menggunakan Sistem Kasir Halobis!
