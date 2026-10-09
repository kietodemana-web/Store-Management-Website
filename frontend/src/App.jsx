import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/sections/Dashboard'
import Products from './components/sections/Products'
import Inventory from './components/sections/Inventory'
import Imports from './components/sections/Imports'
import Exports from './components/sections/Exports'
import Invoices from './components/sections/Invoices'

const SECTIONS = {
  dashboard: Dashboard,
  products:  Products,
  inventory: Inventory,
  imports:   Imports,
  exports:   Exports,
  invoices:  Invoices,
}

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const isMobile = () => window.innerWidth <= 768

  function handleToggle() {
    if (isMobile()) {
      setMobileSidebarOpen(o => !o)
    } else {
      setSidebarCollapsed(o => !o)
    }
  }

  function handleNavigate(sectionId) {
    setActiveSection(sectionId)
    if (isMobile()) setMobileSidebarOpen(false)
  }

  const SectionComponent = SECTIONS[activeSection]

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        active={activeSection}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onNavigate={handleNavigate}
      />
      <div className={`main-wrapper${sidebarCollapsed ? ' expanded' : ''}`}>
        <Header onToggle={handleToggle} activeSection={activeSection} />
        <main className="main-content">
          <SectionComponent />
        </main>
      </div>
    </div>
  )
}
