import Link from 'next/link'
import React, { useState } from 'react'
import FadeIn from '../../helpers/animations/FadeIn'
import styles from '../../styles/components/AddButton.module.css'
export default function AddButton(props) {
  const [isPopup, setIsPoup] = useState(false)
  return (
  <div className={styles.wrapper} onMouseEnter={(() => setIsPoup(true))} onMouseLeave={(() => setIsPoup(false))}>
    <div className={styles.cta}>
        <img src="images/icons/plus.png" width="25px" alt="plus icon" />
    </div>
    <FadeIn in={isPopup}>
      <div className={styles.popup}>

        <a className={styles.link} role="button" onClick={() => props.toggle()}>
          Add food supply
        </a>

        <Link href={'/profile'} className={styles.link}>
          <a className={styles.link}>Add a shopping list</a>
        </Link>
      </div>
    </FadeIn>
  </div>
  )
}
