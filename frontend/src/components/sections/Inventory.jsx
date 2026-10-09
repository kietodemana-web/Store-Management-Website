import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(console.error);
  }, []);

  const total = products.length;
  const inStock = products.filter(p => p.stock > 10).length;
  const low = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const out = products.filter(p => p.stock <= 0).length;

  function getStatus(stock) {
    if (stock <= 0) return <span className="status danger">Hết hàng</span>;
    if (stock <= 5) return <span className="status danger">Sắp hết</span>;
    if (stock <= 10) return <span className="status warning">Thấp</span>;
    return <span className="status done">Bình thường</span>;
  }

  return (
    <section className="section active" id="inventory">
      <div className="section-title">
        <h2><i className="fa-solid fa-warehouse"></i> Tồn Kho</h2>
        <p>Theo dõi số lượng hàng tồn kho hiện tại</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card blue"><div className="stat-icon"><i className="fa-solid fa-boxes-stacked"></i></div><div className="stat-info"><span className="stat-value">{total || '--'}</span><span className="stat-label">Loại Sản Phẩm</span></div></div>
        <div className="stat-card green"><div className="stat-icon"><i className="fa-solid fa-circle-check"></i></div><div className="stat-info"><span className="stat-value">{total ? inStock : '--'}</span><span className="stat-label">Còn Hàng</span></div></div>
        <div className="stat-card orange"><div className="stat-icon"><i className="fa-solid fa-triangle-exclamation"></i></div><div className="stat-info"><span className="stat-value">{total ? low : '--'}</span><span className="stat-label">Tồn Thấp</span></div></div>
        <div className="stat-card red"><div className="stat-icon"><i className="fa-solid fa-ban"></i></div><div className="stat-info"><span className="stat-value">{total ? out : '--'}</span><span className="stat-label">Hết Hàng</span></div></div>
      </div>
      <div className="card">
        <div className="card-toolbar">
          <div className="search-bar"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Tìm sản phẩm..."/></div>
          <div className="toolbar-right">
            <select className="select-filter"><option>Tất cả trạng thái</option><option>Còn hàng</option><option>Tồn thấp</option><option>Hết hàng</option></select>
            <button className="btn btn-outline"><i className="fa-solid fa-file-export"></i> Xuất Excel</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr><th>SKU</th><th>Tên Sản Phẩm</th><th>Danh Mục</th><th>Tồn Kho</th><th>Trạng Thái</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>{getStatus(p.stock)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Hiển thị {products.length} sản phẩm</span>
        </div>
      </div>
    </section>
  );
}

