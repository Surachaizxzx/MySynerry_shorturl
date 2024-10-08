const { v4: uuidv4 } = require('uuid');
const shorturl = (req, res) => {
    const original = req.body.url;
    res.status(200).json({
        message: 'success',
        shortUrl: `${original}`,
    })
}
const createShortUrl = () => {
    return uuidv4().slice(0, 6); //เอารหัสสุ่มจาก uuid มา6ตัว
};
module.exports = shorturl;
