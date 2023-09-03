import { getDoc, doc } from "@firebase/firestore/lite";
import { db } from "../main";

export async function getTodaySportNews(day) {
    const daysRef = doc(db, `sport news/${day}`);
    const docSnap = await getDoc(daysRef);

    return docSnap.data();
}

export async function getTodaySportNewsDescription(day) {
    const daysRef = doc(db, `sport news description/${day}`);
    const docSnap = await getDoc(daysRef);

    return docSnap.data();
}

export const getFormatedDay = (day) => {
    return `${day.getDate()}${day.getMonth() + 1}${day.getFullYear()}`;
}