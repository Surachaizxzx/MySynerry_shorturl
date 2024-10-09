const { sql } = require('@vercel/postgres');

const Query = async (req, res) => {
    try {
        const { rows } = await sql`SELECT * FROM url_shortener`;
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

module.exports = Query;