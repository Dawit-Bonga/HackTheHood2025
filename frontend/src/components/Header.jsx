import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';

function Header() {
  const { user, logout, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userCounts, setUserCounts] = useState({ roadmaps: 0, essays: 0 });
  const dropdownRef = useRef(null);

  // Fetch user counts
  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) return;
      
      try {
        const token = await getToken();
        const backendUrl = import.meta.env.VITE_BACKEND;

        const [roadmapsRes, essaysRes] = await Promise.all([
          fetch(`${backendUrl}/roadmaps`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${backendUrl}/essays`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const roadmapsData = await roadmapsRes.json();
        const essaysData = await essaysRes.json();

        setUserCounts({
          roadmaps: roadmapsData.roadmaps?.length || 0,
          essays: essaysData.essays?.length || 0
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [user, getToken]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [profileDropdownOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/about', label: 'Home' },
    { path: '/basicInfo', label: 'Get Started' },
    { path: '/career-quiz', label: 'Career Quiz' },
    { path: '/roadmap', label: 'Roadmap' },
    { path: '/scholarship', label: 'Scholarships' },
    { path: '/essay', label: 'Essay Grader' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
      <nav className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/about" className="flex flex-col">
            <span className="text-xl font-bold text-[var(--color-text-primary)]">
              College Express
            </span>
            <span className="hidden sm:block text-xs text-[var(--color-text-muted)]">
              Your path to college success
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-all
                  ${
                    isActivePath(link.path)
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                  }
                `.replace(/\s+/g, ' ').trim()}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Auth / Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-lg transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[150px] truncate">{user.email?.split('@')[0]}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-[var(--shadow-lg)] border border-[var(--color-border)] py-2 animate-[slideDown_0.2s_ease-out] z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-[var(--color-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {user.email}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        Signed in
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="flex-1">My Dashboard</span>
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="flex-1">My Roadmaps</span>
                        {userCounts.roadmaps > 0 && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full">
                            {userCounts.roadmaps}
                          </span>
                        )}
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="flex-1">My Essays</span>
                        {userCounts.essays > 0 && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full">
                            {userCounts.essays}
                          </span>
                        )}
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-[var(--color-border)] pt-2">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--color-border)] animate-[slideUp_0.2s_ease-out]">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-all
                    ${
                      isActivePath(link.path)
                        ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                    }
                  `.replace(/\s+/g, ' ').trim()}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile auth/profile section */}
              <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
                {user ? (
                  <div className="flex flex-col gap-2">
                    {/* User info */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-secondary)] rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                          {user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Profile links */}
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-md transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span className="flex-1">My Dashboard</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-md transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span className="flex-1">My Roadmaps</span>
                      {userCounts.roadmaps > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full">
                          {userCounts.roadmaps}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-md transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="flex-1">My Essays</span>
                      {userCounts.essays > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full">
                          {userCounts.essays}
                        </span>
                      )}
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      fullWidth
                      className="mt-2"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    fullWidth
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
