interface mediaData {
  backdrop_path: string
  name: string
  title: string
  vote_average: number
  vote_count: number
  adult: boolean
  genre_ids: string[]
  overview: string
  id: string
  poster_path: string
  release_date: string
  first_air_date: string
  media_type: string
  rating: number
  image: string
}
interface mediaPeopleData extends mediaData {
  biography: string
  original_name: string
  popularity: number
  gender: string
  known_for_department: string
  profile_path: string
  character: string
  birthday: string
  deathday: string
  place_of_birth: string
  also_known_as: [string]
}
interface singleMediaDataType extends mediaData {
  casts: mediaPeopleData[]
  genres: string[]
  original_language?: string
  reviews: {
    author: string
    content: string
    author_details: {
      author: string
      username: string
      avatar_path: string
      rating: number
    }
  }[]
  Images: {
    logos: {
      file_path: string
      aspect_ratio: number
      width: number
      vote_average: number
      vote_count: number
    }[]
    posters: {
      file_path: string
      aspect_ratio: number
      width: number
      vote_average: number
      vote_count: number
    }[]
    backdrops: {
      file_path: string
      aspect_ratio: number
      width: number
      vote_average: number
      vote_count: number
    }[]
  }
  videos: {
    results: {
      id: string
      official: boolean
      iso_639_1: string
      iso_3166_1: string
      key: string
      name: string
      site: string
      size: number
      type: string
      published_at: string
    }[]
  }
  status: string
  tagline: string
  number_of_episodes: number
  number_of_seasons: number
  runtime: number
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
  }[]
}

interface iptvDataType {
  url: string
  inf: {
    // duration: string
    title: string
    // tvgId: string
    tvgLogo: string
    groupTitle: string
  }
}

interface paginatedIptvDataType {
  results: iptvDataType[]
  totalPages: number
  totalResults: number
}

export type {
  mediaData,
  mediaPeopleData,
  singleMediaDataType,
  iptvDataType,
  paginatedIptvDataType,
}
