import { useState, useEffect } from 'react';
import { api } from '../../api';
import { formatAmount, getStockStatus } from '../../utils';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(console.error);
  }, []);

  function handleDelete(id) {
    if (!confirm('Xóa sản phẩm này?')) return;
    api.deleteProduct(id).then(() => setProducts(p => p.filter(x => x.id !== id)));
  }

  return (
    <section className="section active" id="products">
      <div className="section-title">
        <h2><i className="fa-solid fa-box-open"></i> Danh Sách Sản Phẩm</h2>
        <p>Quản lý toàn bộ sản phẩm trong cửa hàng</p>
      </div>
      <div className="card">
        <div className="card-toolbar">
          <div className="search-bar"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Tìm sản phẩm, SKU..."/></div>
          <div className="toolbar-right">
            <select className="select-filter"><option>Tất cả danh mục</option></select>
            <button className="btn btn-primary"><i className="fa-solid fa-plus"></i> Thêm sản phẩm</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr><th>SKU</th><th>Tên Sản Phẩm</th><th>Danh Mục</th><th>Giá Nhập</th><th>Giá Bán</th><th>Tồn Kho</th><th>Trạng Thái</th><th>Thao Tác</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{formatAmount(p.importPrice)}</td>
                <td>{formatAmount(p.salePrice)}</td>
                <td>{p.stock}</td>
                <td>{getStockStatus(p.stock)}</td>
                <td className="action-btns">
                  <button className="btn-icon view"><i className="fa-solid fa-eye"></i></button>
                  <button className="btn-icon edit"><i className="fa-solid fa-pen"></i></button>
                  <button className="btn-icon delete" onClick={() => handleDelete(p.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
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


