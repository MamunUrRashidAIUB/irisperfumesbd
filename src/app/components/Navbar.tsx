"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg relative z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          <Link href="/" className="hover:text-gray-100 transition">
            Iris Perfumes
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Menu */}
        <ul
          className={`md:flex md:space-x-8 text-lg font-bold
          fixed md:static
          top-0 right-0
          h-full md:h-auto
          w-64 md:w-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
          bg-gradient-to-b from-indigo-700 to-purple-800 md:bg-none
          z-50 md:z-auto
          pt-16 md:pt-0
          shadow-lg md:shadow-none`}
        >
          {/* Close button inside menu */}
          <li className="md:hidden absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl hover:text-yellow-300"
            >
              ✖
            </button>
          </li>

          <li className="text-center md:text-left py-3 md:py-0 border-b border-indigo-600/50 md:border-none px-6 md:px-0">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 block">
              Home
            </Link>
          </li>

          <li className="text-center md:text-left py-3 md:py-0 border-b border-indigo-600/50 md:border-none px-6 md:px-0">
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 block">
              About
            </Link>
          </li>

          <li className="text-center md:text-left py-3 md:py-0 border-b border-indigo-600/50 md:border-none px-6 md:px-0">
            <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 block">
              Products
            </Link>
          </li>

          <li className="text-center md:text-left py-3 md:py-0 border-b border-indigo-600/50 md:border-none px-6 md:px-0">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-300 block">
              Contact
            </Link>
          </li>

          {/* Mobile Add to Cart */}
          <li className="md:hidden text-center py-4 px-6">
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <button className="bg-yellow-400 text-indigo-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition w-full">
                Add to Cart
              </button>
            </Link>
          </li>

          {/* Mobile login */}
          <li className="md:hidden text-center py-4 px-6">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-yellow-400 text-indigo-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition w-full">
                Login
              </button>
            </Link>
          </li>
        </ul>

        {/* Desktop buttons */}
        <div className="hidden md:flex md:space-x-3">
          <Link href="/cart">
            <button className="bg-yellow-400 text-indigo-900 px-5 py-2 rounded-full shadow-md hover:bg-yellow-500 transition font-bold">
              Add to Cart
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-yellow-400 text-indigo-900 px-5 py-2 rounded-full shadow-md hover:bg-yellow-500 transition font-bold">
              Login
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
