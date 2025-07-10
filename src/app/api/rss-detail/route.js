import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return Response.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        const response = await fetch(url);
        const html = await response.text();

        // Coba beberapa pattern konten yang biasa ada di Detik
        const patterns = [
            /<article[^>]*>([\s\S]*?)<\/article>/i,
            /<div[^>]+class="detail__content"[^>]*>([\s\S]*?)<\/div>/i,
            /<div[^>]+class="itp_bodycontent"[^>]*>([\s\S]*?)<\/div>/i,
            /<div[^>]+class="text_detail"[^>]*>([\s\S]*?)<\/div>/i,
        ];

        let content = '<p>Konten tidak tersedia.</p>';
        for (const pattern of patterns) {
            const match = html.match(pattern);
            if (match) {
                content = match[0];
                break;
            }
        }

        return Response.json({ content });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
