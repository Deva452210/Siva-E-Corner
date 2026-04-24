"use client";

import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md text-black border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-bold text-2xl tracking-wider text-primary">SIVA</span>
              <span className="font-semibold text-xl text-black">E-Corner</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/services" className="hover:text-primary transition-colors font-bold">Services</Link>
            <Link href="/#certificates" className="hover:text-primary transition-colors font-bold">Certificates</Link>
            <Link href="/#cabs" className="hover:text-primary transition-colors font-bold">SIVA Cabs</Link>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-xs text-gray-500">Logged in as</p>
                      <p className="text-sm font-bold truncate">{user.phone}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-bold">Admin</span>
                      )}
                    </div>
                    
                    {user.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold hover:from-secondary hover:to-primary transition-all shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-bold hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/#certificates" className="block px-3 py-2 rounded-md text-base font-bold hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Certificates</Link>
            <Link href="/#cabs" className="block px-3 py-2 rounded-md text-base font-bold hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>SIVA Cabs</Link>
            
            {user ? (
              <div className="border-t border-gray-100 pt-2 mt-2">
                <div className="px-3 py-2">
                  <p className="text-xs text-gray-500">Logged in as {user.phone}</p>
                </div>
                {user.role === 'admin' && (
                  <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-bold text-purple-600 hover:bg-purple-50" onClick={() => setIsOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-bold text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-bold text-primary hover:bg-gray-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
