const { sql } = require('@vercel/postgres');

const redirectToOriginal = async (req, res) => {
    const shortId = req.params.shortId;
    const fullShortUrl = `https://shortei.vercel.app/api/${shortId}`;

    try {
        const result = await sql`
            SELECT original_url, clicklink FROM url_shortener WHERE short_url = ${fullShortUrl};
        `;

        if (result.rowCount > 0) {
            const originalUrl = result.rows[0].original_url;
            const count = result.rows[0].clicklink;
            const plus = count + 1;
            await sql`UPDATE url_shortener SET clicklink = ${plus} WHERE short_url = ${fullShortUrl};`;
            return res.redirect(originalUrl);
        } else {
            return res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = redirectToOriginal;
