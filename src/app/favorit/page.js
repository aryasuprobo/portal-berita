'use client';

import { useEffect, useState } from 'react';

export default function FavoritPage() {
    const [favorit, setFavorit] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favorit') || '[]');
        setFavorit(saved);
    }, []);

    const handleRemove = (guid) => {
        const updated = favorit.filter((item) => item.guid !== guid);
        setFavorit(updated);
        localStorage.setItem('favorit', JSON.stringify(updated));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Berita Favorit</h1>

            {favorit.length === 0 ? (
                <p className="text-gray-500">Belum ada berita yang disimpan.</p>
            ) : (
                <ul className="space-y-4">
                    {favorit.map((item, index) => (
                        <li key={index} className="bg-white rounded p-4 shadow">
                            <a
                                href={`/berita/${encodeURIComponent(item.guid)}`}
                                className="text-lg font-semibold text-blue-600 hover:underline block"
                            >
                                {item.title}
                            </a>
                            <p className="text-sm text-gray-500 mb-2">{item.pubDate}</p>
                            <button
                                onClick={() => handleRemove(item.guid)}
                                className="text-sm text-red-500 hover:underline"
                            >
                                🗑 Hapus dari Favorit
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
