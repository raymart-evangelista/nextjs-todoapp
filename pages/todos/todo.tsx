import Link from "next/link"
import { useState, useEffect } from "react"
import Head from "next/head"
import Layout from "../components/layout"
import styles from "./todo.module.css"


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

// const testTodo: CompletedTodo = {
//   id: 1, 
//   text: '...',
//   done: false
// }

function toggleTodo(todo: Todo): Todo {
  return {
    id: todo.id,
    text: todo.text,
    done: !todo.done,
    // todo.done = !todo.done
  }
}

function completeAll(todos: readonly Todo[]): CompletedTodo[]{
  return todos.map(todo => ({
    ...todo,
    done: true
  }))
}

function placeToString(place: Place): string {
  if (place === 'home') {
    return '🏠 Home'
  } else if (place === 'work') {
    return '🧑‍💻 Work'
  } else {
    return '📍' + place.custom
  }
}

const place = 'home'
console.log(placeToString(place))

const todos = [
  { id: 1, text: 'Do laundry', done: false, place: 'home' },
  { id: 2, text: 'Email boss', done: false, place: 'work' },
  { id: 3, text: 'Go to gym', done: false, place: { custom: 'Gym' }},
  { id: 4, text: 'Buy milk', done: false, place: { custom: 'Supermarket'}},
]

console.log(
  completeAll(todos)
)

console.log(todos)

// const foo: Todo = {
//   id: 1,
//   text: '...',
//   done: true
// }

// console.log(foo)
// console.log(toggleTodo(foo))


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
      console.log(event)
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
        // <div className={styles.container}>
          // {/* <input type="checkbox" onChange={event => handleTaskStatus(event)}/> */}
          <h1 className={styles.taskName} key={todo}>{todo}</h1>

        // </div>
      ))}
    </Layout>
  )
}