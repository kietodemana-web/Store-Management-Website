import { useEffect, useState } from 'react'

const BREADCRUMB = {
  dashboard: 'Tổng Quan',
  products:  'Danh Sách Sản Phẩm',
  inventory: 'Tồn Kho',
  imports:   'Đầu Vào – Nhập Hàng',
  exports:   'Đầu Ra – Xuất Hàng',
  invoices:  'Hóa Đơn',
}

export default function Header({ onToggle, activeSection }) {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }))
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <button className="toggle-btn" id="toggleBtn" onClick={onToggle}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="breadcrumb">
          <span id="breadcrumbText">{BREADCRUMB[activeSection]}</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
        <button className="header-icon-btn" title="Thông báo">
          <i className="fa-solid fa-bell"></i>
          <span className="badge">3</span>
        </button>
        <button className="header-icon-btn" title="Cài đặt">
          <i className="fa-solid fa-gear"></i>
        </button>
        <div className="header-date">
          <i className="fa-regular fa-calendar"></i>
          <span id="currentDate">{date}</span>
        </div>
      </div>
    </header>
  )
}
