import './TypeBadge.scss'

import React from 'react'

import { RecordTypes } from '@/api/types'

export type TypeBadgeProps = {
  type: RecordTypes
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  return <div className={`badge ${type}`}>{type.toUpperCase()}</div>
}
