const NAV_ITEMS = [
  { id: 'dashboard', icon: 'fa-chart-pie',       label: 'Tổng Quan' },
  { id: 'products',  icon: 'fa-box-open',         label: 'Danh Sách Sản Phẩm' },
  { id: 'inventory', icon: 'fa-warehouse',        label: 'Tồn Kho' },
  { id: 'imports',   icon: 'fa-truck-ramp-box',   label: 'Đầu Vào' },
  { id: 'exports',   icon: 'fa-truck-fast',       label: 'Đầu Ra' },
  { id: 'invoices',  icon: 'fa-file-invoice-dollar', label: 'Hóa Đơn' },
]

export default function Sidebar({ active, collapsed, mobileOpen, onNavigate }) {
  const cls = ['sidebar', collapsed ? 'collapsed' : '', mobileOpen ? 'mobile-open' : '']
    .filter(Boolean).join(' ')

  return (
    <aside className={cls} id="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon"><i className="fa-solid fa-store"></i></div>
        <div className="brand-text">
          <span className="brand-name">Nam Trung</span>
          <span className="brand-sub">Đồ Gia Dụng</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href="#"
                className={`nav-item${active === item.id ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); onNavigate(item.id) }}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar"><i className="fa-solid fa-user-tie"></i></div>
          <div>
            <span className="user-name">Admin</span>
            <span className="user-role">Quản lý</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
