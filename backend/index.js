const express = require('express')
const shorturl = require('./shoturl/shortes')
const http = require('http')
const cors = require('cors');
const db = require('./database/db')
const app = express();
const server = http.createServer(app);
app.use(cors()); // เปิดใช้งาน CORS สำหรับทุกโดเมน
app.use(express.json())
app.post('/api/keep_url', (req, res) => {
    return shorturl(req, res);
})
app.post('/api/db', (req, res) => {
    return db(req, res);
})
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

