import Link from "next/link"
import { useState, useEffect } from "react"

function Header({ title }: {title: string}) {
  return <h1>{title ? title : 'Default title'}</h1>
}

export default function Todo() {
  const names = ['Raymart Evangelista', 'Ray Evan', 'Rayamrt Evan']

  const [likes, setLikes] = useState(0)
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<string[]>([])
  // const [todos, setTodos] = useState([])

  function handleClick() {
    setLikes(likes + 1)
  }

  function handleInput(event: string) {
    setText(event)
  }

  function handleInputDown(event: any) {
    if (event.code === 'Enter') {
      setTodos(todos.concat(text))
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
    <>
      <h1>Return to <Link href="/">Home</Link></h1>
      <Header title='Develop. Preview. Ship.'></Header>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
      <h1>Todo App</h1>
      <input type="text" name="" id="" onKeyDown={event => handleInputDown(event)} onChange={event => handleInput(event.target.value)}/>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  )
}