import { ErrorMessage } from '@/components/ErrorMessage';
import router from 'next/router';
import React, { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/thunk';
import s from '../../styles/auth.module.scss';

export default function Register() {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [twoPass, setTwoPass] = useState('');
  const [error, setError] = useState('')
  const inputName = useRef<any>(null)
  const inputEmail = useRef<any>(null)
  const inputPassword = useRef<any>(null)

  const submitHandler = async (e: FormEvent, name: string, email: string, pass: string, twoPass: string) => {
        e.preventDefault();
        if (name.trim().length === 0) {
          inputName.current.style.border = '1px solid red'
          setError('name')
          return
        } else if (email.trim().length === 0) {
          inputName.current.style.border = 'none'
          inputEmail.current.style.border = '1px solid red'
          setError('email')
          return
        } else if (pass.trim().length <= 6) {
          inputEmail.current.style.border = 'none'
          inputPassword.current.style.border = '1px solid red'
          setError('pass<6')
          return
        } else if (pass != twoPass) {
          setError('pass!=pass2')
        } else {
          inputPassword.current.style.border = 'none'
          await dispatch<any>(registerThunk(email, pass))
          router.push('/')
        }
    };

  return (
    <>
      <div className={s.modal}>
        <form onSubmit={(event) => submitHandler(event, name, email, pass, twoPass)}>
          <h1>Регистрация</h1>
          <label htmlFor='name'>
            Имя
          <input ref={inputName} value={name} onChange={(e) => setName(e.target.value)} id='name' type='text' />
          {error === 'name' && <ErrorMessage error={'Введите Имя'} />}
          </label>

          <label htmlFor='email'>
            Электронная почта
          <input ref={inputEmail} value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' />
          {error === 'email' && <ErrorMessage error={'Введите корректный E-mail'} />}
          </label>

          <label htmlFor='pass'>
            Пароль
          <input ref={inputPassword} value={pass} onChange={(e) => setPass(e.target.value)} id='pass' type='password' />
          {error === 'pass<6' 
          ? <ErrorMessage error={'Введите более 6 символов'} />
          : error === 'pass!=pass2' 
          ? <ErrorMessage error={'Пароли не равны'} />
          : null}
          </label>

          <label htmlFor='pass'>Подтвердите пароль</label>
          <input value={twoPass} onChange={(e) => setTwoPass(e.target.value)} id='passTwo' type='password' />

          <button type='submit'>Зарегистрироваться</button>
        </form>
      </div>
    </>
  );
}