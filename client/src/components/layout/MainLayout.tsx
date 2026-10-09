import { Outlet, Link } from 'react-router-dom';
import { Compass, User, BookOpen, Trophy } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-algoverse-bg-main overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-20 lg:w-64 bg-algoverse-elevated border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col items-center p-4 gap-8 z-50">
        <div className="flex items-center gap-2 mb-0 md:mb-8 text-algoverse-primary font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-algoverse-primary to-algoverse-accent flex items-center justify-center text-white">
            AV
          </div>
          <span className="hidden lg:block text-white">AlgoVerse</span>
        </div>
        
        <div className="flex md:flex-col gap-6 w-full justify-around md:justify-start">
          <NavLink to="/world" icon={<Compass />} label="World Map" />
          <NavLink to="/challenges" icon={<Trophy />} label="Arena" />
          <NavLink to="/profile" icon={<User />} label="Profile" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-3 text-algoverse-text-secondary hover:text-algoverse-accent transition-colors p-2 rounded-lg hover:bg-white/5"
      title={label}
    >
      {icon}
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
}
