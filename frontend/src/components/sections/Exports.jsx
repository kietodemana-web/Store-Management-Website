import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function Exports() {
  const [exports, setExports] = useState([]);

  useEffect(() => {
    api.getExports().then(setExports).catch(console.error);
  }, []);

  function formatAmount(val) {
    if (val == null) return '--';
    return val.toLocaleString('vi-VN') + 'đ';
  }

  function formatDate(val) {
    if (!val) return '--';
    return new Date(val).toLocaleDateString('vi-VN');
  }

  function formatCode(id) {
    return '#PX' + String(id).padStart(4, '0');
  }

  return (
    <section className="section active" id="exports">
      <div className="section-title">
        <h2><i className="fa-solid fa-truck-fast"></i> Đầu Ra – Xuất Hàng</h2>
        <p>Quản lý các phiếu xuất hàng bán ra</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card green"><div className="stat-icon"><i className="fa-solid fa-file-export"></i></div><div className="stat-info"><span className="stat-value">{exports.length || '--'}</span><span className="stat-label">Phiếu Xuất</span></div></div>
        <div className="stat-card purple"><div className="stat-icon"><i className="fa-solid fa-sack-dollar"></i></div><div className="stat-info"><span className="stat-value">{exports.length ? formatAmount(exports.reduce((s, x) => s + x.totalAmount, 0)) : '--'}</span><span className="stat-label">Doanh Thu</span></div></div>
      </div>
      <div className="card">
        <div className="card-toolbar">
          <div className="search-bar"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Tìm phiếu xuất, khách hàng..."/></div>
          <div className="toolbar-right">
            <input type="date" className="date-input" />
            <input type="date" className="date-input" />
            <button className="btn btn-primary"><i className="fa-solid fa-plus"></i> Tạo phiếu xuất</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr><th>Mã Phiếu</th><th>Khách Hàng</th><th>Ngày Xuất</th><th>Sản Phẩm</th><th>Số Lượng</th><th>Tổng Tiền</th><th>Thao Tác</th></tr>
          </thead>
          <tbody>
            {exports.map(o => (
              <tr key={o.id}>
                <td>{formatCode(o.id)}</td>
                <td>{o.customerName}</td>
                <td>{formatDate(o.exportDate)}</td>
                <td>{o.productName}</td>
                <td>{o.quantity}</td>
                <td>{formatAmount(o.totalAmount)}</td>
                <td className="action-btns">
                  <button className="btn-icon view"><i className="fa-solid fa-eye"></i></button>
                  <button className="btn-icon print"><i className="fa-solid fa-print"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Hiển thị {exports.length} phiếu xuất</span>
        </div>
      </div>
    </section>
  );
}

