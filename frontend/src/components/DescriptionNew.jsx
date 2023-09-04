import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormatedDay, getTodaySportNews, getTodaySportNewsDescription } from "../utils/functions";
import { TODAY, YESTERDAY } from "../utils/constants";
import Loader from 'react-loaders';
import arrow from '../assets/arrow.png';

const DescriptionNew = () => {
  const { descriptionId } = useParams();
  const [sportNews, setSportNews] = useState(null);
  const [sportNewsDescription, setSportNewsDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsFading(false);

      getSportNews(TODAY);
      getSportNewsDescription(TODAY);
    }, 700);
  }, []);

  const getSportNews = (day) => {
    getTodaySportNews(getFormatedDay(day)).then((res) => {
      res === undefined ? getSportNews(YESTERDAY) :
        setSportNews(res);
    });
  };

  const getSportNewsDescription = (day) => {
    getTodaySportNewsDescription(getFormatedDay(day)).then((res) => {
      res === undefined ? getSportNewsDescription(YESTERDAY) :
        setSportNewsDescription(res);
    });
  };

  const getImageSrc = () => {
    return sportNewsDescription?.data?.newsDescriptionData?.[descriptionId]?.image
      ? sportNews?.data?.news?.slice(1)[descriptionId]?.image
      : sportNewsDescription?.data?.newsDescriptionData?.[descriptionId]?.image;
  }

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
    <div className={`${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
      <div className='max-w-screen-md mx-auto p-6'>
        <div className='justify-center items-center'>
          {!isLoading && <button onClick={goBack}><img src={arrow} alt='Go Back' className="rotate-90"/></button>}
          <h3 className='text-1xl text-red-400 underline mb-4'>{sportNewsDescription?.data?.newsDescriptionData?.[descriptionId]?.category}</h3>
          <h2 className='text-1xl text-yellow-300 mb-4'>{sportNewsDescription?.data?.newsDescriptionData?.[descriptionId]?.title}</h2>
          <h2 className='text-1xl text-white mb-4'>{sportNewsDescription?.data?.newsDescriptionData?.[descriptionId]?.description}</h2>
          <img className='pt-1 max-h-[32rem]' src={getImageSrc()} />
        </div>
      </div>
      {isLoading && <Loader type='ball-zig-zag-deflect' color='#FDE047' />}
      </div>
    </>
  );
};

export default DescriptionNew;
