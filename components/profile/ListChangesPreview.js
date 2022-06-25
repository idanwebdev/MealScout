import React from 'react'
import Card from '../shared/Card'
import styles from '../../styles/components/ListChangesPreview.module.css'

export default function ListChangesPreview(props) {
  function handleClick() {
    console.log(props.supplyDocId)
  }
  return (
  <>
    <Card>
    <div className={styles.wrapper}>
      To be added:
      <table className={styles.table}>
      {Object.keys(props.list).map((category, index) => (
        <>
        <tr>
        <th key={index}>
          {category}
        </th>
        </tr>
        <div className={styles.itemsConts}>
        {props.list[category].map((ingredient, index) => (
        <td>
          {ingredient}
        </td>
        ))}
        </div>
        </>
      ))}
      </table>
      <button className={styles.updateBtn} onClick={handleClick}>
        Update Supply
      </button>
    </div>
  </Card>
  </>
  )
}
