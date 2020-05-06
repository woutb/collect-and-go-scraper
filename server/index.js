const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

const scrapers = require('./scrapers');
const db = require('./db')

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/locations', async (req, res) => {
    const locations = await db.getAllLocations();
    res.send(locations)
})

app.post('/locations', async (req, res) => {
    console.log(req.body)
    const storeData = await scrapers.scrapeTimeTable(req.body.colruytLocation)
    const location = await db.insertLocation(storeData.name, storeData.status)
    res.send(location);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))