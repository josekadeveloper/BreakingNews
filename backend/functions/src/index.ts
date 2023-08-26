import { scrapedData } from './scraper';

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
    .runWith({maxInstances: 100})
    .pubsub.schedule('0 0 * * *')
    .timeZone('Europe/Madrid')
    .onRun(async () => {
      try {
        const data = await scrapedData();
        db.collection('days').doc(getToday()).set(data);
      } catch (error: any) {
        throw new Error(error);
      }
    })
