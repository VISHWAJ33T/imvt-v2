import * as React from "react"
import Link from 'next/link'
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { mediaData } from '@/types/mediaData'
import Image from "next/image"

export default function HeroMiniCarousel({ data, loading }: { data: mediaData[] | undefined, loading: boolean }) {

    if (loading) return <SkeletonTheme baseColor="#202020" highlightColor="#444"><HeroMiniSkeleton /></SkeletonTheme>
    return (
        <Carousel opts={{ align: "center", loop: true, }} className="w-full relative h-fit sm:hidden text-white" plugins={[Autoplay({ delay: 3000, })]} >
            <CarouselContent className="">
                {data?.map((mediaData: mediaData, index: React.Key | number) => (
                    <CarouselItem key={index} className={`h-fit transition-none`}>
                        <div className="movie-backdrop absolute top-0 w-full h-full z-0">
                            <Image
                                className="w-full h-full object-cover"
                                src={mediaData.backdrop_path}
                                alt={`${mediaData.name || mediaData.title} backdrop`}
                                width={400}
                                height={600}
                                loading={index as number < 10 ? "eager" : "lazy"}
                                placeholder='blur'
                                blurDataURL={`data:image/${shimmerBlurDataUrl(400, 600)}`}
                            />
                        </div>
                        <div className="relative flex flex-col items-center justify-center gap-y-3 z-1 pt-5">
                            <Image
                                className="w-52 block h-72 poster-box-shadow object-cover rounded-3xl clickable"
                                src={mediaData.poster_path}
                                alt={`${mediaData.name || mediaData.title} poster`}
                                width={400}
                                height={600}
                                loading={index as number < 10 ? "eager" : "lazy"}
                                placeholder='blur'
                                blurDataURL={`data:image/${shimmerBlurDataUrl(400, 600)}`}
                            />
                            <h3 className='font-bold w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem]'>{mediaData.name || mediaData.title || "unknown"}</h3>
                            <p className="w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap">{mediaData?.vote_average.toFixed(1)} • {mediaData.title ? "Movie" : "TV"} • {mediaData.genre_ids.join(', ')}</p>
                            <Link href={`/${mediaData.name ? "tv" : "movie"}/${mediaData.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center mb-6'>More details</Link>
                        </div>
                    </CarouselItem>))}
            </CarouselContent>

        </Carousel >
    )
}


import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { blurDataUrl, shimmerBlurDataUrl } from "@/utils/blurDataUrl"
const HeroMiniSkeleton = () => {
    return <div className='h-fit sm:hidden'>
        <div className="absolute top-0 w-full h-full z-0">
            <Skeleton className='w-full h-full' />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-y-3 pt-5">
            <Skeleton className='min-w-52 block min-h-72 rounded-3xl' />
            <h3 className='w-44 text-[1.5rem]'><Skeleton /></h3>
            <p className="w-36 text-[1.5rem]"><Skeleton /></p>
        </div>
    </div>
}
