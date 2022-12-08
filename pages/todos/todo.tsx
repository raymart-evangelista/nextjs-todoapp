import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import Layout from "../components/layout"
import styles from "./todo.module.css"
import clsx from 'clsx'

function Header({ title }: {title: string}) {
  return <h1>{title ? title : 'Default title'}</h1>
}

export default function Todo() {
  // place is a union type
  type Todo = Readonly<{
    id: number
    text: string
    done: boolean
    place?: Place
  }>

  type Place = 'home' | 'work' | { custom: string } 

  // intersection types
  type CompletedTodo = Todo & {
    readonly done: true
  }

  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Do laundry', done: false, place: 'home' },
    { id: 2, text: 'Email boss', done: false, place: 'work' },
    { id: 3, text: 'Go to gym', done: true, place: { custom: 'Gym' }},
    { id: 4, text: 'Buy milk', done: false, place: { custom: 'Supermarket'}},
    { id: 5, text: 'Walk outside', done: true },
  ])
  const inputEl = useRef()
  const buttonEl = useRef()
  const [buttonHidden, setButtonHidden] = useState(false)

  function placeToString(place: Place): string {
    if (place === 'home') {
      return '🏠 Home'
    } else if (place === 'work') {
      return '🧑‍💻 Work'
    } else {
      return '📍' + place.custom
    }
  }

  function toggleTodo(todo: Todo): Todo {
    return {
      ...todo,
      done: !todo.done,
    }
  }
  
  function completeAll(todos: readonly Todo[]): CompletedTodo[]{
    return todos.map(todo => ({
      ...todo,
      done: true,
    }))
  }

  function handleInput(event: string) {
    setText(event)
  }

  function handleNewTodo(event: any) {
    if (event.code === 'Enter') {
      const newTodo = {
        id: todos.length > 0 ? todos[todos.length -1 ].id + 1 : 1,
        text: text,
        done: false,
      }

      setTodos(todos.concat(newTodo))
      // buttonEl.current.hidden = false
      setButtonHidden(false)

      event.target.value = ''
    }
  }

  function handleTaskStatus(clickedTodo: Todo) {
    setTodos(todos.map(todo => {
      if (todo.id === clickedTodo.id) {
        return toggleTodo(clickedTodo)
      } else {
        return todo
      }
    }))


  }

  function handleCompleteAll(e: any) {
    inputEl.current.focus()
    // buttonEl.current.hidden = true
    setButtonHidden(true)
    // e.currentTarget.hidden = true
    setTodos(completeAll(todos))
  } 
  useEffect(() => {
    console.log('inside use effect')
    // if any of the todos have 'done: false', 'mark all as complete' button should be enabled
    if (todos.some(todo => todo.done === false)) {
      console.log('some todos are not finished')
      setButtonHidden(false)
      buttonEl.current.hidden = buttonHidden
    }
    // if all the todos have 'done: true', 'mark all as complete' button should be disabled
    if (todos.filter(todo => todo.done === true).length === todos.length) {
      console.log('all todos are done')
      setButtonHidden(true)
      buttonEl.current.hidden = buttonHidden
    }


  }, [todos, buttonHidden])

  return (
    <Layout>
      <Head>
        <title>Todo App</title>
      </Head>
      <h1>Return to <Link href="/">Home</Link></h1>
      <Header title='Develop. Preview. Ship.'></Header>
      <h1>Todo App</h1>
      <input ref={inputEl} type="text" placeholder="Enter a todo task" onKeyDown={event => handleNewTodo(event)} onChange={event => handleInput(event.target.value)}/>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.container} onClick={() => handleTaskStatus(todo)}>
          {/* <input type="checkbox" onChange={event => handleTaskStatus(event)}/> */}
          <h1 className={clsx({
            [styles.taskDone]: todo.done === true,
            [styles.taskNotDone]: todo.done === false,
          })}>{todo.text}</h1>
          <h1 className={styles.place}>{todo.place && placeToString(todo.place)}</h1>
        </div>
      ))}
      <button ref={buttonEl} id="mark-all-button" onClick={handleCompleteAll}><h1>Mark all as complete</h1></button>
    </Layout>
  )
}