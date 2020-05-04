import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCheckCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'
import { findIndex, remove } from 'lodash'

export default function MyListItem({
  itemkey,
  text,
  isCompleted = false,
  handleTap,
  todaysTasks,
  setTodaysTasks,
  setDailyTasks,
}) {
  const [completed, setCompleted] = useState(isCompleted)
  const [deleted, setDeleted] = useState(false)

  function handleClick(e) {
    const task = text
    const newtasklist = todaysTasks.slice()

    if (e?.target?.id === 'delete-item' || deleted) {
      return
    }

    const taskindex = findIndex(newtasklist, (t) => t.task === task)
    const completedState = newtasklist[taskindex].completed
    newtasklist[taskindex].completed = !completedState
    setCompleted(!completed)
    setTodaysTasks(newtasklist)
  }

  function handleDelete(event) {
    // console.log('delete event', event.target.id)
    const shouldDelete = window.confirm('Are you sure you want to delete??')
    console.log('should delete? ', shouldDelete)

    const newtasklist = todaysTasks.slice()

    if (shouldDelete) {
      console.log('this should be deleted')
      remove(newtasklist, (t) => t.task === text)

      setDeleted(true)

      setTodaysTasks(newtasklist)
      setDailyTasks(newtasklist)
    }

    return
  }

  return (
    <div
      className={`
        max-w-sm 
        flex 
        mx-auto 
        m-3 
        p-5
        bg-white 
        rounded-lg 
        shadow-lg 
        ${completed ? 'bg-gray-100  text-gray-500' : 'hover:bg-blue-100'}
        `}
      id={itemkey}
    >
      <div className="mr-3 text-xl" onClick={handleClick}>
        <FontAwesomeIcon
          icon={completed ? faCheckCircle : faCircle}
          className=""
        />
      </div>

      <div
        className={`flex-grow ${completed ? 'line-through' : ''}`}
        onClick={handleClick}
      >
        <span className="text-2xl">{text}</span>
      </div>

      <button
        id="delete-item"
        onClick={handleDelete}
        className="text-2xl hover:bg-red-500 rounded py-1 px-1"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  )
}

MyListItem.propTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  handleTap: PropTypes.func,
}
