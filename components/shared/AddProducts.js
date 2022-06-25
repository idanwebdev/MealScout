import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/AddProducts.module.css'
import { categories } from '../../helpers/categories'
import axios from 'axios'
import ListChangesPreview from '../profile/ListChangesPreview'
import { useDispatch, useSelector } from 'react-redux'
import { addItems } from '../../redux/localSupplySlicer'
import checkDoubles from '../../helpers/checkDoubles'

export default function AddProducts(props) {
    const [activeCat, setActiveCat] = useState('')
    const [value, setValue] = useState('')
    const [authComplete , setAutoComplete] = useState([])
    const [error, setError] = useState('')
    const containerRef = useRef()
    const categoryRef = useRef()
    const inputRef = useRef()
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userSupply)

  
    useEffect(() => {
      if(value != '') {
        axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&apiKey=4260086b1ef947b7badef2464476bdaa&number=4`)
        .then((result) => {
          setAutoComplete(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }, [value])
  function activeCategory(e) {
    setActiveCat(e.target.dataset.id)
  }

  function handleInputChange(e) {
    setValue(inputRef.current.value)
  }
  function handleOptionPick(e) {
    setValue(e.target.value)
  }
  async function handleSubmit(e) {
    e.preventDefault() 
    const checkLocal = await checkDoubles(Object.values(userList), value)

    const checkDB = await checkDoubles(Object.values(userList), value)
    
    if ( !checkLocal && !checkDB){
    dispatch(addItems({category: activeCat, ingredient: value}))
    }else {
      setError('You already own this ingredient')
      setTimeout(() => {
        setError('')
      }, [2000])
    }
    setValue('')
  }
  return (
    <div className={styles.wrapper}>
       <div className={styles.container} ref={containerRef}>
        <a role={'button'} className={styles.closeBtn} onClick={() => {props.toggle()}}>
        x
        </a>
        {activeCat == '' ? (
        <>
          <h2>Pick a category and add related products</h2>
          <p>the items will be added to your inventory, 
            it will help us recommend great recepies for you, 
            based on your food supply.</p>
        </>
        ) : (
          <h2>Add ingredients</h2>
        )}
        <div className={styles.bottomBox}>
            <div className={styles.btnBox}>
                {categories.map((item, key) => (
                    <button key={key} className={activeCat === item ? styles.active : null} onClick={activeCategory} ref={categoryRef} data-id={item}>
                      <img src={`/images/icons/${item}.png`} width="45px" alt="food icon"/>
                      <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                    </button>
                ))}
            </div>
            <div className={styles.rightBox}>
              {activeCat !== '' && (
                <>
                  <h3>Add products to {activeCat} supply</h3>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.searchCont}>
                      <label className={styles.label}>
                        Search for products
                        <input className={styles.input} type='text' value={value} ref={inputRef} onChange={handleInputChange}/>
                      </label>
                      <label className={styles.submitCont} title={'Add to supply'}>
                        <img src="images/icons/plus.png" width="20px" alt="plus icon" />
                        <input className={styles.submit} type={'submit'} disabled={value == '' ? true : false}/>
                      </label>
                    </div>
                    <div className={styles.optionsCont}>
                      {authComplete.length > 0 && activeCat != '' && value != '' && (
                      <>
                        <p>Suggestions:</p>
                        {authComplete.map((item, key) => (
                        <label key={key}>
                          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                          <input name="option" type="radio" className={styles.singleOption} value={item.name} onChange={handleOptionPick}/>
                        </label>
                        ))}                    
                      </>          
                      )}
                    </div>
                  </form>
                  {error.length > 0 && (
                    <div className={styles.error}>
                      <p>{error}</p>
                    </div>
                  )}
                </>
              )}
            </div>
        </div>
        </div>
        {userList && Object.keys(userList).length !== 0 && (
        <div className={styles.listPreviewCont}> 
            <ListChangesPreview list={userList} supplyDocId={props.supplyDocId}/>
        </div>
        )}
    </div>
  )
}
