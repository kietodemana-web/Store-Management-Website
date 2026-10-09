import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function Imports() {
  const [imports, setImports] = useState([]);

  useEffect(() => {
    api.getImports().then(setImports).catch(console.error);
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
    return '#PN' + String(id).padStart(4, '0');
  }

  return (
    <section className="section active" id="imports">
      <div className="section-title">
        <h2><i className="fa-solid fa-truck-ramp-box"></i> Đầu Vào – Nhập Hàng</h2>
        <p>Quản lý các phiếu nhập hàng từ nhà cung cấp</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card blue"><div className="stat-icon"><i className="fa-solid fa-file-import"></i></div><div className="stat-info"><span className="stat-value">{imports.length || '--'}</span><span className="stat-label">Phiếu Nhập</span></div></div>
        <div className="stat-card orange"><div className="stat-icon"><i className="fa-solid fa-money-bill-transfer"></i></div><div className="stat-info"><span className="stat-value">{imports.length ? formatAmount(imports.reduce((s, x) => s + x.totalAmount, 0)) : '--'}</span><span className="stat-label">Tổng Chi Nhập Hàng</span></div></div>
      </div>
      <div className="card">
        <div className="card-toolbar">
          <div className="search-bar"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Tìm phiếu nhập, nhà cung cấp..."/></div>
          <div className="toolbar-right">
            <input type="date" className="date-input" />
            <input type="date" className="date-input" />
            <button className="btn btn-primary"><i className="fa-solid fa-plus"></i> Tạo phiếu nhập</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr><th>Mã Phiếu</th><th>Nhà Cung Cấp</th><th>Ngày Nhập</th><th>Sản Phẩm</th><th>Số Lượng</th><th>Tổng Tiền</th><th>Thao Tác</th></tr>
          </thead>
          <tbody>
            {imports.map(o => (
              <tr key={o.id}>
                <td>{formatCode(o.id)}</td>
                <td>{o.supplier}</td>
                <td>{formatDate(o.importDate)}</td>
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
          <span>Hiển thị {imports.length} phiếu nhập</span>
        </div>
      </div>
    </section>
  );
}

