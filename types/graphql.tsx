import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Collection = {
  __typename?: 'Collection'
  backdrop_path?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  poster_path?: Maybe<Scalars['String']['output']>
}

export type Company = {
  __typename?: 'Company'
  id?: Maybe<Scalars['ID']['output']>
  logo_path?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  origin_country?: Maybe<Scalars['String']['output']>
}

export type Country = {
  __typename?: 'Country'
  iso_3166_1?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type CreatedBy = {
  __typename?: 'CreatedBy'
  credit_id?: Maybe<Scalars['String']['output']>
  gender?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['Int']['output']>
  name?: Maybe<Scalars['String']['output']>
  profile_path?: Maybe<Scalars['String']['output']>
}

export type Episode = {
  __typename?: 'Episode'
  Season?: Maybe<Scalars['Int']['output']>
  description?: Maybe<Scalars['String']['output']>
  episode?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['ID']['output']>
  img?: Maybe<SeasonImage>
  releaseDate?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type Image = {
  __typename?: 'Image'
  aspect_ratio?: Maybe<Scalars['Float']['output']>
  file_path?: Maybe<Scalars['String']['output']>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
  width?: Maybe<Scalars['Int']['output']>
}

export type Images = {
  __typename?: 'Images'
  backdrops?: Maybe<Array<Maybe<Image>>>
  id?: Maybe<Scalars['ID']['output']>
  logos?: Maybe<Array<Maybe<Image>>>
  posters?: Maybe<Array<Maybe<Image>>>
}

export type Language = {
  __typename?: 'Language'
  iso_639_1?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type LastEpisodeToAir = {
  __typename?: 'LastEpisodeToAir'
  air_date?: Maybe<Scalars['String']['output']>
  episode_number?: Maybe<Scalars['Int']['output']>
  episode_type?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['Int']['output']>
  name?: Maybe<Scalars['String']['output']>
  overview?: Maybe<Scalars['String']['output']>
  production_code?: Maybe<Scalars['String']['output']>
  runtime?: Maybe<Scalars['Int']['output']>
  season_number?: Maybe<Scalars['Int']['output']>
  show_id?: Maybe<Scalars['Int']['output']>
  still_path?: Maybe<Scalars['String']['output']>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
}

export type Media = Movie | People | Tv

export type MediaRecommendations = {
  __typename?: 'MediaRecommendations'
  id?: Maybe<Scalars['ID']['output']>
  image?: Maybe<Scalars['String']['output']>
  rating?: Maybe<Scalars['Float']['output']>
  releaseDate?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type Movie = {
  __typename?: 'Movie'
  adult?: Maybe<Scalars['Boolean']['output']>
  backdrop_path?: Maybe<Scalars['String']['output']>
  genre_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  id: Scalars['ID']['output']
  media_type?: Maybe<Scalars['String']['output']>
  original_language?: Maybe<Scalars['String']['output']>
  original_title?: Maybe<Scalars['String']['output']>
  overview?: Maybe<Scalars['String']['output']>
  popularity?: Maybe<Scalars['Float']['output']>
  poster_path?: Maybe<Scalars['String']['output']>
  release_date?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  video?: Maybe<Scalars['Boolean']['output']>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
}

export type Networks = {
  __typename?: 'Networks'
  id?: Maybe<Scalars['Int']['output']>
  logo_path?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  origin_country?: Maybe<Scalars['String']['output']>
}

export type PaginatedMedia = {
  __typename?: 'PaginatedMedia'
  currentPage?: Maybe<Scalars['Int']['output']>
  hasNextPage?: Maybe<Scalars['Boolean']['output']>
  results?: Maybe<Array<Maybe<Media>>>
  total_pages?: Maybe<Scalars['Int']['output']>
  total_results?: Maybe<Scalars['Int']['output']>
}

export type PaginatedMovie = {
  __typename?: 'PaginatedMovie'
  currentPage?: Maybe<Scalars['Int']['output']>
  hasNextPage?: Maybe<Scalars['Boolean']['output']>
  results?: Maybe<Array<Maybe<Movie>>>
  total_pages?: Maybe<Scalars['Int']['output']>
  total_results?: Maybe<Scalars['Int']['output']>
}

export type PaginatedPeople = {
  __typename?: 'PaginatedPeople'
  currentPage?: Maybe<Scalars['Int']['output']>
  hasNextPage?: Maybe<Scalars['Boolean']['output']>
  results?: Maybe<Array<Maybe<People>>>
  total_pages?: Maybe<Scalars['Int']['output']>
  total_results?: Maybe<Scalars['Int']['output']>
}

export type PaginatedTv = {
  __typename?: 'PaginatedTV'
  currentPage?: Maybe<Scalars['Int']['output']>
  hasNextPage?: Maybe<Scalars['Boolean']['output']>
  results?: Maybe<Array<Maybe<Tv>>>
  total_pages?: Maybe<Scalars['Int']['output']>
  total_results?: Maybe<Scalars['Int']['output']>
}

export type People = {
  __typename?: 'People'
  adult?: Maybe<Scalars['Boolean']['output']>
  also_known_as?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  biography?: Maybe<Scalars['String']['output']>
  birthday?: Maybe<Scalars['String']['output']>
  combined_credits?: Maybe<Combined_Credits>
  deathday?: Maybe<Scalars['String']['output']>
  gender?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  images?: Maybe<Profiles>
  known_for?: Maybe<Array<Maybe<Media>>>
  known_for_department?: Maybe<Scalars['String']['output']>
  media_type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  original_name?: Maybe<Scalars['String']['output']>
  place_of_birth?: Maybe<Scalars['String']['output']>
  popularity?: Maybe<Scalars['Float']['output']>
  profile_path?: Maybe<Scalars['String']['output']>
}

export type PeopleCredits = {
  __typename?: 'PeopleCredits'
  adult?: Maybe<Scalars['Boolean']['output']>
  backdrop_path?: Maybe<Scalars['String']['output']>
  cast_id?: Maybe<Scalars['Int']['output']>
  character?: Maybe<Scalars['String']['output']>
  credit_id?: Maybe<Scalars['String']['output']>
  department?: Maybe<Scalars['String']['output']>
  gender?: Maybe<Scalars['String']['output']>
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  id: Scalars['ID']['output']
  job?: Maybe<Scalars['String']['output']>
  known_for_department?: Maybe<Scalars['String']['output']>
  media_type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  order?: Maybe<Scalars['Int']['output']>
  original_language?: Maybe<Scalars['String']['output']>
  original_name?: Maybe<Scalars['String']['output']>
  original_title?: Maybe<Scalars['String']['output']>
  overview?: Maybe<Scalars['String']['output']>
  popularity?: Maybe<Scalars['Float']['output']>
  poster_path?: Maybe<Scalars['String']['output']>
  profile_path?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
}

export type Profiles = {
  __typename?: 'Profiles'
  profiles?: Maybe<Array<Maybe<Image>>>
}

export type Query = {
  __typename?: 'Query'
  discoverMedia?: Maybe<PaginatedMedia>
  getAnyTrendingToday?: Maybe<PaginatedMedia>
  getAnyTrendingWeek?: Maybe<PaginatedMedia>
  getAnybyQuery?: Maybe<PaginatedMedia>
  getMoviePopular?: Maybe<PaginatedMovie>
  getMovieTopRated?: Maybe<PaginatedMovie>
  getMovieTrendingToday?: Maybe<PaginatedMovie>
  getMovieTrendingWeek?: Maybe<PaginatedMovie>
  getMovieUpcoming?: Maybe<PaginatedMovie>
  getMoviebyId?: Maybe<SingleMovie>
  getMoviebyQuery?: Maybe<PaginatedMovie>
  getPeopleTrendingToday?: Maybe<PaginatedPeople>
  getPeopleTrendingWeek?: Maybe<PaginatedPeople>
  getTvAiringToday?: Maybe<PaginatedTv>
  getTvOnTheAir?: Maybe<PaginatedTv>
  getTvPopular?: Maybe<PaginatedTv>
  getTvTopRated?: Maybe<PaginatedTv>
  getTvTrendingToday?: Maybe<PaginatedTv>
  getTvTrendingWeek?: Maybe<PaginatedTv>
  getTvbyId?: Maybe<SingleTv>
  getTvbyQuery?: Maybe<PaginatedTv>
  getpeoplebyId?: Maybe<People>
  getpeoplebyQuery?: Maybe<PaginatedPeople>
}

export type QueryDiscoverMediaArgs = {
  dategte?: InputMaybe<Scalars['String']['input']>
  datelte?: InputMaybe<Scalars['String']['input']>
  genres?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  votesAvggte?: InputMaybe<Scalars['Float']['input']>
  votesAvglte?: InputMaybe<Scalars['Float']['input']>
  votesCountgte?: InputMaybe<Scalars['Int']['input']>
  votesCountlte?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetAnyTrendingTodayArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetAnyTrendingWeekArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetAnybyQueryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  query: Scalars['String']['input']
}

export type QueryGetMoviePopularArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetMovieTopRatedArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetMovieTrendingTodayArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetMovieTrendingWeekArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetMovieUpcomingArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetMoviebyIdArgs = {
  tmdbId: Scalars['ID']['input']
}

export type QueryGetMoviebyQueryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  query: Scalars['String']['input']
}

export type QueryGetPeopleTrendingTodayArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetPeopleTrendingWeekArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvAiringTodayArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvOnTheAirArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvPopularArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvTopRatedArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvTrendingTodayArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvTrendingWeekArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetTvbyIdArgs = {
  tmdbId: Scalars['ID']['input']
}

export type QueryGetTvbyQueryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  query: Scalars['String']['input']
}

export type QueryGetpeoplebyIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetpeoplebyQueryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  query: Scalars['String']['input']
}

export type Review = {
  __typename?: 'Review'
  author?: Maybe<Scalars['String']['output']>
  author_details?: Maybe<ReviewerDetails>
  content?: Maybe<Scalars['String']['output']>
  created_at?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  updated_at?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ReviewerDetails = {
  __typename?: 'ReviewerDetails'
  avatar_path?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  rating?: Maybe<Scalars['Float']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type Season = {
  __typename?: 'Season'
  episodes?: Maybe<Array<Maybe<Episode>>>
  image?: Maybe<SeasonImage>
  isReleased?: Maybe<Scalars['Boolean']['output']>
  season?: Maybe<Scalars['Int']['output']>
}

export type SeasonImage = {
  __typename?: 'SeasonImage'
  hd?: Maybe<Scalars['String']['output']>
  mobile?: Maybe<Scalars['String']['output']>
}

export type SingleMovie = {
  __typename?: 'SingleMovie'
  Images?: Maybe<Images>
  adult?: Maybe<Scalars['Boolean']['output']>
  backdrop_path?: Maybe<Scalars['String']['output']>
  belongs_to_collection?: Maybe<Collection>
  budget?: Maybe<Scalars['Int']['output']>
  casts?: Maybe<Array<Maybe<PeopleCredits>>>
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  homepage?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imdb_id?: Maybe<Scalars['String']['output']>
  media_type?: Maybe<Scalars['String']['output']>
  original_language?: Maybe<Scalars['String']['output']>
  original_title?: Maybe<Scalars['String']['output']>
  overview?: Maybe<Scalars['String']['output']>
  popularity?: Maybe<Scalars['Float']['output']>
  poster_path?: Maybe<Scalars['String']['output']>
  production_companies?: Maybe<Array<Maybe<Company>>>
  production_countries?: Maybe<Array<Maybe<Country>>>
  release_date?: Maybe<Scalars['String']['output']>
  revenue?: Maybe<Scalars['Int']['output']>
  reviews?: Maybe<Array<Maybe<Review>>>
  runtime?: Maybe<Scalars['Int']['output']>
  spoken_languages?: Maybe<Array<Maybe<Language>>>
  status?: Maybe<Scalars['String']['output']>
  tagline?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  video?: Maybe<Scalars['Boolean']['output']>
  videos?: Maybe<Video>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
}

export type SingleTv = {
  __typename?: 'SingleTV'
  Images?: Maybe<Images>
  adult?: Maybe<Scalars['Boolean']['output']>
  backdrop_path?: Maybe<Scalars['String']['output']>
  casts?: Maybe<Array<Maybe<PeopleCredits>>>
  created_by?: Maybe<Array<Maybe<CreatedBy>>>
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']['output']>>>
  first_air_date?: Maybe<Scalars['String']['output']>
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  homepage?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imdb_id?: Maybe<Scalars['String']['output']>
  in_production?: Maybe<Scalars['Boolean']['output']>
  languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  last_air_date?: Maybe<Scalars['String']['output']>
  last_episode_to_air?: Maybe<LastEpisodeToAir>
  media_type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  networks?: Maybe<Array<Maybe<Networks>>>
  next_episode_to_air?: Maybe<Scalars['String']['output']>
  number_of_episodes?: Maybe<Scalars['Int']['output']>
  number_of_seasons?: Maybe<Scalars['Int']['output']>
  origin_country?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  original_language?: Maybe<Scalars['String']['output']>
  original_name?: Maybe<Scalars['String']['output']>
  overview?: Maybe<Scalars['String']['output']>
  popularity?: Maybe<Scalars['Float']['output']>
  poster_path?: Maybe<Scalars['String']['output']>
  production_companies?: Maybe<Array<Maybe<Company>>>
  production_countries?: Maybe<Array<Maybe<Country>>>
  reviews?: Maybe<Array<Maybe<Review>>>
  spoken_languages?: Maybe<Array<Maybe<Language>>>
  status?: Maybe<Scalars['String']['output']>
  tagline?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  videos?: Maybe<Video>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
}

export type Tv = {
  __typename?: 'TV'
  adult?: Maybe<Scalars['Boolean']['output']>
  backdrop_path?: Maybe<Scalars['String']['output']>
  first_air_date?: Maybe<Scalars['String']['output']>
  genre_ids?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  id: Scalars['ID']['output']
  media_type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  origin_country?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  original_language?: Maybe<Scalars['String']['output']>
  original_name?: Maybe<Scalars['String']['output']>
  overview?: Maybe<Scalars['String']['output']>
  popularity?: Maybe<Scalars['Float']['output']>
  poster_path?: Maybe<Scalars['String']['output']>
  vote_average?: Maybe<Scalars['Float']['output']>
  vote_count?: Maybe<Scalars['Int']['output']>
}

export type Trailer = {
  __typename?: 'Trailer'
  id?: Maybe<Scalars['ID']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type Video = {
  __typename?: 'Video'
  results?: Maybe<Array<Maybe<VideoResults>>>
}

export type VideoResults = {
  __typename?: 'VideoResults'
  id?: Maybe<Scalars['String']['output']>
  iso_639_1?: Maybe<Scalars['String']['output']>
  iso_3166_1?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  official?: Maybe<Scalars['Boolean']['output']>
  published_at?: Maybe<Scalars['String']['output']>
  site?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Int']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type Combined_Credits = {
  __typename?: 'combined_credits'
  cast?: Maybe<Array<Maybe<PeopleCredits>>>
  crew?: Maybe<Array<Maybe<PeopleCredits>>>
}

export type DiscoverMediaQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']['input']>
  dategte?: InputMaybe<Scalars['String']['input']>
  datelte?: InputMaybe<Scalars['String']['input']>
  votesAvglte?: InputMaybe<Scalars['Float']['input']>
  votesAvggte?: InputMaybe<Scalars['Float']['input']>
  votesCountlte?: InputMaybe<Scalars['Int']['input']>
  votesCountgte?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Scalars['String']['input']>
  genres?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}>

export type DiscoverMediaQuery = {
  __typename?: 'Query'
  discoverMedia?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          adult?: boolean | null
          backdrop_path?: string | null
          id: string
          title?: string | null
          original_language?: string | null
          original_title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          popularity?: number | null
          release_date?: string | null
          video?: boolean | null
          vote_average?: number | null
          vote_count?: number | null
        }
      | {
          __typename?: 'People'
          adult?: boolean | null
          biography?: string | null
          id: string
          name?: string | null
          original_name?: string | null
          media_type?: string | null
          popularity?: number | null
          gender?: string | null
          known_for_department?: string | null
          profile_path?: string | null
          known_for?: Array<
            | {
                __typename?: 'Movie'
                adult?: boolean | null
                backdrop_path?: string | null
                id: string
                title?: string | null
                original_language?: string | null
                original_title?: string | null
                overview?: string | null
                poster_path?: string | null
                media_type?: string | null
                genre_ids?: Array<string | null> | null
                popularity?: number | null
                release_date?: string | null
                video?: boolean | null
                vote_average?: number | null
                vote_count?: number | null
              }
            | {
                __typename?: 'People'
                adult?: boolean | null
                biography?: string | null
                id: string
                name?: string | null
                original_name?: string | null
                media_type?: string | null
                popularity?: number | null
                gender?: string | null
                known_for_department?: string | null
                profile_path?: string | null
              }
            | {
                __typename?: 'TV'
                adult?: boolean | null
                backdrop_path?: string | null
                id: string
                name?: string | null
                original_language?: string | null
                original_name?: string | null
                overview?: string | null
                poster_path?: string | null
                media_type?: string | null
                genre_ids?: Array<string | null> | null
                popularity?: number | null
                first_air_date?: string | null
                vote_average?: number | null
                vote_count?: number | null
                origin_country?: Array<string | null> | null
              }
            | null
          > | null
        }
      | {
          __typename?: 'TV'
          adult?: boolean | null
          backdrop_path?: string | null
          id: string
          name?: string | null
          original_language?: string | null
          original_name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          popularity?: number | null
          first_air_date?: string | null
          vote_average?: number | null
          vote_count?: number | null
          origin_country?: Array<string | null> | null
        }
      | null
    > | null
  } | null
}

export type GetHomeDataQueryVariables = Exact<{ [key: string]: never }>

export type GetHomeDataQuery = {
  __typename?: 'Query'
  getAnyTrendingToday?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          backdrop_path?: string | null
          adult?: boolean | null
          id: string
          title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
          vote_count?: number | null
        }
      | { __typename?: 'People' }
      | {
          __typename?: 'TV'
          backdrop_path?: string | null
          adult?: boolean | null
          id: string
          name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
          vote_count?: number | null
        }
      | null
    > | null
  } | null
  getAnyTrendingWeek?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          backdrop_path?: string | null
          adult?: boolean | null
          id: string
          title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | { __typename?: 'People' }
      | {
          __typename?: 'TV'
          backdrop_path?: string | null
          adult?: boolean | null
          id: string
          name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | null
    > | null
  } | null
  getMovieTrendingWeek?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvTrendingWeek?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getPeopleTrendingWeek?: {
    __typename?: 'PaginatedPeople'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'People'
      adult?: boolean | null
      biography?: string | null
      id: string
      name?: string | null
      original_name?: string | null
      media_type?: string | null
      popularity?: number | null
      gender?: string | null
      known_for_department?: string | null
      profile_path?: string | null
    } | null> | null
  } | null
}

