import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/components/AddProducts.module.css'
import { categories } from '../../helpers/categories'
import axios from 'axios'
import ListChangesPreview from '../profile/ListChangesPreview'
import { useDispatch, useSelector } from 'react-redux'
import { addItems } from '../../redux/localSupplySlicer'
import checkDoubles from '../../helpers/checkDoubles'
import FadeIn from '../../helpers/animations/FadeIn'
import SlideDown from '../../helpers/animations/slideDown'

export default function AddProducts(props) {
    const [activeCat, setActiveCat] = useState('')
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [authComplete , setAutoComplete] = useState([])
    const [error, setError] = useState('')
    const containerRef = useRef()
    const categoryRef = useRef()
    const inputRef = useRef()
    const dispatch = useDispatch()
    const { userSupply } = useSelector(state => state)

    useEffect(() => {
      if(value != '') {
          setLoading(true)
          axios.get(`/api/data/${value}`)
          .then((result) => {
            setAutoComplete(result.data)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
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
      setValue('')
      handleSubmit(e)
    }
    async function handleSubmit(e) {
      e.preventDefault()
      let checkDB = false
      let checkLocal = false
      const refferedValue = e.target.value ? e.target.value : value 
      if(userSupply){
      checkLocal = await checkDoubles(Object.values(userSupply), refferedValue)
      }
      if(props.data) {
      checkDB = await checkDoubles(Object.values(props.data), refferedValue)
      }   
      if ( !checkLocal && !checkDB){
      dispatch(addItems({category: activeCat, ingredient: refferedValue}))
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
            <div className="btnBox">
                {categories.map((item, key) => (
                    <button key={key} className={activeCat === item ? 'active' : null} onClick={activeCategory} ref={categoryRef} data-id={item}>
                      <img src={`/images/icons/${item}.png`} width="45px" alt="food icon"/>
                      <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                    </button>
                ))}
            </div>
            <SlideDown in={activeCat !== ''}>
            <div className={styles.rightBox}>
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
                    {!loading ? (
                      <FadeIn in={authComplete?.length > 0 && activeCat != '' && value != ''} timeout={500}>
                      <div className={styles.optionsCont}>
                        <p>Suggestions:</p>
                          {authComplete?.map((item, key) => (
                          <label key={key}>
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                            <input name="option" type="radio" className={styles.singleOption} value={item.name} onChange={handleOptionPick} tabIndex={key}/>
                          </label>
                        ))} 
                      </div>
                    </FadeIn> 
                    ) : (
                    <FadeIn in={activeCat != '' && value != ''} timeout={500}>
                      <img style={{float: 'left', margin: '10% 0'}}className='loader' width={'35px'} src="images/icons/loader.svg" alt="loader" />
                    </FadeIn>
                    )}                                                   
                  </form>
                  <FadeIn in={error.length > 0}>
                    <div className={styles.error}>
                      <p>{error}</p>
                    </div>
                  </FadeIn>
            </div>
            </SlideDown>
        </div>
        </div>
        <FadeIn in={userSupply && Object.keys(userSupply).length !== 0}>
          <div className={styles.listPreviewCont}> 
              <ListChangesPreview list={userSupply} supplyDocId={props.supplyDocId} toggle={props.toggle}/>
          </div>
        </FadeIn>
    </div>
  )
}
