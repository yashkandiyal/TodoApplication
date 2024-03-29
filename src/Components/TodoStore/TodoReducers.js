import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid is used to generate unique id's
// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : []; // If todos exist in local storage, parse and return them. Otherwise, return an empty array.
};

const initialState = {
  todos: loadTodosFromLocalStorage(), // Load todos from local storage when initializing state
};

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    AddTodo: (state, action) => {
      const NewTodo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(NewTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Update local storage after adding todo
    },
    RemoveTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Update local storage after removing todo
    },
    UpdateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].text = action.payload.text;
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Update local storage after updating todo
    },
    ToggleTodoStatus: (state, action) => {
      const { id } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1 && !state.todos[todoIndex].done) {
        state.todos[todoIndex].done = true; // Mark the task as completed if it's currently incomplete
        localStorage.setItem("todos", JSON.stringify(state.todos)); // Update local storage after toggling todo status
      }
    },
  },
});

export const { AddTodo, RemoveTodo, UpdateTodo, ToggleTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;