export type GetMovieDataQueryVariables = Exact<{ [key: string]: never }>

export type GetMovieDataQuery = {
  __typename?: 'Query'
  getMovieTrendingToday?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
      vote_count?: number | null
    } | null> | null
  } | null
  getMovieTrendingWeek?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getMoviePopular?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getMovieTopRated?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getMovieUpcoming?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      adult?: boolean | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
      release_date?: string | null
    } | null> | null
  } | null
}

export type GetMoviebyIdQueryVariables = Exact<{
  tmdbId: Scalars['ID']['input']
}>

export type GetMoviebyIdQuery = {
  __typename?: 'Query'
  getMoviebyId?: {
    __typename?: 'SingleMovie'
    adult?: boolean | null
    backdrop_path?: string | null
    budget?: number | null
    genres?: Array<string | null> | null
    homepage?: string | null
    id: string
    imdb_id?: string | null
    original_language?: string | null
    original_title?: string | null
    overview?: string | null
    popularity?: number | null
    poster_path?: string | null
    release_date?: string | null
    revenue?: number | null
    runtime?: number | null
    status?: string | null
    tagline?: string | null
    title?: string | null
    video?: boolean | null
    vote_average?: number | null
    vote_count?: number | null
    belongs_to_collection?: {
      __typename?: 'Collection'
      id?: string | null
      name?: string | null
      poster_path?: string | null
      backdrop_path?: string | null
    } | null
    production_companies?: Array<{
      __typename?: 'Company'
      id?: string | null
      logo_path?: string | null
      name?: string | null
      origin_country?: string | null
    } | null> | null
    production_countries?: Array<{
      __typename?: 'Country'
      iso_3166_1?: string | null
      name?: string | null
    } | null> | null
    spoken_languages?: Array<{
      __typename?: 'Language'
      iso_639_1?: string | null
      name?: string | null
    } | null> | null
    videos?: {
      __typename?: 'Video'
      results?: Array<{
        __typename?: 'VideoResults'
        iso_639_1?: string | null
        iso_3166_1?: string | null
        name?: string | null
        key?: string | null
        published_at?: string | null
        site?: string | null
        size?: number | null
        type?: string | null
        official?: boolean | null
        id?: string | null
      } | null> | null
    } | null
    casts?: Array<{
      __typename?: 'PeopleCredits'
      adult?: boolean | null
      id: string
      name?: string | null
      original_name?: string | null
      media_type?: string | null
      popularity?: number | null
      gender?: string | null
      known_for_department?: string | null
      profile_path?: string | null
      cast_id?: number | null
      character?: string | null
      credit_id?: string | null
      order?: number | null
    } | null> | null
    Images?: {
      __typename?: 'Images'
      logos?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
      posters?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
      backdrops?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
    } | null
    reviews?: Array<{
      __typename?: 'Review'
      author?: string | null
      content?: string | null
      created_at?: string | null
      id?: string | null
      updated_at?: string | null
      url?: string | null
      author_details?: {
        __typename?: 'ReviewerDetails'
        name?: string | null
        username?: string | null
        avatar_path?: string | null
        rating?: number | null
      } | null
    } | null> | null
  } | null
}

