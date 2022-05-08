import axios from "axios";
import React from "react";

const baseURL = "http://localhost:8000/api/todos/";

export default function App({newTodo, setNewTodo, editing, setEditing, todo, setTodo}) {

  const editedtodo = (todo) => {
    setNewTodo(todo);
    setEditing(true);
  };

  const deletetodo = (id) => {//on recupere l'id onClick
    axios.delete(baseURL + `${id}`);
    const newlist = todo.filter((task) => task.id !== id);
    //on filtre les todo, si l'id du todo est different de celui recupéré, on laisse sinon on supprime
    setTodo(newlist);
  };

  const completedtodo = (todo) => {
      axios.patch(baseURL + `${todo.id}`, {
        completed: !todo.completed,
        //on définit l'etat inverse de la todo selectionné lors du clic
      })
      .then(function (response) {
        //on ajoute les valeurs de newTodo dans le todo
        setNewTodo({id: '', title: '', description: '', date: ''});
        //une fois submit, les input sont reinitialisés
        if(response.status === 200){
          axios.get(baseURL).then((response) => {
            setTodo(response.data);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(todo);
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTodo(response.data);
    });
  }, []);

  if (!todo) return null;

  return (
      <ul>
        {todo.map(todo =><li className={`todo-item ${todo.completed ? "crossed-line" : ""}`} key={todo.id}>
            <div className="todo">
                <h1>{todo.title}</h1>
                <p>{todo.description}</p>
                <p>{todo.date}</p>
            </div>
            <button className="btn-complete" onClick={() => completedtodo(todo)}></button>
            <button className="btn-edited" onClick={() => editedtodo(todo)}></button>
            <button className="btn-delete"onClick={() => deletetodo(todo.id)}></button>
        </li>)}
      </ul>
      );
}