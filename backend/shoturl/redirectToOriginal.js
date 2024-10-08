const redirectToOriginal = async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const result = await sql`
            SELECT original_url FROM url_shortener WHERE short_url = ${shortId};
        `;
        if (result.rowCount > 0) {//มีมั้ย ลิ้งนี้
            const originalUrl = result.rows[0].original_url;
            return res.redirect(originalUrl);
        } else {
            // ถ้าไม่พบ shortId ให้ส่งข้อความที่ชัดเจน
            return res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}