export type GetMoviesDataQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
}>

export type GetMoviesDataQuery = {
  __typename?: 'Query'
  getMovieTrendingWeek?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getMoviePopular?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getMovieTopRated?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getMovieUpcoming?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
      release_date?: string | null
    } | null> | null
  } | null
}

export type GetTrendingDataQueryVariables = Exact<{ [key: string]: never }>

export type GetTrendingDataQuery = {
  __typename?: 'Query'
  getAnyTrendingWeek?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          backdrop_path?: string | null
          id: string
          title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | { __typename?: 'People' }
      | {
          __typename?: 'TV'
          backdrop_path?: string | null
          id: string
          name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | null
    > | null
  } | null
  getAnyTrendingToday?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          backdrop_path?: string | null
          id: string
          title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
          vote_count?: number | null
        }
      | { __typename?: 'People' }
      | {
          __typename?: 'TV'
          backdrop_path?: string | null
          id: string
          name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
          vote_count?: number | null
        }
      | null
    > | null
  } | null
  getMovieTrendingWeek?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvTrendingWeek?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getPeopleTrendingWeek?: {
    __typename?: 'PaginatedPeople'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'People'
      adult?: boolean | null
      biography?: string | null
      id: string
      name?: string | null
      original_name?: string | null
      media_type?: string | null
      popularity?: number | null
      gender?: string | null
      known_for_department?: string | null
      profile_path?: string | null
    } | null> | null
  } | null
}

