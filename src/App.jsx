import React, { useState, useEffect } from 'react';
import './App.css'
import uuid from 'react-native-uuid';
//components
import FormApi from './components/FormulaireApi';
import TodoListApi from './components/Todolistapi';

function App() {
  //state
  const [todo, setTodo] = useState([]);

  const [newtodo, setNewTodo] = useState({id: uuid.v4(), title: '', description: '', date: '', completed: ''});
  //const par défaut (formulaire)

  const [editing, setEditing] = React.useState(false);
  return(
    <div className="App">
      <header>
        <h1>Todolist</h1>
      </header>
      <FormApi
        todo={todo}
        setTodo={setTodo}
        newTodo={newtodo}
        setNewTodo={setNewTodo}
        editing={editing}
        setEditing={setEditing}
      /*on exporte les states et les const dans le component Form*/
      />
      <TodoListApi
        todo={todo}
        setTodo={setTodo}
        newTodo={newtodo}
        setNewTodo={setNewTodo}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  )
}

export default App
