const puppeteer = require('puppeteer');

async function scrapeAmazon() {
    const browser = await puppeteer.launch({
        headless: 'new',
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
    });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292115011&ref=nav_em__nav_desktop_sa_intl_monitors_0_2_6_8');
    await page.waitForSelector('.s-result-item');
    const products = await page.evaluate(() => {
        const products = [];
         document.querySelectorAll('.s-result-item').forEach(product => {
            products.push({
                name: product.querySelector('h2')?.innerText || 'N/A',
                price: product.querySelector('.a-price-whole')?.innerText || 'N/A',
                rating: product.querySelector('.a-icon-alt')?.innerText || 'N/A',
                image: product.querySelector('img')?.src || 'N/A',
                link: product.querySelector('a')?.href || 'N/A'
            });
        });
        return products;
    });
    //console.log(products);
    await browser.close();
}
try {
    scrapeAmazon()
       .then(products => console.log('products',products))
}catch (e) {
    console.log(e);
}

