"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, BookOpen, Bookmark, Sparkles, PlusCircle } from "lucide-react";
import { getBookmarks, BOOKMARKS_CHANGED_EVENT } from "@/lib/storage/bookmarks";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function updateCount() {
      setBookmarkCount(getBookmarks().length);
    }
    updateCount();
    window.addEventListener(BOOKMARKS_CHANGED_EVENT, updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener(BOOKMARKS_CHANGED_EVENT, updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key and focus restoration for mobile menu
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    }
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/jelajah", label: "Jelajah Cerita", icon: BookOpen },
    { href: "/glosarium", label: "Glosarium", icon: Sparkles },
    { href: "/tentang", label: "Tentang AKAR", icon: null },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EA]/95 backdrop-blur-md border-b border-[#23483D]/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3.5 focus-visible:outline-forest rounded-lg group"
          aria-label="Beranda AKAR (Arsip Kisah, Aksara, dan Ragam Budaya)"
        >
          <div className="relative w-10 h-10 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/illustrations/logo-akar.svg"
              alt="Logo AKAR"
              width={40}
              height={40}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-forest leading-none">
              AKAR
            </span>
            <span className="text-[11px] font-medium text-ink-muted tracking-wide mt-1 hidden sm:inline">
              Arsip Kisah, Aksara, dan Ragam Budaya
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Navigasi Utama">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors touch-target ${
                  isActive
                    ? "bg-forest text-surface font-semibold shadow-sm"
                    : "text-ink hover:text-forest hover:bg-forest/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Bookmarks Link with counter badge */}
          <Link
            href="/koleksi"
            className={`px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors touch-target flex items-center gap-2 ${
              pathname === "/koleksi"
                ? "bg-forest text-surface font-semibold shadow-sm"
                : "text-ink hover:text-forest hover:bg-forest/5"
            }`}
            aria-label={`Koleksi cerita tersimpan: ${bookmarkCount} cerita`}
          >
            <Bookmark className="w-4 h-4" aria-hidden="true" />
            <span>Koleksi</span>
            {bookmarkCount > 0 && (
              <span className="ml-0.5 px-2 py-0.5 text-xs font-bold rounded-full bg-terracotta text-white">
                {bookmarkCount}
              </span>
            )}
          </Link>

          {/* Primary CTA */}
          <Link
            href="/kontribusi"
            className="ml-3 px-5 py-2.5 rounded-full bg-forest text-white hover:bg-forest-dark transition-all text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow active:scale-95 touch-target"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Bagikan Cerita</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden touch-target p-2.5 rounded-xl text-forest hover:bg-forest/10 transition-colors focus-visible:outline-forest"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={menuContainerRef}
          className="md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-lg z-50 flex flex-col p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi Mobile"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium transition-colors touch-target ${
                    isActive
                      ? "bg-forest text-surface font-semibold"
                      : "text-ink hover:bg-forest/5"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 text-forest" aria-hidden="true" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <Link
              href="/koleksi"
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-medium transition-colors touch-target ${
                pathname === "/koleksi"
                  ? "bg-forest text-surface font-semibold"
                  : "text-ink hover:bg-forest/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-forest" aria-hidden="true" />
                <span>Koleksi Tersimpan</span>
              </div>
              {bookmarkCount > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-terracotta text-white">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            <Link
              href="/metodologi"
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium text-ink hover:bg-forest/5 touch-target"
            >
              <span>Alur Metodologi</span>
            </Link>

            <Link
              href="/privasi"
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-medium text-ink hover:bg-forest/5 touch-target"
            >
              <span>Privasi & Batas Demo</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#23483D]/10">
            <Link
              href="/kontribusi"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-forest text-white font-semibold text-center shadow-md active:scale-95 touch-target"
            >
              <PlusCircle className="w-5 h-5" aria-hidden="true" />
              <span>Bagikan Cerita Lokal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
