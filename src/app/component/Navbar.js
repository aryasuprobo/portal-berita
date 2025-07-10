'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out 
            ${scrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-lg py-2 border-b border-blue-200'
                : 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 py-5'
            }`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <h1 className={`font-extrabold text-2xl tracking-wide ${scrolled ? 'text-blue-700' : 'text-white drop-shadow'}`}>
                    <Link href="/">Portal Berita</Link>
                </h1>

                <nav className="flex items-center gap-10 font-medium text-sm">
                    <ul className={`flex gap-6 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                        <li><Link href="/" className="relative hover:text-yellow-400 after:block after:bg-yellow-400 after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Beranda</Link></li>
                        <li><Link href="/kategori/tekno" className="relative hover:text-yellow-400 after:block after:bg-yellow-400 after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Tekno</Link></li>
                        <li><Link href="/kategori/otomotif" className="relative hover:text-yellow-400 after:block after:bg-yellow-400 after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Otomotif</Link></li>
                        <li><Link href="/kategori/sepakbola" className="relative hover:text-yellow-400 after:block after:bg-yellow-400 after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Sepakbola</Link></li>
                        <li><Link href="/kategori/food" className="relative hover:text-yellow-400 after:block after:bg-yellow-400 after:h-[2px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Food</Link></li>
                    </ul>
                    <button className={`${scrolled ? 'text-blue-700' : 'text-white'} hover:text-yellow-400 transition`}>
                        <FiSearch size={22} />
                    </button>
                </nav>
            </div>
        </header>
    );
}
