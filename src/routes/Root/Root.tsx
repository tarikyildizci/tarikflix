import './Root.scss'

import React from 'react'
import { Link, Outlet, ScrollRestoration } from 'react-router-dom'

export const Root: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ScrollRestoration />
      <section className="topbar">
        <Link to="/">TarıkFlix</Link>
      </section>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
