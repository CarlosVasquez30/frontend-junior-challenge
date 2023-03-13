import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './thunks';

const initialState = {
  todos: [],
  status: 'idle',
  error: null,
  largo: 0,
  llamadaApi: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
    resetStatus: (state) => {
      state.status = 'idle';
    },
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
        state.largo = action.payload.length;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload.data);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log(state.error, "error")
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (todoIndex >= 0) {
          state.todos[todoIndex] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const todoIndex = action.payload

        console.log(todoIndex)
        state.todos = state.todos.filter((todo) => todo.id !== todoIndex);
        console.log(state.todos)
        state.largo = state.todos.length
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log(state.error, "error")
        //cambiar state.status luego de 3 segundos a idle
        
      });
      
  },
});

export const { toggleTodo, resetStatus } = todosSlice.actions;

export default todosSlice.reducer;