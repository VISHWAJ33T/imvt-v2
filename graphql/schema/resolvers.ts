import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

import { prisma } from '@/lib/db'

const M3U8FileParser = require('m3u8-file-parser')
const axios = require('axios')
const MovieGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]
const TvGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
]

export const resolvers = {
  Media: {
    __resolveType(
      obj: { media_type: string; title: any; name: any },
      context: any,
      info: any
    ) {
      if (obj.media_type === 'person') {
        return 'People'
      }
      if (obj.title) {
        return 'Movie'
      }
      if (obj.name) {
        return 'TV'
      }
    },
  },
  Movie: {
    poster_path: (movie: { poster_path: any }) => {
      if (!movie.poster_path) {
        return 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${movie.poster_path}`
      }
    },
    backdrop_path: (movie: { backdrop_path: any }) => {
      if (!movie.backdrop_path) {
        return 'https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      }
    },
    genre_ids: (movie: { genre_ids: any[] }) =>
      movie.genre_ids?.map((id: number) => {
        const genre = MovieGenres.find((genre) => genre.id === id)
        return genre ? genre.name : null
      }),
  },
  TV: {
    poster_path: (tv: { poster_path: any }) => {
      if (!tv.poster_path) {
        return 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${tv.poster_path}`
      }
    },
    backdrop_path: (tv: { backdrop_path: any }) => {
      if (!tv.backdrop_path) {
        return 'https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
      }
    },
    genre_ids: (tv: { genre_ids: any[] }) =>
      tv.genre_ids?.map((id: number) => {
        const genre = TvGenres.find((genre) => genre.id === id)
        return genre ? genre.name : null
      }),
  },
  SingleMovie: {
    poster_path: (movie: { poster_path: any }) => {
      if (!movie.poster_path) {
        return 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${movie.poster_path}`
      }
    },
    backdrop_path: (movie: { backdrop_path: any }) => {
      if (!movie.backdrop_path) {
        return 'https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      }
    },
    genres: (movie: { genres: any[] }) =>
      movie.genres.map((genre: { name: any }) => genre.name),
    casts: async (movie: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/${movie.id}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data?.cast
    },
    reviews: async (movie: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/${movie.id}/reviews?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data?.results
    },
    Images: async (movie: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/${movie.id}/images?api_key=${process.env.TMDB_KEY}`
        )
      ).data
    },
  },
  SingleTV: {
    poster_path: (tv: { poster_path: any }) => {
      if (!tv.poster_path) {
        return 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${tv.poster_path}`
      }
    },
    backdrop_path: (tv: { backdrop_path: any }) => {
      if (!tv.backdrop_path) {
        return 'https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
      }
    },
    genres: (tv: { genres: any[] }) =>
      tv.genres.map((genre: { name: any }) => genre.name),
    casts: async (tv: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/tv/${tv.id}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data.cast
    },
    videos: async (tv: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/tv/${tv.id}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data
    },
    reviews: async (tv: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/tv/${tv.id}/reviews?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data.results
    },
    Images: async (tv: { id: any }) => {
      return (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/tv/${tv.id}/images?api_key=${process.env.TMDB_KEY}`
        )
      ).data
    },
  },
  SingleAnime: {
    zoroEpisodes: async (anime: { id: any }) => {
      try {
        return (
          await axios.get(
            `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/anilist/info/${anime.id}?provider=zoro`,
            { timeout: 4000 }
          )
        ).data?.episodes
      } catch (error: any) {
        if (error.code === 'ECONNABORTED' || error.response) {
          return (
            await axios.get(
              `${process.env.NEXT_PUBLIC_CONSUMET_API_URL_ALT}/meta/anilist/info/${anime.id}?provider=zoro`
            )
          ).data?.episodes
        } else {
          return ''
        }
      }
    },
  },
  People: {
    profile_path: (people: { profile_path: any }) => {
      if (!people.profile_path) {
        return 'https://st3.depositphotos.com/1717437/18622/v/450/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${people.profile_path}`
      }
    },
    gender: (people: { gender: number }) => {
      if (people.gender === 1) {
        return 'Female'
      } else if (people.gender === 2) {
        return 'Male'
      } else if (people.gender === 3) {
        return 'Non-Binary'
      } else {
        return 'Not specified'
      }
    },
    biography: async (people: { id: any }) =>
      (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data.biography,
    // birthday: async (people) => (await axios.get(`${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.birthday,
    // deathday: async (people) => (await axios.get(`${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.deathday,
    // place_of_birth: async (people) => (await axios.get(`${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.place_of_birth,
    // also_known_as: async (people) => (await axios.get(`${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.also_known_as,
  },
  PeopleCredits: {
    profile_path: (people: { profile_path: any }) => {
      if (!people.profile_path) {
        return 'https://st3.depositphotos.com/1717437/18622/v/450/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${people.profile_path}`
      }
    },
    poster_path: (people: { poster_path: any }) => {
      if (!people.poster_path) {
        return 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${people.poster_path}`
      }
    },
    backdrop_path: (people: { backdrop_path: any }) => {
      if (!people.backdrop_path) {
        return 'https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg'
      } else {
        return `https://image.tmdb.org/t/p/original${people.backdrop_path}`
      }
    },
    genres: (people: {
      title: any
      media_type: string
      genre_ids: any[]
      name: any
    }) => {
      if (people.title || people.media_type === 'movie') {
        return people.genre_ids?.map((id: number) => {
          const genre = MovieGenres.find((genre) => genre.id === id)
          return genre ? genre.name : null
        })
      } else if (people.name || people.media_type === 'tv') {
        return people.genre_ids?.map((id: number) => {
          const genre = TvGenres.find((genre) => genre.id === id)
          return genre ? genre.name : null
        })
      }
    },
    gender: (people: { gender: number }) => {
      if (people.gender === 1) {
        return 'Female'
      } else if (people.gender === 2) {
        return 'Male'
      } else if (people.gender === 3) {
        return 'Non-Binary'
      } else {
        return 'Not specified'
      }
    },
  },
  Mutation: {
    addWatchlistItem: async (
      _: any,
      {
        userId,
        mediaId,
        mediaType,
        watchListType,
      }: {
        userId: string
        mediaId: string
        mediaType: string
        watchListType:
          | 'watching'
          | 'plan_to_watch'
          | 'completed'
          | 'on_hold'
          | 'dropped'
      },
      context: any
    ) => {
      try {
        const existingItem = await prisma.watchlistItem.findFirst({
          where: { userId: userId!, mediaId, mediaType },
        })

        if (existingItem) {
          throw new Error('Item already exists in watchlist')
        }

        const watchlistItem = await prisma.watchlistItem.create({
          data: { userId: userId!, mediaId, mediaType, watchListType },
        })

        return watchlistItem
      } catch (error) {
        console.error('Error adding watchlist item:', error)
        throw error
      }
    },
    deleteWatchlistItem: async (
      _: any,
      { userId, itemId }: { userId: string; itemId: string },
      context: any
    ) => {
      try {
        // Check if the item exists
        const existingItem = await prisma.watchlistItem.findUnique({
          where: { id: itemId!, userId: userId! },
        })

        if (!existingItem) {
          throw new Error('Item does not exist in watchlist')
        }

        const watchlistItem = await prisma.watchlistItem.delete({
          where: { id: itemId!, userId: userId! },
        })

        return !!watchlistItem
      } catch (error) {
        console.error('Error deleting watchlist item:', error)
        throw error
      }
    },
    updateWatchlistItem: async (
      _: any,
      {
        userId,
        itemId,
        watchListType,
      }: {
        userId: string
        itemId: string
        watchListType:
          | 'watching'
          | 'plan_to_watch'
          | 'completed'
          | 'on_hold'
          | 'dropped'
      },
      context: any
    ) => {
      try {
        // Check if the item exists
        const existingItem = await prisma.watchlistItem.findUnique({
          where: { id: itemId!, userId: userId! },
        })

        if (!existingItem) {
          throw new Error('Item does not exist in watchlist')
        }

        const watchlistItem = await prisma.watchlistItem.update({
          where: { id: itemId!, userId: userId! },
          data: { watchListType },
        })

        return watchlistItem
      } catch (error) {
        console.error('Error updating watchlist item:', error)
        throw error
      }
    },
    deleteUser: async (
      _: any,
      { userId }: { userId: string },
      context: any
    ) => {
      const cookiesStore = cookies()
      const supabase = createClient(cookiesStore)
      const userSession = (await supabase.auth.getSession()).data.session
      try {
        // Check if the item exists
        if (userId !== userSession?.user?.id) {
          throw new Error('You need to be logged in first')
        }
        const existingUser = await prisma.user.findUnique({
          where: { id: userId! },
        })

        if (!existingUser) {
          throw new Error('User does not exist')
        }

        const DeleteUser = await prisma.user.delete({
          where: { id: userId! },
        })

        return !!DeleteUser
      } catch (error) {
        console.error('Error deleting watchlist item:', error)
        throw error
      }
    },
    updateUser: async (
      _: any,
      {
        userId,
        name,
        profile_photo,
      }: { userId: string; name: string; profile_photo: string },
      context: any
    ) => {
      const cookiesStore = cookies()
      const supabase = createClient(cookiesStore)
      const userSession = (await supabase.auth.getSession()).data.session
      try {
        // Check if the item exists
        if (userId !== userSession?.user?.id) {
          throw new Error('You need to be logged in first')
        }
        // Check if the item exists
        const existingUser = await prisma.user.findUnique({
          where: { id: userId! },
        })

        if (!existingUser) {
          throw new Error('User does not exist')
        }

        const UpdateUser = await prisma.user.update({
          where: { id: userId! },
          data: { name, profile_photo },
        })

        return UpdateUser
      } catch (error) {
        console.error('Error updating watchlist item:', error)
        throw error
      }
    },
  },
  Query: {
    // Supabase Data
    getUser: async (_: any, { userId }: { userId: string }) => {
      const userData = userId
        ? await prisma.user.findUnique({
            where: { id: userId },
            include: {
              watchlist: true,
            },
          })
        : null

      if (!userData) {
        throw new Error(`No user found`)
      }

      return userData
    },
    // getUser: async () => {
    //     const cookieStore = cookies();
    //     const supabase = createClient(cookieStore)
    //     const { data, error } = await supabase.auth.getSession();
    //     if (error) throw new Error(error.message);
    //     const userId = data?.session?.user?.id;
    //     const userData = userId ?
    //         await prisma.user.findUnique({
    //             where: { id: userId },
    //             include: {
    //                 watchlist: true
    //             }
    //         }) : null;
    //     console.log(userData)

    //     if (!userId) {
    //         throw new Error(`No user found`);
    //     }

    //     return userData;
    // },
    // MediaPlayer Data
    mediaPlayerData: async (
      _: any,
      { id, type }: { id: number; type: string }
    ) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/tmdb/info/${id}?type=${type}`
      )
      const data = await res.json()
      return data
    },

    mediaPlayerStreamingData: async (
      _: any,
      { episodeId, streamingId }: { episodeId: string; streamingId: string }
    ) => {
      const servers = [
        'upcloud',
        'vidcloud',
        '',
        'mixdrop',
        'asianload',
        'mixdrop',
        'streamtape',
        'streamsb',
        'asianload',
        'mixdrop',
        'streamtape',
        'streamsb',
      ]
      const requests = servers.map(async (server, index) => {
        if (index === 2) {
          const url = `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/tmdb/watch/${episodeId}?id=${streamingId}`
          const res = await fetch(url)
          return res.json()
        } else {
          const url = `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/movies/flixhq/watch?server=${server}&episodeId=${episodeId}&mediaId=${streamingId}`
          const res = await fetch(url)
          return res.json()
        }
      })

      const data = await Promise.all(requests)
      return data
    },
    animePlayerStreamingData: async (
      _: any,
      { anilistId, zoroId }: { anilistId: string; zoroId: string }
    ) => {
      const zoroServers = ['vidcloud', 'streamsb', 'vidstreaming', 'streamtape']
      const gogoServers = ['gogocdn', 'streamsb', 'vidstreaming']

      const zoroId2 = zoroId.endsWith('dub')
        ? zoroId.replace(/dub$/, 'sub')
        : zoroId.replace(/sub$/, 'dub')
      // console.log(zoroId, zoroId2, anilistId);

      const urlAnilist = `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/anilist/watch/${anilistId}`

      const anilistData = fetch(urlAnilist).then((res) => res.json())

      const requests = zoroServers.flatMap((server) => {
        const urlzoro1 = `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/anime/zoro/watch?episodeId=${zoroId}&server=${server}`
        const urlzoro2 = `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/anime/zoro/watch?episodeId=${zoroId2}&server=${server}`

        return [
          fetch(urlzoro1).then((res) => res.json()),
          fetch(urlzoro2).then((res) => res.json()),
        ]
      })

      const gogoRequests = gogoServers.flatMap((server) => {
        const urlGogoAnime = `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/anime/gogoanime/watch/${anilistId}&server=${server}`

        return [fetch(urlGogoAnime).then((res) => res.json())]
      })

      requests.push(anilistData)

      const data1 = await Promise.all(requests)
      const data2 = await Promise.all(gogoRequests)
      const data = data1.concat(data2)
      return data
    },

    // Both Movie and TV
    discoverMedia: async (
      parent: any,
      {
        type,
        dategte,
        datelte,
        votesAvglte,
        votesAvggte,
        votesCountlte,
        votesCountgte,
        sort,
        genres,
        page = 1,
      }: any
    ) => {
      const params = {
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page,
        [`${type === 'movie' ? 'release_date' : 'first_air_date'}.gte`]:
          dategte,
        [`${type === 'movie' ? 'release_date' : 'first_air_date'}.lte`]:
          datelte,
        [`vote_average.lte`]: votesAvglte,
        [`vote_average.gte`]: votesAvggte,
        [`vote_count.lte`]: votesCountlte,
        [`vote_count.gte`]: votesCountgte,
        sort_by: sort,
        with_genres: genres,
        api_key: process.env.TMDB_KEY,
      }

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value != null)
      )

      const queryString = new URLSearchParams(filteredParams).toString()

      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/discover/${type}?${queryString}`
      )

      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getAnimebyId: async (parent: any, { id }: any) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/anilist/info/${id}`,
          { timeout: 4000 }
        )
        return response.data
      } catch (error: any) {
        console.log(error)
        if (error.code === 'ECONNABORTED' || error.response) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_CONSUMET_API_URL_ALT}/meta/anilist/info/${id}`
          )
          return response.data
        } else {
          console.log(error)
          throw error
        }
      }
    },
    getAnimebyQuery: async (parent: any, { query, page = 1 }: any) => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CONSUMET_API_URL}/meta/anilist/${query}&?page=${page}`
      )
      return {
        results: response.data.results,
        currentPage: response.data.currentPage,
        hasNextPage: response.data.hasNextPage,
      }
    },
    getAnybyQuery: async (parent: any, { query, page = 1 }: any) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/search/multi?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getAnyTrendingToday: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/all/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getAnyTrendingWeek: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/all/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    // Movie
    getMoviebyId: async (parent: any, { tmdbId }: any) =>
      (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/${tmdbId}?language=en-US&api_key=${process.env.TMDB_KEY}&append_to_response=videos`
        )
      ).data,
    getMoviebyQuery: async (parent: any, { query, page = 1 }: any) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getMovieTrendingToday: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getMovieTrendingWeek: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/movie/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getMovieUpcoming: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/upcoming?&language=en-US&region=IN&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getMovieTopRated: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/top_rated?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getMoviePopular: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    // TV
    getTvbyId: async (parent: any, { tmdbId }: any) =>
      (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/tv/${tmdbId}?language=en-US&api_key=${process.env.TMDB_KEY}`
        )
      ).data,
    getTvbyQuery: async (parent: any, { query, page = 1 }: any) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/search/tv?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getTvTrendingToday: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/tv/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getTvTrendingWeek: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/tv/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getTvAiringToday: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/airing_today?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getTvOnTheAir: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/on_the_air?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getTvTopRated: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/top_rated?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getTvPopular: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/tv/popular?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },

    // People
    getpeoplebyId: async (parent: any, { id }: any) =>
      (
        await axios.get(
          `${process.env.TMDB_BASE_URL}/person/${id}?language=en-US&append_to_response=images,credits,external_ids,combined_credits&api_key=${process.env.TMDB_KEY}`
        )
      ).data,
    getpeoplebyQuery: async (parent: any, { query, page = 1 }: any) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/search/person?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getPeopleTrendingWeek: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/person/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },
    getPeopleTrendingToday: async (parent: any, { page = 1 } = {}) => {
      const response = await axios.get(
        `${process.env.TMDB_BASE_URL}/trending/person/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`
      )
      return {
        results: response.data.results,
        currentPage: page,
        hasNextPage: page < response.data.total_pages,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      }
    },

    // IPTV
    iptvCountry: async (
      _: any,
      { search, group, page = 1, pageSize = 32 }: any
    ) => {
      const url = 'https://iptv-org.github.io/iptv/index.country.m3u'
      return getIPTVResponse(url, search, group, page, pageSize)
    },
    iptvCategory: async (
      _: any,
      { search, group, page = 1, pageSize = 32 }: any
    ) => {
      const url = 'https://iptv-org.github.io/iptv/index.m3u'
      return getIPTVResponse(url, search, group, page, pageSize)
    },
    iptvCountries: async () => {
      const url = 'https://iptv-org.github.io/iptv/index.country.m3u'
      return getIPTVGroupTitles(url)
    },
    iptvCategories: async () => {
      const url = 'https://iptv-org.github.io/iptv/index.m3u'
      return getIPTVGroupTitles(url)
    },
  },
}

async function getIPTVResponse(
  url: string,
  searchTerm: string,
  groupSearchTerm: string,
  page: number,
  pageSize: number
) {
  try {
    const response = await axios.get(url)
    const data = response.data

    const reader = new M3U8FileParser()
    reader.read(data)
    let result = reader.getResult()

    // Filter the result based on the search term
    if (searchTerm || groupSearchTerm) {
      if (searchTerm) {
        // console.log(`Searching ${searchTerm}`);
        result.segments = result.segments?.filter(
          (item: { inf: { title: string } }) =>
            item.inf?.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      if (groupSearchTerm) {
        // console.log(`Group Searching ${groupSearchTerm}`);
        result.segments = result.segments?.filter(
          (item: { inf: { groupTitle: string } }) =>
            item.inf?.groupTitle
              ?.toLowerCase()
              .includes(groupSearchTerm.toLowerCase())
        )
      }
    }

    // Calculate pagination information
    const totalResults = result.segments?.length
    const totalPages = Math.ceil(totalResults / pageSize)
    const hasNextPage = page < totalPages

    // Apply pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
    result.segments = result.segments?.slice(startIndex, endIndex)

    return {
      currentPage: page,
      totalPages,
      hasNextPage,
      totalResults,
      results: result.segments,
    }
  } catch (error) {
    console.error(`Error fetching M3U file: ${error}`)
    throw new Error('An error occurred while fetching the M3U file.')
  }
}

async function getIPTVGroupTitles(url: string) {
  try {
    const response = await axios.get(url)
    const data = response.data

    const reader = new M3U8FileParser()
    reader.read(data)
    let result = reader.getResult()

    // Convert the Set back to an array
    let uniqueGroupTitles = Array.from(result)

    // Return the unique group titles
    return uniqueGroupTitles
  } catch (error) {
    console.error(`Error fetching M3U file: ${error}`)
    throw new Error('An error occurred while fetching the M3U file.')
  }
}
