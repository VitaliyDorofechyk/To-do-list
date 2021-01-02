import React, { useEffect } from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
import AddTodo from './Todo/AddTodo';
import Modal from './Modal/Modal'

const App = () => {
  let [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTodos(todos)
      })
  }, [])


  function toggleTodo(id) {
    setTodos(
      todos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    return todo
      })
    )
  };

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  };

  function addTodo (title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        }
      ])
    )
  }

  return (
    <Context.Provider value={{removeTodo: removeTodo}}>
      <div className='wrapper'>
        <h1> Список дел</h1>
        <Modal />

        <AddTodo onCreate={addTodo} />

        {todos.length ? (
           <TodoList todos={todos} onToggle={toggleTodo} /> 
           ) : ( 
           <p> Нет дел!!</p> 
           )}
      </div>
    </Context.Provider>
  )
};

export default App;


