const express = require('express');
const app = express()
const PORT = 5000
app.listen(PORT, () => {
    console.log('Listening on PORT 5000')
})
app.post('/keep_url', (req, res) => {
    const url = req.body.url
    res.status(200).json({
        message: "success",
        shortUrl: `${url}`
    }
    )

})
module.exports = app