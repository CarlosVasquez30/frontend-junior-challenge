
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const markTodo = (id,checked) => {
    return (dispatch) => {
      fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checked: !checked,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(updateTodo(data));
          
        })
        .catch((error) => console.log(error));
    };
  };

  

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
  try {
    const response = await axios.post('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos', newTodo);
    return response;
  } catch (error) {
    throw error;
  }
});


export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const { id, ...data } = updatedTodo;
  const response = await axios.patch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`, data);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    console.log("Deleting TODO with id: ", id);
    const response = await axios.delete(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${id}`);
    return id;
  });