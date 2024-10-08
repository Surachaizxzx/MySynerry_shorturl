const express = require('express');
const shorturl = require('./shoturl/shortes');
const redirectToOriginal = require('./shoturl/redirectToOriginal');
const http = require('http');
const cors = require('cors');
const db = require('./database/db');
const { sql } = require('@vercel/postgres')
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.post('/api/keep_url', (req, res) => {
    return shorturl(req, res);
});
app.post('/api/db', (req, res) => {
    return db(req, res);
});
app.get('/api/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    const fullShortUrl = `https://my-synerry-shorturl.vercel.app/api/${shortId}`;
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
});
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
