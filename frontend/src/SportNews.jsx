import { useEffect, useState } from 'react';
import { getFormatedDay, getTodaySportNews, getTodaySportNewsDescription } from './functions';
import { Link } from 'react-router-dom';
import Loader from 'react-loaders';

const SportNews = () => {
    const [sportNews, setSportNews] = useState(null);
    const [sportNewsDescription, setSportNewsDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);

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

    const getTitleDescription = (id) => {
        return sportNewsDescription?.newsDescriptionData?.[id]?.title;
    }

    return (
        <>
            <div className='max-w-screen-sm mx-auto'>
                <h1 className='bg-yellow-300 rounded-lg text-slate-800 font-bold text-4xl flex justify-center items-center h-40 mt-6 mb-6'>
                    SPORT BREAKING NEWS
                </h1>
                {sportNews?.news?.slice(1).map((sportNew, idx) => (
                    <div className='pt-6 pb-6' key={idx}>
                        <h2 className='text-2xl text-yellow-300 underline mb-4'>Featured New: </h2>
                        <Link className="text-blue-300 hover:text-blue-700 cursor-pointer" to={`/description/${idx}`}>{getTitleDescription(idx)}</Link>
                        <img className='pt-1 max-h-[32rem]' src={sportNew.image} />
                    </div>
                ))}
            </div>
            {isLoading && <Loader type='ball-zig-zag-deflect' color='#FDE047' />}
        </>
    )
};

export default SportNews;