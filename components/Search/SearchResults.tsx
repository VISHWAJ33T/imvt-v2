import React, { useState, useEffect } from "react";
import MediaGrid from "@/components/Common/MediaGrid";
import PaginationComponent from "@/components/Common/PaginationComponent";
import { gql, useQuery } from "@apollo/client";
const search = gql`
query GetbyQuery(
  $query: String!
  $page: Int
) {
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
`;
const SearchResults = ({ query, searchType, page, setPage }: { query: string, searchType: string, page: number, setPage: (page: number) => void }) => {
    const { data, loading } = useQuery(search, {
        variables: { query, page },
    });
    const [mediaData, setMediaData] = useState({
        results: [],
        hasNextPage: false,
        total_results: 0,
        total_pages: 0,
        currentPage: 0
    });
    useEffect(() => {
        if (searchType === "any") {
            setMediaData(data?.getAnybyQuery)
        } else if (searchType === "movie") {
            setMediaData(data?.getMoviebyQuery)
        } else if (searchType === "tv") {
            setMediaData(data?.getTvbyQuery)
        } else if (searchType === "people") {
            setMediaData(data?.getpeoplebyQuery)
        }
    }, [data, query, searchType, page])
    return (
        <>
            <div className="w-full max-h-[100dvh] flex flex-col gap-y-3">
                {query && <h1 className="text-white text-start font-semibold text-[1rem]">{mediaData?.total_results} results found for {query}</h1>}
                <div className="overflow-scroll h-full pb-[100px] sm:pb-[30px]">
                    <MediaGrid mediaData={mediaData} loading={loading} />
                    <PaginationComponent mediaData={mediaData} page={page} setPage={setPage} />
                </div>
            </div>
        </>
    )
}

export default SearchResults