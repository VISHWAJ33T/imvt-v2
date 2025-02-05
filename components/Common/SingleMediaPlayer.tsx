'use client';

import React, { Key, useEffect, useState } from 'react';
import Image from 'next/image';
import { GET_MOVIE_BY_ID, GET_STREAMING_DATA, GET_TV_BY_ID } from '@/graphql/queries/MediaPlayerData.gql';
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl';
import { useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MediaPlayer from '@/components/Common/MediaPlayer';

type MediaPlayerDataType = {
  release_date: string
  first_air_date: string
  overview: string
  poster_path: string
  backdrop_path: string
  id: string
  number_of_seasons: number
  number_of_episodes: number
  seasons: any[]
  Images: { logos: { file_path: string }[] }
}
const SingleMediaPlayer = ({
  id,
  type,
  querySeason,
  queryEpisode,
}: {
  id: string
  type: string
  querySeason: number
  queryEpisode: number
}) => {
  const [seasonNumber, setSeasonNumber] = useState<number>(querySeason | 1)
  const [streamingId, setStreamingId] = useState('')
  const [episodeNumber, setEpisodeNumber] = useState<number>(queryEpisode || 1)
  const [episodeId, setEpisodeId] = useState('')
  const [isMediaPlayer, setIsMediaPlayer] = useState(true)
  const [serverNumber, setServerNumber] = useState<number>(3)
  const [iframeSrc, setIframeSrc] = useState('')

  // const [loading, setLoading] = useState<boolean>(false)

  const [mediaData, setmediaData] = useState<MediaPlayerDataType>({
    poster_path: '',
    release_date: '',
    first_air_date: '',
    overview: '',
    backdrop_path: '',
    id: '',
    number_of_seasons: 0,
    number_of_episodes: 0,
    seasons: [],
    Images: { logos: [{ file_path: '' }] },
  })
  const [streamingData, setStreamingData] = useState<
    {
      sources: { url: string; quality: string }[]
      subtitles: { url: string; lang: string }[]
    }[]
  >(() => [
    { sources: [{ url: '', quality: '' }], subtitles: [{ url: '', lang: '' }] },
  ])

  const IframeButtonDetails = [
    {
      name: 'Movies API',
      url: `https://moviesapi.club/${type === 'movie' ? 'movie' : 'tv'}/${id}${
        type !== 'movie' ? `-${seasonNumber}-${episodeNumber}` : ''
      }`,
    },
    {
      name: 'SuperEmbed',
      url: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&${
        type !== 'movie' ? `s=${seasonNumber}&e=${episodeNumber}` : ''
      }`,
    },
    {
      name: '2Embed',
      url: `https://www.2embed.cc/embed/${id}&${
        type !== 'movie' ? `s=${seasonNumber}&e=${episodeNumber}` : ''
      }`,
    },
    {
      name: 'VidSrc',
      url: `https://vidsrc.xyz/embed/${type}/${id}&${
        type !== 'movie'
          ? `season=${seasonNumber}&episode=${episodeNumber}`
          : ''
      }`,
    },
    {
      name: 'BlackVid',
      url: `https://blackvid.space/embed?tmdb=${id}${
        type !== 'movie'
          ? `&season=${seasonNumber}&episode=${episodeNumber}`
          : ''
      }`,
    },
    {
      name: 'tvembed',
      url: `https://tvembed.cc/${type}/${id}${
        type !== 'movie' ? `/${seasonNumber}/${episodeNumber}` : ''
      }`,
    },
    {
      name: 'Smashystream',
      // name: 'Player S',
      url: `https://embed.smashystream.com/playere.php?dplayer=S&tmdb=${id}${
        type !== 'movie'
          ? `&season=${seasonNumber}&episode=${episodeNumber}`
          : ''
      }`,
    },
    // {
    //   name: 'Player F',
    //   url: `https://embed.smashystream.com/playere.php?dplayer=F&tmdb=${id}${
    //     type !== 'movie'
    //       ? `&season=${seasonNumber}&episode=${episodeNumber}`
    //       : ''
    //   }`,
    // },
    // {
    //   name: 'Hindi Player',
    //   url: `https://embed.smashystream.com/playere.php?dplayer=D&tmdb=${id}${
    //     type !== 'movie'
    //       ? `&season=${seasonNumber}&episode=${episodeNumber}`
    //       : ''
    //   }`,
    // },
  ]

  const tmdbId = id

  const { data, loading } = useQuery(
    type === 'movie' ? GET_MOVIE_BY_ID : GET_TV_BY_ID,
    { variables: { tmdbId } }
  )


  useEffect(() => {
    if (loading) return

    const getStreamingData = async (id: string, type: 'movie' | 'tv') => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/tmdb/info/${id}?type=${type}`
      )
      const data = await response.json()
      return data
    }

    if (type === 'movie') {
      getStreamingData(id, 'movie').then((strData) => {
        setmediaData({
          ...data?.getMoviebyId,
          number_of_seasons: 0,
          number_of_episodes: 0,
          seasons: [],
        })
        setStreamingId(strData?.id)
        const array = strData?.id?.split('-')
        setEpisodeId(array?.length > 1 ? array[array.length - 1] : '')
      })
    } else {
      setmediaData(data?.getTvbyId)
      getStreamingData(id, 'tv').then((strData) => {
        setmediaData((prev)=>({...prev, seasons: strData?.seasons}))
        setStreamingId(strData?.id)
        setEpisodeId(
          strData?.seasons[seasonNumber - 1]?.episodes[
            episodeNumber - 1
          ]?.id
        )
      })
    }
    // setLoading(loading);
  }, [data, loading, type, episodeNumber, seasonNumber])

  const { data: mediaPlayerStreamingData, loading: streamingLoading } =
    useQuery(GET_STREAMING_DATA, {
      variables: { episodeId, streamingId },
      skip: !episodeId || !streamingId,
    })

  useEffect(() => {
    setStreamingData([])
    if (mediaPlayerStreamingData) {
      setStreamingData(mediaPlayerStreamingData?.mediaPlayerStreamingData)
    }
    // console.log("refetching the sources");
  }, [mediaPlayerStreamingData])

  if (!mediaData || !mediaData.seasons) return <div>Loading...</div>

  return (
    <div className='dark:bg-black'>
      <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
        {/* md Screen Seasons and Episodes */}
        {type !== 'movie' && (
          <>
            <ResizableHandle />
            <ResizablePanel
              className='h-[100dvh] md:block hidden max-w-[30%] min-w-0'
              defaultSize={20}
            >
              <div className='flex h-full items-center justify-center p-6'>
                <>
                  <ResizablePanel
                    defaultSize={20}
                    className='max-w-[500px] h-full'
                  >
                    <ResizablePanelGroup direction='vertical'>
                      <ResizablePanel defaultSize={30} className='max-h-fit'>
                        <h1 className='text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                          Seasons
                        </h1>
                        <ScrollArea className='h-full w-full rounded-md border p-4 pb-[50px]'>
                          {mediaData?.seasons && (
                            <div className='flex flex-col gap-3'>
                              {mediaData?.seasons.map(
                                (
                                  season: {
                                    image: any
                                    season: string
                                    episodes: any[]
                                  },
                                  index: React.Key | number
                                ) => (
                                  <div key={index} className='w-full h-full'>
                                    <div className='flex gap-x-3 justify-center items-start min-w-[200px] shrink-0'>
                                      <Image
                                        className='w-[25%]'
                                        src={
                                          season?.image?.mobile ||
                                          'https://via.placeholder.com/300x450'
                                        }
                                        alt={`${seasonNumber} poster`}
                                        width={100}
                                        height={150}
                                        loading={
                                          (index as number) < 10
                                            ? 'eager'
                                            : 'lazy'
                                        }
                                        placeholder={`data:image/${shimmerBlurDataUrl(
                                          100,
                                          150
                                        )}`}
                                      />
                                      <div className='flex flex-col justify-start items-start w-[75%] h-full px-5'>
                                        <h3 className='text-xl font-bold'>
                                          Season {season.season}
                                        </h3>
                                        <h4>
                                          {season.episodes?.length} Episodes
                                        </h4>
                                      </div>
                                    </div>
                                    <Button
                                      key={index}
                                      variant={
                                        seasonNumber === (index as number) + 1
                                          ? 'default'
                                          : 'secondary'
                                      }
                                      onClick={() => {
                                        setSeasonNumber((index as number) + 1)
                                        setEpisodeNumber(1)
                                      }}
                                      className='w-full whitespace-nowrap overflow-hidden text-ellipsis'
                                    >
                                      Play
                                    </Button>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={70} className=''>
                        <h1 className='text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                          Episodes
                        </h1>
                        <ScrollArea className='h-full w-full rounded-md border p-4 pb-12'>
                          {mediaData?.seasons && (
                            <div className='flex flex-col gap-3'>
                              <div className='flex flex-col gap-3'>
                                {mediaData?.seasons[
                                  seasonNumber - 1
                                ]?.episodes?.map(
                                  (
                                    episode: {
                                      id: string
                                      title: any
                                      episode: string
                                    },
                                    index: number | null | undefined
                                  ) => (
                                    <Button
                                      key={index}
                                      variant={
                                        episodeNumber === (index as number) + 1
                                          ? 'default'
                                          : 'secondary'
                                      }
                                      onClick={() => {
                                        setEpisodeNumber((index as number) + 1)
                                        setEpisodeId(episode.id)
                                      }}
                                      title={
                                        episode.title ||
                                        `Episode ${episode.episode}`
                                      }
                                      className='w-full whitespace-nowrap overflow-hidden text-ellipsis'
                                    >
                                      {episode.title ||
                                        `Episode ${episode.episode}`}
                                    </Button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </>
              </div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}

        {/* Main media Player and servers with <md screen Seasons + Episodes and <xl screen Media Details */}
        <ResizablePanel
          className='h-[100dvh] w-full min-w-0 sm:p-0 pb-32'
          defaultSize={60}
        >
          <div className='w-full h-full'>
            <ScrollArea className='w-full h-full'>
              {!isMediaPlayer && (
                <iframe
                  className='w-full aspect-[1.85/1]'
                  src={`${iframeSrc}`}
                  allowFullScreen
                ></iframe>
              )}
              {isMediaPlayer &&
                !loading &&
                !streamingLoading &&
                streamingData[serverNumber - 1]?.sources?.length > 0 && (
                  <MediaPlayer
                    media={{
                      urls: streamingData[serverNumber - 1].sources,
                      subtitles: streamingData[serverNumber - 1].subtitles,
                      thumbnail: mediaData?.backdrop_path,
                      logo: `https://image.tmdb.org/t/p/original${mediaData?.Images?.logos[0]?.file_path}`,
                    }}
                    key={
                      serverNumber +
                      streamingData[serverNumber - 1].sources.length
                    }
                    className='w-full min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.85/1]'
                  />
                )}
              {isMediaPlayer &&
                !loading &&
                !streamingLoading &&
                (streamingData[serverNumber - 1]?.sources?.length === 0 ||
                  !streamingData[serverNumber - 1]?.sources ||
                  !streamingData) && (
                  <div className='w-[99%] min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.85/1] flex items-center justify-center'>
                    <Image
                      className='w-full h-full object-contain flex justify-center items-center'
                      src='https://techdator.net/wp-content/uploads/2022/05/No-Valid-Sources-Available-for-This-Video.png'
                      alt='Video Source Not Found'
                      width={1080}
                      height={720}
                      placeholder={`data:image/${shimmerBlurDataUrl(
                        1080,
                        720
                      )}`}
                    />
                  </div>
                )}
              {(loading || streamingLoading || !mediaData) && (
                <div className='w-[99%] min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.85/1] flex items-center justify-center'>
                  <Image
                    className='w-1/2 h-1/2 object-contain flex justify-center items-center'
                    src='https://i.pinimg.com/originals/d9/f2/15/d9f21515b1e38d83e94fdbce88f623b6.gif'
                    alt='loading Media...'
                    width={1080}
                    height={720}
                    placeholder={`data:image/${shimmerBlurDataUrl(1080, 720)}`}
                  />
                </div>
              )}
              <div className='flex flex-col gap-5 items-start justify-center p-10 pt-10'>
                <div className='flex sm:flex-row flex-col items-start justify-center gap-3'>
                  <span className='shrink-0 py-1'>Internal Servers&nbsp;</span>
                  <div className='flex flex-wrap items-center justify-start gap-3'>
                    <Button
                      onClick={(e) => {
                        setServerNumber(3)
                        setIsMediaPlayer(true)
                      }}
                      variant={
                        isMediaPlayer && serverNumber === 3
                          ? 'default'
                          : 'secondary'
                      }
                      className='w-28'
                    >
                      Server 1
                    </Button>
                    <Button
                      onClick={(e) => {
                        setServerNumber(1)
                        setIsMediaPlayer(true)
                      }}
                      variant={
                        isMediaPlayer && serverNumber === 1
                          ? 'default'
                          : 'secondary'
                      }
                      className='w-28'
                    >
                      Server 2
                    </Button>
                    <Button
                      onClick={(e) => {
                        setServerNumber(2)
                        setIsMediaPlayer(true)
                      }}
                      variant={
                        isMediaPlayer && serverNumber === 2
                          ? 'default'
                          : 'secondary'
                      }
                      className='w-28'
                    >
                      Server 3
                    </Button>
                    <Button
                      onClick={(e) => {
                        setServerNumber(4)
                        setIsMediaPlayer(true)
                      }}
                      variant={
                        isMediaPlayer && serverNumber === 4
                          ? 'default'
                          : 'secondary'
                      }
                      className='w-28'
                    >
                      Server 4
                    </Button>
                    {/* <Button onClick={(e) => { setServerNumber(5); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 5 ? "default" : "secondary"} className="w-28">Server 5</Button>
                                        <Button onClick={(e) => { setServerNumber(6); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 6 ? "default" : "secondary"} className="w-28">Server 6</Button>
                                        <Button onClick={(e) => { setServerNumber(7); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 7 ? "default" : "secondary"} className="w-28">Server 7</Button>
                                        <Button onClick={(e) => { setServerNumber(8); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 8 ? "default" : "secondary"} className="w-28">Server 8</Button>
                                        <Button onClick={(e) => { setServerNumber(9); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 9 ? "default" : "secondary"} className="w-28">Server 9</Button>
                                        <Button onClick={(e) => { setServerNumber(10); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 10 ? "default" : "secondary"} className="w-28">Server 10</Button>
                                        <Button onClick={(e) => { setServerNumber(11); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 11 ? "default" : "secondary"} className="w-28">Server 11</Button>
                                        <Button onClick={(e) => { setServerNumber(12); setIsMediaPlayer(true) }} variant={isMediaPlayer && serverNumber === 12 ? "default" : "secondary"} className="w-28">Server 12</Button> */}
                  </div>
                </div>
                <div className='flex sm:flex-row flex-col items-start justify-start gap-x-3'>
                  <span className='shrink-0 py-1'>External Iframes</span>
                  <div className='flex flex-wrap items-center justify-start gap-3'>
                    {IframeButtonDetails.map((button, index) => {
                      return (
                        <Button
                          variant={
                            !isMediaPlayer &&
                            iframeSrc === button.url.toString()
                              ? 'default'
                              : 'secondary'
                          }
                          id={`video-btn-${index + 2}`}
                          key={index}
                          title={button.name}
                          onClick={() => {
                            setIframeSrc(button.url.toString())
                            setIsMediaPlayer(false)
                          }}
                          className='w-28'
                        >
                          {button.name}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className=' md:hidden'>
                {type !== 'movie' && (
                  <ResizablePanelGroup
                    direction='vertical'
                    className='min-h-[70dvh] min-w-0'
                  >
                    <ResizablePanel
                      defaultSize={45}
                      className='max-h-fit min-w-0'
                    >
                      <h1 className='text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                        Seasons
                      </h1>
                      <ScrollArea className='h-full w-full rounded-md border p-4'>
                        {mediaData?.seasons && (
                          <div className='flex flex-col gap-3 pb-10'>
                            {mediaData?.seasons.map(
                              (
                                season: {
                                  image: any
                                  season: string | null | undefined
                                  episodes: any[]
                                },
                                index: React.Key | number | undefined
                              ) => (
                                <div key={index} className='w-full h-full'>
                                  <div className='flex justify-center items-start min-w-[200px] shrink-0'>
                                    <Image
                                      className='w-[25%]'
                                      src={
                                        season?.image?.mobile ||
                                        'https://via.placeholder.com/200'
                                      }
                                      alt={`${seasonNumber} poster`}
                                      width={200}
                                      height={200}
                                      loading={
                                        (index as number) < 10
                                          ? 'eager'
                                          : 'lazy'
                                      }
                                      placeholder={`data:image/${shimmerBlurDataUrl(
                                        100,
                                        150
                                      )}`}
                                    />
                                    <div className='flex flex-col justify-start items-start w-[75%] h-full px-5'>
                                      <h3 className='text-xl font-bold'>
                                        Season {season.season}
                                      </h3>
                                      <h4>
                                        {season.episodes?.length} Episodes
                                      </h4>
                                    </div>
                                  </div>
                                  <Button
                                    key={index}
                                    variant={
                                      seasonNumber === (index as number) + 1
                                        ? 'default'
                                        : 'secondary'
                                    }
                                    onClick={() => {
                                      setSeasonNumber((index as number) + 1)
                                      setEpisodeNumber(1)
                                    }}
                                    className='w-full whitespace-nowrap overflow-hidden text-ellipsis'
                                  >
                                    Play
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        )}
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={55} className='min-w-0'>
                      <h1 className='text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                        Episodes
                      </h1>
                      <ScrollArea className='h-full max-w-[100vw] w-full rounded-md border p-4 pb-12'>
                        {mediaData?.seasons && (
                          <div className='w-full flex flex-col'>
                            <div className='w-full flex flex-col gap-y-3'>
                              {mediaData?.seasons[
                                seasonNumber - 1
                              ]?.episodes?.map(
                                (
                                  episode: {
                                    id: string
                                    title: any
                                    episode: string
                                  },
                                  index: number | null | undefined
                                ) => (
                                  <Button
                                    key={index}
                                    variant={
                                      episodeNumber === (index as number) + 1
                                        ? 'default'
                                        : 'secondary'
                                    }
                                    onClick={() => {
                                      setEpisodeNumber((index as number) + 1)
                                      setEpisodeId(episode.id)
                                    }}
                                    title={
                                      episode.title ||
                                      `Episode ${episode.episode}`
                                    }
                                    className='w-full justify-start text-start whitespace-nowrap overflow-hidden text-ellipsis'
                                  >
                                    {episode.title ||
                                      `Episode ${episode.episode}`}
                                  </Button>
                                )
                              )}
                            </div>
                          </div>
                        )}
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                )}
              </div>

              <ScrollArea className='flex w-full h-full xl:hidden items-center justify-center p-0'>
                <Card className='w-full h-full'>
                  <CardHeader className='flex flex-col gap-y-4'>
                    <CardTitle>Currently Playing</CardTitle>
                    {type !== 'movie' && (
                      <>
                        {' '}
                        <CardDescription>
                          Season {seasonNumber} | Episode {episodeNumber}
                        </CardDescription>
                      </>
                    )}
                    <div className='w-full'>
                      <Image
                        className='w-full sm:w-[50%] max-h-[50dvh] object-contain object-left'
                        src={
                          (type !== 'movie'
                            ? mediaData?.seasons[seasonNumber - 1]?.episodes[
                                episodeNumber - 1
                              ]?.img?.hd
                            : mediaData?.poster_path) ||
                          'https://via.placeholder.com/300'
                        }
                        alt={`current media poster`}
                        width={300}
                        height={300}
                        placeholder={`data:image/${shimmerBlurDataUrl(50, 75)}`}
                      />
                    </div>
                    {type !== 'movie' && (
                      <CardTitle>
                        {
                          mediaData?.seasons[seasonNumber - 1]?.episodes[
                            episodeNumber - 1
                          ]?.title
                        }
                      </CardTitle>
                    )}
                    <CardDescription>
                      {type !== 'movie'
                        ? mediaData?.seasons[seasonNumber - 1]?.episodes[
                            episodeNumber - 1
                          ]?.description
                        : mediaData?.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {type !== 'movie'
                      ? mediaData?.seasons[seasonNumber - 1]?.episodes[
                          episodeNumber - 1
                        ]?.release_date || mediaData?.first_air_date
                      : mediaData?.release_date || mediaData?.first_air_date}
                  </CardFooter>
                </Card>
              </ScrollArea>
            </ScrollArea>
          </div>
        </ResizablePanel>

        {/* xl Screen Media Details */}
        <ResizableHandle className='xl:block hidden' />
        <ResizablePanel
          className='h-[100dvh] xl:block hidden max-w-[20vw] min-w-0 overflow-hidden'
          defaultSize={20}
        >
          <ScrollArea className='flex w-full h-full items-center justify-center p-0 min-w-[300px] shrink-0'>
            <Card className='w-full h-full'>
              <CardHeader className='flex flex-col gap-y-4'>
                <CardTitle>Currently Playing</CardTitle>
                {type !== 'movie' && (
                  <CardDescription>
                    Season {seasonNumber} | Episode {episodeNumber}
                  </CardDescription>
                )}
                <div>
                  <Image
                    className='w-full max-h-[50dvh] object-contain object-left'
                    src={
                      (type !== 'movie'
                        ? mediaData?.seasons[seasonNumber - 1]?.episodes[
                            episodeNumber - 1
                          ]?.img?.hd
                        : mediaData?.poster_path) ||
                      'https://via.placeholder.com/300'
                    }
                    alt={`current media poster`}
                    width={300}
                    height={300}
                    placeholder={`data:image/${shimmerBlurDataUrl(50, 75)}`}
                  />
                </div>
                {type !== 'movie' && (
                  <CardTitle>
                    {
                      mediaData?.seasons[seasonNumber - 1]?.episodes[
                        episodeNumber - 1
                      ]?.title
                    }
                  </CardTitle>
                )}
                <CardDescription>
                  {type !== 'movie'
                    ? mediaData?.seasons[seasonNumber - 1]?.episodes[
                        episodeNumber - 1
                      ]?.description
                    : mediaData?.overview}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {type !== 'movie'
                  ? mediaData?.seasons[seasonNumber - 1]?.episodes[
                      episodeNumber - 1
                    ]?.release_date || mediaData?.first_air_date
                  : mediaData?.release_date || mediaData?.first_air_date}
              </CardFooter>
            </Card>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default SingleMediaPlayer