export type GetTrendingMediaDataQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
}>

export type GetTrendingMediaDataQuery = {
  __typename?: 'Query'
  getAnyTrendingWeek?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          backdrop_path?: string | null
          id: string
          title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | { __typename?: 'People' }
      | {
          __typename?: 'TV'
          backdrop_path?: string | null
          id: string
          name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | null
    > | null
  } | null
  getMovieTrendingWeek?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvTrendingWeek?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getPeopleTrendingWeek?: {
    __typename?: 'PaginatedPeople'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'People'
      adult?: boolean | null
      biography?: string | null
      id: string
      name?: string | null
      original_name?: string | null
      media_type?: string | null
      popularity?: number | null
      gender?: string | null
      known_for_department?: string | null
      profile_path?: string | null
    } | null> | null
  } | null
}

export type GetTvDataQueryVariables = Exact<{ [key: string]: never }>

export type GetTvDataQuery = {
  __typename?: 'Query'
  getTvTrendingToday?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
      vote_count?: number | null
    } | null> | null
  } | null
  getTvTrendingWeek?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvPopular?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvTopRated?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvAiringToday?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvOnTheAir?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
}

export type GetTvShowsDataQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
}>

export type GetTvShowsDataQuery = {
  __typename?: 'Query'
  getTvTrendingWeek?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvPopular?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvTopRated?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvAiringToday?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvOnTheAir?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
}

export type GetTvbyIdQueryVariables = Exact<{
  tmdbId: Scalars['ID']['input']
}>

export type GetTvbyIdQuery = {
  __typename?: 'Query'
  getTvbyId?: {
    __typename?: 'SingleTV'
    adult?: boolean | null
    backdrop_path?: string | null
    genres?: Array<string | null> | null
    id: string
    original_language?: string | null
    original_name?: string | null
    overview?: string | null
    poster_path?: string | null
    first_air_date?: string | null
    status?: string | null
    tagline?: string | null
    name?: string | null
    vote_average?: number | null
    vote_count?: number | null
    type?: string | null
    last_air_date?: string | null
    languages?: Array<string | null> | null
    number_of_seasons?: number | null
    number_of_episodes?: number | null
    spoken_languages?: Array<{
      __typename?: 'Language'
      iso_639_1?: string | null
      name?: string | null
    } | null> | null
    casts?: Array<{
      __typename?: 'PeopleCredits'
      adult?: boolean | null
      id: string
      name?: string | null
      original_name?: string | null
      media_type?: string | null
      popularity?: number | null
      gender?: string | null
      known_for_department?: string | null
      profile_path?: string | null
      cast_id?: number | null
      character?: string | null
      credit_id?: string | null
      order?: number | null
    } | null> | null
    Images?: {
      __typename?: 'Images'
      logos?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
      posters?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
      backdrops?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
    } | null
    reviews?: Array<{
      __typename?: 'Review'
      author?: string | null
      content?: string | null
      created_at?: string | null
      id?: string | null
      updated_at?: string | null
      url?: string | null
      author_details?: {
        __typename?: 'ReviewerDetails'
        name?: string | null
        username?: string | null
        avatar_path?: string | null
        rating?: number | null
      } | null
    } | null> | null
    last_episode_to_air?: {
      __typename?: 'LastEpisodeToAir'
      id?: number | null
      name?: string | null
      overview?: string | null
      vote_average?: number | null
      vote_count?: number | null
      air_date?: string | null
      episode_number?: number | null
      episode_type?: string | null
      production_code?: string | null
      runtime?: number | null
      season_number?: number | null
      show_id?: number | null
      still_path?: string | null
    } | null
    videos?: {
      __typename?: 'Video'
      results?: Array<{
        __typename?: 'VideoResults'
        iso_639_1?: string | null
        iso_3166_1?: string | null
        name?: string | null
        key?: string | null
        published_at?: string | null
        site?: string | null
        size?: number | null
        type?: string | null
        official?: boolean | null
        id?: string | null
      } | null> | null
    } | null
  } | null
}

export type GetbyQueryQueryVariables = Exact<{
  query: Scalars['String']['input']
  page?: InputMaybe<Scalars['Int']['input']>
}>

