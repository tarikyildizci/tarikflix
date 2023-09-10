import './DetailItem.scss'

import React from 'react'

export type DetailItemProps = {
  title?: string
  value?: string
}

export const DetailItem: React.FC<DetailItemProps> = ({ title, value }) => {
  return (
    <div className="detail-item">
      <p className="title">{title}</p>
      <p className="value">{value ?? '-'}</p>
    </div>
  )
}
