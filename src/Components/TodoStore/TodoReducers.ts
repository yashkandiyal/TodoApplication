import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface Todo {
  done: boolean;
  id: string;
  text: string;
}

interface RootState {
  todos: Todo[];
}

const loadTodosFromLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const initialState: RootState = {
  todos: loadTodosFromLocalStorage(),
};

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    AddTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        done: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    RemoveTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    UpdateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todos[index].text = text;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    ToggleTodoStatus: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.done = !todo.done;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
});

export const { AddTodo, RemoveTodo, UpdateTodo, ToggleTodoStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
