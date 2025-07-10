// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google';
import Navbar from './component/Navbar';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export const metadata = {
  title: 'Portal Berita Teknologi - Update Terbaru Hari Ini',
  description: 'Portal berita teknologi terkini, akurat, dan terpercaya dari berbagai sumber terbaik.',
  keywords: 'berita teknologi, portal berita, update teknologi, berita hari ini, detik teknologi',
  author: 'Portal Berita Team'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-r from-blue-50 via-white to-blue-100 bg-fixed text-gray-900">
        {/* Breaking News Top Bar */}
        <div className="w-full bg-red-600 text-white text-sm py-2 px-4 flex items-center gap-2 shadow-lg z-50">
          <span className="font-bold animate-pulse">Breaking News:</span>
          <marquee scrollamount="5" className="w-full">Apple luncurkan iPhone 16 Pro Max dengan teknologi baru • AI semakin mendominasi industri teknologi global • Google mengembangkan search AI canggih generasi baru</marquee>
        </div>

        <div className="sticky top-0 z-40">
          <Navbar />
        </div>

        <main className="min-h-screen max-w-6xl mx-auto px-4 py-8 pt-24">
          {children}
        </main>

        <footer className="relative bg-gradient-to-t from-blue-100 to-blue-50 border-t border-blue-200 mt-12 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/pattern-light.png')] opacity-10 bg-repeat"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-700">

            {/* Kolom 1: Logo dan deskripsi */}
            <div>
              <h2 className="text-blue-800 font-extrabold text-xl mb-3">Portal Berita</h2>
              <p className="leading-relaxed">
                Portal berita teknologi terbaru dan terpercaya. Menyajikan informasi dari sumber resmi secara cepat, akurat, dan mudah diakses di mana saja.
              </p>
            </div>

            {/* Kolom 2: Navigasi */}
            <div>
              <h3 className="text-blue-700 font-semibold mb-4 uppercase tracking-wide">Navigasi</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-blue-500 transition-colors duration-200">Beranda</a></li>
                <li><a href="/kategori/tekno" className="hover:text-blue-500 transition-colors duration-200">Tekno</a></li>
                <li><a href="/kategori/otomotif" className="hover:text-blue-500 transition-colors duration-200">Otomotif</a></li>
                <li><a href="/kategori/sepakbola" className="hover:text-blue-500 transition-colors duration-200">Sepakbola</a></li>
                <li><a href="/kategori/food" className="hover:text-blue-500 transition-colors duration-200">Food</a></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak dan Sosial Media */}
            <div>
              <h3 className="text-blue-700 font-semibold mb-4 uppercase tracking-wide">Kontak</h3>
              <p className="mb-4">
                Email: <a href="mailto:info@portalberita.com" className="text-blue-600 hover:underline">info@portalberita.com</a>
              </p>
              <div className="flex gap-4 mt-4 text-white">
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300" title="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 transition duration-300" title="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 transition duration-300" title="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-gray-500 border-t py-5 mt-6 bg-blue-50">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700">Portal Berita</span>. Dibuat dengan ❤️ menggunakan <span className="font-medium">Next.js</span> & <span className="font-medium">Tailwind CSS</span>.
          </div>
        </footer>

      </body>
    </html>
  )
}
