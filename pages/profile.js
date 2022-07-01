import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../components/shared/Header'
import { getSession } from "next-auth/react"
import { collection, getDocs, query, where, addDoc } from "firebase/firestore"
import db from '../database/firebase'
import Card from '../components/shared/Card'
import LastShoppingLists from '../components/profile/LastShoppingLists'
import styles from '../styles/Profile.module.css'
import AddButton from '../components/profile/AddButton'
import Search from '../components/profile/Search'
import AddProducts from '../components/shared/AddProducts'
import FadeIn from '../helpers/animations/FadeIn'
import { useDispatch } from 'react-redux'
import { setList } from '../redux/realSupplySlicer'
import Message from '../components/shared/Message'
import Supply from '../components/profile/Supply'


export default function profile({supply, shoppingList, listId, supplyId}) { 
  const [isAddProductVisibile, setIsAddProductVisibile] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setList(supply))
  }, [])
  function setApPopup() {
    setIsAddProductVisibile(prevState => !prevState)
  }
  return (
        <>
          <Head>
            <title>MealScout - Connect</title>
            <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header/>
          <Message />
          <div className={styles.pageWrapper}>
            <div className={styles.pageCont}>
              <div className={styles.cardCont}>
                <div className={styles.cardModule}>
                  <Card>
                      <LastShoppingLists lists={shoppingList?.lists}/>
                  </Card>
                </div>
                <div className={styles.cardModule}>
                  <Card>
                    <Search supply={supply?.products} id={supplyId}/>
                  </Card>
                  <AddButton toggle={setApPopup}/>
                </div>
                <div className={styles.cardModule}>
                  <Card>   
                    <Supply list={supply}/>
                  </Card>
                </div>
                <div className={styles.cardModule}>
                  <Card>  
                    recepies 
                  </Card>
                </div>
              </div>
            </div>
            <FadeIn in={isAddProductVisibile} timeout={200}>
                <AddProducts toggle={setApPopup} supplyDocId={supplyId}/>  
            </FadeIn>                  
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
  //get the collection ref
  const supplyCollection = await collection(db, '/supply')
  const listsCollection = await collection(db, '/shopping-list')
  //query for the user's data
  const supplyQuery = query(supplyCollection, where("owner", "==", session.user.email))
  const listsQuery = query(listsCollection, where("owner", "==", session.user.email))
  //variables to save the data
  let querySnapshot, listSnapshot, supplyId, listsId
  //repeated function to update the data if new one created
  async function getAllDocs(){
  querySnapshot = await getDocs(supplyQuery)
  listSnapshot = await getDocs(listsQuery) 
  }
  await getAllDocs()

  if(querySnapshot.empty && listSnapshot.empty){
    await addDoc(supplyCollection, {owner: session.user.email})
    await addDoc(listsCollection, {owner: session.user.email})
    await getAllDocs()
  }

  function setData() {
    let supply, shoppingList
    listSnapshot.forEach((doc) => {
      shoppingList = doc.data()
      listsId = doc.id
    })
    querySnapshot.forEach((doc) => {
      supply = doc.data()
      supplyId = doc.id
    })
    return {supply,shoppingList}
  }

  const data = await setData() 
  
  return {props: {...data, listsId, supplyId}}
}