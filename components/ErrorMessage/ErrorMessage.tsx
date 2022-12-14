import React from 'react'
import s from './errorMessage.module.scss'

interface ErrorMessageProps {
  error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <p className={s.error}>{ error }</p>
  )
}