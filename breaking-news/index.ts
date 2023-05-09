import puppeteer, { Browser } from 'puppeteer';

const url = 'https://elpais.com/deportes/';

const main = async () => {
    const browser: Browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const news = await page.evaluate(() => {
        const articleElements = Array.from(document.querySelectorAll('article'));
        return articleElements.map((article) => ({
            image: article.querySelector('img')?.getAttribute('src'),
            title: article.querySelector('a')?.innerText ? article.querySelector('a')?.innerText : article.querySelector('h2')?.innerText,
            description: article.querySelector('p')?.innerText,
        }));
    });

    await browser.close();

    return news;
}

main();