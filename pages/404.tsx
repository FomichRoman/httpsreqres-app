import Link from 'next/link'
import React from 'react'
import s from '../styles/404.module.scss'

export default function Error() {
  return (
    <div className={s.modal}>
      <div className={s.wrap}>
        <span>Ой!!!</span>
        <h1>Данной страницы не существует!</h1>
        <Link href={'/'}>Перейти на главную страницу</Link>
      </div>
    </div>
  )
}
