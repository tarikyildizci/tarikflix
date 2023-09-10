import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { RecordTypes } from '@/api/types'

const parseSearchParams = (searchParams: URLSearchParams) => {
  let search
  let page
  let year
  let type

  for (const [key, value] of searchParams.entries()) {
    switch (key) {
      case 'search':
        search = value
        break
      case 'page':
        page = +value <= 0 ? 1 : +value
        break
      case 'year':
        year = +value <= 0 ? undefined : value
        break
      case 'type':
        type = (
          Object.values(RecordTypes).includes(value as any) ? value : undefined
        ) as RecordTypes | undefined
        break
      default:
        break
    }
  }

  return { search, page, year, type }
}

export type ChangeFilterFunctionType = (
  key: 'search' | 'page' | 'year' | 'type',
  newValue?: string
) => void

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = useMemo(
    () => parseSearchParams(searchParams).page,
    [searchParams]
  )
  const search = useMemo(
    () => parseSearchParams(searchParams).search,
    [searchParams]
  )
  const year = useMemo(
    () => parseSearchParams(searchParams).year,
    [searchParams]
  )
  const type = useMemo(
    () => parseSearchParams(searchParams).type,
    [searchParams]
  )

  const changeFilter: ChangeFilterFunctionType = (key, newValue) => {
    setSearchParams(prevSearchParams => {
      const prevValue = prevSearchParams.get(key) ?? undefined // null cast to undefined for better eq checking
      if (newValue) {
        if (newValue === prevValue) {
          // not changed
          return prevSearchParams
        }
        // changed, set new one
        if (key !== 'page') {
          // if filters change, reset page
          prevSearchParams.delete('page')
        }
        prevSearchParams.set(key, newValue)
      } else if (prevSearchParams.has(key)) {
        //removed
        if (key !== 'page') {
          // if filters deleted, reset page
          prevSearchParams.delete('page')
        }
        prevSearchParams.delete(key)
      }

      return prevSearchParams
    })
  }

  useEffect(() => {
    // negative values for page
    // and unsupported types for type
    // are fixed here, in case the user
    // edits them from the url
    if ((searchParams.get('page') ?? undefined) !== page?.toString()) {
      changeFilter('page', page?.toString())
    }
    if ((searchParams.get('type') ?? undefined) !== type) {
      changeFilter('type', type)
    }
  }, [page, type])

  return {
    search,
    page,
    year,
    type,
    changeFilter,
  }
}

export default useFilters
