import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import InnerLink from '../../components/shared/InnerLink'
import Image from './Image'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const [isLogged, setIsLoged] = useState(false)
  const {data: session} = useSession()
  useEffect(() => {
    if(session) {
      setIsLoged(true)
    }
  }, [session])
  return (
    <header className='header'>
        <div className='header-logo'>
            <Link href="/">
                <a>
                  <Image width="100%" src='/images/logo.png' alt='logo'/>
                </a>
            </Link>
        </div>
        <ul>
            <li>
                <InnerLink path="/how-does-it-work" text="How does it work?"/>
            </li>
              <li>
              {!isLogged ? (
                <button onClick={() => signIn()}>
                  Connect
                </button>
              ) : (
                <>
                <button onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>
                  Diconnect
                </button>
                <Link href="/profile">
                  <a>
                    <Image width="39px" src='/images/user.png' alt='little baker'/>
                  </a>
                </Link>
                </>
              )}
              </li>
        </ul>
    </header>
  )
}
