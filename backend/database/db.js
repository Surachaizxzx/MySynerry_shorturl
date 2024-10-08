const { sql } = require('@vercel/postgres');
const db = async (req, res) => {
    const { original, shortUrl } = req.body;
    try {
        // ทำการ INSERT และรับค่าจำนวนแถวที่ถูกเปลี่ยนแปลง
        const result = await sql`
          INSERT INTO url_shortener (original_url, short_url)
          VALUES (${original}, ${shortUrl}) RETURNING *;`;
        // ตรวจสอบว่ามีการ INSERT ข้อมูลหรือไม่
        if (result.count > 0) {
            return res.status(200).json({ message: "URL added successfully", data: result });
        } else {
            return res.status(500).json({ error: "No rows affected" });
        }
    } catch (error) {
        console.error("Database insert error:", error);
        res.status(500).json({ error: "Failed to add URL", details: error.message });
    }
}
module.exports = db;
