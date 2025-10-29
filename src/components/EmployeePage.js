import React, { useState } from 'react';
import './EmployeePage.css';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ahmad Rizki',
      position: 'Kasir',
      email: 'ahmad.rizki@zocco.com',
      phone: '+62 812-3456-7890',
      status: 'Aktif',
      joinDate: '2023-01-15',
      salary: 3500000,
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Sarah Putri',
      position: 'Kasir',
      email: 'sarah.putri@zocco.com',
      phone: '+62 813-9876-5432',
      status: 'Aktif',
      joinDate: '2023-02-20',
      salary: 3500000,
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      position: 'Manager',
      email: 'budi.santoso@zocco.com',
      phone: '+62 814-1111-2222',
      status: 'Aktif',
      joinDate: '2022-08-10',
      salary: 5000000,
      avatar: '👨‍💼'
    },
    {
      id: 4,
      name: 'Dewi Sari',
      position: 'Kasir',
      email: 'dewi.sari@zocco.com',
      phone: '+62 815-3333-4444',
      status: 'Cuti',
      joinDate: '2023-03-05',
      salary: 3500000,
      avatar: '👩‍💼'
    },
    {
      id: 5,
      name: 'Rudi Hermawan',
      position: 'Kitchen Staff',
      email: 'rudi.hermawan@zocco.com',
      phone: '+62 816-5555-6666',
      status: 'Aktif',
      joinDate: '2023-01-10',
      salary: 2800000,
      avatar: '👨‍🍳'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterPosition, setFilterPosition] = useState('Semua');

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    status: 'Aktif',
    joinDate: '',
    salary: ''
  });

  const positions = ['Kasir', 'Manager', 'Kitchen Staff', 'Waitress', 'Security'];
  const statuses = ['Aktif', 'Cuti', 'Nonaktif'];

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.email) {
      const employee = {
        id: employees.length + 1,
        ...newEmployee,
        salary: parseInt(newEmployee.salary),
        avatar: newEmployee.position === 'Manager' ? '👨‍💼' : 
                newEmployee.position === 'Kitchen Staff' ? '👨‍🍳' : '👩‍💼'
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        name: '',
        position: '',
        email: '',
        phone: '',
        status: 'Aktif',
        joinDate: '',
        salary: ''
      });
      setShowAddModal(false);
    }
  };

  const editEmployee = () => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      ));
      setShowEditModal(false);
      setSelectedEmployee(null);
    }
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const formatSalary = (salary) => {
    return `Rp ${salary.toLocaleString()}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || employee.status === filterStatus;
    const matchesPosition = filterPosition === 'Semua' || employee.position === filterPosition;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  return (
    <div className="employee-container">
      {/* Header */}
      <div className="employee-header">
        <div className="header-left">
          <h1 className="page-title">Manajemen Karyawan</h1>
          <p className="page-subtitle">Kelola data karyawan Zocco Heritage</p>
        </div>
        <div className="header-right">
          <button 
            className="add-employee-btn"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus"></i>
            Tambah Karyawan
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="employee-filters">
        <div className="search-section">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Cari karyawan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-section">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="Semua">Semua Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="filter-select"
          >
            <option value="Semua">Semua Posisi</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Stats */}
      <div className="employee-stats">
        <div className="stat-card">
          <div className="stat-icon active">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-info">
            <h3>{employees.filter(emp => emp.status === 'Aktif').length}</h3>
            <p>Karyawan Aktif</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon leave">
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{employees.filter(emp => emp.status === 'Cuti').length}</h3>
            <p>Sedang Cuti</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon inactive">
            <i className="fas fa-user-times"></i>
          </div>
          <div className="stat-info">
            <h3>{employees.filter(emp => emp.status === 'Nonaktif').length}</h3>
            <p>Nonaktif</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon total">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{employees.length}</h3>
            <p>Total Karyawan</p>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Karyawan</th>
              <th>Posisi</th>
              <th>Kontak</th>
              <th>Status</th>
              <th>Tanggal Bergabung</th>
              <th>Gaji</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td className="employee-info">
                  <div className="employee-avatar">
                    <span className="avatar-emoji">{employee.avatar}</span>
                  </div>
                  <div className="employee-details">
                    <h4 className="employee-name">{employee.name}</h4>
                    <p className="employee-id">ID: {employee.id}</p>
                  </div>
                </td>
                <td>
                  <span className="position-badge">{employee.position}</span>
                </td>
                <td>
                  <div className="contact-info">
                    <p className="contact-email">{employee.email}</p>
                    <p className="contact-phone">{employee.phone}</p>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td>{formatDate(employee.joinDate)}</td>
                <td className="salary">{formatSalary(employee.salary)}</td>
                <td className="actions">
                  <button
                    className="action-btn edit"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredEmployees.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-users empty-icon"></i>
            <h3>Tidak ada karyawan ditemukan</h3>
            <p>Coba ubah filter atau tambah karyawan baru</p>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Tambah Karyawan Baru</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div className="form-group">
                <label>Posisi</label>
                <select
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                >
                  <option value="">Pilih posisi</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  placeholder="email@zocco.com"
                />
              </div>
              
              <div className="form-group">
                <label>Nomor Telepon</label>
                <input
                  type="tel"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  placeholder="+62 812-3456-7890"
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newEmployee.status}
                  onChange={(e) => setNewEmployee({...newEmployee, status: e.target.value})}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Tanggal Bergabung</label>
                <input
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Gaji (Rp)</label>
                <input
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                  placeholder="3500000"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Batal
              </button>
              <button 
                className="btn-primary"
                onClick={addEmployee}
              >
                Tambah Karyawan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Karyawan</h2>
              <button 
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  value={selectedEmployee.name}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Posisi</label>
                <select
                  value={selectedEmployee.position}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, position: e.target.value})}
                >
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedEmployee.email}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Nomor Telepon</label>
                <input
                  type="tel"
                  value={selectedEmployee.phone}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, phone: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  value={selectedEmployee.status}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, status: e.target.value})}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Tanggal Bergabung</label>
                <input
                  type="date"
                  value={selectedEmployee.joinDate}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, joinDate: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Gaji (Rp)</label>
                <input
                  type="number"
                  value={selectedEmployee.salary}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, salary: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </button>
              <button 
                className="btn-primary"
                onClick={editEmployee}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
