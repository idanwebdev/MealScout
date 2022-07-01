import React, { useEffect, useState } from 'react'
import Card from '../shared/Card'
import styles from '../../styles/components/ListChangesPreview.module.css'
import db from '../../database/firebase'
import { doc, updateDoc, onSnapshot } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, reset } from '../../redux/localSupplySlicer'
import FadeIn from '../../helpers/animations/FadeIn'
import updateStateObject from '../../helpers/updateStateObject'
import { setPopup } from '../../redux/appSlicer'

export default function ListChangesPreview(props) {
  const { userSupply } = useSelector(state => state)
  const [isHovered, setIsHovered] = useState('')
  const [clicked, setClicked] = useState('')
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const ref = doc(db, 'supply', props.supplyDocId)

  useEffect(() => {
  const unsub = onSnapshot(ref, (doc) => {
      setData(doc.data());
  })
  return () => unsub
  }, [])
  useEffect(() => {
    if(clicked) {
    removeFromList()
    }
    return setClicked('')
  }, [clicked])

  async function handleClick() {
    const newState = await updateStateObject(data, userSupply) 
    try {
    let count = 0
    await updateDoc(ref, {products: newState})
    Object.keys(userSupply).forEach((key) => {
      count += userSupply[key].length
    })
    await dispatch(reset())
    await props.toggle()
    await dispatch(setPopup(`${count} items were added successfuly!`))
    setTimeout(() => {
      window.location.reload()
    }, 2500)
    } catch(err) {
    await dispatch(setPopup(`We are sorry, something went wrong`))
    }
  }

  function removeFromList() {
    dispatch(removeItem(clicked))
  }

  return (
  <>
    <Card>
    <div className={styles.wrapper}>
      To be added:
      <table className={styles.table}>
      {Object.keys(userSupply).map((category, index) => (
        <>
        <tr>
        <th key={index}>
          {category}
        </th>
        </tr>
        <tr>
        {userSupply[category].map((ingredient, index) => (
          <td className={styles.itemsConts} onMouseOver={() =>setIsHovered(ingredient)} onMouseLeave={() => setIsHovered('')} key={index} onClick={() => setClicked(ingredient)}>
            {ingredient}
            <FadeIn in={ingredient == isHovered} timeout={50}>
              <span className={"material-symbols-outlined"}>
              delete
              </span>
            </FadeIn>
          </td>
          ))}
        </tr>
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
