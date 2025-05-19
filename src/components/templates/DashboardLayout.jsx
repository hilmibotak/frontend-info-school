// src/components/templates/DashboardLayout.jsx
import { useState } from "react"

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white w-64 p-4 shadow-md transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <h2 className="text-xl font-bold mb-4">School Info</h2>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Students</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Teachers</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Subjects</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Schedules</a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "Tutup Menu" : "Buka Menu"}
        </button>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
