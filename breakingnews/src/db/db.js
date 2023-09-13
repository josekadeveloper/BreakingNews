import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { schedule } from 'node-cron';

const url = 'https://marca.com';

export async function scrapedDataNews() {
    const browser = await puppeteer.launch({ headless: true });

    const pagePrincipal = await browser.newPage();

    await pagePrincipal.goto(url);

    const news = await pagePrincipal.evaluate(() => {
        const articleElements = Array.from(document.querySelectorAll('article'))
            .filter(article => article.querySelector('img'))
            .slice(0, 10);

        return articleElements.map((article) => ({
            image: article.querySelector('img')?.getAttribute('src'),
            title: article.querySelector('a')?.innerText ? article.querySelector('a')?.innerText : article.querySelector('h2')?.innerText,
            link: article.querySelector('a')?.getAttribute('href')
        }));
    });

    await browser.close();

    const jsonDataNews = JSON.stringify(news);

    try {
        await writeFile('./src/db/news.json', jsonDataNews);
      } catch (err) {
        console.error('Error writing to file:', err);
    }

    return { news };
}

schedule('* * * * *', () => {
    scrapedDataNews();
});

export async function scrapedDataNewsDescription() {
    const browser = await puppeteer.launch({ headless: true });

    const news = (await scrapedDataNews()).news;

    let newsDescription = [];

    for (let index = 0; index < news.length; index++) {

        const pageSecondary = await browser.newPage();
        await pageSecondary.goto(news[index].link);


        newsDescription.push(await pageSecondary.evaluate(() => {
            const articleElements = Array.from(document.querySelectorAll('article'))
                .filter(article => article.querySelector('h1'));

            return Object.assign({}, ...articleElements.map((article) => ({
                image: article.querySelector('img')?.getAttribute('src'),
                category: article.querySelector('h2')?.innerText,
                title: article.querySelector('h1')?.innerText,
                description: article.querySelector('p')?.innerText
            })))
        }));
    }

    await browser.close();

    const newsDescriptionData = newsDescription.filter((obj, index, self) => {return !self.slice(0, index).every(({ image }) => image === obj.image)});

    const jsonDataNewsDescription = JSON.stringify(newsDescriptionData);

    try {
        await writeFile('./src/db/newsDescription.json', jsonDataNewsDescription);
      } catch (err) {
        console.error('Error writing to file:', err);
    }

    return { newsDescriptionData };
}

schedule('* * * * *', () => {
    scrapedDataNewsDescription();
});
