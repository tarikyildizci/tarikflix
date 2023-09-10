import './MovieDetail.scss'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetMovieQuery } from '@/api/movies'
import { DetailItem } from '@/components'
import { onImageError } from '@/util/onImageError'
import { ArrowLeft } from 'lucide-react'
import { DetailResult } from '@/api/types'

export const MovieDetail: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()

  const { data, isLoading, isError } = useGetMovieQuery(params.id ?? skipToken)

  if (isError) {
    return <>Oops. An error happened.</>
  }

  if (data?.Response === 'False') {
    return <p>Oops. {data.Error}</p>
  }

  return (
    <div className="detail">
      <button onClick={() => navigate(state?.path ?? '/movies')}>
        <ArrowLeft size={16} /> Back to movies
      </button>
      <div className="hero">
        <div className="content">
          {isLoading ? (
            <div className="skeleton-box hero-loader"></div>
          ) : (
            <img
              src={data?.Poster}
              onError={onImageError}
              alt={`Poster for ${data?.Title}`}
            />
          )}
          <div className="info-wrapper">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p className="imdb">IMDB: {data?.imdbRating}</p>
                <p className="title">{data?.Title}</p>
                <p className="plot">{data?.Plot === 'N/A' ? '' : data?.Plot}</p>
              </>
            )}
          </div>
        </div>
        <div
          className="bg-blur"
          style={{
            backgroundImage: `url(${
              data?.Poster === 'N/A' ? '/img_fallback.png' : data?.Poster
            })`,
          }}
        />
      </div>
      <div className="bottom-area">
        <DetailItem title="Actors" value={data?.Actors} />
        <DetailItem title="Awards" value={data?.Awards} />
        <DetailItem title="BoxOffice" value={data?.BoxOffice} />
        <DetailItem title="Country" value={data?.Country} />
        <DetailItem title="DVD" value={data?.DVD} />
        <DetailItem title="Director" value={data?.Director} />
        <DetailItem title="Genre" value={data?.Genre} />
        <DetailItem title="Language" value={data?.Language} />
        <DetailItem title="Metascore" value={data?.Metascore} />
        <DetailItem title="Production" value={data?.Production} />
        <DetailItem title="Rated" value={data?.Rated} />
        <DetailItem title="Released" value={data?.Released} />
        <DetailItem title="Response" value={data?.Response} />
        <DetailItem title="Runtime" value={data?.Runtime} />
        <DetailItem title="Website" value={data?.Website} />
        <DetailItem title="Writer" value={data?.Writer} />
        <DetailItem title="Year" value={data?.Year} />
        <DetailItem title="imdbVotes" value={data?.imdbVotes} />
        <DetailItem title="Type" value={data?.Type} />
        {data?.Ratings.map(({ Source, Value }, index) => (
          <DetailItem
            key={index}
            title={`Rating from ${Source}`}
            value={Value}
          />
        ))}
      </div>
    </div>
  )
}