export type GetbyQueryQuery = {
  __typename?: 'Query'
  getAnybyQuery?: {
    __typename?: 'PaginatedMedia'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<
      | {
          __typename?: 'Movie'
          backdrop_path?: string | null
          id: string
          title?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | {
          __typename?: 'People'
          biography?: string | null
          id: string
          name?: string | null
          original_name?: string | null
          media_type?: string | null
          gender?: string | null
          profile_path?: string | null
          known_for_department?: string | null
        }
      | {
          __typename?: 'TV'
          backdrop_path?: string | null
          id: string
          name?: string | null
          overview?: string | null
          poster_path?: string | null
          media_type?: string | null
          genre_ids?: Array<string | null> | null
          vote_average?: number | null
        }
      | null
    > | null
  } | null
  getMoviebyQuery?: {
    __typename?: 'PaginatedMovie'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'Movie'
      backdrop_path?: string | null
      id: string
      title?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getTvbyQuery?: {
    __typename?: 'PaginatedTV'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'TV'
      backdrop_path?: string | null
      id: string
      name?: string | null
      overview?: string | null
      poster_path?: string | null
      media_type?: string | null
      genre_ids?: Array<string | null> | null
      vote_average?: number | null
    } | null> | null
  } | null
  getpeoplebyQuery?: {
    __typename?: 'PaginatedPeople'
    currentPage?: number | null
    hasNextPage?: boolean | null
    total_pages?: number | null
    total_results?: number | null
    results?: Array<{
      __typename?: 'People'
      biography?: string | null
      gender?: string | null
      id: string
      media_type?: string | null
      name?: string | null
      original_name?: string | null
      profile_path?: string | null
      known_for_department?: string | null
    } | null> | null
  } | null
}

export type GetpeoplebyIdQueryVariables = Exact<{
  Id: Scalars['ID']['input']
}>

export type GetpeoplebyIdQuery = {
  __typename?: 'Query'
  getpeoplebyId?: {
    __typename?: 'People'
    adult?: boolean | null
    biography?: string | null
    id: string
    name?: string | null
    original_name?: string | null
    popularity?: number | null
    gender?: string | null
    known_for_department?: string | null
    profile_path?: string | null
    birthday?: string | null
    deathday?: string | null
    place_of_birth?: string | null
    also_known_as?: Array<string | null> | null
    images?: {
      __typename?: 'Profiles'
      profiles?: Array<{
        __typename?: 'Image'
        file_path?: string | null
        aspect_ratio?: number | null
        width?: number | null
        vote_average?: number | null
        vote_count?: number | null
      } | null> | null
    } | null
    combined_credits?: {
      __typename?: 'combined_credits'
      cast?: Array<{
        __typename?: 'PeopleCredits'
        adult?: boolean | null
        backdrop_path?: string | null
        id: string
        name?: string | null
        title?: string | null
        original_language?: string | null
        original_title?: string | null
        overview?: string | null
        poster_path?: string | null
        original_name?: string | null
        media_type?: string | null
        popularity?: number | null
        gender?: string | null
        known_for_department?: string | null
        profile_path?: string | null
        character?: string | null
        credit_id?: string | null
        order?: number | null
        genres?: Array<string | null> | null
      } | null> | null
      crew?: Array<{
        __typename?: 'PeopleCredits'
        adult?: boolean | null
        id: string
        name?: string | null
        title?: string | null
        original_language?: string | null
        original_title?: string | null
        overview?: string | null
        backdrop_path?: string | null
        poster_path?: string | null
        media_type?: string | null
        popularity?: number | null
        gender?: string | null
        profile_path?: string | null
        credit_id?: string | null
        job?: string | null
        department?: string | null
        genres?: Array<string | null> | null
      } | null> | null
    } | null
  } | null
}

export const DiscoverMediaDocument = gql`
  query DiscoverMedia(
    $type: String
    $dategte: String
    $datelte: String
    $votesAvglte: Float
    $votesAvggte: Float
    $votesCountlte: Int
    $votesCountgte: Int
    $sort: String
    $genres: String
    $page: Int
  ) {
    discoverMedia(
      type: $type
      dategte: $dategte
      datelte: $datelte
      votesAvglte: $votesAvglte
      votesAvggte: $votesAvggte
      votesCountlte: $votesCountlte
      votesCountgte: $votesCountgte
      sort: $sort
      genres: $genres
      page: $page
    ) {
      currentPage
      hasNextPage
      results {
        ... on Movie {
          adult
          backdrop_path
          id
          title
          original_language
          original_title
          overview
          poster_path
          media_type
          genre_ids
          popularity
          release_date
          video
          vote_average
          vote_count
        }
        ... on TV {
          adult
          backdrop_path
          id
          name
          original_language
          original_name
          overview
          poster_path
          media_type
          genre_ids
          popularity
          first_air_date
          vote_average
          vote_count
          origin_country
        }
        ... on People {
          adult
          biography
          id
          name
          original_name
          media_type
          popularity
          gender
          known_for_department
          profile_path
          known_for {
            ... on Movie {
              adult
              backdrop_path
              id
              title
              original_language
              original_title
              overview
              poster_path
              media_type
              genre_ids
              popularity
              release_date
              video
              vote_average
              vote_count
            }
            ... on TV {
              adult
              backdrop_path
              id
              name
              original_language
              original_name
              overview
              poster_path
              media_type
              genre_ids
              popularity
              first_air_date
              vote_average
              vote_count
              origin_country
            }
            ... on People {
              adult
              biography
              id
              name
              original_name
              media_type
              popularity
              gender
              known_for_department
              profile_path
            }
          }
        }
      }
      total_pages
      total_results
    }
  }
`

/**
 * __useDiscoverMediaQuery__
 *
 * To run a query within a React component, call `useDiscoverMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscoverMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscoverMediaQuery({
 *   variables: {
 *      type: // value for 'type'
 *      dategte: // value for 'dategte'
 *      datelte: // value for 'datelte'
 *      votesAvglte: // value for 'votesAvglte'
 *      votesAvggte: // value for 'votesAvggte'
 *      votesCountlte: // value for 'votesCountlte'
 *      votesCountgte: // value for 'votesCountgte'
 *      sort: // value for 'sort'
 *      genres: // value for 'genres'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useDiscoverMediaQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DiscoverMediaQuery,
    DiscoverMediaQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DiscoverMediaQuery, DiscoverMediaQueryVariables>(
    DiscoverMediaDocument,
    options
  )
}
export function useDiscoverMediaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DiscoverMediaQuery,
    DiscoverMediaQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DiscoverMediaQuery, DiscoverMediaQueryVariables>(
    DiscoverMediaDocument,
    options
  )
}
export function useDiscoverMediaSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    DiscoverMediaQuery,
    DiscoverMediaQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    DiscoverMediaQuery,
    DiscoverMediaQueryVariables
  >(DiscoverMediaDocument, options)
}
export type DiscoverMediaQueryHookResult = ReturnType<
  typeof useDiscoverMediaQuery
>
export type DiscoverMediaLazyQueryHookResult = ReturnType<
  typeof useDiscoverMediaLazyQuery
>
export type DiscoverMediaSuspenseQueryHookResult = ReturnType<
  typeof useDiscoverMediaSuspenseQuery
>
export type DiscoverMediaQueryResult = Apollo.QueryResult<
  DiscoverMediaQuery,
  DiscoverMediaQueryVariables
>
export const GetHomeDataDocument = gql`
  query GetHomeData {
    getAnyTrendingToday {
      results {
        ... on Movie {
          backdrop_path
          adult
          id
          title
          overview
          poster_path
          media_type
          genre_ids
          vote_average
          vote_count
        }
        ... on TV {
          backdrop_path
          adult
          id
          name
          overview
          poster_path
          media_type
          genre_ids
          vote_average
          vote_count
        }
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getAnyTrendingWeek {
      results {
        ... on Movie {
          backdrop_path
          adult
          id
          title
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
        ... on TV {
          backdrop_path
          adult
          id
          name
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTrendingWeek {
      results {
        backdrop_path
        adult
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvTrendingWeek {
      results {
        backdrop_path
        adult
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getPeopleTrendingWeek {
      results {
        adult
        biography
        id
        name
        original_name
        media_type
        popularity
        gender
        known_for_department
        profile_path
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetHomeDataQuery__
 *
 * To run a query within a React component, call `useGetHomeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomeDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomeDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetHomeDataQuery,
    GetHomeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(
    GetHomeDataDocument,
    options
  )
}
export function useGetHomeDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetHomeDataQuery,
    GetHomeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(
    GetHomeDataDocument,
    options
  )
}
export function useGetHomeDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetHomeDataQuery,
    GetHomeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetHomeDataQuery, GetHomeDataQueryVariables>(
    GetHomeDataDocument,
    options
  )
}
export type GetHomeDataQueryHookResult = ReturnType<typeof useGetHomeDataQuery>
export type GetHomeDataLazyQueryHookResult = ReturnType<
  typeof useGetHomeDataLazyQuery
>
export type GetHomeDataSuspenseQueryHookResult = ReturnType<
  typeof useGetHomeDataSuspenseQuery
>
export type GetHomeDataQueryResult = Apollo.QueryResult<
  GetHomeDataQuery,
  GetHomeDataQueryVariables
>
export const GetMovieDataDocument = gql`
  query GetMovieData {
    getMovieTrendingToday {
      results {
        backdrop_path
        adult
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        vote_count
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTrendingWeek {
      results {
        backdrop_path
        adult
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMoviePopular {
      results {
        backdrop_path
        adult
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTopRated {
      results {
        backdrop_path
        adult
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieUpcoming {
      results {
        backdrop_path
        adult
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        release_date
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetMovieDataQuery__
 *
 * To run a query within a React component, call `useGetMovieDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMovieDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMovieDataQuery,
    GetMovieDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMovieDataQuery, GetMovieDataQueryVariables>(
    GetMovieDataDocument,
    options
  )
}
export function useGetMovieDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMovieDataQuery,
    GetMovieDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMovieDataQuery, GetMovieDataQueryVariables>(
    GetMovieDataDocument,
    options
  )
}
export function useGetMovieDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMovieDataQuery,
    GetMovieDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMovieDataQuery, GetMovieDataQueryVariables>(
    GetMovieDataDocument,
    options
  )
}
export type GetMovieDataQueryHookResult = ReturnType<
  typeof useGetMovieDataQuery
>
export type GetMovieDataLazyQueryHookResult = ReturnType<
  typeof useGetMovieDataLazyQuery
>
export type GetMovieDataSuspenseQueryHookResult = ReturnType<
  typeof useGetMovieDataSuspenseQuery
>
export type GetMovieDataQueryResult = Apollo.QueryResult<
  GetMovieDataQuery,
  GetMovieDataQueryVariables
>
export const GetMoviebyIdDocument = gql`
  query GetMoviebyId($tmdbId: ID!) {
    getMoviebyId(tmdbId: $tmdbId) {
      adult
      backdrop_path
      belongs_to_collection {
        id
        name
        poster_path
        backdrop_path
      }
      budget
      genres
      homepage
      id
      imdb_id
      original_language
      original_title
      overview
      popularity
      poster_path
      release_date
      revenue
      runtime
      status
      tagline
      title
      video
      vote_average
      vote_count
      production_companies {
        id
        logo_path
        name
        origin_country
      }
      production_countries {
        iso_3166_1
        name
      }
      spoken_languages {
        iso_639_1
        name
      }
      videos {
        results {
          iso_639_1
          iso_3166_1
          name
          key
          published_at
          site
          size
          type
          official
          id
        }
      }
      casts {
        adult
        id
        name
        original_name
        media_type
        popularity
        gender
        known_for_department
        profile_path
        cast_id
        character
        credit_id
        order
      }
      Images {
        logos {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
        posters {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
        backdrops {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
      }
      reviews {
        author
        content
        created_at
        id
        updated_at
        url
        author_details {
          name
          username
          avatar_path
          rating
        }
      }
    }
  }
`

/**
 * __useGetMoviebyIdQuery__
 *
 * To run a query within a React component, call `useGetMoviebyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviebyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviebyIdQuery({
 *   variables: {
 *      tmdbId: // value for 'tmdbId'
 *   },
 * });
 */
export function useGetMoviebyIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMoviebyIdQuery,
    GetMoviebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMoviebyIdQuery, GetMoviebyIdQueryVariables>(
    GetMoviebyIdDocument,
    options
  )
}
export function useGetMoviebyIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviebyIdQuery,
    GetMoviebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMoviebyIdQuery, GetMoviebyIdQueryVariables>(
    GetMoviebyIdDocument,
    options
  )
}
export function useGetMoviebyIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMoviebyIdQuery,
    GetMoviebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMoviebyIdQuery, GetMoviebyIdQueryVariables>(
    GetMoviebyIdDocument,
    options
  )
}
export type GetMoviebyIdQueryHookResult = ReturnType<
  typeof useGetMoviebyIdQuery
