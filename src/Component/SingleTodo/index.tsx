import React, { useEffect, useRef } from 'react'
import './index.css'
import { Todo } from '../../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  }

  const hanldeDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided) => (
          <form className='todos__single' onSubmit={(e) => { handleEdit(e, todo.id) }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            {
              edit ?
                (
                  <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos__single--text' ref={inputRef} />
                ) : todo.isDone ? (
                  <s className="todos__single--text">{todo.todo}</s>
                ) : (
                  <span className="todos__single--text">{todo.todo}</span>
                )
            }

            <div className='icon__group'>
              <span className="icon" onClick={() => { !edit && !todo.isDone ? setEdit(!edit) : setEdit(false) }}>
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => hanldeDelete(todo.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo