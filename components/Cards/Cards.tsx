import React from 'react'
import s from './cards.module.scss'

interface ICards {
  children: React.ReactNode
}


export const Cards = ({children}: ICards) => {
  return (
    <ul className={`list-reset ${s.cards}`}>{children}</ul>
  )
}