>
export type GetMoviebyIdLazyQueryHookResult = ReturnType<
  typeof useGetMoviebyIdLazyQuery
>
export type GetMoviebyIdSuspenseQueryHookResult = ReturnType<
  typeof useGetMoviebyIdSuspenseQuery
>
export type GetMoviebyIdQueryResult = Apollo.QueryResult<
  GetMoviebyIdQuery,
  GetMoviebyIdQueryVariables
>
export const GetMoviesDataDocument = gql`
  query GetMoviesData($page: Int) {
    getMovieTrendingWeek(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMoviePopular(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTopRated(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieUpcoming(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        release_date
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetMoviesDataQuery__
 *
 * To run a query within a React component, call `useGetMoviesDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesDataQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetMoviesDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMoviesDataQuery,
    GetMoviesDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMoviesDataQuery, GetMoviesDataQueryVariables>(
    GetMoviesDataDocument,
    options
  )
}
export function useGetMoviesDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMoviesDataQuery,
    GetMoviesDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMoviesDataQuery, GetMoviesDataQueryVariables>(
    GetMoviesDataDocument,
    options
  )
}
export function useGetMoviesDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMoviesDataQuery,
    GetMoviesDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetMoviesDataQuery,
    GetMoviesDataQueryVariables
  >(GetMoviesDataDocument, options)
}
export type GetMoviesDataQueryHookResult = ReturnType<
  typeof useGetMoviesDataQuery
>
export type GetMoviesDataLazyQueryHookResult = ReturnType<
  typeof useGetMoviesDataLazyQuery
>
export type GetMoviesDataSuspenseQueryHookResult = ReturnType<
  typeof useGetMoviesDataSuspenseQuery
