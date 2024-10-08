const { sql } = require('@vercel/postgres')
const redirectToOriginal = async (req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    const fullShortUrl = `https://shortei.vercel.app/api/${shortId}`;
    try {
        const result = await sql`
            SELECT original_url FROM url_shortener WHERE short_url = ${fullShortUrl};
        `;//เจอ
        if (result.rowCount > 0) {
            const originalUrl = result.rows[0].original_url;
            return res.redirect(originalUrl);
        } else {//ไม่เจอ
            return res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = redirectToOriginal;