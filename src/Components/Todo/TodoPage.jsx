import React, { useState } from "react";
import TodoCard from "./TodoCard";
import { useSelector, useDispatch } from "react-redux";
import { AddTodo } from "../TodoStore/TodoReducers";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const TodoPage = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState(""); // State to store the new todo text
  const [showCompleted, setShowCompleted] = useState(false); // State to control the visibility of completed tasks

  const handleAddTodo = () => {
    // Dispatch the AddTodo action with the new todo text
    dispatch(AddTodo(newTodoText));
    // Clear the input field after adding the todo
    setNewTodoText("");
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  // Filter todos based on their status
  const incompleteTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="flex w-[22rem] md:w-[50rem] ">
        <input
          type="text"
          placeholder="Add a new todo"
          className="border border-gray-300 rounded-l-md px-4 py-2 flex-grow shadow-sm"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)} // Update newTodoText state on input change
          onKeyDown={(e) => e.code === "Enter" && handleAddTodo()}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md transition duration-300 ease-in-out"
          onClick={handleAddTodo} // Call handleAddTodo when button is clicked
        >
          Add Todo
        </button>
      </div>
      {todos.length > 0 ? (
        <>
          <div className="mt-8">
            {/* Render incomplete todos */}
            <div className="mb-5">
              {incompleteTodos.map((todo) => (
                <div key={todo.id} className="my-3">
                  <TodoCard todo={todo} />
                </div>
              ))}
            </div>

            {/* Button to toggle the visibility of completed tasks */}
            {completedTodos.length > 0 && (
              <button
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 border border-gray-300 rounded-md mb-4"
                onClick={toggleShowCompleted}>
                {showCompleted ? (
                  <>
                    <KeyboardArrowDownIcon /> Hide Completed {"("}
                    {completedTodos.length > 0 && completedTodos.length}
                    {")"}
                  </>
                ) : (
                  <>
                    <KeyboardArrowRightIcon /> Show Completed {"("}
                    {completedTodos.length > 0 && completedTodos.length}
                    {")"}
                  </>
                )}
              </button>
            )}

            {/* Render completed todos if showCompleted is true */}
            {showCompleted &&
              completedTodos.map((todo) => (
                <div key={todo.id} className="my-3">
                  <TodoCard todo={todo} />
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <h1 className=" text-2xl px-6 text-center md:text-3xl mt-48">
            Ready to conquer your day? Start making todos now 📝
          </h1>
        </>
      )}
    </div>
  );
};

export default TodoPage;
