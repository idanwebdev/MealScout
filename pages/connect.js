import React, { useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import styles from '../styles/Connect.module.css'
import clientApp from '../firebase/clientApp';
import Image from '../components/shared/Image'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlicer';
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function connect() {
    const dispatch = useDispatch()
    const router = useRouter()
    const {user} = useSelector((state) => state.user)
    const [localUser, setLocalUser] = useState(null)
    const app = clientApp()
    const provider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    const auth = getAuth(app)
    useEffect(() => {
      dispatch(setUser(localUser))
      if(localUser) {
      setTimeout(() => {
        router.push(`/profile`)
      }, 2500)
     }
    }, [localUser])
    const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        setLocalUser(result.user)
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      });
    }
    const signInFacebook = () => {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          setLocalUser(result.user)
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.customData.email
          const credential = GoogleAuthProvider.credentialFromError(error)
        });
      }
  return (
    <>
    <Head>
      <title>MealScout</title>
      <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {
    !user ? (
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
            <button onClick={signInGoogle}>
                <p>Google</p>
                <Image  width="35px" src="/images/google.png" alt="google icon"/>
            </button>
            <button onClick={signInFacebook}>
                <p>Facebook</p>
                <Image width="35px"src="/images/facebook.png" alt="facebook icon"/>
            </button>
        </div>
        <p>MealScout is the easiest way to help you manage your food supply.</p>
      </div>
    </div>
    ) : (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.text}>
            <h1>Thank you, {user.displayName}.</h1>
            <p><strong>You are now redirected</strong></p>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

