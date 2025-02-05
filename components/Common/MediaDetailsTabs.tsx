import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import { handleDownload } from '@/utils/downloadImage'
import { PlayCircle, Star, Users } from 'lucide-react'

import { singleMediaDataType } from '@/types/mediaData'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MediaThumbnailComponent from '@/components/Common/MediaThumbnailComponent'

export default function MediaDetailsTabs({
  mediaData,
  type,
}: {
  mediaData: singleMediaDataType
  type: any
}) {
  const [basis, setBasis] = React.useState('50%')

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newBasis = width > 600 ? 100 / Math.floor(width / 200) : 100 / Math.floor(width / 100);
      setBasis(`${newBasis}%`)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Tabs defaultValue='casts' className='w-[95%] sm:w-[90%] dark'>
      <TabsList className=' w-full flex justify-start overflow-scroll'>
        <TabsTrigger value='casts'>Casts</TabsTrigger>
        {mediaData?.videos?.results.length > 0 && (
          <TabsTrigger value='videos'>Videos</TabsTrigger>
        )}
        {mediaData && Object.keys(mediaData.Images).length > 0 && (
          <TabsTrigger value='images'>Images</TabsTrigger>
        )}
        {mediaData?.similar && (
          <TabsTrigger value='similar'>Similar</TabsTrigger>
        )}
        {mediaData?.recommendations && (
          <TabsTrigger value='recommendations'>Recommendations</TabsTrigger>
        )}
        {mediaData?.reviews && mediaData?.reviews.length > 0 && (
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        )}
      </TabsList>

      {/* <TabsContent value="videos" className="rounded-3xl">
        <MediaVideos mediaData={mediaData} type={type} />
      </TabsContent> */}
      <TabsContent value='videos' className='rounded-3xl'>
        <div className='w-full flex flex-wrap justify-center sm:justify-start items-start'>
          {mediaData?.videos?.results.map(
            (video, index: React.Key | number) =>
              video.site === 'YouTube' && (
                <Card
                  key={index}
                  className='min-w-0 w-[350px] relative shrink-0 grow-0 basis-1/1 sm:basis-1/2 lg:basis-1/3 3xl:basis-1/4 h-fit p-2'
                >
                  <CardHeader>
                    <CardTitle>
                      {video.official ? 'Official' : 'Unofficial'} {video.type}
                    </CardTitle>
                    <CardDescription>
                      {new Date(video.published_at).toLocaleString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <iframe
                      className='w-full aspect-[1.85/1] border border-gray-200 rounded-sm'
                      src={`https://www.youtube.com/embed/${video.key}`}
                      allowFullScreen
                    ></iframe>
                  </CardContent>
                  <CardFooter>{video.name}</CardFooter>
                </Card>
              )
          )}
        </div>
      </TabsContent>

      <TabsContent value='images' className='rounded-3xl'>
        <Tabs defaultValue='logos' className='w-full'>
          <TabsList>
            <TabsTrigger value='logos'>Logos</TabsTrigger>
            <TabsTrigger value='posters'>Posters</TabsTrigger>
            <TabsTrigger value='backdrops'>Backdrops</TabsTrigger>
          </TabsList>
          <TabsContent value='logos' className='rounded-3xl'>
            <div className='w-full flex flex-wrap justify-center sm:justify-start items-start'>
              {mediaData?.Images.logos.map((logo, index: number) => (
                <Card
                  key={index}
                  className='flex flex-col justify-center items-center gap-y-2 min-w-0 h-fit w-[200px] shrink-0 grow-0 basis-1/1 sm:basis-1/2 lg:basis-1/3 3xl:basis-1/4 p-2'
                >
                  <CardContent className='p-1 relative w-full h-[200px] flex justify-center items-center'>
                    <div className='absolute opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
                      <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                        <Star fill='white' color='white' width={16} />
                        &nbsp;{logo.vote_average.toFixed(1)}&nbsp;•&nbsp;
                        <Users fill='white' color='white' width={16} />
                        &nbsp;{logo.vote_count}
                      </span>
                    </div>
                    <Image
                      className='w-full h-full object-contain'
                      src={`https://image.tmdb.org/t/p/original${logo.file_path}`}
                      alt={`${mediaData?.title}-logo-${index + 1}`}
                      width={400}
                      height={200}
                      loading={(index as number) < 10 ? 'eager' : 'lazy'}
                      placeholder={`data:image/${shimmerBlurDataUrl(400, 200)}`}
                    />
                  </CardContent>
                  <CardFooter className='w-full h-fit flex justify-center items-center p-0'>
                    <Button
                      onClick={() =>
                        handleDownload(
                          `https://image.tmdb.org/t/p/original${logo.file_path}`,
                          `${mediaData?.title}-logo-${index + 1}`
                        )
                      }
                      type='button'
                    >
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value='posters' className='rounded-3xl'>
            <div className='w-full flex flex-wrap justify-center sm:justify-start items-start'>
              {mediaData?.Images.posters.map((poster, index: number) => (
                <Card
                  key={index}
                  className='flex flex-col justify-center items-center gap-y-2 min-w-0 h-fit w-[200px] shrink-0 grow-0 basis-1/1 sm:basis-1/2 lg:basis-1/3 3xl:basis-1/4 p-2'
                >
                  <CardContent className='p-1 relative w-full h-[400px] flex justify-center items-center'>
                    <div className='absolute opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
                      <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                        <Star fill='white' color='white' width={16} />
                        &nbsp;{poster.vote_average.toFixed(1)}&nbsp;•&nbsp;
                        <Users fill='white' color='white' width={16} />
                        &nbsp;{poster.vote_count}
                      </span>
                    </div>
                    <Image
                      className='w-full h-full object-contain'
                      src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
                      alt={`${mediaData?.title}-poster-${index + 1}`}
                      width={400}
                      height={400}
                      loading={(index as number) < 10 ? 'eager' : 'lazy'}
                      placeholder={`data:image/${shimmerBlurDataUrl(400, 400)}`}
                    />
                  </CardContent>
                  <CardFooter className='w-full h-fit flex justify-center items-center p-0'>
                    <Button
                      onClick={() =>
                        handleDownload(
                          `https://image.tmdb.org/t/p/original${poster.file_path}`,
                          `${mediaData?.title || mediaData?.name}-poster-${
                            index + 1
                          }`
                        )
                      }
                      type='button'
                    >
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value='backdrops' className='rounded-3xl'>
            <div className='w-full flex flex-wrap justify-center sm:justify-start items-start'>
              {mediaData?.Images.backdrops.map((backdrop, index: number) => (
                <Card
                  key={index}
                  className='flex flex-col justify-center items-center gap-y-2 min-w-0 h-fit w-[200px] shrink-0 grow-0 basis-1/1 sm:basis-1/2 lg:basis-1/3 3xl:basis-1/4 p-2'
                >
                  <CardContent className='p-1 relative w-full h-[200px] flex justify-center items-center'>
                    <div className='absolute opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
                      <span className='bg-yellow-500 p-2 text-[1rem] sm:py-2 sm:px-3 rounded-3xl whitespace-nowrap flex items-center'>
                        <Star fill='white' color='white' width={16} />
                        &nbsp;{backdrop.vote_average.toFixed(1)}&nbsp;•&nbsp;
                        <Users fill='white' color='white' width={16} />
                        &nbsp;{backdrop.vote_count}
                      </span>
                    </div>
                    <Image
                      className='w-full h-full object-contain'
                      src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                      alt={`${mediaData?.title}-backdrop-${index + 1}`}
                      width={400}
                      height={200}
                      loading={(index as number) < 10 ? 'eager' : 'lazy'}
                      placeholder={`data:image/${shimmerBlurDataUrl(400, 200)}`}
                    />
                  </CardContent>
                  <CardFooter className='w-full h-fit flex justify-center items-center p-0'>
                    <Button
                      onClick={() =>
                        handleDownload(
                          `https://image.tmdb.org/t/p/original${backdrop.file_path}`,
                          `${mediaData?.title || mediaData?.name}-backdrop-${
                            index + 1
                          }`
                        )
                      }
                      type='button'
                    >
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value='casts' className='p-5'>
        <div className='flex flex-wrap justify-between items-center gap-y-5'>
          {mediaData?.casts.map((cast, index: React.Key | number) => (
            <Link
              href={`/people/${cast.id}`}
              key={index}
              className='hover:bg-slate-800/50 transition-all duration-300 ease-in-out rounded-l-full flex items-center gap-x-5 w-[100%] sm:w-[50%] lg:w-[33%]'
            >
              <Image
                className='rounded-full flex justify-center items-center w-24 h-24 aspect-square object-cover'
                src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                alt={`${cast.name || cast.original_name} photo`}
                width={100}
                height={100}
                loading={(index as number) < 10 ? 'eager' : 'lazy'}
                placeholder={`data:image/${shimmerBlurDataUrl(100, 100)}`}
              />
              <div className='flex flex-col justify-start items-start text-white gap-y-1'>
                <h3 className='text-lg font-bold text-[#5179ff]'>
                  {cast.name || cast.original_name}
                </h3>
                <h2 className='text-md font-semibold font-sans'>
                  as {cast.character}
                </h2>
                <h3 className='text-sm'>
                  {(cast.known_for_department === 'Acting' && 'Actor') ||
                    (cast.known_for_department === 'Writing' && 'Writer') ||
                    (cast.known_for_department === 'Directing' && 'Director') ||
                    (cast.known_for_department === 'Production' &&
                      'Producer') ||
                    cast.known_for_department}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>

      {mediaData?.similar && (
        <TabsContent value='similar'>
          <div className='w-full h-full flex justify-center'>
            <div className='w-full flex flex-wrap justify-start items-center'>
              {mediaData?.similar.map((post, index: React.Key | number) => (
                <div
                  key={index}
                  style={{ flexBasis: basis }}
                  className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}
                >
                  <MediaThumbnailComponent
                    link={`/${type}/${post.id}`}
                    id={post.id}
                    title={post.name || post.title}
                    poster={post.image}
                    width={200}
                    height={300}
                    index={index}
                    release_date={post.release_date || post.first_air_date}
                    type={post.title ? 'movie' : 'tv'}
                  >
                    <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                      <Star fill='white' color='white' width={12} />
                      &nbsp;{post.rating.toFixed(1)}
                    </span>
                  </MediaThumbnailComponent>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      )}

      {mediaData?.recommendations && (
        <TabsContent value='recommendations'>
          <div className='w-full h-full flex justify-center'>
            <div className='w-full flex flex-wrap justify-start items-center'>
              {mediaData?.recommendations.map(
                (post, index: React.Key | number) => (
                  <div
                    key={index}
                    style={{ flexBasis: basis }}
                    className={`relative min-w-0 shrink-0 grow-0 basis-1/2 h-fit p-2`}
                  >
                    <MediaThumbnailComponent
                      link={`/${type}/${post.id}`}
                      id={post.id}
                      title={post.name || post.title}
                      poster={post.image}
                      width={200}
                      height={300}
                      index={index}
                      release_date={post.release_date || post.first_air_date}
                      type={post.title ? 'movie' : 'tv'}
                    >
                      <span className='bg-yellow-500 text-white absolute top-3 left-3 z-[3] py-[2px] px-2 text-[0.8rem] rounded-3xl whitespace-nowrap flex items-center'>
                        <Star fill='white' color='white' width={12} />
                        &nbsp;{post.rating.toFixed(1)}
                      </span>
                    </MediaThumbnailComponent>
                  </div>
                )
              )}
            </div>
          </div>
        </TabsContent>
      )}

      {mediaData?.reviews && mediaData?.reviews.length > 0 && (
        <TabsContent value='reviews' className='p-5'>
          <div className='flex flex-wrap justify-between items-center gap-y-5'>
            {mediaData?.reviews.map((review, index: React.Key | number) => (
              <div
                key={index}
                className='flex flex-wrap sm:flex-nowrap justify-center items-center gap-x-5 w-[100%] h-fit'
              >
                <div className='flex flex-col items-center justify-start h-full w-[90%] sm:w-1/3'>
                  <Image
                    className='rounded-full flex justify-center items-center min-w-24 min-h-24 max-w-24 max-h-24 aspect-square object-cover'
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                        : 'https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg'
                    }
                    alt={`${
                      review.author_details.author || review.author
                    }'s pfp`}
                    width={200}
                    height={200}
                    loading={(index as number) < 10 ? 'eager' : 'lazy'}
                    placeholder={`data:image/${shimmerBlurDataUrl(200, 200)}`}
                  />
                  <h3 className='text-lg font-bold text-[#5179ff]'>
                    {review.author_details.username}
                  </h3>
                  <h2 className='text-md font-semibold text-white font-sans'>
                    {review.author_details.author || review.author}
                  </h2>
                  {review.author_details.rating && (
                    <span className=' text-white font-mono py-[2px] px-2 text-[1rem] rounded-3xl whitespace-nowrap flex items-center'>
                      Rated {review.author_details.rating} out of 10
                    </span>
                  )}
                </div>
                <div className='flex flex-col w-[90%] sm:w-2/3 justify-start items-start text-white gap-y-1'>
                  <h3 className='text-sm max-h-[200px] overflow-hidden'>
                    {review.content}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}
