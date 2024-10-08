import axios from "axios";
const { v4: uuidv4 } = require('uuid');
const shorturl = async (req, res) => {
    const original = req.body.url;
    const shortId = uuidv4();
    const shortUrl = `http://shortez.url/${shortId}`;
    res.status(200).json({
        shortUrl: `${shortUrl}`
    });
}
module.exports = shorturl;
