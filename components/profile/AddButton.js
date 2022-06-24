import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../../styles/components/AddButton.module.css'
import Image from '../shared/Image'
export default function AddButton() {
  const [isPopup, setIsPoup] = useState(false)
  return (
  <div className={styles.wrapper} onMouseEnter={(() => setIsPoup(true))} onMouseLeave={(() => setIsPoup(false))}>
    <div className={styles.cta}>
        <Image src="images/icons/plus.png" width="25px" alt="plus icon" />
    </div>
    { isPopup && (
    <div className={styles.popup}>
      <Link href={'/profile'} >
        <a className={styles.link}>Add food supply</a>
      </Link>
      <Link href={'/profile'} className={styles.link}>
        <a className={styles.link}>Add a shopping list</a>
      </Link>
    </div>
    )}
  </div>
  )
}
