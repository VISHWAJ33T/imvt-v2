import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import { ClockIcon, PlayCircle, PlusCircle, Star, Users } from 'lucide-react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { singleMediaDataType } from '@/types/mediaData'
import usehandleWatchlist from '@/hooks/usehandleWatchlist'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SelectAnimeDrawer from '@/components/Anime/SelectAnimeDrawer'
import MediaDetailsTabs from '@/components/Common/MediaDetailsTabs'

import 'react-loading-skeleton/dist/skeleton.css'

const SingleMediaPage = ({
  mediaData,
  loading,
  type,
}: {
  mediaData: singleMediaDataType
  loading: boolean
  type: string
}) => {
  const ReleaseDate = new Date(
    mediaData?.release_date || mediaData?.first_air_date
  )
  const isUpcoming = ReleaseDate ? ReleaseDate > new Date() : null
  const [openAnimeDrawer, setOpenAnimeDrawer] = React.useState<boolean>(false)

  useEffect(() => {
    if (
      mediaData?.genres.includes('Animation') &&
      (mediaData?.original_language === 'ja' ||
        mediaData?.original_language === 'ko')
    ) {
      setOpenAnimeDrawer(true)
    }
  }, [mediaData])

  const { watchlistType, setWatchlistType } = usehandleWatchlist(
    mediaData?.id,
    mediaData?.name ? 'tv' : 'movie'
  )

  const watchListNames = {
    completed: 'Completed',
    watching: 'Watching',
    plan_to_watch: 'Plan to Watch',
    on_hold: 'On Hold',
    dropped: 'Dropped',
    remove: 'watchlist',
  }

  if (loading || !mediaData) return <SingleMediaSkeleton />

  return (
    <>
      <div className='overflow-y-scroll w-full h-[100dvh] pb-[150px] sm:pb-[30px]'>
        {openAnimeDrawer && (
          <Alert>
            <AlertTitle className='justify-center items-center flex gap-x-3'>
              <span className='text-xl'>Is this a type of Anime?</span>
              <SelectAnimeDrawer
                animeQuery={mediaData?.name || mediaData?.title}
              >
                <Button>Yes</Button>
              </SelectAnimeDrawer>
              <Button onClick={() => setOpenAnimeDrawer(false)}>No</Button>
            </AlertTitle>
          </Alert>
        )}
        <div className='flex w-full h-[40dvh] sm:h-[100dvh] relative movie-backdrop sm:bg-fixed'>
          <Image
            className='w-full h-full object-cover'
            src={`${mediaData?.backdrop_path}`}
            alt={`${mediaData.name || mediaData.title} backdrop`}
            width={1280}
            height={720}
            loading={'eager'}
            placeholder={`data:image/${shimmerBlurDataUrl(1280, 720)}`}
          />
        </div>
        <div className='flex flex-col gap-y-5 lg:gap-y-14'>
          <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[30dvh] z-2'>
            <div className='w-full sm:w-1/2 lg:w-1/3 h-full flex flex-col items-center gap-y-3 justify-center'>
              <Image
                className='min-w-[150px] w-[50%] sm:w-[60%] lg:w-[50%] poster-box-shadow'
                src={mediaData?.poster_path}
                alt={`${mediaData.name || mediaData.title} poster`}
                width={400}
                height={600}
                loading={'eager'}
                placeholder={`data:image/${shimmerBlurDataUrl(400, 600)}`}
              />
              <div className='w-full flex flex-col items-center justify-center'>
                <Button className='min-w-[150px] w-[50%] sm:w-[60%] lg:w-[50%] gap-x-1 p-0 rounded-xl overflow-hidden'>
                  <Link
                    className='bg-yellow-400 text-white px-5 py-2 h-full w-full flex justify-center items-center gap-x-1'
                    href={`/${!mediaData?.name ? 'movie' : 'tv'}/${
                      mediaData.id
                    }/play`}
                  >
                    <PlayCircle /> Watch Now
                  </Link>
                </Button>
              </div>
              <div className='w-full flex flex-col items-center justify-center'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className='min-w-[150px] w-[50%] sm:w-[60%] lg:w-[50%] gap-x-1 rounded-xl'>
                      {watchlistType ? (
                        watchListNames[watchlistType]
                      ) : (
                        <>
                          <PlusCircle /> Watchlist
                        </>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='flex flex-col w-full h-full gap-1 p-2 z-[11111111111111]'>
                    <Button
                      onClick={() => {
                        setWatchlistType('completed')
                      }}
                      variant={
                        watchlistType === 'completed' ? 'default' : 'outline'
                      }
                    >
                      Completed
                    </Button>
                    <Button
                      onClick={() => {
                        setWatchlistType('watching')
                      }}
                      variant={
                        watchlistType === 'watching' ? 'default' : 'outline'
                      }
                    >
                      Watching
                    </Button>
                    <Button
                      onClick={() => {
                        setWatchlistType('plan_to_watch')
                      }}
                      variant={
                        watchlistType === 'plan_to_watch'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      Plan to Watch
                    </Button>
                    <Button
                      onClick={() => {
                        setWatchlistType('on_hold')
                      }}
                      variant={
                        watchlistType === 'on_hold' ? 'default' : 'outline'
                      }
                    >
                      On Hold
                    </Button>
                    <Button
                      onClick={() => {
                        setWatchlistType('dropped')
                      }}
                      variant={
                        watchlistType === 'dropped' ? 'default' : 'outline'
                      }
                    >
                      Dropped
                    </Button>
                    {watchlistType && (
                      <Button
                        onClick={() => {
                          setWatchlistType('')
                        }}
                        variant={'destructive'}
                      >
                        Remove from Watchlist
                      </Button>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className='w-full max-w-[800px] sm:w-1/2 lg:w-2/3 h-fit flex flex-col items-start justify-start text-white px-5'>
              <h1 className='text-[2rem] lg:text-[2.5rem] font-bold'>
                {mediaData?.name || mediaData?.title}
              </h1>
              <h2 className='text-[1.2rem] font-serif'>{mediaData?.tagline}</h2>
              <div className='flex flex-wrap items-center gap-3 mt-3'>
                {mediaData?.adult && (
                  <span className='bg-red-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'>
                    NSFW
                  </span>
                )}
                {!isUpcoming && (
                  <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                    <Star fill='white' color='white' width={16} />
                    &nbsp;{mediaData?.vote_average.toFixed(1)}&nbsp;•&nbsp;
                    <Users fill='white' color='white' width={16} />
                    &nbsp;{mediaData?.vote_count}
                  </span>
                )}
                <span className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                  {new Date(
                    mediaData?.first_air_date || mediaData?.release_date
                  ).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                {mediaData?.runtime ? (
                  <span className='bg-blue-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                    <ClockIcon color='white' width={16} />
                    &nbsp;
                    {mediaData?.runtime % 60 === 0
                      ? `${mediaData?.runtime}m`
                      : `${Math.floor(mediaData?.runtime / 60)}h ${
                          mediaData?.runtime % 60
                        }m`}
                  </span>
                ) : null}
                {mediaData?.number_of_seasons && (
                  <span className='bg-purple-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                    {mediaData?.number_of_seasons}{' '}
                    {mediaData?.number_of_seasons > 1 ? 'Seasons' : 'Season'}
                  </span>
                )}
                {mediaData?.genres.map(
                  (genre: string, index: React.Key | number) => (
                    <span
                      key={index}
                      className='bg-green-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl'
                    >
                      {genre}
                    </span>
                  )
                )}
                <p className='text-lg hidden lg:block'>{mediaData?.overview}</p>
              </div>
            </div>
          </div>
          <p className='text-lg text-white px-3 sm:px-10 lg:hidden'>
            {mediaData?.overview}
          </p>
          <div className='flex justify-center'>
            <MediaDetailsTabs mediaData={mediaData} type={type} />
          </div>
        </div>
      </div>
    </>
  )
}
export default SingleMediaPage

const SingleMediaSkeleton = () => {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <div className='w-full h-full overflow-y-scroll pb-[100px] sm:pb-[0px]'>
        <div className='flex w-full h-[40dvh] sm:h-[100dvh] relative movie-backdrop sm:bg-fixed'>
          <Skeleton className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col gap-y-5 lg:gap-y-14'>
          <div className='flex sm:flex-row flex-col items-start w-full h-fit relative gap-y-10 -mt-[30dvh] z-2'>
            <div className='w-full sm:w-1/2 lg:w-1/3 h-full flex flex-col items-center gap-y-2 justify-center'>
              <div className='min-w-[150px] h-fit rounded-3xl p-0 m-0 overflow-hidden max-w-[250px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                <Skeleton className='w-full rounded-3xl p-0 m-0' height={360} />
              </div>
              <div className='min-w-[150px] max-w-[250px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                <Skeleton className='w-full' height={50} />
              </div>
              <div className='min-w-[150px] max-w-[250px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                <Skeleton className='w-full' height={50} />
              </div>
            </div>
            <div className='w-full max-w-[800px] sm:w-1/2 lg:w-2/3 h-fit flex flex-col items-start justify-start text-white px-5 gap-3'>
              <div className='min-w-[150px] w-[90%] sm:w-[80%] lg:w-[70%]'>
                <Skeleton
                  className='text-[2rem] lg:text-[2.5rem] font-bold'
                  height={50}
                />
              </div>
              <div className='min-w-[150px] w-[70%] sm:w-[60%] lg:w-[50%]'>
                <Skeleton className='text-[1.2rem] font-serif' height={30} />
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
                <Skeleton
                  className='text-[2rem] lg:text-[2.5rem] font-bold'
                  height={250}
                />
              </div>
            </div>
          </div>
          <div className='w-full p-3 sm:p-10'>
            <Skeleton
              className='w-[90%] text-lg text-white px-3 sm:px-10 lg:hidden'
              height={500}
            />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}
