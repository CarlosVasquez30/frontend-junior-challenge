import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todo/todoSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    
  },
});

export default store;