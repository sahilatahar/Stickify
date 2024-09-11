'use client';
import { Menu, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import StickersMenu from './menu/StickersMenu';

function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const lastScrollTop = useRef<number>(0);
  const [showStickerMenu, setShowStickerMenu] = useState<boolean>(false);

  const toggleStickerMenu = useCallback(() => {
    setShowStickerMenu(!showStickerMenu);
  }, [showStickerMenu]);

  const toggleSidebar = useCallback(() => {
    sidebarRef.current?.classList.toggle('translate-x-full');
    if (showStickerMenu) toggleStickerMenu();
  }, [showStickerMenu, toggleStickerMenu]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hiding navbar when scrolling
    if (!sidebarRef.current?.classList.contains('translate-x-full')) {
      toggleSidebar();
    }

    // Hiding Navbar while scrolling down
    if (scrollTop > lastScrollTop.current) {
      navbarRef.current?.classList.remove('top-0');
      navbarRef.current?.classList.add('-top-20');
      if (showStickerMenu) toggleStickerMenu();
    } else {
      // Showing Navbar while scrolling up
      navbarRef.current?.classList.remove('-top-20');
      navbarRef.current?.classList.add('top-0');
    }

    lastScrollTop.current = scrollTop;
  }, [showStickerMenu, toggleSidebar, toggleStickerMenu]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className="sticky left-0 z-10 flex h-[70px] w-full items-center justify-between gap-4 bg-background-card px-2 shadow-lg transition-all duration-150 md:px-6 xl:px-12"
      ref={navbarRef}
    >
      <h1>
        <Link href="/" className="flex items-center gap-1 text-3xl font-bold">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="tracking-2 text-primary">Stickify</span>
        </Link>
      </h1>
      <button className="xl:hidden" onClick={toggleSidebar}>
        <Menu className="h-8 w-8 text-text-primary" />
      </button>
      <aside
        className="fixed right-0 top-[70px] z-20 flex max-h-fit min-h-[calc(100vh-70px)] w-[300px] flex-grow translate-x-full flex-col items-center gap-8 border-l border-t bg-background-card px-4 pt-8 transition-all duration-150 xl:static xl:top-0 xl:h-auto xl:min-h-0 xl:w-auto xl:translate-x-0 xl:flex-row xl:justify-end xl:border-none xl:bg-transparent xl:px-0 xl:pt-0"
        ref={sidebarRef}
      >
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleSidebar}
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleSidebar}
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleSidebar}
          href="/pricing"
        >
          Pricing
        </Link>
        <div className="relative">
          <button
            className="flex cursor-pointer select-none items-end border-none text-lg font-medium text-text-secondary outline-none hover:text-primary"
            onClick={toggleStickerMenu}
          >
            Stickers
            <ChevronDown />
          </button>
          <StickersMenu show={showStickerMenu} toggleSidebar={toggleSidebar} />
        </div>
        <Link
          className="text-lg font-medium text-text-secondary hover:text-primary"
          onClick={toggleSidebar}
          href="/contact-us"
        >
          Contact Us
        </Link>
        <Link
          className="w-full rounded-md bg-primary px-8 pb-2 pt-1 text-center text-lg text-white xl:w-auto"
          href="/login"
        >
          Login
        </Link>
      </aside>
    </nav>
  );
}
export default Navbar;
