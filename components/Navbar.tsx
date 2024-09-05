'use client';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const lastScrollTop = useRef<number>(0);
  const toggleNavbar = () =>
    sidebarRef.current?.classList.toggle('translate-x-full');

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hiding navbar when scrolling
    if (!sidebarRef.current?.classList.contains('translate-x-full')) {
      toggleNavbar();
    }

    // Hiding Navbar while scrolling down
    if (scrollTop > lastScrollTop.current) {
      navbarRef.current?.classList.remove('translate-y-0');
      navbarRef.current?.classList.add('-translate-y-full');
    } else {
      // Showing Navbar while scrolling up
      navbarRef.current?.classList.remove('-translate-y-full');
      navbarRef.current?.classList.add('translate-y-0');
    }

    lastScrollTop.current = scrollTop;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className="sticky top-0 z-10 flex h-[70px] items-center justify-between gap-4 overflow-hidden bg-white p-2 shadow-lg transition-all duration-150 md:p-6 lg:px-12"
      ref={navbarRef}
    >
      <h1>
        <Link href="/" className="flex items-center gap-1 text-3xl font-bold">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <span className="tracking-2 text-primary">Stickify</span>
        </Link>
      </h1>
      <button className="xl:hidden" onClick={toggleNavbar}>
        <Menu className="h-8 w-8 text-text-primary" />
      </button>
      <aside
        className="min-h-[calc(100vh - 70px)] fixed right-0 top-[70px] flex w-[300px] flex-grow translate-x-full flex-col items-center gap-8 border-l bg-background-card pt-8 transition-all duration-150 xl:static xl:min-h-0 xl:w-full xl:translate-x-0 xl:flex-row xl:justify-end xl:border-none xl:bg-transparent xl:pt-0"
        ref={sidebarRef}
      >
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleNavbar}
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleNavbar}
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleNavbar}
          href="/stickers"
        >
          Sticker Gallery
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleNavbar}
          href="/pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleNavbar}
          href="/order-stickers"
        >
          Order Now
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleNavbar}
          href="/contact-us"
        >
          Contact Us
        </Link>
      </aside>
    </nav>
  );
}
export default Navbar;
