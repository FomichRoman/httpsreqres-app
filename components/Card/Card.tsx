import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEvent, useRef } from 'react'
import s from './card.module.scss'
import LikeTrueSvg from '@icons/like-t.svg'
import LikeFalseSvg from '@icons/like-f.svg'
import { useDispatch } from 'react-redux'
import { likeUserThunk } from '@redux/users/thunk'
import { useRouter } from 'next/router'

interface ICard {
  id: number,
  fisrtName: string
  lastName: string
  avatar: string
  like: boolean
}

export const Card = ({ id, fisrtName, lastName, avatar, like }: ICard) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const btnRef = useRef(null)

  const likeHandler = (event: MouseEvent) => {
    event.preventDefault()
    dispatch<any>(likeUserThunk(id))
  }

  return (
    <Link ref={btnRef} href={`/users/${id}`} className={s.card} locale={false}>
      <Image width={100} height={100} src={`${avatar}`} alt={'Фотография работника'} className={s.img} />
      <span>{`${fisrtName} ${lastName}`}</span>
      <button onClick={likeHandler} className={`btn-reset ${s.like_btn}`}>{like ? <LikeTrueSvg /> : <LikeFalseSvg />}</button>
    </Link>
  )
}
