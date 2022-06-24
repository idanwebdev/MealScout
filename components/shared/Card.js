import React from 'react'
import styles from '../../styles/components/Card.module.css'
export default function Card(props) {
  return (
    <div className={styles.card}>
        {props.children}
    </div>
  )
}
