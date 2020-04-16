import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCheckCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import { findIndex, remove } from 'lodash'

// const Div = styled.div`
const Div = styled.div`
  border: 1px solid;
  padding: 15px;
  font-size: 25px;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`

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

  function handleClick(e) {
    // console.log('you rang?')
    // setCompleted(!completed)
    // handleTap(e)

    const task = text
    const newtasklist = todaysTasks.slice()

    if (e.target.id === 'delete-item') {
      const shouldDelete = window.confirm('Are you sure you want to delete??')
      console.log('should delete? ', shouldDelete)

      if (shouldDelete) {
        console.log('this should be deleted')
        const removedTaskList = remove(newtasklist, (t) => t.task === task)

        setTodaysTasks(newtasklist)
        setDailyTasks(newtasklist)
      }

      return
    }

    const taskindex = findIndex(newtasklist, (t) => t.task === task)
    const completedState = newtasklist[taskindex].completed
    newtasklist[taskindex].completed = !completedState
    setCompleted(!completed)
    setTodaysTasks(newtasklist)
  }

  return (
    <Div completed={completed} onClick={handleClick} id={itemkey}>
      <FontAwesomeIcon
        icon={completed ? faCheckCircle : faCircle}
        className="mr-3"
        // id={itemkey}
      />
      <span>{text}</span>
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="float-right"
        id="delete-item"
        // onClick={(e) => {
        //   console.log('deleting ', text)
        // }}
      />
    </Div>
  )
}

MyListItem.propTypes = {
  // itemkey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  handleTap: PropTypes.func,
}
