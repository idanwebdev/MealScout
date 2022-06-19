import React from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Header from '../components/shared/Header'


export default function profile() {
const {user} = useSelector(state => state.user)
  return (
    <div>
        <Head>
          <title>MealScout - Connect</title>
          <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header user={user}/>
    </div>
  )
}
