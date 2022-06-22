import React from 'react'
import styles from '../../styles/profile.module.css'

export default function LastShoppingLists(props) {

  return (
    <>
    {props.lists ? (
    <>
      <h2>Recent shopping lists</h2>
      <div className={styles.listsCont}>
      {props.lists.map((item, index )=> ( 
        <>
        {
        index < 3 && (
        <div className={styles.singleListItem} key={index}>
          <div>
            {item.date}
          </div>
          <div>
            {item.status}%
          </div>
        </div> 
        )}
        </>
      ))}
      </div>
      <div className={styles.seeAllLists}>
            <p>See all</p>
        </div>
    </>
    ): (
    <p>You have no recent lists</p>
    )}
    </>
  )
}
