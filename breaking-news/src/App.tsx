import React, { useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const App: React.FC = () => {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://www.marca.com/');
      const html = response.data;

      // Parse HTML using Cheerio
      const $ = cheerio.load(html);
      const title = $('title').text();

      // Update state with the scraped data
      setData(title);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Web Scraping Website</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{data}</p>
    </div>
  );
};

export default App;
