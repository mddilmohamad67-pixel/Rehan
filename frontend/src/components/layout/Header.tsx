'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun, LogOut, Settings } from 'lucide-react';

export default function Header() {
  const { user, userProfile, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600" />
          <span className="text-xl">REHAN</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-sm hover:text-primary transition">
            Dashboard
          </Link>
          <Link href="/tools" className="text-sm hover:text-primary transition">
            Tools
          </Link>
          {userProfile?.role === 'admin' && (
            <Link href="/admin" className="text-sm hover:text-primary transition">
              Admin
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-secondary rounded-lg transition"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary transition"
              >
                <img
                  src={userProfile?.avatar || 'https://via.placeholder.com/32'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm hidden sm:inline">{
                  userProfile?.fullName || user.email?.split('@')[0]
                }</span>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border">
                  <Link
                    href="/settings"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-secondary rounded-t-lg transition"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-secondary rounded-b-lg text-red-500 transition"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm hover:text-primary transition">
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
