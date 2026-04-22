'use client';

import { useDropdown } from '@/app/(shop)/hooks/useDropdown';
import { ShoppingCart, Globe, User } from 'lucide-react';
import Link from 'next/link';

type NavUserMenuProps = {};

export default function NavUserMenu({}: NavUserMenuProps) {
  const dropdown = useDropdown();

  return (
    <div className="flex items-center gap-3.5 shrink-0">
      <button className="text-[#047857B3] hover:text-[#2b352f] transition-colors">
        <ShoppingCart size={17} strokeWidth={1.7} />
      </button>

      <div className="relative" ref={dropdown.ref}>
        <button
          onClick={dropdown.toggle}
          className="text-[#047857B3] hover:text-[#2b352f] transition-colors"
        >
          <User size={17} strokeWidth={1.7} />
        </button>
        {dropdown.isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {true ? (
              <>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={dropdown.close}
                >
                  My Account
                </Link>
                {true && (
                  <Link
                    href="/users"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={dropdown.close}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => console.log('logout')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={dropdown.close}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={dropdown.close}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
