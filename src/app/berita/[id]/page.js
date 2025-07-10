'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function cleanContent(html) {
    if (!html) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Selektor elemen yang biasanya iklan
    const adSelectors = [
        '[class*="ads"]',
        '[class*="advertisement"]',
        '[class*="promo"]',
        '[class*="sponsor"]',
        '[id*="ads"]',
        '[id*="advertisement"]',
        '[id*="promo"]',
        '[id*="sponsor"]',
        'iframe',
        'script',
        'ins',
        'object',
        'embed',
        'aside',
        'footer',
    ];

    adSelectors.forEach(selector => {
        doc.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Hapus elemen yang mengandung kata kunci iklan dalam teksnya
    const textNodes = Array.from(doc.body.querySelectorAll('*'));
    textNodes.forEach(el => {
        const text = el.textContent?.toLowerCase() || '';
        if (
            text.includes('ads') ||
            text.includes('promo') ||
            text.includes('ifrane')
        ) {
            el.remove();
        }
    });

    return doc.body.innerHTML;
}


export default function BeritaDetailClient() {
    const params = useParams();
    const id = decodeURIComponent(params.id);  // decode hanya sekali di sini

    const [beritaItem, setBeritaItem] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedAndDetail = async () => {
            setLoading(true);
            setError('');
            try {
                const feedRes = await fetch('/api/rss');
                const feedData = await feedRes.json();

                // pakai id yang sudah didecode di luar
                const item = feedData.items.find(
                    (item) => (item.guid || item.link) === id
                );

                if (!item) {
                    setError('Berita tidak ditemukan');
                    setLoading(false);
                    return;
                }

                setBeritaItem(item);

                const detailRes = await fetch(
                    `/api/rss-detail?url=${encodeURIComponent(item.link)}`
                );
                const detailData = await detailRes.json();

                if (detailData.error) throw new Error(detailData.error);

                const cleanedContent = cleanContent(detailData.content);
                setContent(cleanedContent);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedAndDetail();
    }, [id]);

    if (loading) return <p className="p-6 text-center text-gray-500">Memuat berita...</p>;
    if (error) return <p className="p-6 text-center text-red-600">Gagal memuat berita: {error}</p>;

    return (
        <main className="max-w-3xl mx-auto px-6 py-12 text-gray-900">
            <article className="space-y-8">
                <header>
                    <h1 className="text-4xl font-bold leading-tight">{beritaItem?.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">{beritaItem?.pubDate}</p>
                </header>

                <section
                    className="text-lg leading-relaxed max-w-full"
                    style={{ wordBreak: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                <footer className="pt-6 border-t border-gray-300">
                    <a
                        href={beritaItem?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium text-sm"
                    >
                        Lihat langsung di Detik ↗
                    </a>
                </footer>
            </article>
        </main>
    );
}
