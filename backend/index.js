const express = require('express')
const shorturl = require('./shoturl/shortes')
const cors = require('cors');
const db = require('./database/db')
const app = express();
app.use(cors()); // เปิดใช้งาน CORS สำหรับทุกโดเมน
//rest api
app.use(express.json())
app.post('/keep_url', (req, res) => {
    return shorturl(req, res);
})
app.post('/db', (req, res) => {
    return db(req, res);
})
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

