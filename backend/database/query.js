const { sql } = require('@vercel/postgres');
const Query = async (req, res) => {
    try {
        const data = await sql`SELECT * FROM url_shortener;`;
        res.status(200).json(
            data.rows
        )
    } catch (error) {
        console.error('Error querying data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
module.exports = Query;