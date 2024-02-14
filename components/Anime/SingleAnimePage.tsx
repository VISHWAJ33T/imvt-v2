
import React, { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl';
import { Button } from '@/components/ui/button';
import { Star, ClockIcon, Users, PlayCircle } from "lucide-react";
import AnimeDetailsTabs from '@/components/Anime/AnimeDetailsTabs';

const SingleAnimePage = ({ animeData, loading }: { animeData: any, loading: boolean }) => {
    if (loading || !animeData) return <SingleAnimeSkeleton />

    return (<>
        <div className='overflow-y-scroll w-full h-[100dvh] pb-[150px] sm:pb-[30px]'>
            <div className="flex w-full h-[40dvh] sm:h-[60dvh] relative movie-backdrop sm:bg-fixed">
                <Image
                    className='w-full h-full object-cover'
                    src={`${animeData?.cover}`}
                    alt={`${animeData.title.userPreferred || animeData.title.english} backdrop`}
                    width={1900}
                    height={400}
                    loading={"eager"}
                    placeholder={`data:image/${shimmerBlurDataUrl(1280, 720)}`} />
            </div>
            <div className={`flex flex-col gap-y-5 lg:gap-y-14`}>
                <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[30dvh] z-2'>
                    <div className='w-full sm:w-1/2 lg:w-1/3 h-full flex flex-col items-center gap-y-3 justify-center'>
                        <Image
                            className='min-w-[150px] w-[50%] sm:w-[60%] lg:w-[50%] poster-box-shadow'
                            src={animeData?.image} alt={`${animeData.title.userPreferred || animeData.title.english} poster`}
                            width={400}
                            height={600}
                            loading={"eager"}
                            placeholder={`data:image/${shimmerBlurDataUrl(400, 600)}`} />
                        <div className='w-full flex flex-col items-center justify-center'>
                            <Link href={`/anime/${animeData.id}/play`}><Button className='min-w-[150px] w-[50%] sm:w-[60%] lg:w-[50%] gap-x-1'><PlayCircle /> Watch Now</Button></Link></div>
                    </div>
                    <div className='w-full max-w-[800px] sm:w-1/2 lg:w-2/3 h-fit flex flex-col items-start justify-start text-white px-5'>
                        <h1 className='text-[2rem] lg:text-[2.5rem] font-bold'>{animeData.title.userPreferred || animeData.title.english}</h1>
                        <div className='flex flex-wrap items-center gap-3 mt-3'>
                            {animeData?.isAdult && <span className='bg-black p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                NSFW
                            </span>}
                            {animeData?.type && <span className='bg-violet-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                {animeData?.type}
                            </span>}
                            {animeData?.rating && <span className='bg-indigo-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                <Star fill="white" color='white' width={16} />&nbsp;{(animeData?.rating / 10).toFixed(1)}
                            </span>}
                            {animeData?.genres.map((genre: string, index: React.Key | number) => (
                                <span key={index} className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                    {genre}
                                </span>
                            ))}
                            {animeData?.duration && <span className='bg-cyan-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                {animeData?.duration} min
                            </span>}
                            {animeData?.currentEpisode && <span className='bg-teal-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                                EP {animeData?.currentEpisode}
                            </span>}
                            {animeData?.status && <span className='bg-green-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                {animeData?.status}
                            </span>}
                            {animeData?.season && <span className='bg-teal-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                {animeData?.season}
                            </span>}
                            {animeData?.releaseDate && <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                {animeData?.releaseDate}
                            </span>}
                            {animeData?.subOrDub && <span className='bg-orange-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                {animeData?.subOrDub}
                            </span>}
                            {animeData?.countryOfOrigin && <span className='bg-red-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                                {animeData?.countryOfOrigin}
                            </span>}
                            <p className='text-lg hidden lg:block'>{animeData?.description}</p>
                        </div>

                    </div>
                </div>
                <p className='text-lg text-white px-3 sm:px-10 lg:hidden'>{animeData?.description}</p>
                <div className='flex justify-center'><AnimeDetailsTabs animeData={animeData} /></div>
            </div>
        </div>
    </>
    )
}
export default SingleAnimePage


import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleAnimeSkeleton = () => {
    return <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className='w-full h-full overflow-y-scroll pb-[100px] sm:pb-[0px]'>
            <div className="flex w-full h-[40dvh] sm:h-[60dvh] relative movie-backdrop sm:bg-fixed">
                <Skeleton className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-col gap-y-5 lg:gap-y-14'>
                <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[30dvh] z-2'>
                    <div className='w-full sm:w-1/2 lg:w-1/3 h-full flex flex-col items-center gap-y-3 justify-center'>
                        <div className='min-w-[150px] h-fit rounded-3xl p-0 m-0 overflow-hidden max-w-[250px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                            <Skeleton className="w-full rounded-3xl p-0 m-0" height={360} />
                        </div>
                        <div className='min-w-[150px] max-w-[250px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                            <Skeleton className='w-full' height={50} />
                        </div>
                    </div>
                    <div className='w-full max-w-[800px] sm:w-1/2 lg:w-2/3 h-fit flex flex-col items-start justify-start text-white px-5 gap-3'>
                        <div className='min-w-[150px] w-[90%] sm:w-[80%] lg:w-[70%]'>
                            <Skeleton className='text-[2rem] lg:text-[2.5rem] font-bold' height={50} />
                        </div>
                        <div className='flex flex-wrap items-center gap-3 mt-3'>
                            <Skeleton height={40} width={100} />
                            <Skeleton height={40} width={100} />
                            <Skeleton height={40} width={100} />
                            <Skeleton height={40} width={100} />
                            <Skeleton height={40} width={100} />
                            <Skeleton height={40} width={100} />
                        </div>
                        <div className='min-w-[150px] w-[100%]'>
                            <Skeleton className='text-[2rem] lg:text-[2.5rem] font-bold' height={230} />
                        </div>
                        <div className='min-w-[150px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                            <Skeleton className='text-[1.2rem] font-serif' height={50} />
                        </div>
                    </div>
                </div>
                <div className='w-full p-3 sm:p-10'>
                    <Skeleton className='w-[90%] text-lg text-white px-3 sm:px-10 lg:hidden' height={500} />
                </div>
            </div>
        </div>
    </SkeletonTheme>
}
