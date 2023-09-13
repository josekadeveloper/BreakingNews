import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodaySportNews, getTodaySportNewsDescription } from "../utils/functions";
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

      getSportNews();
      getSportNewsDescription();
    }, 700);
  }, []);

  const getSportNews = () => {
    getTodaySportNews().then((res) => {
        setSportNews(res);
    });
  };

  const getSportNewsDescription = () => {
    getTodaySportNewsDescription().then((res) => {
        setSportNewsDescription(res);
    });
  };

  const getImageSrc = () => {
    return sportNewsDescription?.[descriptionId]?.image
      ? sportNews?.slice(1)[descriptionId]?.image
      : sportNewsDescription?.[descriptionId]?.image;
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
          <h3 className='text-1xl text-red-400 underline mb-4 max-[300px]:text-sm'>{sportNewsDescription?.[descriptionId]?.category}</h3>
          <h2 className='text-1xl text-yellow-300 mb-4 max-[300px]:text-xs'>{sportNewsDescription?.[descriptionId]?.title}</h2>
          <h2 className='text-1xl text-white mb-4 max-[300px]:text-xs'>{sportNewsDescription?.[descriptionId]?.description}</h2>
          <img className='pt-1 max-h-[32rem]' src={getImageSrc()} />
        </div>
      </div>
      {isLoading && <Loader type='ball-zig-zag-deflect' color='#FDE047' />}
      </div>
    </>
  );
};

export default DescriptionNew;
