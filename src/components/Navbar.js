import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ newTodo }) {
  return (
    <nav className="fixed top-0 w-full mx-auto flex items-center justify-between flex-wrap bg-green-500  px-6 py-3 shadow rounded-b">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-2xl tracking-tight">
          Do today...
        </span>
      </div>
      <button
        type="button"
        onClick={newTodo}
        className="bg-blue-200 text-purple-900 hover:bg-purple-900 hover:text-blue-200 py-1 px-4 rounded text-2xl "
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </nav>
  )
}
