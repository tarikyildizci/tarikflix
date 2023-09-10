import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import './Error.scss'

export const Error: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as any)?.statusText || (error as any)?.message}</i>
      </p>
      <Link to={'/movies'}>Go to home</Link>
    </div>
  )
}
