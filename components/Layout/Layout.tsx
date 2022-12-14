import React from 'react'
import s from './layout.module.scss'

interface ILayout {
  children: React.ReactNode
}

export const Layout = ({ children }: ILayout) => {
  return (
    <div className={`container ${s.layout}`}>{children}</div>
  )
}
