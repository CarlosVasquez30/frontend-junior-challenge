import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../../store/slices/todo";

const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [hoverBtn, setHoverBtn] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);
  const [error_str, setError_str] = useState('');

  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);




  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue != ""){
      const newTodo = {
        id: todos.length,
        label: inputValue,
        checked: false,
      };
      try {
        const response = await dispatch(addTodo(newTodo)).unwrap();
        console.log(response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        
      }
      setInputValue("");
      
      console.log(todos)
    }else{
      setError_str('¡No se puede agregar una tarea vacía!')
      setMostrarError(true);
      setTimeout(() => {
        setMostrarError(false);
      }, 3000);
    }
  };

  const TodoErrorMsg = (error_str) => {
    return <div className="todo-error-msg">{error_str}</div>;
  };

  return (
    <div className="todo-input-container">
  <div className="todo-input-div">
    <input
      type="text"
      className="todo-input"
      placeholder="Agregar nueva tarea"
      value={inputValue}
      onChange={handleInputChange}
      style={hoverBtn
        ? { backgroundColor: "#000" }
        : { backgroundColor: "#7000FF" }} />
    <button onMouseEnter={() => setHoverBtn(true)} onMouseLeave={() => setHoverBtn(false)}
      className="todo-input-button" onClick={handleAddTodo} style={!hoverBtn ? { backgroundColor: "#000" }
        : { backgroundColor: "#7000FF" }}>
      Agregar
    </button>
  </div>
  {mostrarError ? <div className="todo-error-msg">{error_str}</div> : null}
</div>
    
  );
};

export default TodoInput;