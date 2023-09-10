import './ListSearchFilter.scss'

import { debounce } from 'debounce'
import React from 'react'

import { RecordTypes } from '@/api/types'
import useFilters from '@/util/useFilters'

import { SearchInput } from './SearchInput'
import { Select } from './Select'

const DEFAULT_YEAR_VALUE = { value: 'any_year', label: 'Any Year' }
const DEFAULT_TYPE_VALUE = { value: 'any_type', label: 'Any Type' }

const RECORD_TYPES = Object.values(RecordTypes)

// for the year selection, I couldn't find a good UX option
// I am mapping all years from the current one to 1900
// and counting on the native select element
// and its keyboard support for fast selection
// I didn't want to make it a number input
// as it felt harder to manage for both me and the user

const getYearsFromTodayTo1900 = () => {
  const currentYear = new Date().getFullYear()
  const years = []

  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString())
  }

  return years
}

const YEARS = getYearsFromTodayTo1900()

export const ListSearchFilter: React.FC = () => {
  const { search, year, type, changeFilter } = useFilters()

  //debouncing search for less requests & better UX
  const searchDebounced = debounce((newSearch?: string) => {
    newSearch !== search && changeFilter('search', newSearch)
  }, 500)

  return (
    <div className="filter-area">
      <SearchInput value={search} onChange={searchDebounced} />
      <Select
        value={year}
        defaultValue={DEFAULT_YEAR_VALUE}
        label="Year"
        name="year"
        options={YEARS}
        onChange={changeFilter}
      />
      <Select
        value={type}
        defaultValue={DEFAULT_TYPE_VALUE}
        label="Type"
        name="type"
        options={RECORD_TYPES}
        onChange={changeFilter}
      />
    </div>
  )
}
