const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const shorturl = async (req, res) => {
    const original = req.body.url;
    const shortId = uuidv4().split('-')[0].slice(0, 6); // เอาเเค่ 6 ตัวอักษร
    const shortUrl = `https://my-synerry-shorturl.vercel.app/api/${shortId}`;
    try {
        const response = await axios.post('https://my-synerry-shorturl.vercel.app/api/db', { original, shortUrl })
        if (response.status === 200) {
            if (response.data.message === "URL already exists") {
                res.status(200).json({
                    shortUrl: `${response.data.original}`,
                    message: "URL already exists"
                })
            } else {
                res.status(200).json({
                    shortUrl: `${shortUrl}`,
                    message: "success"
                })
            }
        }
        else { res.status(response.status).json({ error: "Failed to insert URL", details: response.data }); }

    } catch (error) {
        console.log("Fail  insert to db")
    }
}
module.exports = shorturl;
