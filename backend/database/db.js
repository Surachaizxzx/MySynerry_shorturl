const { sql } = require('@vercel/postgres');

const db = async (req, res) => {
    const { original, shortUrl } = req.body;
    try {
        // ตรวจสอบว่า original URL มีอยู่ในฐานข้อมูลแล้วหรือไม่
        const existingUrl = await sql`
          SELECT * FROM url_shortener WHERE original_url = ${original};`;
        if (existingUrl.rowCount > 0) {
            // ถ้ามี URL อยู่แล้ว ให้ส่ง message ที่มีอยู่กลับไป
            const existingShortUrl = existingUrl.rows[0].short_url;
            return res.status(200).json({

                message: "URL already exists",
                original:`${existingShortUrl}`
            });
        }
        // ถ้า URL ยังไม่มี ให้ทำการ INSERT ข้อมูลใหม่
        const result = await sql`
          INSERT INTO url_shortener (original_url, short_url)
          VALUES (${original}, ${shortUrl}) RETURNING *;`;

        if (result.rowCount > 0) {
            return res.status(200).json({ message: "URL added successfully", data: result.rows });
        } else {
            return res.status(500).json({ error: "No rows affected" });
        }
    } catch (error) {
        console.error("Database insert error:", error);
        res.status(500).json({ error: "Failed to add URL", details: error.message });
    }
}

module.exports = db;
