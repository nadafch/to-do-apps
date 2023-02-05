import React, { useState } from 'react';
import './App.css';
import InputField from './Component/InpuField'
import { Todo } from './model';
import { TodoList } from './Component/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [listTodos, setListTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setListTodos([...listTodos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add; let active = listTodos; let complete = completedTodos;

    if (source.droppableId === 'Todolist') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'Todolist') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setListTodos(active);
    
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className='header'>TO-DO-LIST</div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={listTodos} setTodos={setListTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>

  );
}

export default App;
