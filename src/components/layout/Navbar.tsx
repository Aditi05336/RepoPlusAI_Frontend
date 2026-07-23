import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMockSignedIn, user, logout } = useAnalysis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2D9CD]/60 bg-white/80 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Brand Logo & Name */}
        <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C2541] text-white shadow-md shadow-[#1C2541]/20 group-hover:scale-105 transition-transform">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-[#12172A] font-sans">
              RepoPulse <span className="text-[#8A6C2E]">AI</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-[#3E4258] bg-white/80 px-2 py-0.5 rounded border border-[#E2D9CD]">
              v1.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              location.pathname === '/'
                ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 shadow-xs'
                : 'text-[#3E4258] hover:text-[#12172A] hover:bg-white/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              location.pathname === '/search' || location.pathname === '/dashboard'
                ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 shadow-xs'
                : 'text-[#3E4258] hover:text-[#12172A] hover:bg-white/60'
            }`}
          >
            Search
          </Link>

          {!isMockSignedIn ? (
            <>
              <Link
                to="/signin"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname === '/signin'
                    ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 shadow-xs'
                    : 'text-[#3E4258] hover:text-[#12172A] hover:bg-white/60'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#1C2541] hover:bg-[#141B30] text-white shadow-xs transition-all"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname === '/profile'
                    ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 shadow-xs'
                    : 'text-[#3E4258] hover:text-[#12172A] hover:bg-white/60'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname === '/settings'
                    ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20 shadow-xs'
                    : 'text-[#3E4258] hover:text-[#12172A] hover:bg-white/60'
                }`}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#B94A48] hover:bg-[#B94A48]/10 transition-all ml-1"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Hamburger Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#12172A] hover:bg-white/80 border border-[#E2D9CD] transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2D9CD] bg-white/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-lg animate-fade-in">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              location.pathname === '/'
                ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20'
                : 'text-[#3E4258] hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            onClick={closeMobileMenu}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              location.pathname === '/search' || location.pathname === '/dashboard'
                ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20'
                : 'text-[#3E4258] hover:bg-slate-50'
            }`}
          >
            Search
          </Link>

          {!isMockSignedIn ? (
            <>
              <Link
                to="/signin"
                onClick={closeMobileMenu}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === '/signin'
                    ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20'
                    : 'text-[#3E4258] hover:bg-slate-50'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="block text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-[#1C2541] text-white shadow-xs"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === '/profile'
                    ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20'
                    : 'text-[#3E4258] hover:bg-slate-50'
                }`}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={closeMobileMenu}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === '/settings'
                    ? 'bg-[#1C2541]/10 text-[#1C2541] border border-[#1C2541]/20'
                    : 'text-[#3E4258] hover:bg-slate-50'
                }`}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-[#B94A48] bg-[#B94A48]/10 hover:bg-[#B94A48]/20 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
