import { scrapedDataNews, scrapedDataNewsDescription } from './scraper';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const getToday = () => {
  const today = new Date();

  return `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`;
};

exports.pubsub = functions
  .region('europe-west3')
  .runWith({ timeoutSeconds: 30, memory: '2GB', maxInstances: 10 })
  .pubsub.schedule('* * * * *')
  .timeZone('Europe/Madrid')
  .onRun(async () => {
    try {
      const news = await scrapedDataNews();
      const newsDescription = await scrapedDataNewsDescription();

      // Update the 'sport news' collection
      const sportNewsRef = db.collection('sport news').doc(getToday());
      await sportNewsRef.set({ data: news }, { merge: true });

      // Update the 'sport news description' collection
      const sportNewsDescRef = db.collection('sport news description').doc(getToday());
      await sportNewsDescRef.set({ data: newsDescription }, { merge: true });

      return null; // Indicate success
    } catch (error: any) {
      console.error('Error:', error);
      throw new Error(error);
    }
  });
