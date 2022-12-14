import Head from 'next/head'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../components/Card'
import { Cards } from '../components/Cards'
import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { RootState } from '../redux/redusers'
import { wrapper } from '../redux/store'
import { savePageUsers } from '../redux/users/action'
import { IUser } from '../redux/users/reduser'
import s from '../styles/home.module.scss'
import MoreSvg from '@icons/more.svg'
import { addUsersThunk, getUsersThunk } from '@redux/users/thunk'

export const getStaticProps = wrapper.getStaticProps(store => async ({preview}): Promise<any> => {
  const addLike = (arr: any) => {
    const copyArr = [...arr];
    copyArr.forEach(el => {
      el["like"] = false;
    });
    return copyArr;
  };
  const getPage = async () => {
    const res = await fetch(`https://reqres.in/api/users?page=1`)
    const res2 = await fetch(`https://reqres.in/api/users?page=2`)
    const resData = await res.json()
    const resData2 = await res2.json()
    const allData = addLike([...resData.data, ...resData2.data])
    return allData
  }
  const data = await getPage()
  store.dispatch<any>(savePageUsers(data))
});


export default function Home() {
  const users = useSelector<RootState, IUser[]>((state) => state.users);
  const [clickCount, setClickCount] = useState(2)
  const [cards, setCards] = useState(8)
  const dispatch = useDispatch();
  const router = useRouter()
  
  useEffect(() => {
    setTimeout(() => {
      dispatch<any>(addUsersThunk(users))
    }, 10)
    const setToken = localStorage.getItem('partners')
    if (!setToken) router.push('/auth/register')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const moreHandler = () => {
    setClickCount(prev => prev + 2)
    dispatch<any>(getUsersThunk(clickCount))
    setCards(prev => prev + 8)
  }

  return (
    <>
    <Head>
      <title>Главная</title>
    </Head>
    <Header />
    <Layout>
      <Cards>
        {users.slice(0, cards).map((el: any) => 
        <Card 
          key={el.id} 
          id={el.id}
          fisrtName={el.first_name}
          lastName={el.last_name}
          avatar={el.avatar}
          like={el.like} />)}
      </Cards>
      <button onClick={moreHandler} className={`btn-reset ${s.btn_more}`}>
        <span>Показать ещё</span>
        <MoreSvg />
      </button>
    </Layout>
    </>
  )
}
