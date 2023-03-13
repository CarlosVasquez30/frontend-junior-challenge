import React from "react";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { resetStatus } from "./store/slices/todo";
import TodoListItem from "components/TodoListItem";
import TodoInput from "components/TodoInput";
import TodoHeader from "components/TodoHeader";
import { useState } from "react";



const App = () => {
  
  var status = useSelector((state) => state.todos.status);
  if (status === "failed") {
    setTimeout(() => {
      status = "idle";
    }, 3000);
  }
  

  return (
      <><TodoHeader />
    <div className="todo-list-content">
      <TodoList />
      <TodoInput />
      <TodoResults />
      
    </div>
    
    <div className="error-api-div" style={(status === 'failed') ? {backgroundColor: '#ff0000', color: '#000'} : {color: '#000', backgroundColor: '#000'}}>La llamada a la API no tuvo exito</div>
    
    </>
  );
};

export default App;
