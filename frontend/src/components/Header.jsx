import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Button from './ui/Button';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Right side - Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
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
              
              {/* Mobile auth section */}
              <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <span className="px-3 text-sm text-[var(--color-text-secondary)]">
                      {user.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      fullWidth
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
