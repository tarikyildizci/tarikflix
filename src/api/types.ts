export enum RecordTypes {
  MOVIE = 'movie',
  SERIES = 'series',
  EPISODE = 'episode',
  GAME = 'game',
}

export type SearchResultSuccessType = {
  Response: 'True'
  Search: Array<{
    Title: string
    Year: string
    imdbID: string
    Type: RecordTypes
    Poster: string
  }>
  totalResults: string
}

export type ErrorResponseType = {
  Response: 'False'
  Error: string
}

export type SearchResult = SearchResultSuccessType | ErrorResponseType

export type DetailResponseSuccessType = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>

  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: RecordTypes
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: 'True'
}

export type DetailResult = DetailResponseSuccessType | ErrorResponseType
