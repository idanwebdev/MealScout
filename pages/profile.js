import React, { useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/shared/Header'
import { getSession } from "next-auth/react"
import { useRouter  } from 'next/router'
import { getFirestore, collection, getDoc, query, where, doc } from "firebase/firestore"
import db from '../database/firebase'

export default function profile(props) {    
  const router = useRouter()
  console.log(props)
  useEffect(() => {
    /*if(!data) {
      router.push('/auth/connect')
    }*/
  }, [])
  return (
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
}

export async function getServerSideProps(context) {
  //get context
  const { req } = context
  //get current user
  const session = await getSession({req})
  //connect to the db
  const database = await getFirestore(db)
  //get the collection ref
  const supplyCollection = await collection(database, 'mealscout')
  //query for the user
  const user = query(supplyCollection, where("email", "==", session.user.email))
  const docExist = await getDoc(user)
  const userData =  JSON.stringify(docExist);


  if(session) {
    return { props: {session, userData} }
  }
  return { props: {} }
}