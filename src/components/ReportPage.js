import React, { useState } from 'react';
import './ReportPage.css';

const sampleTransactions = [
  {
    id: 'ORD-001',
    date: '2024-06-01',
    customer: 'Ahmad Rizki',
    items: 'Nasi Goreng Jawa, Iced Latte',
    total: 47000,
    payment: 'Tunai',
    status: 'Selesai',
  },
  {
    id: 'ORD-002',
    date: '2024-06-01',
    customer: 'Sarah Putri',
    items: 'Chicken Katsu Mentai, Kids Nuggets',
    total: 55000,
    payment: 'QRIS',
    status: 'Diproses',
  },
  {
    id: 'ORD-003',
    date: '2024-06-01',
    customer: 'Budi Santoso',
    items: 'Spaghetti Aglio Olio, Iced Cappuccino',
    total: 48000,
    payment: 'Debit',
    status: 'Selesai',
  },
  {
    id: 'ORD-004',
    date: '2024-06-01',
    customer: 'Dewi Sari',
    items: 'Toast Avocado, Iced Latte',
    total: 40000,
    payment: 'Tunai',
    status: 'Batal',
  },
  {
    id: 'ORD-005',
    date: '2024-06-01',
    customer: 'Rudi Hermawan',
    items: 'Mie Goreng Jawa, Tempe Mendoan',
    total: 51000,
    payment: 'QRIS',
    status: 'Selesai',
  },
];

const ReportPage = () => {
  const [dateFrom, setDateFrom] = useState('2024-06-01');
  const [dateTo, setDateTo] = useState('2024-06-07');
  const [transactions] = useState(sampleTransactions);

  // Ringkasan
  const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
  const totalOrders = transactions.length;
  const avgOrder = totalOrders ? Math.round(totalSales / totalOrders) : 0;
  const topProduct = 'Nasi Goreng Jawa';
  const topProductSold = 12;

  const formatCurrency = (amount) => `Rp ${amount.toLocaleString()}`;

  return (
    <div className="report-container">
      {/* Header & Filter */}
      <div className="report-header">
        <div className="header-left">
          <h1 className="page-title">Laporan Penjualan</h1>
          <p className="page-subtitle">Rekap transaksi dan performa penjualan</p>
        </div>
        <div className="header-right">
          <div className="date-filter">
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="date-input"
            />
            <span className="date-separator">-</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="date-input"
            />
          </div>
          <button className="export-btn">
            <i className="fas fa-file-export"></i> Ekspor Excel
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="report-summary">
        <div className="summary-card primary">
          <div className="summary-icon"><i className="fas fa-dollar-sign"></i></div>
          <div>
            <h3>{formatCurrency(totalSales)}</h3>
            <p>Total Omzet</p>
          </div>
        </div>
        <div className="summary-card success">
          <div className="summary-icon"><i className="fas fa-shopping-cart"></i></div>
          <div>
            <h3>{totalOrders}</h3>
            <p>Total Transaksi</p>
          </div>
        </div>
        <div className="summary-card info">
          <div className="summary-icon"><i className="fas fa-chart-line"></i></div>
          <div>
            <h3>{formatCurrency(avgOrder)}</h3>
            <p>Rata-rata Order</p>
          </div>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon"><i className="fas fa-star"></i></div>
          <div>
            <h3>{topProduct}</h3>
            <p>{topProductSold} terjual</p>
          </div>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Order ID</th>
              <th>Pelanggan</th>
              <th>Item</th>
              <th>Total</th>
              <th>Pembayaran</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.id}</td>
                <td>{t.customer}</td>
                <td>{t.items}</td>
                <td>{formatCurrency(t.total)}</td>
                <td>{t.payment}</td>
                <td>
                  <span className={`status-badge ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-file-alt empty-icon"></i>
            <h3>Tidak ada transaksi ditemukan</h3>
            <p>Ubah filter tanggal untuk melihat data lain</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
