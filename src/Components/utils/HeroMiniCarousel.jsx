import * as React from "react"
import { Link } from 'react-router-dom'
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"

export default function HeroMiniCarousel({ data, loading }) {

    if (!data) return <div>Loading...</div>

    return (
        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full relative h-fit sm:hidden"
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent className="pt-5">
                {data?.map((post, index) => (
                    <CarouselItem key={index} className={`h-fit transition-none`}>
                        <div className="movie-backdrop absolute top-0 w-full h-full z-0">
                            <img
                                className="w-full h-full object-cover"
                                src={post.backdrop_path}
                                alt="Backdrop"
                            />
                        </div>
                        <div className="relative flex flex-col items-center justify-center gap-y-3 z-1 text-white">
                            <img
                                className="w-44 block h-64 object-cover rounded-3xl clickable"
                                src={post.poster_path}
                                alt="Movie logo"
                            />
                            <h3 className='font-bold w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem]'>{post.name || post.title || "unknown"}</h3>
                            <p className="w-[80%] text-center overflow-hidden text-ellipsis whitespace-nowrap">{parseFloat(post?.vote_average).toFixed(1)} • {post.title ? "Movie" : "TV"} • {post.genre_ids.join(', ')}</p>
                            <Link to={`/${post.name ? "tv" : "movie"}/${post.id}`} className='bg-blue-500 cursor-pointer w-24 sm:w-32 p-2 text-[0.8rem] sm:text-[1rem] sm:py-2 sm:px-3 rounded-xl text-center'>More details</Link>
                        </div>

                    </CarouselItem>))}
            </CarouselContent>

        </Carousel >
    )
}