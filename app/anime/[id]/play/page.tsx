'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  GetAnimePlayerData,
  GetAnimeStreamingData,
} from '@/graphql/queries/GetAnime.gql'
import { shimmerBlurDataUrl } from '@/utils/blurDataUrl'
import { useQuery } from '@apollo/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import ErrorPage from '@/components/Common/ErrorPage'
import MediaPlayer from '@/components/Common/MediaPlayer'

const AnimePlayerPage = () => {
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const [isAnimePlayer, setIsAnimePlayer] = useState<boolean>(true)
  const [episodeNumber, setEpisodeNumber] = useState<number>(1)
  const [anilistId, setAnilistId] = useState<string>('')
  const [zoroId, setZoroId] = useState<string>('')
  const [serverNumber, setServerNumber] = useState<number>(9)
  const [animeData, setAnimeData] = useState<any>({
    episodes: [{ id: '', title: '', description: '', image: '', number: '' }],
    zoroEpisodes: [{ zoroId: '' }],
  })
  const [streamingData, setStreamingData] = useState<
    {
      headers: { Referer: string }
      download?: string | null
      sources: { url: string; quality: string }[]
      subtitles: { url: string; lang: string }[]
    }[]
  >(() => [
    {
      headers: { Referer: '' },
      sources: [{ url: '', quality: '' }],
      subtitles: [{ url: '', lang: '' }],
      download: null,
    },
  ])

  const { data, loading, error } = useQuery(GetAnimePlayerData, {
    variables: { id },
  })

  useEffect(() => {
    if (loading) return
    setAnimeData(data?.getAnimebyId)
    setAnilistId(data?.getAnimebyId?.episodes[episodeNumber - 1]?.id)
    setZoroId(data?.getAnimebyId?.zoroEpisodes[episodeNumber - 1]?.id)
  }, [data, loading, episodeNumber])

  const {
    data: animeStreamingData,
    loading: streamingLoading,
    error: streamingError,
  } = useQuery(GetAnimeStreamingData, {
    variables: { anilistId, zoroId: zoroId || '' },
    skip: !animeData || (!anilistId && !zoroId),
  })

  useEffect(() => {
    setStreamingData([])
    if (animeStreamingData) {
      setStreamingData(animeStreamingData.animePlayerStreamingData)
    }
  }, [animeStreamingData])

  if (loading)
    return (
      <div className='w-full h-[100dvh] flex justify-center items-center sm:pb-0 pb-[150px]'>
        <div className='animate-pulse w-[99%] aspect-[4/3] sm:aspect-[1.78/1] flex items-center justify-center'>
          <Image
            className='sm:w-1/3 w-[90%] object-contain flex justify-center items-center'
            src='https://i.pinimg.com/originals/d9/f2/15/d9f21515b1e38d83e94fdbce88f623b6.gif'
            alt='loading Media...'
            width={1080}
            height={720}
          />
        </div>
      </div>
    )

  if (error) {
    console.log(error)
    return <ErrorPage />
  }

  return (
    <div className='w-full bg-[#151517] rounded-l-lg overflow-hidden'>
      <div className='dark:bg-black'>
        <ResizablePanelGroup
          direction='horizontal'
          className='rounded-lg border'
        >
          {/* md Screen Episodes */}
          <ResizableHandle />
          <ResizablePanel
            className='h-[100dvh] md:block hidden max-w-[30%] min-w-0'
            defaultSize={20}
          >
            <div className='flex h-full items-center justify-center p-6'>
              <ResizablePanel defaultSize={20} className='max-w-[500px] h-full'>
                <h1 className='text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                  Episodes
                </h1>
                <ScrollArea className='h-full w-full rounded-md border p-4 pb-12'>
                  {animeData?.episodes &&
                    animeData?.episodes.length > 0 &&
                    animeData?.episodes[0].id && (
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-3'>
                          {animeData?.episodes?.map(
                            (
                              episode: {
                                id: string
                                title: any
                                episode: string
                                number: string
                              },
                              index: number
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
                                  setZoroId(animeData?.zoroEpisodes[index]?.id)
                                  setAnilistId(episode.id)
                                }}
                                title={
                                  `EP ${episode.number} ` + episode.title ||
                                  animeData?.zoroEpisodes[index]?.title ||
                                  `Episode ${episode.number}`
                                }
                                className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-start justify-start'
                              >
                                {`EP ${episode.number}: ` + episode.title ||
                                  animeData?.zoroEpisodes[index]?.title ||
                                  `Episode ${episode.number}`}
                              </Button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  {/* {animeData?.zoroEpisodes && animeData?.zoroEpisodes.length > 0 && animeData?.zoroEpisodes[0].id && <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-3">
                                        {animeData?.zoroEpisodes?.map((episode: { id: string; title: any; episode: string, number: string }, index: number) => (
                                            <Button key={index} variant={episodeNumber === (index as number) + 1 ? "default" : "secondary"} onClick={() => { setEpisodeNumber((index as number) + 1); setAnilistId(animeData?.episodes[index].id); setZoroId(episode.id); }} title={`EP ${episode.number} ` + episode.title || animeData?.episodes[index].title || `Episode ${episode.number}`} className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-start justify-start">{`EP ${episode.number}: ` + episode.title || animeData?.episodes[index].title || `Episode ${episode.number}`}</Button>
                                        ))}
                                    </div>
                                </div>} */}
                  <ScrollBar />
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              </ResizablePanel>
            </div>
          </ResizablePanel>
          <ResizableHandle />

          {/* Main media Player and servers with <md screen Episodes and <xl screen Media Details */}
          <ResizablePanel
            className='h-[100dvh] w-full min-w-0 sm:p-0 pb-32'
            defaultSize={60}
          >
            <div className='w-full h-full'>
              <ScrollArea className='w-full h-full'>
                {!isAnimePlayer &&
                  streamingData &&
                  streamingData.length >= 8 && (
                    <iframe
                      className='w-full overflow-y-hidden aspect-[1.78/1] outline-none'
                      src={`${
                        streamingData[10].headers.Referer ||
                        'https://imvt.vercel.app'
                      }`}
                      sandbox='allow-same-origin allow-scripts'
                      referrerPolicy='strict-origin'
                      allow='autoplay; fullscreen; geolocation; display-capture; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  )}
                {/* {!isAnimePlayer && streamingData && streamingData.length >= 8 && <iframe sandbox='allow-same-origin allow-scripts' referrerPolicy='no-referrer-when-downgrade' className="w-full aspect-[1.78/1] object-contain" src={`${streamingData[8].headers.Referer || "https://imvt.vercel.app"}`} allowFullScreen></iframe>} */}
                {!loading &&
                  isAnimePlayer &&
                  !streamingLoading &&
                  streamingData[serverNumber - 1]?.sources?.length > 0 && (
                    <MediaPlayer
                      media={{
                        urls: streamingData[serverNumber - 1].sources,
                        subtitles: streamingData[serverNumber - 1].subtitles
                          ? streamingData[serverNumber - 1].subtitles
                          : [],
                        thumbnail: animeData?.episodes
                          ? animeData?.episodes[episodeNumber - 1]?.image
                          : `data:image/${shimmerBlurDataUrl(1080, 720)}`,
                        download: streamingData[serverNumber - 1].download,
                        // thumbnail: animeData?.zoroEpisodes ? animeData?.zoroEpisodes[episodeNumber - 1]?.image : `data:image/${shimmerBlurDataUrl(1080, 720)}`,
                        logo: `https://i.pinimg.com/originals/d9/f2/15/d9f21515b1e38d83e94fdbce88f623b6.gif`,
                      }}
                      key={
                        serverNumber +
                        streamingData[serverNumber - 1].sources.length
                      }
                      className='w-full min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.78/1]'
                    />
                  )}
                {!loading &&
                  isAnimePlayer &&
                  !streamingLoading &&
                  (streamingData[serverNumber - 1]?.sources?.length === 0 ||
                    !streamingData[serverNumber - 1]?.sources ||
                    !streamingData) && (
                    <div className='w-[99%] min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.78/1] flex items-center justify-center'>
                      <Image
                        className='w-full h-full object-contain flex justify-center items-center'
                        src='https://techdator.net/wp-content/uploads/2022/05/No-Valid-Sources-Available-for-This-Video.png'
                        alt='Video Source Not Found'
                        width={1080}
                        height={720}
                      />
                    </div>
                  )}
                {(loading || streamingLoading || !animeData) &&
                  isAnimePlayer && (
                    <div className='w-[99%] min-h-[200px] sm:min-h-[350px] max-h-[100dvh] aspect-[4/3] sm:aspect-[1.78/1] flex items-center justify-center'>
                      <Image
                        className='w-1/2 h-1/2 object-contain flex justify-center items-center'
                        src='https://i.pinimg.com/originals/d9/f2/15/d9f21515b1e38d83e94fdbce88f623b6.gif'
                        alt='loading Media...'
                        width={1080}
                        height={720}
                      />
                    </div>
                  )}

                <div className='flex flex-col gap-5 items-start justify-center p-10 pt-10'>
                  <div className='flex sm:flex-row flex-col items-start justify-center gap-3'>
                    <span className='shrink-0 py-1'>Sub Servers&nbsp;</span>
                    <div className='flex flex-wrap items-center justify-start gap-3'>
                      <Button
                        onClick={(e) => {
                          setServerNumber(10)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 10
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 1
                      </Button>
                      <Button
                        onClick={(e) => {
                          setServerNumber(11)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 11
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 2
                      </Button>
                      <Button
                        onClick={(e) => {
                          setServerNumber(12)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 12
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 3
                      </Button>
                      <Button
                        onClick={(e) => {
                          setServerNumber(5)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 5
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 4
                      </Button>
                      <Button
                        onClick={(e) => {
                          setServerNumber(1)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 1
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 5
                      </Button>
                      <Button
                        onClick={(e) => {
                          setServerNumber(9)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 9
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 6
                      </Button>
                      {/* Not Working */}
                      {/* <Button onClick={(e) => { setServerNumber(3); setIsAnimePlayer(true) }} variant={isAnimePlayer && serverNumber === 3 ? "default" : "secondary"} className="w-28">Server 7</Button>
                        <Button onClick={(e) => { setServerNumber(7); setIsAnimePlayer(true) }} variant={isAnimePlayer && serverNumber === 7 ? "default" : "secondary"} className="w-28">Server 8</Button> */}
                    </div>
                  </div>
                  <div className='flex sm:flex-row flex-col items-start justify-center gap-3'>
                    <span className='shrink-0 py-1'>Dub Servers&nbsp;</span>
                    <div className='flex flex-wrap items-center justify-start gap-3'>
                      <Button
                        onClick={(e) => {
                          setServerNumber(6)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 6
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 1
                      </Button>
                      <Button
                        onClick={(e) => {
                          setServerNumber(2)
                          setIsAnimePlayer(true)
                        }}
                        variant={
                          isAnimePlayer && serverNumber === 2
                            ? 'default'
                            : 'secondary'
                        }
                        className='w-28'
                      >
                        Server 2
                      </Button>
                      {/* Not Working */}
                      {/* <Button onClick={(e) => { setServerNumber(4); setIsAnimePlayer(true) }} variant={isAnimePlayer && serverNumber === 4 ? "default" : "secondary"} className="w-28">Server 3</Button>
                       <Button onClick={(e) => { setServerNumber(8); setIsAnimePlayer(true) }} variant={isAnimePlayer && serverNumber === 8 ? "default" : "secondary"} className="w-28">Server 4</Button> */}
                    </div>
                  </div>
                  <div className='flex sm:flex-row flex-col items-start justify-center gap-3'>
                    <span className='shrink-0 py-1'>Sub Iframes&nbsp;</span>
                    <div className='flex flex-wrap items-center justify-start gap-3'>
                      <Button
                        onClick={(e) => {
                          setIsAnimePlayer(false)
                        }}
                        variant={!isAnimePlayer ? 'default' : 'secondary'}
                        className='w-28'
                      >
                        Iframe 1
                      </Button>
                    </div>
                  </div>
                </div>

                <div className=' md:hidden'>
                  <h1 className='text-xl h-10 px-3 py-2 font-bold whitespace-nowrap overflow-hidden text-ellipsis'>
                    Episodes
                  </h1>
                  <ScrollArea className='h-full max-w-[100vw] w-full rounded-md border p-4 pb-12 overflow-y-scroll max-h-[50dvh] min-w-0'>
                    {animeData?.episodes &&
                      animeData?.episodes.length > 0 &&
                      animeData?.episodes[0].id && (
                        <div className='flex flex-col gap-3'>
                          <div className='flex flex-col gap-3'>
                            {animeData?.episodes?.map(
                              (
                                episode: {
                                  id: string
                                  title: any
                                  episode: string
                                  number: string
                                },
                                index: number
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
                                    setZoroId(
                                      animeData?.zoroEpisodes[index]?.id
                                    )
                                    setAnilistId(episode.id)
                                  }}
                                  title={
                                    `EP ${episode.number} ` + episode.title ||
                                    animeData?.zoroEpisodes[index]?.title ||
                                    `Episode ${episode.number}`
                                  }
                                  className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-start justify-start'
                                >
                                  {`EP ${episode.number}: ` + episode.title ||
                                    animeData?.zoroEpisodes[index]?.title ||
                                    `Episode ${episode.number}`}
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    {/* {animeData?.zoroEpisodes && animeData?.zoroEpisodes.length > 0 && animeData?.zoroEpisodes[0].id && <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-3">
                                            {animeData?.zoroEpisodes?.map((episode: { id: string; title: any; episode: string, number: string }, index: number) => (
                                                <Button key={index} variant={episodeNumber === (index as number) + 1 ? "default" : "secondary"} onClick={() => { setEpisodeNumber((index as number) + 1); setAnilistId(animeData?.episodes[index].id); setZoroId(episode.id); }} title={`EP ${episode.number} ` + episode.title || animeData?.episodes[index].title || `Episode ${episode.number}`} className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-start justify-start">{`EP ${episode.number}: ` + episode.title || animeData?.episodes[index].title || `Episode ${episode.number}`}</Button>
                                            ))}
                                        </div>
                                    </div>} */}
                    <ScrollBar />
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </div>

                <ScrollArea className='flex w-full h-full xl:hidden items-center justify-center p-0'>
                  <Card className='w-full h-full'>
                    <CardHeader className='flex flex-col gap-y-4'>
                      <CardTitle>Currently Playing</CardTitle>
                      {
                        <CardDescription>
                          Episode {episodeNumber}
                        </CardDescription>
                      }
                      <div className='w-full'>
                        <Image
                          className='w-full max-h-[50dvh] object-contain object-left'
                          src={
                            animeData?.episodes[episodeNumber - 1]?.image ||
                            `data:image/${shimmerBlurDataUrl(1080, 720)}`
                          }
                          // src={animeData?.zoroEpisodes[episodeNumber - 1]?.image || `https://via.placeholder.com/300`}
                          alt={`current media poster`}
                          width={300}
                          height={300}
                          placeholder={`data:image/${shimmerBlurDataUrl(
                            50,
                            75
                          )}`}
                        />
                      </div>
                      <CardTitle>
                        {animeData?.episodes[episodeNumber - 1]?.title}
                      </CardTitle>
                      {/* <CardTitle>{animeData?.zoroEpisodes[episodeNumber - 1]?.title}</CardTitle> */}
                      <CardDescription>
                        {animeData?.episodes[episodeNumber - 1]?.description ||
                          animeData?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      {animeData?.episodes[episodeNumber - 1]?.createdAt &&
                        new Date(
                          animeData?.episodes[episodeNumber - 1]?.createdAt
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      {/* {animeData?.zoroEpisodes[episodeNumber - 1]?.createdAt && new Date(animeData?.zoroEpisodes[episodeNumber - 1]?.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })} */}
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
                  {<CardDescription>Episode {episodeNumber}</CardDescription>}
                  <div className='w-full'>
                    <Image
                      className='w-full max-h-[50dvh] object-contain object-left'
                      src={
                        animeData?.episodes[episodeNumber - 1]?.image ||
                        `data:image/${shimmerBlurDataUrl(1080, 720)}`
                      }
                      // src={animeData?.zoroEpisodes[episodeNumber - 1]?.image || `https://via.placeholder.com/300`}
                      alt={`current media poster`}
                      width={300}
                      height={300}
                      placeholder={`data:image/${shimmerBlurDataUrl(50, 75)}`}
                    />
                  </div>
                  <CardTitle>
                    {animeData?.episodes[episodeNumber - 1]?.title}
                  </CardTitle>
                  {/* <CardTitle>{animeData?.zoroEpisodes[episodeNumber - 1]?.title}</CardTitle> */}
                  <CardDescription>
                    {animeData?.episodes[episodeNumber - 1]?.description ||
                      animeData?.description}
                    {/* {animeData?.zoroEpisodes[episodeNumber - 1]?.description || animeData?.description} */}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  {animeData?.episodes[episodeNumber - 1]?.createdAt &&
                    new Date(
                      animeData?.episodes[episodeNumber - 1]?.createdAt
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  {/* {animeData?.zoroEpisodes[episodeNumber - 1]?.createdAt && new Date(animeData?.zoroEpisodes[episodeNumber - 1]?.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })} */}
                </CardFooter>
              </Card>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default AnimePlayerPage
