/**
 * Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
 */

import React, { useEffect, useState } from 'react'
import { findIndex } from 'lodash'

import Navbar from './components/Navbar'
import MyListItem from './components/MyListItem'
import { useLocalStorage } from './hooks'

function App() {
  let today = new Date().toLocaleDateString()
  let [dailyTasks, setDailyTasks] = useLocalStorage('daily')
  // let [dailyTasks, setDailyTasks] = useState()
  let [todaysTasks, setTodaysTasks] = useLocalStorage(today)

  useEffect(() => {
    const defaultTasks = [
      {
        task: 'take control of your productivity',
        completed: true,
      },
      {
        task: 'Walk the dog',
        completed: false,
      },
    ]

    // const storedDailytasks =  : []
    if (!dailyTasks) {
      // setDailyTasks(JSON.stringify(defaultTasks))
      setDailyTasks(defaultTasks)
    }
    if (!todaysTasks) {
      const clearedTodaysTasks = dailyTasks.map((t) => {
        t.completed = false

        return t
      })
      setTodaysTasks(dailyTasks)
    }
  }, [dailyTasks, setDailyTasks, setTodaysTasks])

  function newTodo(e) {
    const newtasktext = prompt('Enter new daily task')

    if (newtasktext) {
      const newtask = { task: newtasktext, completed: false }
      const newdailytasklist = dailyTasks.slice()
      newdailytasklist.push(newtask)

      const newtodaytasklist = todaysTasks.slice()
      newtodaytasklist.push(newtask)

      setDailyTasks(newdailytasklist)
      setTodaysTasks(newtodaytasklist)
    }
  }

  return (
    <div className="App">
      <Navbar newTodo={newTodo} />
      {todaysTasks && todaysTasks.length > 0 ? (
        todaysTasks.map((t) => (
          <MyListItem
            key={t.task}
            // itemkey={t.task}
            text={t.task}
            isCompleted={t.completed}
            // handleTap={handleTap}
            todaysTasks={todaysTasks}
            setTodaysTasks={setTodaysTasks}
            dailyTasks={dailyTasks}
            setDailyTasks={setDailyTasks}
          />
        ))
      ) : (
        <div>No tasks today!</div>
      )}
    </div>
  )
}

export default App
