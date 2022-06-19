import React from 'react'
import Link from 'next/link'

export default function innerLink(props) {
  return (
    <Link href={props.path}>
        <a>{props.text}</a>
    </Link>
  )
}
