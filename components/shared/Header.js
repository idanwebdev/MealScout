import Link from 'next/link'
import React from 'react'
import InnerLink from '../../components/shared/InnerLink'
import Image from './Image'

export default function Header(props) {
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
            {!props.user ? (
              <li>
                <InnerLink path="/connect" text="Connect"/>
              </li>
            ) : (
              <li>
                <Link href="/profile">
                  <a>
                    <Image width="39px" src='/images/user.png' alt='little baker'/>
                  </a>
                </Link>
              </li>
            )}
        </ul>
    </header>
  )
}
