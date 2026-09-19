'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Academics', href: '/#academics' },
    { label: 'Toolkit', href: '/#skills' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/#top" className="ascii-logo" aria-label="Back to top">
          A
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/75 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="hidden md:block text-xs uppercase tracking-[0.2em] text-white/75 hover:text-white transition-colors"
        >
          Resume
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-6 h-0.5 bg-white transition ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-0.5 bg-white transition ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`absolute top-16 right-0 w-full bg-black/95 overflow-hidden ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="container py-6 flex flex-col gap-4 text-sm uppercase tracking-[0.18em]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white py-2 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white py-2 transition-colors"
            >
              Resume
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
