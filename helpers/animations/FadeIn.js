import React from 'react'
import { CSSTransition } from 'react-transition-group';

export default function FadeIn(props) {
  return (
    <CSSTransition
    in={props.in}
    timeout={props.timeout ? props.timeout : 300}
    classNames={{
    enter: 'fadeIn',
    enterDone: 'fadedIn',
    exit:  'fadeOut',
    exitActive:  'fadedOut'
    }}
    unmountOnExit
    >
    {props.children}
    </CSSTransition>
  )
}
