import news from '../db/news.json';
import newsDescription from '../db/newsDescription.json';

export async function getTodaySportNews() {
    return await news;
}

export async function getTodaySportNewsDescription() {
    return await newsDescription;
}
