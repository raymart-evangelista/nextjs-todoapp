import Link from "next/link"
import { useState, useEffect } from "react"
import Head from "next/head"
import Layout from "../components/layout"
import styles from "./todo.module.css"

type Todo = {
  id: number
  text: string
  done: boolean
}


function Header({ title }: {title: string}) {
  return <h1>{title ? title : 'Default title'}</h1>
}

export default function Todo() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  function handleInput(event: string) {
    setText(event)
  }

  function handleNewTodo(event: any) {
    if (event.code === 'Enter') {
      setTodos(todos.concat(text))
      event.target.value = ''
    }
  }

  function handleTaskStatus(event: any) {
    if (event.target.checked) {
      // strikethrough text
      console.log('im checked')
    }
  }

  useEffect(() => {
    // const keyDownHandler = (e: any) => console.log(`You pressed ${e.code}.`)
    // document.addEventListener("keydown", keyDownHandler)

    // return () => {
    //   document.removeEventListener("keydown", keyDownHandler)
    // }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Todo App</title>
      </Head>
      <h1>Return to <Link href="/">Home</Link></h1>
      <Header title='Develop. Preview. Ship.'></Header>
      <h1>Todo App</h1>
      <input type="text" name="" id="" placeholder="Enter a todo task" onKeyDown={event => handleNewTodo(event)} onChange={event => handleInput(event.target.value)}/>
      {todos.map((todo) => (
        <div className={styles.container}>
          <input type="checkbox" onChange={event => handleTaskStatus(event)}/>
          <h1 className={styles.taskName} key={todo}>{todo}</h1>

        </div>
      ))}
    </Layout>
  )
}