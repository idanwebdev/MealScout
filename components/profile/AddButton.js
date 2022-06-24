import React from 'react'
import styles from '../../styles/components/Cta.module.css'
import Image from '../shared/Image'
export default function AddButton() {
  return (
    <div className={styles.cta}>
        <Image src="images/icons/plus.png" width="25px" alt="plus icon" />
    </div>
  )
}
