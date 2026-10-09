import { useState, useEffect } from 'react';
import { api } from '../../api';
import { formatAmount, formatDate, formatCode } from '../../utils';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.getInvoices().then(setInvoices).catch(console.error);
  }, []);

  const unpaid = invoices.filter(i => i.status === 'UNPAID').length;
  const revenue = invoices.filter(i => i.status === 'PAID').reduce((s, x) => s + x.totalAmount, 0);

  return (
    <section className="section active" id="invoices">
      <div className="section-title">
        <h2><i className="fa-solid fa-file-invoice-dollar"></i> Hóa Đơn</h2>
        <p>Quản lý hóa đơn bán hàng</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card green"><div className="stat-icon"><i className="fa-solid fa-money-bill-wave"></i></div><div className="stat-info"><span className="stat-value">{invoices.length ? formatAmount(revenue) : '--'}</span><span className="stat-label">Doanh Thu</span></div></div>
        <div className="stat-card blue"><div className="stat-icon"><i className="fa-solid fa-file-invoice"></i></div><div className="stat-info"><span className="stat-value">{invoices.length || '--'}</span><span className="stat-label">Tổng Hóa Đơn</span></div></div>
        <div className="stat-card orange"><div className="stat-icon"><i className="fa-solid fa-hourglass-half"></i></div><div className="stat-info"><span className="stat-value">{invoices.length ? unpaid : '--'}</span><span className="stat-label">Chưa Thanh Toán</span></div></div>
      </div>
      <div className="card">
        <div className="card-toolbar">
          <div className="search-bar"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Tìm hóa đơn, khách hàng..."/></div>
          <div className="toolbar-right">
            <select className="select-filter"><option>Tất cả trạng thái</option><option>Đã thanh toán</option><option>Chưa thanh toán</option></select>
            <button className="btn btn-primary"><i className="fa-solid fa-plus"></i> Tạo hóa đơn</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr><th>Mã HD</th><th>Khách Hàng</th><th>Ngày Lập</th><th>Sản Phẩm</th><th>Tổng Tiền</th><th>Hình Thức TT</th><th>Trạng Thái</th><th>Thao Tác</th></tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td>{formatCode('HD', inv.id)}</td>
                <td>{inv.customerName}</td>
                <td>{formatDate(inv.invoiceDate)}</td>
                <td>{inv.productName}</td>
                <td>{formatAmount(inv.totalAmount)}</td>
                <td>{inv.paymentMethod}</td>
                <td>{inv.status === 'PAID'
                  ? <span className="status done">Đã thanh toán</span>
                  : <span className="status pending">Chưa thanh toán</span>}
                </td>
                <td className="action-btns">
                  <button className="btn-icon view"><i className="fa-solid fa-eye"></i></button>
                  <button className="btn-icon print"><i className="fa-solid fa-print"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Hiển thị {invoices.length} hóa đơn</span>
        </div>
      </div>
    </section>
  );
}


