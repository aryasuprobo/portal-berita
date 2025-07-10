'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailBeritaPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const url = searchParams.get('url');

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!url) {
            setError('URL berita tidak ditemukan.');
            setLoading(false);
            return;
        }

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

        fetchContent();
    }, [url]);

    if (!url)
        return (
            <p className="p-6 text-center text-gray-500">URL tidak tersedia.</p>
        );

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 text-gray-900">
            <button
                onClick={() => router.back()}
                className="mb-6 text-blue-600 hover:underline font-semibold"
            >
                ← Kembali
            </button>

            {loading && (
                <p className="text-center text-gray-500 text-lg">Memuat berita...</p>
            )}

            {error && (
                <p className="text-center text-red-600 text-lg">
                    Gagal memuat berita: {error}
                </p>
            )}

            {!loading && !error && (
                <article className="space-y-8 prose prose-lg max-w-full" style={{ wordBreak: 'break-word' }}>
                    <section dangerouslySetInnerHTML={{ __html: content }} />
                    <footer className="pt-6 border-t border-gray-300 text-sm text-gray-600">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Lihat langsung di Detik ↗
                        </a>
                    </footer>
                </article>
            )}
        </div>
    );
}
