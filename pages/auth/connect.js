import React from 'react'
import styles from '../../styles/Connect.module.css'
import Image from '../../components/shared/Image'
import Link from 'next/link'
import Head from 'next/head'
import { getProviders, signIn, getCsrfToken, getSession } from "next-auth/react"

export default function connect({providers}) {
  return (
    <>
    <Head>
      <title>MealScout</title>
      <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <div className={styles.container}>
      <div className={styles.backButton}>
      <Link href={'/'}>
        <a>
        <Image width="10px"src="/images/left-arrow.png" alt="left-arrow icon"/>
        <p>Back Home</p>
        </a>
      </Link>
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <h1>Login to MealScout</h1>
          <p><strong>Let's connect</strong></p>
        </div>
        <div className={styles.buttonsCont}>
            <button onClick={() => signIn(providers.google.id)}>
                <p>Google</p>
                <Image  width="35px" src="/images/google.png" alt="google icon"/>
            </button>
        </div>
        <p>MealScout is the easiest way to help you manage your food supply.</p>
      </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/profile" },
    };
  }
  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context)
    },
  };
}