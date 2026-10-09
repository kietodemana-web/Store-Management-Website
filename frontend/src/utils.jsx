// Shared formatters dùng chung toàn app

export function formatAmount(val) {
  if (val == null) return '--';
  return val.toLocaleString('vi-VN') + 'đ';
}

export function formatDate(val) {
  if (!val) return '--';
  return new Date(val).toLocaleDateString('vi-VN');
}

export function formatCode(prefix, id) {
  return '#' + prefix + String(id).padStart(4, '0');
}

export function getStockStatus(stock) {
  if (stock <= 0) return <span className="status danger">Hết hàng</span>;
  if (stock <= 5) return <span className="status danger">Sắp hết</span>;
  if (stock <= 10) return <span className="status warning">Thấp</span>;
  return <span className="status done">Còn hàng</span>;
}
