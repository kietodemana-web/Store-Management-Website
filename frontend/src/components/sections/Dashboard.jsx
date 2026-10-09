import { useState, useEffect } from 'react';
import { api } from '../../api';
import { formatAmount, formatDate, formatCode } from '../../utils';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [imports, setImports] = useState([]);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getInvoices(), api.getImports()])
      .then(([p, i, m]) => { setProducts(p); setInvoices(i); setImports(m); })
      .catch(console.error);
  }, []);

  const revenue = invoices.filter(i => i.status === 'PAID').reduce((s, x) => s + x.totalAmount, 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10);
  const recentInvoices = [...invoices].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <section className="section active" id="dashboard">
      <div className="section-title">
        <h2><i className="fa-solid fa-chart-pie"></i> Tổng Quan</h2>
        <p>Chào mừng đến với hệ thống quản lý cửa hàng Nam Trung</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-box-open"></i></div>
          <div className="stat-info"><span className="stat-value">{products.length || '--'}</span><span className="stat-label">Sản Phẩm</span></div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-money-bill-wave"></i></div>
          <div className="stat-info"><span className="stat-value">{invoices.length ? formatAmount(revenue) : '--'}</span><span className="stat-label">Doanh Thu</span></div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-truck-ramp-box"></i></div>
          <div className="stat-info"><span className="stat-value">{imports.length || '--'}</span><span className="stat-label">Phiếu Nhập</span></div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-file-invoice-dollar"></i></div>
          <div className="stat-info"><span className="stat-value">{invoices.length || '--'}</span><span className="stat-label">Hóa Đơn</span></div>
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="card">
          <div className="card-header"><h3>Giao Dịch Gần Đây</h3></div>
          <table className="table">
            <thead>
              <tr><th>Mã HD</th><th>Khách Hàng</th><th>Sản Phẩm</th><th>Tổng Tiền</th><th>Trạng Thái</th></tr>
            </thead>
            <tbody>
              {recentInvoices.map(inv => (
                <tr key={inv.id}>
                  <td>{formatCode('HD', inv.id)}</td>
                  <td>{inv.customerName}</td>
                  <td>{inv.productName}</td>
                  <td>{formatAmount(inv.totalAmount)}</td>
                  <td>{inv.status === 'PAID'
                    ? <span className="status done">Đã thanh toán</span>
                    : <span className="status pending">Chưa thanh toán</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-header"><h3>Tồn Kho Thấp</h3></div>
          <ul className="low-stock-list">
            {lowStock.map(p => (
              <li key={p.id}>
                <div className="ls-info">
                  <span className="ls-name">{p.name}</span>
                  <span className="ls-sku">SKU: {p.sku}</span>
                </div>
                <span className={`ls-qty ${p.stock <= 5 ? 'danger' : 'warning'}`}>{p.stock}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

