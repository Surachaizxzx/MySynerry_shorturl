const express = require('express');
const shorturl = require('./shoturl/shortes');
const redirectToOriginal = require('./shoturl/redirectToOriginal');
const http = require('http');
const db = require('./database/db');
const Query = require('./database/query')
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.post('/api/keep_url', (req, res) => {
    return shorturl(req, res);
});
app.post('/api/db', (req, res) => {
    return db(req, res);
});
app.get('/api/query', async (req, res) => {
    return Query(req, res);
})
app.get('/api/:shortId', async (req, res) => {
    return redirectToOriginal(req, res);
});


const PORT = 5000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
