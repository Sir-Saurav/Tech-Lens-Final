'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/data';

const navLinks = [
  { label: 'Reviews', href: '/products' },
  { label: 'Videos', href: '/videos' },
  {
    label: 'Categories',
    href: '/categories',
    children: CATEGORIES.map((cat) => ({
      label: cat.name,
      href: `/categories/${cat.slug}`,
    })),
  },
  { label: 'Channels', href: '/channels' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#DDE1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded bg-[#1A1A1A] flex items-center justify-center text-white relative">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="3" x2="12" y2="7" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="3" y1="12" x2="7" y2="12" />
              <line x1="17" y1="12" x2="21" y2="12" />
              <circle cx="12" cy="12" r="3" fill="#2A6B4A" stroke="none" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-[#1A1A1A]">
            Gadget<span className="text-[#2D5986]">Lens</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded text-sm font-medium transition-colors',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'))
                    ? 'text-[#2D5986] bg-[#EEF4FA] font-semibold'
                    : 'text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#F5F6F4]'
                )}
              >
                {link.label}
                {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>

              {/* Dropdown Menu */}
              {link.children && openDropdown === link.label && (
                <div className="absolute top-full left-0 pt-1.5 w-56 z-50">
                  <div className="bg-white border border-[#DDE1E6] rounded shadow-md py-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#F5F6F4] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews..."
                  className="w-48 sm:w-64 bg-[#F5F6F4] border border-[#DDE1E6] rounded pl-3 pr-8 py-1.5 text-sm text-[#1A1A1A] placeholder-[#858585] focus:outline-none focus:border-[#2D5986]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5C5C5C] hover:text-[#1A1A1A]"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#F5F6F4] rounded transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#5C5C5C] hover:text-[#1A1A1A] hover:bg-[#F5F6F4] rounded transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#DDE1E6] bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  'block px-3 py-2 rounded text-base font-medium transition-colors',
                  pathname === link.href ? 'text-[#2D5986] bg-[#EEF4FA]' : 'text-[#5C5C5C] hover:text-[#1A1A1A]'
                )}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4 space-y-1 mt-1 border-l-2 border-[#DDE1E6] ml-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-2 py-1.5 text-sm text-[#5C5C5C] hover:text-[#1A1A1A]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
