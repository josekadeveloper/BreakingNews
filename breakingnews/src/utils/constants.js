export const TODAY = new Date();

export const YESTERDAY = new Date(TODAY);
YESTERDAY.setDate(TODAY.getDate() - 1);