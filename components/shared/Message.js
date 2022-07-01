import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FadeIn from '../../helpers/animations/FadeIn'
import { setPopup } from '../../redux/appSlicer'
import styles from '../../styles/components/Message.module.css'

export default function Message() {

  const dispatch = useDispatch()
  const {app} = useSelector(state => state)
  function handleClose() {
    dispatch(setPopup(''))
  }
  return (
    <FadeIn in={app !== ''}  timeout={800}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h2>{app}</h2>
            <span className={styles.closeBtn} onClick={handleClose}>
              X
            </span>
        </div>
      </div>
    </FadeIn>
  )
}
