import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    // Main Container: slate-900 background for that deep dark theme
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans">
      {/* Navigation Bar */}
      <nav className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <div className="flex gap-4">
          <NavLink to="/" icon={<LayoutDashboard size={20}/>} text="Board" active={location.pathname === '/'} />
          <NavLink to="/create" icon={<PlusCircle size={20}/>} text="New Task" active={location.pathname === '/create'} />
        </div>
      </nav>
      
      {/* Page Content */}
      <main className="max-w-5xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

// Helper component for navigation links
const NavLink = ({ to, icon, text, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 
      ${active ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-slate-700 text-gray-400'}`}
  >
    {icon} <span>{text}</span>
  </Link>
);

export default Layout;