const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const shorturl = async (req, res) => {
    const original = req.body.url;
    const shortId = uuidv4();
    const shortUrl = `http://shortez.url/${shortId}`;
    try {
        const response = await axios.post('https://my-synerry-shorturl.vercel.app/api/db', { original, shortUrl })
        res.status(200).json({ shortUrl: `${shortUrl}` })
    } catch (error) {
        console.log("Fail  insert to db")
    }
}
module.exports = shorturl;
