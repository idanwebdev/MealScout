import React from 'react'
import styles from '../../styles/Home.module.css'

export default function TextBox() {
  return (
    <div className={styles.textBox}>
    <h1>Find great <span>recipes</span> containing <span>only</span> ingredients you <span>own</span></h1>
    <div>
      <p>
        Reducing food waste and saving money <br />
        made easy with <strong>MealScout</strong>
      </p>
    </div>
    </div>
  )
}
