import { useEffect, useState } from 'react'
import { getTodaySportNews, getFormatedDay } from './functions'

function App() {
  const [sportNews, setSportNews] = useState(null);

  useEffect(() => {
    getSportNews(new Date());
  }, []);

  const getSportNews = (day) => {
    getTodaySportNews(getFormatedDay(day)).then((res) => {
      setSportNews(res);
    });
  };

  return (
    <div className='max-w-screen-lg mx-auto divide-y'>
      <h1 className='bg-yellow-300 rounded-lg mt-6 text-slate-800 font-bold text-4xl flex justify-center items-center h-40 mb-6'>
          SPORT BREAKING NEWS
      </h1>
      {
        sportNews?.news?.length && (
          sportNews.news.map((sportNew, idx) => {
            return (
              <div className='pt-6' key={idx}>
                <h2 className='text-2xl mb-4'>Featured New: {sportNew.title}</h2>
                <img src={sportNew.image} />
              </div>
            )
          })
        )
      }
      {
        !sportNews?.news?.length && (
          <p className='pt-4'>Unfortunately we don't have news for today</p>
        )
      }
    </div>
  )
}

export default App
