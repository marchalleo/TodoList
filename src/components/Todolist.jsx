import React from "react";

const TodoList = ({todo, setTodo}) => {
    const deletetodo = (id) => {//on recupere l'id onClick
        const newlist = todo.filter((task) => task.id !== id);
        //on filtre les todo, si l'id du todo est different de celui recupéré, on laisse sinon on supprime
        setTodo(newlist);
    };
    const completedtodo = (id) => {
        const todocheck = todo.map((check) => check.id === id ? {...check, completed: !check.completed } :check);
        //on recupere les todo, et si l'id correspond à celui recupéré, on change l'etat completed avec son etat inverse (!check.completed)
        setTodo(todocheck);
    }

    return(
        <ul>
            {todo.map(todo =><li className={`todo-item ${todo.completed ? "crossed-line" : ""}`} key={todo.id}>
                <div className="todo">
                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <p>{todo.date}</p> 
                </div>
                <button className="btn-complete" onClick={() => completedtodo(todo.id)}></button>
                <button className="btn-delete"onClick={() => deletetodo(todo.id)}></button>
            </li>)}
        </ul>
    )
}

export default TodoList;