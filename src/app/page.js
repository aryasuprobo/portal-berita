'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/rss', { cache: 'no-store' });
      const feed = await res.json();

      if (feed.items) {
        setData(feed.items);
        setFiltered(feed.items);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setQuery(keyword);
    setCurrentPage(1); // reset ke halaman awal saat cari

    const result = data.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );

    setFiltered(result);
  };

  const handleSave = (item) => {
    const saved = JSON.parse(localStorage.getItem('favorit') || '[]');
    const isExist = saved.find((i) => i.guid === item.guid);

    if (!isExist) {
      saved.push(item);
      localStorage.setItem('favorit', JSON.stringify(saved));
      alert('Berita disimpan ke favorit!');
    } else {
      alert('Berita ini sudah ada di favorit.');
    }
  };


  // Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white bg-fixed min-h-screen">

      {/* Hero Section */}
      <div
        className="relative w-full min-h-[50vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/banner-logo.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20 backdrop-blur-md"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center py-24 px-6">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-xl mb-8 tracking-wide">
            🚀 Portal Berita Teknologi
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            Berita teknologi terbaru, terpercaya, dan update setiap hari dari berbagai sumber resmi.
          </p>
          <a
            href="#berita"
            className="inline-flex items-center justify-center gap-3 bg-yellow-400 text-black font-bold px-10 py-5 rounded-full shadow-xl hover:bg-yellow-300 transition transform hover:scale-110 text-lg"
          >
            Jelajahi Berita <span className="text-3xl animate-bounce">🔥</span>
          </a>
        </div>
      </div>

      {/* Konten utama */}
      <div className="max-w-6xl mx-auto p-6">

        {/* Subsection */}
        <div className="flex justify-center mt-16 mb-20">
          <p className="text-xl text-center text-gray-600 max-w-5xl leading-relaxed">
            Dapatkan informasi teknologi terkini secara real-time. Kami mengumpulkan berita dari sumber terpercaya dan menyajikannya untuk Anda dengan tampilan profesional dan elegan.
          </p>
        </div>

        {/* Berita Section */}
        <h1 id="berita" className="text-4xl font-extrabold mb-10 text-center text-blue-900 drop-shadow-lg uppercase tracking-wide">
          Berita Terbaru
        </h1>

        {/* Search */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="🔎 Cari berita teknologi..."
            value={query}
            onChange={handleSearch}
            className="w-full md:w-1/2 px-7 py-5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white text-lg"
          />
        </div>

        {/* Loading / Empty State / News List */}
        {loading ? (
          <p className="text-center text-gray-600 text-xl animate-pulse">Sedang memuat berita...</p>
        ) : currentItems.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">Tidak ada berita ditemukan.</p>
        ) : (
          <>
            <ul className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((item, index) => (
                <li key={index} className="relative bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-transform duration-300 hover:scale-[1.03] overflow-hidden group">
                  {item.enclosure?.url && (
                    <div className="relative">
                      <img
                        src={item.enclosure.url}
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-t-3xl group-hover:brightness-90 transition-all"
                      />
                      <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        Teknologi
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <a
                      href={`/berita/${encodeURIComponent(item.guid)}`}
                      className="text-2xl font-bold text-blue-700 hover:underline block mb-4 leading-snug"
                    >
                      {item.title}
                    </a>
                    <div className="flex items-center text-sm text-gray-500 mb-5">
                      <span className="mr-2">🕒</span> {item.pubDate}
                      <span className="mx-2">•</span>
                      <span>👀 {Math.floor(Math.random() * 1000 + 500)} views</span>
                    </div>
                    <button
                      onClick={() => handleSave(item)}
                      className="w-full text-sm bg-red-100 text-red-500 px-6 py-3 rounded-full hover:bg-red-200 transition-all duration-300 font-semibold"
                    >
                      ❤️ Simpan ke Favorit
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-8 mt-16">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-8 py-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 transition-all duration-300 font-semibold text-lg"
              >
                &larr; Sebelumnya
              </button>
              <span className="text-xl text-gray-800 font-bold">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-8 py-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 transition-all duration-300 font-semibold text-lg"
              >
                Selanjutnya &rarr;
              </button>
            </div>

            {/* Favorit */}
            <div className="flex justify-center mt-16">
              <a
                href="/favorit"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 px-10 py-5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-xl font-bold"
              >
                📁 Lihat Favorit
              </a>
            </div>
          </>
        )}

      </div>

    </div>
  );


}
