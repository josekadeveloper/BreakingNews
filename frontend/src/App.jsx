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
    <div className='max-w-screen-md mx-auto'>
      <h1 className='bg-yellow-300 rounded-lg mt-6 text-slate-800 font-bold text-4xl flex justify-center items-center h-40 mb-6'>
          SPORT BREAKING NEWS
      </h1>
      {
        sportNews?.news?.length && (
          sportNews.news.map((sportNew, idx) => {
            return (
              <div className='pt-6' key={idx}>
                <h2 className='text-2xl underline mb-4'>Featured New: </h2><span className='text-2xl text-yellow-300 hover:text-yellow-600 cursor-pointer'>{sportNew.title}</span>
                <img className='pt-1' src={sportNew.image} />
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
