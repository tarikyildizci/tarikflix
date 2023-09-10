import './MovieList.scss'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useEffect } from 'react'
import { useGetMoviesQuery } from '@/api/movies'
import { SearchResult } from '@/api/types'
import { ListItem, ListPagination, ListSearchFilter } from '@/components'
import useFilters from '@/util/useFilters'

const SKELETON_ARRAY = Array(10).fill(undefined)

export const MovieList: React.FC = () => {
  const { search, page, year, type, changeFilter } = useFilters()
  const { data, isLoading, isFetching, isError } = useGetMoviesQuery(
    search && search.length > 3
      ? {
          search,
          page,
          year,
          type,
        }
      : skipToken
  )

  useEffect(() => {
    if (!search) {
      changeFilter('search', 'Pokemon')
    }
  }, [])

  return (
    <div className="movie-list">
      <ListSearchFilter />
      <Content
        isLoading={isLoading || isFetching}
        isError={isError}
        data={data}
      />
      <ListPagination
        isLoading={isLoading || isFetching}
        totalCount={
          data && data.Response === 'True' ? +data.totalResults : undefined
        }
      />
    </div>
  )
}

const Content: React.FC<{
  isLoading?: boolean
  isError?: boolean
  data?: SearchResult
}> = ({ data, isError, isLoading }) => {
  const { search, changeFilter } = useFilters()

  if (!search || search.length < 4) {
    return (
      <div className="empty-error-state">
        Please enter search text longer than 3 letters.
        <p
          style={{ color: '#19ba44', cursor: 'pointer' }}
          onClick={() => changeFilter('search', 'Pokemon')}
        >
          Try Pokemon
        </p>
      </div>
    )
  }

  if (isLoading) {
    return SKELETON_ARRAY.map((_, index) => <ListItem key={index} skeleton />)
  }

  if (isError) {
    return <div className="empty-error-state">Oops, an error happened.</div>
  }

  if (data && data.Response === 'False') {
    return <div className="empty-error-state">{data.Error}</div>
  }

  if (data && data.Response === 'True') {
    return (
      <div className="data-list">
        {data.Search.map((item, index) => (
          <ListItem key={`${item.imdbID}_${index}`} item={item} />
        ))}
      </div>
    )
  }

  return <div className="empty-error-state">Unknown Error.</div>
}
