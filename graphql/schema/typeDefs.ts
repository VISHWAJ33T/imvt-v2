export const typeDefs = `
type Collection {
  id: ID
  name: String
  poster_path: String
  backdrop_path: String
}
type Company {
  id: ID
  name: String
  logo_path: String
  origin_country: String
}
type Country {
  iso_3166_1: String
  name: String
}
type Language {
  iso_639_1: String
  name: String
}
type VideoResults {
  iso_639_1: String
  iso_3166_1: String
  name: String
  key: String
  published_at: String
  site: String
  size: Int
  type: String
  official: Boolean
  id: String
}
type Video {
  results: [VideoResults]
}
type Image {
  file_path: String
  aspect_ratio: Float
  width: Int
  vote_average: Float
  vote_count: Int
}
type Profiles {
  profiles: [Image]
}
type Images {
  id: ID
  backdrops: [Image]
  posters: [Image]
  logos: [Image]
}
type MediaRecommendations {
  id: ID
  title: String
  image: String
  type: String
  rating: Float
  releaseDate: String
}
type ReviewerDetails {
  name: String
  username: String
  avatar_path: String
  rating: Float
}
type Review {
  id: String
  url: String
  author: String
  author_details: ReviewerDetails
  content: String
  created_at: String
  updated_at: String
}
type Networks {
  id: Int
  logo_path: String
  name: String
  origin_country: String
}
type LastEpisodeToAir {
  id: Int
  name: String
  overview: String
  vote_average: Float
  vote_count: Int
  air_date: String
  episode_number: Float
  episode_type: String
  production_code: String
  runtime: Int
  season_number: Int
  show_id: Int
  still_path: String
}
type CreatedBy {
  id: Int
  credit_id: String
  name: String
  gender: Int
  profile_path: String
}
type SeasonImage {
  mobile: String
  hd: String
}
type Episode {
  id: ID
  title: String
  episode: Float
  Season: Int
  releaseDate: String
  description: String
  url: String
  img: SeasonImage
}
type Season {
  season: Int
  image: SeasonImage
  episodes: [Episode]
  isReleased: Boolean
}
type Trailer {
  id: ID
  url: String
}
type combined_credits {
  cast: [PeopleCredits]
  crew: [PeopleCredits]
}
type People {
  id: ID!
  adult: Boolean
  name: String
  original_name: String
  also_known_as: [String]
  gender: String
  birthday: String
  deathday: String
  place_of_birth: String
  known_for_department: String
  biography: String
  profile_path: String
  images: Profiles
  media_type: String
  known_for: [Media]
  combined_credits: combined_credits
  popularity: Float
}

type Movie {
  title: String
  original_title: String
  release_date: String
  video: Boolean
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genre_ids: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
}

type TV {
  name: String
  original_name: String
  first_air_date: String
  origin_country: [String]
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genre_ids: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
}
type AnimeTitle{
  romaji: String
  english: String
  native: String
  userPreferred: String
}
type Anime{
  id: ID!
  malId:ID
  title: AnimeTitle
  status: String
  image:String
  cover: String
  popularity: Int
  description: String
  rating: Float
  genres: [String]
  color: String
  totalEpisodes: Float
  episodes:Float
  currentEpisodeCount: Float
  type: String
  releaseDate: String
}

type SingleMovie {
  title: String
  original_title: String
  release_date: String
  video: Boolean
  belongs_to_collection: Collection
  budget: Int
  revenue: Int
  runtime: Int
  tagline: String
  homepage: String
  casts: [PeopleCredits]
  videos: Video
  Images: Images
  reviews: [Review]
  spoken_languages: [Language]
  status: String
  production_companies: [Company]
  production_countries: [Country]
  imdb_id: String
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genres: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
}

type SingleTV {
  name: String
  original_name: String
  first_air_date: String
  origin_country: [String]
  seasons: [Season]
  type: String
  in_production: Boolean
  last_air_date: String
  next_episode_to_air: String
  networks: [Networks]
  last_episode_to_air: LastEpisodeToAir
  languages: [String]
  episode_run_time: [Int]
  created_by: [CreatedBy]
  number_of_seasons: Float
  number_of_episodes: Float
  tagline: String
  homepage: String
  casts: [PeopleCredits]
  videos: Video
  Images: Images
  reviews: [Review]
  spoken_languages: [Language]
  status: String
  production_companies: [Company]
  production_countries: [Country]
  imdb_id: String
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genres: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
}
type AnimeTrailer{
    id: String,
    site: String,
    thumbnail: String
}
type AnimeDate{
    year: Int,
    month: Int,
    day: Int
}
type AnimeRecommendations{
  id: ID!
  title: AnimeTitle
  status: String
  episodes:Float
  image:String
  cover: String
  rating: Float
  type: String
}
type AnimeRelations{
    id: Int,
    relationType: String,
    title: AnimeTitle,
    status: String,
    episodes: Float,
    image: String,
    color: String,
    type: String,
    cover: String,
    rating: Int,
}
type AnimeEpisodes{
    id: String,
    title: String,
    image: String,
    number: Float,
    airDate: String,
    createdAt: String
    description: String
    url: String
}
type AnimeCharacterName{
  first: String,
  last: String
  full: String
  native: String
  userPreferred: String
}
type AnimeVoiceActors{
  id: String,
  language: String,
  name: AnimeCharacterName
  image: String,
}
type AnimeCharacter{
  id: String,
  role: String,
  name: AnimeCharacterName,
  image: String,
  voiceActors: [AnimeVoiceActors]
}
type SingleAnime{
  id: ID!
  malId:ID
  title: AnimeTitle
  synonyms: [String]
  status: String
  image:String
  cover: String
  popularity: Int
  isAdult: Boolean
  isLicensed: Boolean
  countryOfOrigin: String
  description: String
  rating: Float
  genres: [String]
  color: String
  totalEpisodes: Int
  currentEpisode: Int
  duration: Float
  type: String
  releaseDate: String
  trailer: AnimeTrailer,
  startDate: AnimeDate
  endDate: AnimeDate
  season: String,
  subOrDub: String,
  studios: [String],
  recommendations: [AnimeRecommendations]
  characters: [AnimeCharacter]
  relations: [AnimeRelations]
  episodes: [AnimeEpisodes]
  zoroEpisodes: [AnimeEpisodes]
}

union Media = Movie | TV | People

type PeopleCredits {
  name: String
  title: String
  original_title: String
  original_name: String
  gender: String
  known_for_department: String
  profile_path: String
  cast_id: Int
  character: String
  credit_id: String
  job: String
  order: Int
  department: String
  id: ID!
  adult: Boolean
  overview: String
  poster_path: String
  backdrop_path: String
  original_language: String
  media_type: String
  genres: [String]
  popularity: Float
  vote_average: Float
  vote_count: Int
}


type PaginatedMedia {
  results: [Media]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type PaginatedMovie {
  results: [Movie]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type PaginatedTV {
  results: [TV]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type PaginatedAnime {
  results: [Anime]
  currentPage: Int
  hasNextPage: Boolean
}

type PaginatedPeople {
  results: [People]
  hasNextPage: Boolean
  currentPage: Int
  total_pages: Int
  total_results: Int
}

type IPTVResponse {
  currentPage: Int
  totalPages: Int
  hasNextPage: Boolean
  totalResults: Int
  results: [Segment]
}

type Segment {
  url: String
  inf: SegmentInfo
}

type SegmentInfo {
  duration: String
  title: String
  tvgId: String
  tvgLogo: String
  groupTitle: String 
}

type MediaPlayerData {
  image: String
  release_date: String
  description: String
  cover: String
  id: String
  totalSeason: Int
  totalEpisode: Int
  seasons: [Season]
}

type MediaPlayerStreamingData {
  sources: [Source]
  subtitles: [Subtitle]
}
type AnimePlayerTimeStamps {
  start: Int
  end: Int
}

type AnimePlayerStreamingData {
  headers: headers
  sources: [Source]
  subtitles: [Subtitle]
  intro: AnimePlayerTimeStamps
  outro: AnimePlayerTimeStamps
  download: String
}

type headers{
  Referer: String
}

type Source {
  url: String
  quality: String
}

type Subtitle {
  url: String
  lang: String
}

type User {
  id: ID!
  email: String!
  name: String
  profile_photo: String
  role:String
  watchlist:[watchlistItem]
}

type watchlistItem {
  id: ID
  userId: ID
  mediaType: String
  mediaId:String
  watchListType: String
}
enum watchListType {
  watching
  on_hold
  plan_to_watch
  dropped
  completed
}

type Mutation {
  addWatchlistItem(userId:String,mediaId: ID, mediaType: String, watchListType: watchListType): watchlistItem
  deleteWatchlistItem(userId:String,itemId: ID): Boolean
  updateWatchlistItem(userId:String,itemId: ID, watchListType: watchListType): watchlistItem
  deleteUser(userId:String): Boolean
  updateUser(userId:String,name: String, profile_photo: String): User
}

type Query {
  getUser(userId:String): User
  mediaPlayerData(id: ID!, type: String!): MediaPlayerData
  mediaPlayerStreamingData(episodeId: ID!, streamingId: ID!): [MediaPlayerStreamingData]
  animePlayerStreamingData(anilistId:ID, zoroId:ID): [AnimePlayerStreamingData]
  iptvCountry(search: String, group: String, page: Int, pageSize: Int): IPTVResponse
  iptvCategory(search: String, group: String, page: Int, pageSize: Int): IPTVResponse
  iptvCountries: [String]
  iptvCategories: [String]
  discoverMedia(
    type: String
    dategte: String
    datelte: String
    votesAvglte: Float
    votesAvggte: Float
    votesCountlte: Int
    votesCountgte: Int
    sort: String
    genres: String
    page: Int
  ): PaginatedMedia
  getAnyTrendingToday(page: Int): PaginatedMedia
  getAnyTrendingWeek(page: Int): PaginatedMedia
  getAnimebyId(id: ID!): SingleAnime
  getAnimebyQuery(query: String!, page: Int): PaginatedAnime
  getAnybyQuery(query: String!, page: Int): PaginatedMedia
  getMoviebyId(tmdbId: ID!): SingleMovie
  getMoviebyQuery(query: String!, page: Int): PaginatedMovie
  getMovieTrendingToday(page: Int): PaginatedMovie
  getMovieTrendingWeek(page: Int): PaginatedMovie
  getMoviePopular(page: Int): PaginatedMovie
  getMovieUpcoming(page: Int): PaginatedMovie
  getMovieTopRated(page: Int): PaginatedMovie
  getTvbyId(tmdbId: ID!): SingleTV
  getTvbyQuery(query: String!, page: Int): PaginatedTV
  getTvTrendingToday(page: Int): PaginatedTV
  getTvTrendingWeek(page: Int): PaginatedTV
  getTvAiringToday(page: Int): PaginatedTV
  getTvOnTheAir(page: Int): PaginatedTV
  getTvPopular(page: Int): PaginatedTV
  getTvTopRated(page: Int): PaginatedTV
  getPeopleTrendingToday(page: Int): PaginatedPeople
  getPeopleTrendingWeek(page: Int): PaginatedPeople
  getpeoplebyQuery(query: String!, page: Int): PaginatedPeople
  getpeoplebyId(id: ID!): People
}
  `
