import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, markTodo, removeTodo } from "../../store/slices/todo";


const TareaItem = (todo) => {

  const dispatch = useDispatch();
  
  const checkTODO = () => {
    dispatch(markTodo(todo.id,todo.checked));
    
  }

  const moduloCheckBox = () => {
    
    return (
      <div onClick={checkTODO} className={(todo.checked) ? "checkbox_on" : "checkbox_off"}  style={{borderRadius: "100px"}}>
        ✓
      </div>
    );}
    
  
  
  const removeTODO = () => {
    
    dispatch(deleteTodo(todo.id));
  }

  return( <div className="todo-item" key={todo.id}>

        {moduloCheckBox()}

        <div className="label-item"><a className={(todo.checked) ? "todo-item-text-checked" : "todo-item-text"}>{todo.label}</a></div>
        <div onClick={removeTODO} className="btn-borrar-todo" style={{borderRadius: "5px"}}>
          <a>X</a>
        </div>
    
  </div>
);}

export default TareaItem;
