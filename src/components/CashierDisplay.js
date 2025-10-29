import React, { useState, useEffect } from 'react';
import './CashierDisplay.css';
import EmployeePage from './EmployeePage';
import DashboardPage from './DashboardPage';
import ReportPage from './ReportPage';

const CashierDisplay = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [orderType, setOrderType] = useState('Dine In');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu from TheMealDB API
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          const mapped = data.meals.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            price: 32000, // harga default
            category: meal.strCategory || 'Other',
            image: meal.strMealThumb,
            available: 10 // stok default
          }));
          setProducts(mapped);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Gagal mengambil menu dari API');
        setLoading(false);
      });
  }, []);

  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, notes: '' }]);
    }
    setTotal(total + product.price);
  };

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      setCart(cart.filter(item => item.id !== productId));
      setTotal(total - (item.price * item.quantity));
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
      const quantityDiff = newQuantity - item.quantity;
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
      setTotal(total + (item.price * quantityDiff));
    }
  };

  const updateNotes = (productId, notes) => {
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, notes }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  const processPayment = () => {
    if (cart.length === 0) return;
    
    alert(`Pembayaran berhasil!\nTotal: Rp ${total.toLocaleString()}\nTipe Order: ${orderType}`);
    clearCart();
  };

  const formatPrice = (price) => {
    return `Rp. ${price.toLocaleString()}`;
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

    const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'employees':
        return <EmployeePage />;
      case 'reports':
        return <ReportPage />;
      case 'orders':
      default:
        return (
          <>
            {/* Top Header */}
            <div className="top-header">
              <div className="header-left">
                <h2 className="page-title">Orders</h2>
              </div>
              <div className="header-center">
                <div className="search-container">
                  <i className="search-icon fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search Order ID"
                    className="search-input"
                  />
                </div>
              </div>
              <div className="header-right">
                <div className="header-actions">
                  <i className="action-icon fas fa-envelope"></i>
                  <i className="action-icon notification fas fa-bell"></i>
                  <div className="user-profile">
                    <i className="user-avatar fas fa-user"></i>
                    <i className="dropdown-arrow fas fa-chevron-down"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Section */}
            <div className="menu-section">
              {loading ? (
                <div>Loading menu...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <>
                  <div className="menu-header">
                    <div className="menu-search">
                      <i className="search-icon fas fa-search"></i>
                      <input
                        type="text"
                        placeholder="Cari Makanan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="menu-search-input"
                      />
                    </div>
                    
                    <div className="menu-filters">
                      <div className="category-filters">
                        {categories.map(category => (
                          <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                      
                      <div className="order-type-selector">
                        <select
                          value={orderType}
                          onChange={(e) => setOrderType(e.target.value)}
                          className="order-type-select"
                        >
                          <option value="Dine In">Dine In</option>
                          <option value="To Go">To Go</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <h3 className="section-title">Pilih Menu</h3>
                  
                  <div className="menu-grid">
                    {filteredProducts.map(product => (
                      <div
                        key={product.id}
                        className="menu-item"
                        onClick={() => addToCart(product)}
                      >
                        <div className="menu-item-image">
                          <img src={product.image} alt={product.name} className="item-img" />
                        </div>
                        <div className="menu-item-info">
                          <h4 className="item-name">{product.name}</h4>
                          <p className="item-price">{formatPrice(product.price)}</p>
                          <p className="item-availability">{product.available} Tersedia</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="pos-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <h1 className="logo">ZOCCO</h1>
          <p className="logo-subtitle">Zocco Heritage</p>
        </div>
        
        <nav className="nav-menu">
          <div 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <i className="nav-icon fas fa-home"></i>
            <span className="nav-text">Dashboard</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'employees' ? 'active' : ''}`}
            onClick={() => setCurrentPage('employees')}
          >
            <i className="nav-icon fas fa-users"></i>
            <span className="nav-text">Karyawan</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'orders' ? 'active' : ''}`}
            onClick={() => setCurrentPage('orders')}
          >
            <i className="nav-icon fas fa-star"></i>
            <span className="nav-text">Orders</span>
          </div>
          <div 
            className={`nav-item ${currentPage === 'reports' ? 'active' : ''}`}
            onClick={() => setCurrentPage('reports')}
          >
            <i className="nav-icon fas fa-chart-bar"></i>
            <span className="nav-text">Laporan</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>

      {/* Right Sidebar - Order Details (only show on orders page) */}
      {currentPage === 'orders' && (
        <div className="order-sidebar">
          <div className="order-header">
            <h3 className="order-id">Orders #34562</h3>
            
            <div className="order-type-tabs">
              <button className={`order-tab ${orderType === 'Dine In' ? 'active' : ''}`}>
                Dine In
              </button>
              <button className={`order-tab ${orderType === 'To Go' ? 'active' : ''}`}>
                To Go
              </button>
              <button className={`order-tab ${orderType === 'Delivery' ? 'active' : ''}`}>
                Delivery
              </button>
            </div>
          </div>

          <div className="order-items">
            <div className="order-items-header">
              <span>Item</span>
              <span>Qty</span>
              <span>Hrga</span>
            </div>
            
            <div className="order-items-list">
              {cart.length === 0 ? (
                <p className="empty-cart">Keranjang kosong</p>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="order-item">
                    <div className="item-details">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} className="item-img-small" />
                      </div>
                      <div className="item-info">
                        <h4 className="item-name">{item.name}</h4>
                        <input
                          type="text"
                          placeholder="Catatan..."
                          value={item.notes}
                          onChange={(e) => updateNotes(item.id, e.target.value)}
                          className="item-notes"
                        />
                      </div>
                    </div>
                    
                    <div className="item-quantity">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="quantity-input"
                        min="1"
                      />
                    </div>
                    
                    <div className="item-price">
                      <span className="price-text">{Math.round(item.price / 1000)}k</span>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Discount:</span>
              <span>0</span>
            </div>
            <div className="summary-row total">
              <span>Sub total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={processPayment}
            disabled={cart.length === 0}
            className="payment-btn"
          >
            Lanjutkan ke Pembayaran
          </button>
        </div>
      )}
    </div>
  );
};

export default CashierDisplay;
