const sql = require('@vercel/postgres');
const db = async (req, res) => {
    res.status(200);
    try {
        await sql`
          INSERT INTO url_shortener (original_url, short_url)
          VALUES (${original}, ${shortUrl});
        `;
        res.status(200).json({ message: "URL added successfully" });
    } catch (error) {
        console.error("Database insert error:", error);
        res.status(500).json({ error: "Failed to add URL", details: error.message });
    }
}
module.exports = db;
