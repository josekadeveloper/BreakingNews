import { useEffect, useState } from 'react';
import { getFormatedDay, getTodaySportNews, getTodaySportNewsDescription } from '../utils/functions';
import { TODAY, YESTERDAY } from '../utils/constants';
import { Link } from 'react-router-dom';
import Loader from 'react-loaders';

const SportNews = () => {
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

    const getTitleDescription = (id) => {
        return sportNewsDescription?.data?.newsDescriptionData?.[id]?.title;
    }

    return (
        <>
            <div className={`${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                <div className='max-w-screen-sm mx-auto max-[600px]:p-6'>
                    <h1 className='bg-yellow-300 rounded-lg text-slate-800 font-bold text-4xl flex justify-center items-center h-40 mt-6 mb-6 max-[600px]:h-30 max-[600px]:text-2xl'>
                        SPORT BREAKING NEWS
                    </h1>
                    {sportNews?.data?.news?.slice(1).map((sportNew, idx) => (
                        <div className='pt-6 pb-6' key={idx}>
                            <h2 className='text-2xl text-yellow-300 underline mb-4'>Featured New: </h2>
                            <Link className="text-blue-300 hover:text-blue-700 cursor-pointer" to={`/description/${idx}`}>{getTitleDescription(idx)}</Link>
                            <img className='pt-1 max-h-[32rem]' src={sportNew.image} />
                        </div>
                    ))}
                </div>
            </div>
            {isLoading && <Loader type='ball-zig-zag-deflect' color='#FDE047' />}
        </>
    )
};

export default SportNews;