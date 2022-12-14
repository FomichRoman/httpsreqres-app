/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import React from 'react';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import s from '../../styles/user.module.scss';
import TelSvg from '@icons/user-tel.svg'
import EmailSvg from '@icons/user-mail.svg'

export async function getStaticPaths() {
  const res = await fetch(`https://reqres.in/api/users?per_page=8`);
  const users = await res.json();
  const paths = users.data.map((user: any) => {
    return {
      params: { id: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any): Promise<any> {
  const id = context.params.id;
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  const user = await res.json();
  return {
    props: { user: user.data },
  };
}

export default function User({ user }: any) {
  console.log(user);
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <Header avatar={user.avatar} firstName={user.first_name} lastName={user.last_name} />
      <Layout>
        <div className={s.user_wrap}>
          <div className={s.user_text}>
            <p>
              Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы,
              аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать
              продажи, используя самые современные аналитические инструменты.
            </p>

            <p>
              В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из
              самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания
              проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
            </p>

            <p>
              Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник
              эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
            </p>
          </div>
          <div className={s.user_contacts}>
            <span>
              <TelSvg />
              +7 (954) 333-44-55
              </span>
            <span>
              <EmailSvg />
              {user.email}
              </span>
          </div>
        </div>
      </Layout>
    </>
  );
}
