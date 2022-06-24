import React from 'react'
import styles from '../../styles/profile.module.css'

export default function LastShoppingLists(props) {
  return (
      <>
        <h2>Recent shopping lists</h2>
        {props.lists ? (
        <>
        <div className={styles.listsCont}>
        {props.lists.map((item, index )=> (      
          index < 3 && (
          <div className={styles.singleListItem} key={index}>
            <div>
              {item.date}
            </div>
            <div>
              {item.status}%
            </div>
          </div> 
          ) 
        ))}
        </div>
        <div className={styles.seeAllLists}>
              <p>See all</p>
        </div>
        </>
        ) : (
        <>
          <div className={styles.listsCont}>
            <p>You have no recent lists</p>
          </div>
          <div className={styles.seeAllLists}>
            <p>Create one</p>
          </div>
        </>
        )}
      </>
  )
}
