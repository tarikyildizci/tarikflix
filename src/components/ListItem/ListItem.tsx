import './ListItem.scss'

import { Calendar } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { SearchResultSuccessType } from '@/api/types'

import { TypeBadge } from '../TypeBadge/TypeBadge'
import { onImageError } from '@/util/onImageError'

export type ListItemProps =
  | { skeleton: true }
  | {
      item: SearchResultSuccessType['Search'][0]
    }

export const ListItem: React.FC<ListItemProps> = props => {
  if ('skeleton' in props) {
    return (
      <div className="list-item">
        <div className="skeleton-box img-skeleton" />
      </div>
    )
  }

  const { Poster, Title, Type, Year, imdbID } = props.item

  return (
    <div className="list-item">
      <img
        height="150"
        width="100"
        src={Poster}
        alt={`Poster for ${Title}`}
        onError={onImageError}
      />
      <div className="info">
        <div className="header">
          <Link
            state={{ path: window.location.pathname + window.location.search }}
            to={`/detail/${imdbID}`}
            className="title"
          >
            {Title}
          </Link>
          <p className="imdb-id">ID: {imdbID}</p>
        </div>
        <p className="year">
          <Calendar size={16} />
          {Year}
        </p>
        <TypeBadge type={Type} />
      </div>
    </div>
  )
}
