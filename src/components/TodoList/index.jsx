import React from "react";
import { Component } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { traerTareas } from "../../store/slices/todo";
import "./styles.css";
import TareaItem from "components/TodoListItem";
import { fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodo } from '../../store/slices/todo';

const cargandoModulo = () => {
  return (
    <div className="todo-list-content">
      <div className="todo-item">
        <div className="todo-item-content">
          <div className="todo-item-content-text">Cargando...</div>
        </div>
      </div>
    </div>
  );
};



const tareasModulo = (tareas) => {
  return (
    tareas.map((todo) => (
      TareaItem(todo)
    )))}

const mostrarTareas = (estaCargando, tareas) => {
  
  return(
  <div className="todo-list-content-div"><div className="todo-list-subdiv">{(estaCargando) ? cargandoModulo() : tareasModulo(tareas)}</div></div>
  )
}

const sinTareas = () => {
  return(<div style={{color: '#fff'}} className="no-todo-content-div">
  No tienes ninguna tarea por hacer!
</div>)
}

const TodoList = () => {

  

  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const largo_todos = useSelector((state) => state.todos.largo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  


  const handleDeleteTodo = async (id) => {
    dispatch(deleteTodo(id));
  };

  console.log('largo todos',largo_todos)
  return (
    <div className="todo-list">
        {(largo_todos > 0) ? mostrarTareas(status === 'loading', todos) : sinTareas()}
        
    </div>
  );
};

export default TodoList;
