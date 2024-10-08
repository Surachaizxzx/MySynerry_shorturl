const express = require('express')
const shorturl = require('./shoturl/shortes')
const http = require('http')
const cors = require('cors');
const db = require('./database/db')
const app = express();
const server = http.createServer(app);
app.use(express.json())
app.post('/api/keep_url', (req, res) => {
    return shorturl(req, res);
})
app.post('/api/db', (req, res) => {
    return db(req, res);
})
// app.get('/api/:shortId', (req, res) => {
//     console.log("hello world")
// })
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

