import { useEffect, useState } from 'react';
import { getTodaySportNews, getTodaySportNewsDescription } from '../utils/functions';
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

    const getTitleDescription = (id) => {
        return sportNewsDescription?.[id]?.title;
    }

    return (
        <>
            <div className={`${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                <div className='max-w-screen-sm mx-auto max-[600px]:p-6'>
                    <h1 className='bg-yellow-300 rounded-lg text-slate-800 font-bold text-4xl flex justify-center items-center h-40 mt-6 mb-6 max-[600px]:h-30 max-[600px]:text-2xl max-[300px]:h-20 max-[300px]:text-sm'>
                        SPORT BREAKING NEWS
                    </h1>
                    {sportNews?.slice(1).map((sportNew, idx) => (
                        <div className='pt-6 pb-6' key={idx}>
                            <h2 className='text-2xl text-yellow-300 underline mb-4 max-[300px]:text-sm'>Featured New: </h2>
                            <Link className="text-blue-300 hover:text-blue-700 cursor-pointer max-[300px]:text-xs" to={`/description/${idx}`}>{getTitleDescription(idx)}</Link>
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