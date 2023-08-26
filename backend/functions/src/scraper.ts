import puppeteer, { Browser } from 'puppeteer';

const url = 'https://marca.com';

export async function scrapedData() {
    const browser: Browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        const articleElements = Array.from(document.querySelectorAll('article'))
            .filter(article => article.querySelector('img'))
            .slice(0, 15);
        return articleElements.map((article) => ({
            image: article.querySelector('img')?.getAttribute('src'),
            title: article.querySelector('a')?.innerText ? article.querySelector('a')?.innerText : article.querySelector('h2')?.innerText
        }));
    });

    await browser.close();

    return { news };
}

scrapedData();