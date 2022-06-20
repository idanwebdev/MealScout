import React from 'react'
import Head from 'next/head'
import Header from '../components/shared/Header'
import { useSession, signIn, signOut } from "next-auth/react"


export default function profile() {
  const { data: session} = useSession()
  if(session) {
    
    return  (
        <>
          <div>
              <Head>
                <title>MealScout - Connect</title>
                <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
                <link rel="icon" href="/favicon.ico" />
              </Head>
          <Header/>
        </div>
        </>
    )
  }else {
    return (
          <div>
              <Header/>
          </div>
    )
  }
}
