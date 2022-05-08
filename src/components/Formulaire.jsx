import React from "react";

const Form = ({todo, setTodo, newTodo, setNewTodo}) => {
    const inputodo = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
        //on modifie le newTodo avec les valeurs des inputs
    }
    const submitTodo = (e) => {
        e.preventDefault();//neutralise l'action par defaut
        setTodo([...todo, newTodo]);
        //on ajoute les valeurs de newTodo dans le todo
        setNewTodo({id: '', title: '', description: '', date: ''});
        //une fois submit, les input sont reinitialisés
    }
    
    return(
        <form>
            <input name="title" value={newTodo.title} type="text" onChange={inputodo}/>
            <input name="description" value={newTodo.description} type="text" onChange={inputodo}/>
            <input name="date" value={newTodo.date} type="date" onChange={inputodo}/>
            <button type="submit" onClick={submitTodo}>submit</button>
        </form>
    )
}

export default Form;