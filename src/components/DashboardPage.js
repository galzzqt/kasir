import React, { useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Sample data for statistics
  const statsData = {
    today: {
      totalSales: 2850000,
      totalOrders: 45,
      averageOrder: 63333,
      topProduct: 'Nasi Goreng Jawa',
      topProductSales: 12,
      customerCount: 38,
      tableOccupancy: 85
    },
    week: {
      totalSales: 18500000,
      totalOrders: 312,
      averageOrder: 59295,
      topProduct: 'Chicken Katsu Mentai',
      topProductSales: 89,
      customerCount: 245,
      tableOccupancy: 78
    },
    month: {
      totalSales: 72000000,
      totalOrders: 1245,
      averageOrder: 57831,
      topProduct: 'Iced Latte',
      topProductSales: 345,
      customerCount: 987,
      tableOccupancy: 82
    }
  };

  const currentStats = statsData[selectedPeriod];

  // Recent orders data
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Ahmad Rizki',
      items: ['Nasi Goreng Jawa', 'Iced Latte'],
      total: 47000,
      status: 'Completed',
      time: '14:30',
      type: 'Dine In'
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Putri',
      items: ['Chicken Katsu Mentai', 'Kids Nuggets'],
      total: 55000,
      status: 'In Progress',
      time: '14:25',
      type: 'To Go'
    },
    {
      id: 'ORD-003',
      customer: 'Budi Santoso',
      items: ['Spaghetti Aglio Olio', 'Iced Cappuccino'],
      total: 48000,
      status: 'Completed',
      time: '14:20',
      type: 'Dine In'
    },
    {
      id: 'ORD-004',
      customer: 'Dewi Sari',
      items: ['Toast Avocado', 'Iced Latte'],
      total: 40000,
      status: 'Pending',
      time: '14:15',
      type: 'Delivery'
    },
    {
      id: 'ORD-005',
      customer: 'Rudi Hermawan',
      items: ['Mie Goreng Jawa', 'Tempe Mendoan'],
      total: 51000,
      status: 'Completed',
      time: '14:10',
      type: 'Dine In'
    }
  ];

  // Top products data
  const topProducts = [
    { name: 'Nasi Goreng Jawa', sales: 12, revenue: 348000, growth: '+15%' },
    { name: 'Chicken Katsu Mentai', sales: 10, revenue: 350000, growth: '+8%' },
    { name: 'Iced Latte', sales: 18, revenue: 324000, growth: '+22%' },
    { name: 'Spaghetti Aglio Olio', sales: 8, revenue: 256000, growth: '+5%' },
    { name: 'Toast Avocado', sales: 6, revenue: 132000, growth: '+12%' }
  ];

  // Category performance
  const categoryPerformance = [
    { name: 'Indonesian Food', sales: 35, revenue: 1015000, percentage: 35.6 },
    { name: 'Classic Bite', sales: 28, revenue: 910000, percentage: 31.9 },
    { name: 'Cold White', sales: 25, revenue: 450000, percentage: 15.8 },
    { name: 'Kids Meal', sales: 15, revenue: 375000, percentage: 13.2 },
    { name: 'Toast', sales: 12, revenue: 105000, percentage: 3.7 }
  ];

  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString()}`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'info';
      default: return 'default';
    }
  };

  const getOrderTypeColor = (type) => {
    switch (type) {
      case 'Dine In': return 'primary';
      case 'To Go': return 'success';
      case 'Delivery': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Ringkasan performa Zocco Heritage</p>
        </div>
        <div className="header-right">
          <div className="period-selector">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-select"
            >
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{formatCurrency(currentStats.totalSales)}</h3>
            <p className="stat-label">Total Penjualan</p>
            <span className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +12.5%
            </span>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{formatNumber(currentStats.totalOrders)}</h3>
            <p className="stat-label">Total Pesanan</p>
            <span className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +8.3%
            </span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{formatNumber(currentStats.customerCount)}</h3>
            <p className="stat-label">Pelanggan</p>
            <span className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +15.2%
            </span>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{formatCurrency(currentStats.averageOrder)}</h3>
            <p className="stat-label">Rata-rata Order</p>
            <span className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              +5.7%
            </span>
          </div>
        </div>
      </div>

      {/* Charts and Tables Section */}
      <div className="dashboard-content">
        <div className="content-left">
          {/* Recent Orders */}
          <div className="content-card">
            <div className="card-header">
              <h3>Pesanan Terbaru</h3>
              <button className="view-all-btn">Lihat Semua</button>
            </div>
            <div className="orders-list">
              {recentOrders.map((order, index) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <div className="order-header">
                      <h4 className="order-id">{order.id}</h4>
                      <span className={`order-status ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="customer-name">{order.customer}</p>
                    <p className="order-items">{order.items.join(', ')}</p>
                    <div className="order-meta">
                      <span className="order-time">{order.time}</span>
                      <span className={`order-type ${getOrderTypeColor(order.type)}`}>
                        {order.type}
                      </span>
                    </div>
                  </div>
                  <div className="order-total">
                    <h4>{formatCurrency(order.total)}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="content-card">
            <div className="card-header">
              <h3>Produk Terlaris</h3>
              <button className="view-all-btn">Lihat Semua</button>
            </div>
            <div className="products-list">
              {topProducts.map((product, index) => (
                <div key={product.name} className="product-item">
                  <div className="product-rank">
                    <span className="rank-number">{index + 1}</span>
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-sales">{product.sales} terjual</p>
                  </div>
                  <div className="product-revenue">
                    <h4>{formatCurrency(product.revenue)}</h4>
                    <span className="growth-rate positive">{product.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-right">
          {/* Quick Stats */}
          <div className="content-card">
            <div className="card-header">
              <h3>Statistik Cepat</h3>
            </div>
            <div className="quick-stats">
              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <div className="quick-stat-info">
                  <h4>{currentStats.topProduct}</h4>
                  <p>Produk Terlaris ({currentStats.topProductSales} terjual)</p>
                </div>
              </div>

              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <i className="fas fa-table"></i>
                </div>
                <div className="quick-stat-info">
                  <h4>{currentStats.tableOccupancy}%</h4>
                  <p>Okupansi Meja</p>
                </div>
              </div>

              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="quick-stat-info">
                  <h4>12:30</h4>
                  <p>Jam Puncak</p>
                </div>
              </div>

              <div className="quick-stat-item">
                <div className="quick-stat-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="quick-stat-info">
                  <h4>4.8/5</h4>
                  <p>Rating Pelanggan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="content-card">
            <div className="card-header">
              <h3>Performa Kategori</h3>
            </div>
            <div className="category-list">
              {categoryPerformance.map((category, index) => (
                <div key={category.name} className="category-item">
                  <div className="category-info">
                    <h4 className="category-name">{category.name}</h4>
                    <p className="category-sales">{category.sales} pesanan</p>
                  </div>
                  <div className="category-stats">
                    <h4>{formatCurrency(category.revenue)}</h4>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="percentage">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="content-card">
            <div className="card-header">
              <h3>Aktivitas Terbaru</h3>
            </div>
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-icon success">
                  <i className="fas fa-check"></i>
                </div>
                <div className="activity-content">
                  <p>Pesanan ORD-001 selesai diproses</p>
                  <span className="activity-time">2 menit yang lalu</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon warning">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="activity-content">
                  <p>Pesanan ORD-002 sedang diproses</p>
                  <span className="activity-time">5 menit yang lalu</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon info">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="activity-content">
                  <p>Pesanan baru ORD-003 diterima</p>
                  <span className="activity-time">8 menit yang lalu</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon primary">
                  <i className="fas fa-user"></i>
                </div>
                <div className="activity-content">
                  <p>Pelanggan baru mendaftar</p>
                  <span className="activity-time">12 menit yang lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
