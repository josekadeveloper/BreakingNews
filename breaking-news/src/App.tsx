import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('/.netlify/functions/FetchData');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Fetch Data from Netlify Function</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{data}</p>
    </div>
  );
};

export default App;
