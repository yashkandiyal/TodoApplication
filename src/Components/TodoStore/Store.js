import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './TodoReducers'
export const Store = configureStore({
  reducer: todoReducer,
});