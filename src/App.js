import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { MdModeEditOutline, MdDeleteOutline, MdDoneOutline, MdCheckCircleOutline, MdOutlineCircle } from 'react-icons/md'
import './style/App.css'

function App() {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [IsEdit, setIsEdit] = useState(null)
    const [EditText, setEditText] = useState("")

    useEffect(() => {
        const localJson = JSON.parse(localStorage.getItem("todos"))
        if(localJson){
            setTodos(localJson)
        }
    },[])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTodo = {
            id: v4(),
            text: todo,
            completed: false
        }
        setTodos([newTodo, ...todos])
        setTodo('')
    }

    const handleDelete = (id) => {
        const updateTodos = todos.filter((todo) => todo.id !== id)
        setTodos(updateTodos)
    }

    const handleEdit = (id) => {
        const updateTodos = todos.map((todo) => {
            if(todo.id === id){
                todo.text = EditText
            }
            return todo
        })
        setTodos(updateTodos)
        setIsEdit(null)
        setEditText("")
    }

    const handleCompleted = (id) => {
        const updateTodos = todos.map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(updateTodos)
    }

  return (
    <div className='app'>
        <header>Todo List</header>
        <form className='form' onSubmit={handleSubmit}>
            <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} placeholder='Please enter your todo...' required maxLength='70' />
            <button type='submit'>Add Todo</button>
        </form>
        <div className='list'>
            {todos.map((todo) => {
                return (
                    <div className='item' key={todo.id} >
                        <div className='item-content'>
                        {IsEdit === todo.id ? (
                            <input type='text' onChange={(e) => setEditText(e.target.value)} value={EditText} maxLength='60' />
                            ) : (
                            <p className={todo.completed ? 'completed' : ''}>{todo.text}</p>
                            )
                        }
                        </div>
                        {IsEdit === todo.id ? (
                        <div className='btn-group'>
                            <button className='btn' onClick={() => handleEdit(todo.id)}><MdDoneOutline /></button>
                            <button className='btn' onClick={() => handleDelete(todo.id)}><MdDeleteOutline /></button>
                        </div>
                        ) : (
                        <div className='btn-group'>
                            <label htmlFor={`${todo.id}`}>{todo.completed ? <MdCheckCircleOutline /> : <MdOutlineCircle />}</label>
                            <input type='checkbox' onChange={() => handleCompleted(todo.id)} checked={todo.completed} id={`${todo.id}`} />
                            <button className='btn' onClick={() => setIsEdit(todo.id)}><MdModeEditOutline /></button>
                            <button className='btn' onClick={() => handleDelete(todo.id)}><MdDeleteOutline /></button>
                        </div>
                        )}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default App