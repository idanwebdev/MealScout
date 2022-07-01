import '../styles/globals.css'
import '../styles/animations.css'
import { SessionProvider } from "next-auth/react"
import {Provider} from 'react-redux'
import { store } from '../redux/store'

function MyApp({ session, Component, pageProps }) {
  return (
  <SessionProvider session={session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </SessionProvider>
  )
}

export default MyApp
