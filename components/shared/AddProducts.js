import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/AddProducts.module.css'
import { categories } from '../../helpers/categories';

export default function AddProducts(props) {
    const [activeCat, setActiveCat] = useState('')
    const containerRef = useRef()
    const categoryRef = useRef()
    useEffect(() => {
        function handleClickOutside(event) {
        if(event.which == 1) {
          if (containerRef.current && !containerRef.current.contains(event.target)) {
            console.log("mouseclick")
            props.toggle()
          }
         }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }, [containerRef]);
  function activeCategory(e) {
    setActiveCat(e.target.dataset.id)
  }
  return (
    <div className={styles.wrapper}>
       <div className={styles.container} ref={containerRef}>
        <a role={'button'} className={styles.closeBtn} onClick={() => {props.toggle()}}>
        x
        </a>
        <h2>Pick a category and add related products</h2>
        <p>the items will be added to you inventory, it will help us recommend great recepies for you, based on your food supply.</p>
        <div className={styles.bottomBox}>
            <div className={styles.btnBox}>
                {categories.map((item, key) => (
                    <button className={activeCat === item ? styles.active : null}onClick={activeCategory} ref={categoryRef} data-id={item}>
                      <img src={`/images/icons/${item}.png`} width="45px" alt="food icon" key={key}/>
                      <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                    </button>
                ))}
            </div>
            <div className={styles.rightBox}>

            </div>
        </div>
        </div>
    </div>
  )
}
