import Parser from 'rss-parser';

const parser = new Parser();
const RSS_URL = 'https://inet.detik.com/rss'; // ✅ Ganti URL ini

export async function GET() {
    try {
        console.log('[API] Mulai fetch RSS...');

        const response = await fetch(RSS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MyRSSReader/1.0; +http://example.com)',
            },
        });

        console.log('[API] Status response:', response.status);

        if (!response.ok) {
            throw new Error(`Gagal fetch RSS: ${response.status}`);
        }

        const xml = await response.text();
        console.log('[API] XML length:', xml.length);

        const feed = await parser.parseString(xml);
        console.log('[API] Feed parsed:', feed.title, `(${feed.items?.length} items)`);

        return new Response(JSON.stringify(feed), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('[API] ERROR:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