>
export type GetMoviesDataQueryResult = Apollo.QueryResult<
  GetMoviesDataQuery,
  GetMoviesDataQueryVariables
>
export const GetTrendingDataDocument = gql`
  query GetTrendingData {
    getAnyTrendingWeek {
      results {
        ... on Movie {
          backdrop_path
          id
          title
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
        ... on TV {
          backdrop_path
          id
          name
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getAnyTrendingToday {
      results {
        ... on Movie {
          backdrop_path
          id
          title
          overview
          poster_path
          media_type
          genre_ids
          vote_average
          vote_count
        }
        ... on TV {
          backdrop_path
          id
          name
          overview
          poster_path
          media_type
          genre_ids
          vote_average
          vote_count
        }
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTrendingWeek {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvTrendingWeek {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getPeopleTrendingWeek {
      results {
        adult
        biography
        id
        name
        original_name
        media_type
        popularity
        gender
        known_for_department
        profile_path
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetTrendingDataQuery__
 *
 * To run a query within a React component, call `useGetTrendingDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrendingDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTrendingDataQuery,
    GetTrendingDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTrendingDataQuery, GetTrendingDataQueryVariables>(
    GetTrendingDataDocument,
    options
  )
}
export function useGetTrendingDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTrendingDataQuery,
    GetTrendingDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetTrendingDataQuery,
    GetTrendingDataQueryVariables
  >(GetTrendingDataDocument, options)
}
export function useGetTrendingDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTrendingDataQuery,
    GetTrendingDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetTrendingDataQuery,
    GetTrendingDataQueryVariables
  >(GetTrendingDataDocument, options)
}
export type GetTrendingDataQueryHookResult = ReturnType<
  typeof useGetTrendingDataQuery
>
export type GetTrendingDataLazyQueryHookResult = ReturnType<
  typeof useGetTrendingDataLazyQuery
>
export type GetTrendingDataSuspenseQueryHookResult = ReturnType<
  typeof useGetTrendingDataSuspenseQuery
>
export type GetTrendingDataQueryResult = Apollo.QueryResult<
  GetTrendingDataQuery,
  GetTrendingDataQueryVariables
>
export const GetTrendingMediaDataDocument = gql`
  query GetTrendingMediaData($page: Int) {
    getAnyTrendingWeek(page: $page) {
      results {
        ... on Movie {
          backdrop_path
          id
          title
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
        ... on TV {
          backdrop_path
          id
          name
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMovieTrendingWeek(page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvTrendingWeek(page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getPeopleTrendingWeek(page: $page) {
      results {
        adult
        biography
        id
        name
        original_name
        media_type
        popularity
        gender
        known_for_department
        profile_path
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetTrendingMediaDataQuery__
 *
 * To run a query within a React component, call `useGetTrendingMediaDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingMediaDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingMediaDataQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetTrendingMediaDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTrendingMediaDataQuery,
    GetTrendingMediaDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetTrendingMediaDataQuery,
    GetTrendingMediaDataQueryVariables
  >(GetTrendingMediaDataDocument, options)
}
export function useGetTrendingMediaDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTrendingMediaDataQuery,
    GetTrendingMediaDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetTrendingMediaDataQuery,
    GetTrendingMediaDataQueryVariables
  >(GetTrendingMediaDataDocument, options)
}
export function useGetTrendingMediaDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTrendingMediaDataQuery,
    GetTrendingMediaDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetTrendingMediaDataQuery,
    GetTrendingMediaDataQueryVariables
  >(GetTrendingMediaDataDocument, options)
}
export type GetTrendingMediaDataQueryHookResult = ReturnType<
  typeof useGetTrendingMediaDataQuery
>
export type GetTrendingMediaDataLazyQueryHookResult = ReturnType<
  typeof useGetTrendingMediaDataLazyQuery
>
export type GetTrendingMediaDataSuspenseQueryHookResult = ReturnType<
  typeof useGetTrendingMediaDataSuspenseQuery
>
export type GetTrendingMediaDataQueryResult = Apollo.QueryResult<
  GetTrendingMediaDataQuery,
  GetTrendingMediaDataQueryVariables
>
export const GetTvDataDocument = gql`
  query GetTvData {
    getTvTrendingToday {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
        vote_count
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvTrendingWeek {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvPopular {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvTopRated {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvAiringToday {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvOnTheAir {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetTvDataQuery__
 *
 * To run a query within a React component, call `useGetTvDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTvDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTvDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTvDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTvDataQuery, GetTvDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTvDataQuery, GetTvDataQueryVariables>(
    GetTvDataDocument,
    options
  )
}
export function useGetTvDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTvDataQuery,
    GetTvDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTvDataQuery, GetTvDataQueryVariables>(
    GetTvDataDocument,
    options
  )
}
export function useGetTvDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTvDataQuery,
    GetTvDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetTvDataQuery, GetTvDataQueryVariables>(
    GetTvDataDocument,
    options
  )
}
export type GetTvDataQueryHookResult = ReturnType<typeof useGetTvDataQuery>
export type GetTvDataLazyQueryHookResult = ReturnType<
  typeof useGetTvDataLazyQuery
>
export type GetTvDataSuspenseQueryHookResult = ReturnType<
  typeof useGetTvDataSuspenseQuery
>
export type GetTvDataQueryResult = Apollo.QueryResult<
  GetTvDataQuery,
  GetTvDataQueryVariables
>
export const GetTvShowsDataDocument = gql`
  query GetTvShowsData($page: Int) {
    getTvTrendingWeek(page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvPopular(page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvTopRated(page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvAiringToday(page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvOnTheAir(page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetTvShowsDataQuery__
 *
 * To run a query within a React component, call `useGetTvShowsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTvShowsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTvShowsDataQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetTvShowsDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTvShowsDataQuery,
    GetTvShowsDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTvShowsDataQuery, GetTvShowsDataQueryVariables>(
    GetTvShowsDataDocument,
    options
  )
}
export function useGetTvShowsDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTvShowsDataQuery,
    GetTvShowsDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTvShowsDataQuery, GetTvShowsDataQueryVariables>(
    GetTvShowsDataDocument,
    options
  )
}
export function useGetTvShowsDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTvShowsDataQuery,
    GetTvShowsDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetTvShowsDataQuery,
    GetTvShowsDataQueryVariables
  >(GetTvShowsDataDocument, options)
}
export type GetTvShowsDataQueryHookResult = ReturnType<
  typeof useGetTvShowsDataQuery
>
export type GetTvShowsDataLazyQueryHookResult = ReturnType<
  typeof useGetTvShowsDataLazyQuery
>
export type GetTvShowsDataSuspenseQueryHookResult = ReturnType<
  typeof useGetTvShowsDataSuspenseQuery
>
export type GetTvShowsDataQueryResult = Apollo.QueryResult<
  GetTvShowsDataQuery,
  GetTvShowsDataQueryVariables
