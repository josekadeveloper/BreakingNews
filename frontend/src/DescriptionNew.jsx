import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormatedDay, getTodaySportNews, getTodaySportNewsDescription } from "./functions";
import Loader from 'react-loaders';
import arrow from './assets/arrow.png';

const DescriptionNew = () => {
  const { descriptionId } = useParams();
  const [sportNews, setSportNews] = useState(null);
  const [sportNewsDescription, setSportNewsDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
    setIsFading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsFading(false);

      getSportNews(today);
      getSportNewsDescription(today);
    }, 700);
  }, []);

  const getSportNews = (day) => {
    getTodaySportNews(getFormatedDay(day)).then((res) => {
      res === undefined ? getSportNews(yesterday) :
        setSportNews(res);
    });
  };

  const getSportNewsDescription = (day) => {
    getTodaySportNewsDescription(getFormatedDay(day)).then((res) => {
      res === undefined ? getSportNewsDescription(yesterday) :
        setSportNewsDescription(res);
    });
  };

  const getImageSrc = () => {
    return sportNewsDescription?.newsDescriptionData?.[descriptionId]?.image
      ? sportNews?.news?.slice(1)[descriptionId]?.image
      : sportNewsDescription?.newsDescriptionData?.[descriptionId]?.image;
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
    <div className={`${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
      <div className='max-w-screen-md mx-auto pt-6 pb-6'>
        <div className='justify-center items-center'>
          {!isLoading && <button onClick={goBack}><img src={arrow} alt='Go Back' className="rotate-90"/></button>}
          <h3 className='text-1xl text-red-400 underline mb-4'>{sportNewsDescription?.newsDescriptionData?.[descriptionId]?.category}</h3>
          <h2 className='text-1xl text-yellow-300 mb-4'>{sportNewsDescription?.newsDescriptionData?.[descriptionId]?.title}</h2>
          <h2 className='text-1xl text-white mb-4'>{sportNewsDescription?.newsDescriptionData?.[descriptionId]?.description}</h2>
          <img className='pt-1 max-h-[32rem]' src={getImageSrc()} />
        </div>
      </div>
      {isLoading && <Loader type='ball-zig-zag-deflect' color='#FDE047' />}
      </div>
    </>
  );
};

export default DescriptionNew;
