import React, {useState, useRef, useEffect} from 'react'
import styles from '../../styles/components/Search.module.css'
import Card from '../shared/Card'
import db from '../../database/firebase'
import { doc, updateDoc } from "firebase/firestore"

export default function Search(props) {
  const [value, setValue] = useState('')
  const [dataArray, setDataArray] = useState([])
  const [results, setResults] = useState([])
  const inputRef = useRef()

  function handleChange(e) {
    e.preventDefault()
    setValue(inputRef.current.value)
  }
  useEffect(() => {
    if(props.supply){
    let allItems = [], keys
    keys = Object.keys(props.supply)
    keys.forEach((element, index) => {
        props.supply[element].forEach((element, index) => {
            allItems.push(element)
        })       
    })
    setDataArray(allItems)
    }
  }, [])
  useEffect(() => {
    let localResults = []
    if(value != '') {
        dataArray.forEach((item) => {
            if(item.includes(value)){
                localResults.push(item)
            }
        })
    }else {
        localResults = []
    }
    setResults([...localResults])
    localResults = []
    return () => setResults([])
  }, [value])

  async function removeItem(itemToDelete) {
    const ref = doc(db, 'supply', props.id)
    let keys, associatedCategory
    keys = Object.keys(props.supply)
    keys.forEach((element, index) => {
       if(props.supply[element]){
        if(props.supply[element].includes(itemToDelete)){
            associatedCategory = element
        }
       }
    })
    let obj = Object.assign({}, props.supply)
    let indexed
    if(!!obj[associatedCategory]){
    indexed = obj[associatedCategory].indexOf(itemToDelete)
    obj[associatedCategory].splice(indexed, 1)
    }
    let objWrapper = {
        products: obj
    }
    await updateDoc(ref, objWrapper)
    let indexOfItem = results.indexOf(itemToDelete)
    let newResultsArray
    newResultsArray = [...results]
    newResultsArray[indexOfItem] = 'Removed'
    setResults(newResultsArray)
    setTimeout(() => {
    newResultsArray = [...results]
    newResultsArray.splice(indexOfItem, 1)
    setResults(newResultsArray)
    }, 1000)
  }

  return (
    <div className={styles.wrapper}>
        <form>
            <label className={styles.label}>
                <img src="/images/icons/magnifying-glass.png" width="25px" alt="magnifying-glass" className={styles.image}/>
                <input className={styles.input} type={"text"} onChange={handleChange} value={value} ref={inputRef} placeholder={value.length == 0 ? "Search your supply..." : ""}/>
            </label>
        </form>
        {value != '' && results.length > 0 && (
            <div className={styles.popup}>
                <Card>
                    <p>Click to delete from inventory</p>
                    <ul>
                        { results.map((item, index) =>
                        index < 3 && ( 
                            <li key={index} title={`remove ${item} from inventory`}>
                               <a role={'button'} onClick={() => removeItem(item)}>
                                {item}
                                <p>x</p>
                                </a> 
                            </li>
                        )
                        )}
                    </ul>
                </Card>
            </div>
        )}
    </div>
  )
}
