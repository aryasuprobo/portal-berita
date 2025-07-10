'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

const FEEDS = {
    tekno: 'https://inet.detik.com/rss',
    otomotif: 'https://oto.detik.com/rss',
    sepakbola: 'https://sport.detik.com/sepakbola/rss',
    food: 'https://food.detik.com/rss',
};

export default function KategoriPageClient() {
    const { kategori } = useParams();
    const router = useRouter();

    const [feed, setFeed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchFeed() {
            setLoading(true);
            setError('');
            setFeed(null);

            if (!FEEDS[kategori]) {
                setError(`Kategori ${kategori} tidak ditemukan.`);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/kategori/${kategori}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Gagal memuat data dari RSS.');
                }

                setFeed(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFeed();
    }, [kategori]);

    const filteredItems = feed?.items?.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function goToDetail(item) {
        const encodedUrl = encodeURIComponent(item.link);
        router.push(`/kategori/${kategori}/detail?url=${encodedUrl}`);
    }

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => router.push('/')}
                    className="text-blue-600 hover:underline flex items-center gap-2"
                >
                    <ArrowLeft size={18} /> Kembali
                </button>
                <h1 className="text-3xl font-bold capitalize text-blue-800 drop-shadow-sm text-center flex-1">
                    Berita Kategori: {kategori}
                </h1>
            </div>

            {/* Search */}
            <div className="relative max-w-md mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Cari berita..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-200 animate-pulse h-60 rounded-xl"
                        />
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <p className="text-red-600 text-center text-lg">{error}</p>
            )}

            {/* No result */}
            {!loading && filteredItems?.length === 0 && (
                <p className="text-gray-500 text-center">Tidak ada berita ditemukan.</p>
            )}

            {/* List */}
            {!loading && filteredItems?.length > 0 && (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => goToDetail(item)}
                            className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition-all duration-300 cursor-pointer border hover:border-blue-300"
                        >
                            {item.enclosure?.url && (
                                <img
                                    src={item.enclosure.url}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-blue-700 mb-1 hover:underline line-clamp-2">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-500">{item.pubDate}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