>
export const GetTvbyIdDocument = gql`
  query GetTvbyId($tmdbId: ID!) {
    getTvbyId(tmdbId: $tmdbId) {
      adult
      backdrop_path
      genres
      id
      original_language
      original_name
      overview
      poster_path
      first_air_date
      status
      tagline
      name
      vote_average
      vote_count
      spoken_languages {
        iso_639_1
        name
      }
      casts {
        adult
        id
        name
        original_name
        media_type
        popularity
        gender
        known_for_department
        profile_path
        cast_id
        character
        credit_id
        order
      }
      Images {
        logos {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
        posters {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
        backdrops {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
      }
      reviews {
        author
        content
        created_at
        id
        updated_at
        url
        author_details {
          name
          username
          avatar_path
          rating
        }
      }
      type
      seasons {
        season
        image {
          mobile
          hd
        }
        episodes {
          id
          title
          episode
          Season
          releaseDate
          description
          url
          img {
            mobile
            hd
          }
        }
        isReleased
      }
      last_air_date
      last_episode_to_air {
        id
        name
        overview
        vote_average
        vote_count
        air_date
        episode_number
        episode_type
        production_code
        runtime
        season_number
        show_id
        still_path
      }
      languages
      number_of_seasons
      number_of_episodes
      videos {
        results {
          iso_639_1
          iso_3166_1
          name
          key
          published_at
          site
          size
          type
          official
          id
        }
      }
    }
  }
`

/**
 * __useGetTvbyIdQuery__
 *
 * To run a query within a React component, call `useGetTvbyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTvbyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTvbyIdQuery({
 *   variables: {
 *      tmdbId: // value for 'tmdbId'
 *   },
 * });
 */
export function useGetTvbyIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetTvbyIdQuery, GetTvbyIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTvbyIdQuery, GetTvbyIdQueryVariables>(
    GetTvbyIdDocument,
    options
  )
}
export function useGetTvbyIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTvbyIdQuery,
    GetTvbyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTvbyIdQuery, GetTvbyIdQueryVariables>(
    GetTvbyIdDocument,
    options
  )
}
export function useGetTvbyIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTvbyIdQuery,
    GetTvbyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetTvbyIdQuery, GetTvbyIdQueryVariables>(
    GetTvbyIdDocument,
    options
  )
}
export type GetTvbyIdQueryHookResult = ReturnType<typeof useGetTvbyIdQuery>
export type GetTvbyIdLazyQueryHookResult = ReturnType<
  typeof useGetTvbyIdLazyQuery
>
export type GetTvbyIdSuspenseQueryHookResult = ReturnType<
  typeof useGetTvbyIdSuspenseQuery
>
export type GetTvbyIdQueryResult = Apollo.QueryResult<
  GetTvbyIdQuery,
  GetTvbyIdQueryVariables
>
export const GetbyQueryDocument = gql`
  query GetbyQuery($query: String!, $page: Int) {
    getAnybyQuery(query: $query, page: $page) {
      results {
        ... on Movie {
          backdrop_path
          id
          title
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
        ... on TV {
          backdrop_path
          id
          name
          overview
          poster_path
          media_type
          genre_ids
          vote_average
        }
        ... on People {
          biography
          id
          name
          original_name
          media_type
          gender
          profile_path
          known_for_department
        }
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getMoviebyQuery(query: $query, page: $page) {
      results {
        backdrop_path
        id
        title
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getTvbyQuery(query: $query, page: $page) {
      results {
        backdrop_path
        id
        name
        overview
        poster_path
        media_type
        genre_ids
        vote_average
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
    getpeoplebyQuery(query: $query, page: $page) {
      results {
        biography
        gender
        id
        media_type
        name
        original_name
        profile_path
        known_for_department
      }
      currentPage
      hasNextPage
      total_pages
      total_results
    }
  }
`

/**
 * __useGetbyQueryQuery__
 *
 * To run a query within a React component, call `useGetbyQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetbyQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetbyQueryQuery({
 *   variables: {
 *      query: // value for 'query'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetbyQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetbyQueryQuery,
    GetbyQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetbyQueryQuery, GetbyQueryQueryVariables>(
    GetbyQueryDocument,
    options
  )
}
export function useGetbyQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetbyQueryQuery,
    GetbyQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetbyQueryQuery, GetbyQueryQueryVariables>(
    GetbyQueryDocument,
    options
  )
}
export function useGetbyQuerySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetbyQueryQuery,
    GetbyQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetbyQueryQuery, GetbyQueryQueryVariables>(
    GetbyQueryDocument,
    options
  )
}
export type GetbyQueryQueryHookResult = ReturnType<typeof useGetbyQueryQuery>
export type GetbyQueryLazyQueryHookResult = ReturnType<
  typeof useGetbyQueryLazyQuery
>
export type GetbyQuerySuspenseQueryHookResult = ReturnType<
  typeof useGetbyQuerySuspenseQuery
>
export type GetbyQueryQueryResult = Apollo.QueryResult<
  GetbyQueryQuery,
  GetbyQueryQueryVariables
>
export const GetpeoplebyIdDocument = gql`
  query GetpeoplebyId($Id: ID!) {
    getpeoplebyId(id: $Id) {
      adult
      biography
      id
      name
      original_name
      popularity
      gender
      known_for_department
      profile_path
      birthday
      deathday
      place_of_birth
      also_known_as
      images {
        profiles {
          file_path
          aspect_ratio
          width
          vote_average
          vote_count
        }
      }
      combined_credits {
        cast {
          adult
          backdrop_path
          id
          name
          title
          original_language
          original_title
          overview
          poster_path
          original_name
          media_type
          popularity
          gender
          known_for_department
          profile_path
          character
          credit_id
          order
          genres
        }
        crew {
          adult
          id
          name
          title
          original_language
          original_title
          overview
          backdrop_path
          poster_path
          media_type
          popularity
          gender
          profile_path
          credit_id
          job
          department
          genres
        }
      }
    }
  }
`

/**
 * __useGetpeoplebyIdQuery__
 *
 * To run a query within a React component, call `useGetpeoplebyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetpeoplebyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetpeoplebyIdQuery({
 *   variables: {
 *      Id: // value for 'Id'
 *   },
 * });
 */
export function useGetpeoplebyIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetpeoplebyIdQuery,
    GetpeoplebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetpeoplebyIdQuery, GetpeoplebyIdQueryVariables>(
    GetpeoplebyIdDocument,
    options
  )
}
export function useGetpeoplebyIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetpeoplebyIdQuery,
    GetpeoplebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetpeoplebyIdQuery, GetpeoplebyIdQueryVariables>(
    GetpeoplebyIdDocument,
    options
  )
}
export function useGetpeoplebyIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetpeoplebyIdQuery,
    GetpeoplebyIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetpeoplebyIdQuery,
    GetpeoplebyIdQueryVariables
  >(GetpeoplebyIdDocument, options)
}
export type GetpeoplebyIdQueryHookResult = ReturnType<
  typeof useGetpeoplebyIdQuery
>
export type GetpeoplebyIdLazyQueryHookResult = ReturnType<
  typeof useGetpeoplebyIdLazyQuery
>
export type GetpeoplebyIdSuspenseQueryHookResult = ReturnType<
  typeof useGetpeoplebyIdSuspenseQuery
>
export type GetpeoplebyIdQueryResult = Apollo.QueryResult<
  GetpeoplebyIdQuery,
  GetpeoplebyIdQueryVariables
>
