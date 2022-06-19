import Head from 'next/head'
import Script from 'next/script'
import TextBox from '../components/home/TextBox'
import styles from '../styles/Home.module.css'
import InnerLink from '../components/shared/InnerLink'
import Header from '../components/shared/Header'

export default function Home() {

  return (
    <>
    <Head>
      <title>MealScout</title>
      <meta name="description" content="MealScout Aims to reduce food waste globally, by composing awesome recipes based on the user's home food supply." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js' />
    <Header />
    <div className={styles.container}>
      <main className={styles.main}>
        <TextBox />
        <div className={styles.lottieCont}>
          <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_cdui7M.json"  background="transparent" loop autoplay></lottie-player>
        </div>
        <div className={styles.buttons}>
          <InnerLink path="/connect" text="Get Started"/>
          <InnerLink path="/how-does-it-work" text="How does it work?"/>
        </div>
      </main>
    </div>
    </>
  )
}
