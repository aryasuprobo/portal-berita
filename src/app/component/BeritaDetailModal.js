'use client';

import { useState } from 'react';

export default function BeritaDetailModal({ url, onClose }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchContent() {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/rss-detail?url=${encodeURIComponent(url)}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setContent(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Fetch content saat modal dibuka
    useState(() => {
        fetchContent();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    ✕
                </button>

                {loading && <p>Memuat konten...</p>}
                {error && <p className="text-red-600">Error: {error}</p>}
                {!loading && !error && (
                    <div dangerouslySetInnerHTML={{ __html: content }} className="prose max-w-full" />
                )}
            </div>
        </div>
    );
}
