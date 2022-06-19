import React from 'react'

export default function Image(props) {
  return (
    <div style={{width: props.width, height: props.height}} className="image-cont">
        <img src={props.src} alt={props.alt} />
    </div>
  )
}
