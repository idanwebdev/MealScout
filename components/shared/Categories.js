import React, {useState, useRef, useEffect} from 'react'
import { categories } from '../../helpers/categories'

export default function Categories(props) {
const [activeCat, setActiveCat] = useState()
const categoryRef = useRef()
useEffect(() => {
    if(props.autoSelectFirst) {
        setActiveCat(categories[0])
        props.activeCat(categories[0])
    }
}, [])
async function activeCategory(e) {
    setActiveCat(e.target.dataset.id)
    props.activeCat(e.target.dataset.id)
}
  return (
    <div className="btnBox">
        {categories.map((item, key) => (
            <button key={key} className={activeCat === item ? 'active' : null} onClick={activeCategory} ref={categoryRef} data-id={item} >
              <img src={`/images/icons/${item}.png`} width="45px" alt="food icon"/>
              <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
            </button>
        ))}
    </div>

  )
}
