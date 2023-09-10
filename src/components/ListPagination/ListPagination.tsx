import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

import useFilters from '@/util/useFilters'

const PAGE_SIZE = 10

export type ListPaginationProps = {
  isLoading?: boolean
  totalCount?: number
}

export const ListPagination: React.FC<ListPaginationProps> = ({
  isLoading,
  totalCount,
}) => {
  const { page, changeFilter } = useFilters()

  const totalPageCount = Math.ceil((totalCount ?? 0) / PAGE_SIZE)

  const isOnLastPage = page === totalPageCount

  const isPrevDisabled = totalCount == null || isLoading || !page || page <= 1
  const isNextDisabled = totalCount == null || isLoading || isOnLastPage

  const handlePrevPage = () => {
    changeFilter('page', page ? (page - 1).toString() : undefined)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNextPage = () => {
    changeFilter('page', page ? (page + 1).toString() : '2')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="filter-area">
      <p>
        Page: {page ?? '1'} of {totalPageCount}
      </p>
      <button disabled={isPrevDisabled} onClick={handlePrevPage}>
        <ArrowLeft size={16} /> Prev
      </button>
      <button disabled={isNextDisabled} onClick={handleNextPage}>
        Next <ArrowRight size={16} />
      </button>
    </div>
  )
}
