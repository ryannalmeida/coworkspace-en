
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { Bell, LogOut, User, Calendar, Home, BarChart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logoutUser } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Define navigation items
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/reservations', label: 'Reservations', icon: <Calendar className="h-5 w-5" /> },
    { path: '/reports', label: 'Reports', icon: <BarChart className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> }
  ];

  if (!user) {
    // Render a minimal layout for unauthenticated users
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container-custom flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 
                className="text-xl md:text-2xl font-bold text-primary cursor-pointer" 
                onClick={() => navigate('/')}
              >
                CoworkSpace
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className={location.pathname === '/login' ? 'bg-muted' : ''}
              >
                Login
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate('/register')}
                className={location.pathname === '/register' ? 'bg-primary/90' : ''}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <h1 
              className="text-xl md:text-2xl font-bold text-primary cursor-pointer" 
              onClick={() => navigate('/dashboard')}
            >
              CoworkSpace
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/notifications')}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-medium">
                {user.name}
              </span>
              <Button variant="outline" size="icon" onClick={() => navigate('/profile')}>
                <User className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={logoutUser}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-200",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div 
        className={cn(
          "fixed top-[73px] left-0 bottom-0 w-64 bg-white z-40 shadow-lg p-4 transition-transform duration-200 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "md:hidden"
        )}
      >
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="justify-start"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>

      {/* Desktop sidebar and main content */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-md p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className="justify-start"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
