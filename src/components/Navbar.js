import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ newTodo }) {
  return (
    <nav className="navbar sticky-top bg-info">
      <h2 className="mx-auto">Do today...</h2>
      {/* <button type="button"> */}
      <FontAwesomeIcon icon={faPlus} size="2x" onClick={newTodo} />
      {/* </button> */}
    </nav>
  )
}
