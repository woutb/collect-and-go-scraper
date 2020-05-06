const puppeteer = require('puppeteer');

async function scrapeTimeTable(loc) {

    const store = loc.toUpperCase();
    const chromeOptions = {
        headless: false,
        defaultViewport: null
        };
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto("https://colruyt.collectandgo.be/cogo/nl/afhaalpunt-beschikbaarheid?utm_source=wca-silverpop&utm_medium=email&utm_campaign=&utm_content=colruyt_collectandgo_be_cogo_nl_afh_2&emcbh=21075331")
    await page.waitFor(3000);

    await page.type('#dUF_input_first_name', 'firstname');
    await page.type('#dUF_input_last_name', 'lastname');
    await page.type('#dUF_input_email', 'wblhgxvmysevlrgrmw@awdrt.com');
    await page.click('#dUF_input_unblock');

    const [el] = await page.$x('#mainContent > div > div > div.col-md-9 > div > div > table > tbody > tr:nth-child > td.colpnt-name');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('/html/body/div[3]/div/div/div[2]/div/div/table/tbody/tr[107]/td[2]');
    const src = await el2.getProperty('textContent');
    const status = await src.jsonValue();

    browser.close();
    return {name, status}
    
}

module.exports = {
    scrapeTimeTable
}
