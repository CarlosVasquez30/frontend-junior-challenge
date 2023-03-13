import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../store/slices/todo";
import { useEffect } from "react";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const tareasRealizadas = todos.filter((todo) => todo.checked === true);
  const string_tareasRealizadas_cont = `Tareas realizadas: ${tareasRealizadas.length}`;

  return <div className="todo-results">{string_tareasRealizadas_cont}</div>;
};

export default TodoResults;
