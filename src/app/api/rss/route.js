import Parser from 'rss-parser';

const parser = new Parser();
const RSS_URL = 'https://news.detik.com/index.atom'; // RSS berita umum

export async function GET() {
    try {
        const response = await fetch(RSS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MyRSSReader/1.0; +http://example.com)',
            },
        });

        if (!response.ok) {
            throw new Error(`Gagal fetch RSS: ${response.status}`);
        }

        const xml = await response.text();
        const feed = await parser.parseString(xml);

        return new Response(JSON.stringify(feed), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
