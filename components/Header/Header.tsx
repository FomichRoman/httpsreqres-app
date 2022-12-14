import React from 'react'
import s from './header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import ExitSvg from '@icons/exit.svg'
import BackSvg from '@icons/back.svg'


interface IHeader {
  avatar?: string,
  firstName?: string
  lastName?: string
}

export const Header = ({ avatar, firstName, lastName }: IHeader) => {
  return (
    <header className={s.header}>
      {avatar
      ? <>
        <Link className={s.gohome} href={'/'}>
          <span className={s.desctop}>Назад</span>
          <span className={s.mobile}><BackSvg /></span>
        </Link>
        <div className={`container ${s.user_wrap}`}>
          <Image src={avatar} alt={'Фотография партера'} width={187} height={187} />
          <div>
            <h1 className={s.title}>{`${firstName} ${lastName}`}</h1>
            <p>Партнёр</p>
          </div>
        </div></>

      : <>
        <h1 className={s.title}>Наша команда</h1>
        <p>Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. </p></>
      }
      <Link onClick={() => localStorage.removeItem('partners')} className={s.exit} href={'/auth/register'}>
        <span className={s.desctop}>Выход</span>
        <span className={s.mobile}><ExitSvg /></span>
      </Link>
    </header>
  )
}
