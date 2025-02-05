import csv from 'csvtojson';

async function fetchDeals() {
  const csvFilePath = 'test.csv'; // Replace with the actual path to your CSV file
  const jsonArray = await csv.fromFile(csvFilePath);
  return jsonArray;
}

export { fetchDeals };
