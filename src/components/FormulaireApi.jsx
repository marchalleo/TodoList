import React from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/todos/";

const Form = ({todo, setTodo, newTodo, setNewTodo, editing, setEditing}) => {
    const inputodo = (e) => {
        setNewTodo(currentNewTodo => ({ ...currentNewTodo, [e.target.name]: e.target.value }));
        //on modifie le newTodo avec les valeurs des inputs
    
    }
    const submitTodo = (e) => {
        e.preventDefault();//neutralise l'action par defaut

        axios.post(baseURL, {
            title: newTodo.title,
            description: newTodo.description,
            date: newTodo.date
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
    }

    const AnnulerModif = (e) => {
      setNewTodo({id: '', title: '', description: '', date: ''});
    }

    const editTodo = (e) => {
      e.preventDefault();//neutralise l'action par defaut


      axios.put(baseURL + newTodo.id, {
        title: newTodo.title,
        description: newTodo.description,
        date: newTodo.date
      })
      .then(function (response) {
        //on ajoute les valeurs de newTodo dans le todo
        setNewTodo({id: '', title: '', description: '', date: ''});
        //une fois submit, les input sont reinitialisés
        if(response.status === 200){
          axios.get(baseURL).then((response) => {
            setTodo(response.data);
            setEditing(false);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    const filterComplete = (e) => {
      e.preventDefault();//neutralise l'action par defaut'
        const filtercomplete = todo.filter(todo => todo.completed === true);
        setTodo(filtercomplete);

    }
    const filterNotComplete = (e) => {
      e.preventDefault();//neutralise l'action par defaut'
        const filtrenotcomplete = todo.filter(todo => todo.completed === false);
        setTodo(filtrenotcomplete);
    }
    const allTodo = (e) => {
      setTodo(todo);
    }
    
    return(
        <form>

            <input placeholder="titre" name="title" value={newTodo.title} type="text" onChange={inputodo}/>
            <input placeholder="description" name="description" value={newTodo.description} type="text" onChange={inputodo}/>
            <input name="date" value={newTodo.date} type="date" onChange={inputodo}/>
            { editing ? (
              <div>
                <button onClick={editTodo} type="submit">Modifier</button>
                <button onClick={AnnulerModif} type="submit">Annuler</button>
              </div>) : 
              (<button onClick={submitTodo} type="submit">Envoyer</button>)
            }

            <button onClick={filterComplete}>todo complétées</button>
            <button onClick={filterNotComplete}>todo à faire</button>
            <button onClick={allTodo}>All</button>
        </form>
    )
}

export default Form;