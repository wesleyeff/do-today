/**
 * Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
 */

import React, { useEffect } from 'react'
import PWAPrompt from 'react-ios-pwa-prompt'

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

    if (!dailyTasks) {
      setDailyTasks(defaultTasks)
      setTodaysTasks(defaultTasks)
    }

    if (!todaysTasks && dailyTasks) {
      dailyTasks.map((t) => {
        t.completed = false

        return t
      })
      setTodaysTasks(dailyTasks)
    }
  }, [dailyTasks, setDailyTasks, setTodaysTasks, todaysTasks])

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
      <div className="mx-2 mt-20">
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
      <PWAPrompt timesToShow={10} permanentlyHideOnDismiss={false} />
    </div>
  )
}

export default App
