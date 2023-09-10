import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { DetailResult, RecordTypes, SearchResult } from './types'

const API_KEY = 'a018255f'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://www.omdbapi.com/',
  }),
  endpoints: builder => ({
    getMovies: builder.query<
      SearchResult,
      { search?: string; page?: number; year?: string; type?: RecordTypes }
    >({
      query: ({ page, search, year, type }) =>
        `?apikey=${API_KEY}${search ? `&s=${search}` : ''}${
          year ? `&y=${year}` : ''
        }${type ? `&type=${type}` : ''}&page=${page ?? 1}`,
    }),
    getMovie: builder.query<DetailResult, string>({
      query: id => `?apikey=${API_KEY}&i=${id}&plot=short`,
    }),
  }),
})

export const { useGetMoviesQuery, useGetMovieQuery } = moviesApi
