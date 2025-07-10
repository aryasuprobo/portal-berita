import Parser from 'rss-parser';

const parser = new Parser();

const FEEDS = {
    tekno: 'https://inet.detik.com/rss',
    otomotif: 'https://oto.detik.com/rss',
    sepakbola: 'https://sport.detik.com/sepakbola/rss',
    food: 'https://food.detik.com/rss',
};

export async function GET(request, { params }) {
    const kategori = params.kategori;
    const feedUrl = FEEDS[kategori];

    if (!feedUrl) {
        return new Response(JSON.stringify({ error: 'Kategori tidak ditemukan' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch(feedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MyRSSReader/1.0; +http://example.com)'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xml = await response.text();
        const feed = await parser.parseString(xml);

        return new Response(JSON.stringify(feed), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
