const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const router = express.Router();

async function downloadScreenshot(urlString) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.goto(urlString);
        await page.screenshot({
            path: 'screenshot.png',
            fullPage: true
        });
    } catch (e) {
        console.log(e);
    }

    await browser.close();
}

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/screenshot/*', (req, res) => {
    const urlString = req.params[0];

    /**
     * Download
     */
    console.log(urlString);
    downloadScreenshot(urlString).then(() => {
        res.download(path.join(__dirname, 'screenshot.png'));
    });
});

router.post('/screenshot', (req, res) => {
    const urlString = req.body.url;
    res.redirect('/screenshot/' + urlString);
});

module.exports = router;
