import React from 'react'
import { CSSTransition } from 'react-transition-group';

export default function SlideDown(props) {
  return (
    <CSSTransition
    in={props.in}
    timeout={props.timeout ? props.timeout : 300}
    classNames={{
    enter: 'slideDown',
    enterDone: 'slidDown',
    exit:  'slideOut',
    exitActive:  'slidOut'
    }}
    unmountOnExit
    >
    {props.children}
    </CSSTransition>
  )
}
