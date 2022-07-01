import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Categories from '../shared/Categories'
import styles from '../../styles/components/Supply.module.css'

export default function Supply() {
    const [activeCat, setActiveCat] = useState('')
    const {data} = useSelector(state => state)

    async function activeCatCallback(cat) {
       setActiveCat(cat)
    }

    useEffect(() => {
        if(activeCat) {
        }
    }, [activeCat])
    return (
        <div className={styles.wrapper}>
        <Categories activeCat={activeCatCallback} autoSelectFirst/>
        {
        data?.supplyList?.products[activeCat] ? (
        <div className={styles.listCont}>
            <h4>{`Total of ${data?.supplyList?.products[activeCat].length} products`}</h4>
            <ul className={styles.ul}>
                {data?.supplyList?.products[activeCat].map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
        ) : (
            <div>
                <h4>No ingredients here, <br />
                consider adding some products to your supply<br />
                 so we can recommend you great recepies!</h4>
            </div>
        )} 
        </div>
  )
}
