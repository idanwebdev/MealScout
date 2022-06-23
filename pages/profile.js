import React from 'react'
import Head from 'next/head'
import Header from '../components/shared/Header'
import { getSession } from "next-auth/react"
import { collection, getDocs, query, where, addDoc } from "firebase/firestore"
import db from '../database/firebase'
import Card from '../components/shared/Card'
import LastShoppingLists from '../components/profile/LastShoppingLists'
import styles from '../styles/Profile.module.css'
import AddButton from '../components/profile/AddButton'

export default function profile({supply, shoppingLists}) {    
  return (
        <>
          <Head>
            <title>MealScout - Connect</title>
            <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header/>
          <div className={styles.pageWrapper}>
            <div className={styles.pageCont}>
              <div className={styles.cardCont}>
                <div className={styles.cardModule}>
                  <Card>
                      <LastShoppingLists lists={shoppingLists?.lists}/>
                  </Card>
                </div>
                <div className={styles.cardModule}>
                  <Card>
                    search
                  </Card>
                  <AddButton />
                </div>
                <div className={styles.cardModule}>
                  <Card>   
                    supply
                  </Card>
                </div>
                <div className={styles.cardModule}>
                  <Card>  
                    recepies 
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export async function getServerSideProps(context) {
  //get context
  const { req } = context
  //get current user // if dosent exist - go to login
  const session = await getSession({req})
  if(!session) {
    return { redirect: { destination: "/auth/connect" } }
  }
  //initilize variables

  async function scanData(){
  //get the collection ref
  const supplyCollection = await collection(db, '/supply')
  const listsCollection = await collection(db, '/shopping-list')
  //query for the user's data
  const supplyQuery = query(supplyCollection, where("owner", "==", session.user.email))
  const listsQuery = query(listsCollection, where("owner", "==", session.user.email))
  //snap the data
  const querySnapshot = await getDocs(supplyQuery)
  const listSnapshot = await getDocs(listsQuery)
    if(querySnapshot.size > 0 && listSnapshot.size > 0) {
    let supply, shoppingLists
    querySnapshot.forEach((doc) => {
      supply = doc.data()
    })
    listSnapshot.forEach((doc) => {
      shoppingLists = doc.data()
    })
    return {props: {supply, shoppingLists} }
    }else {
      await setNewDataUser(supplyCollection, listsCollection)
    }
  }
  await scanData()
  //setting new data for new user
  async function setNewDataUser(supplyCollection, listsCollection) {
    await addDoc(supplyCollection, {owner: session.user.email})
    await addDoc(listsCollection, {owner: session.user.email})
    await scanData()
  }
  return {props: {}}
}