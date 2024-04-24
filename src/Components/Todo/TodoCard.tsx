import React, { useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch } from "react-redux";
import {
  RemoveTodo,
  UpdateTodo,
  ToggleTodoStatus,
} from "../TodoStore/TodoReducers";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(todo.text);

  const handleToggleEditMode = ():void => {
    setEditMode(!editMode);
  };

  const handleUpdateTodo = () => {
    dispatch(UpdateTodo({ id: todo.id, text: updatedText }));
    setEditMode(false);
  };

  const handleDeleteTodo = () => {
    dispatch(RemoveTodo(todo.id));
  };

  const checkStatus = () => {
    dispatch(ToggleTodoStatus( todo.id ));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-3 w-[22rem] md:w-[50rem]">
      <div className="flex items-center">
        <Checkbox
          color="primary"
          checked={todo.done}
          onChange={checkStatus}
          aria-label="Toggle Todo Status"
        />
        <div className="flex-grow ml-3 flex items-center">
          {editMode ? (
            <input
              className="border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring focus:border-blue-400 flex-grow"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              aria-label="Edit Todo Text"
            />
          ) : (
            <p
              className={`text-gray-600 break-words ${
                todo.done ? "line-through" : ""
              }`}
              aria-label={todo.done ? "Completed Todo" : "Todo"}>
              {todo.text}
            </p>
          )}
        </div>
        <div className="flex ml-3 items-center">
          {editMode ? (
            <IconButton
              aria-label="Save"
              onClick={handleUpdateTodo}
              title="Save Changes">
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Edit"
              onClick={handleToggleEditMode}
              title="Edit Todo">
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Delete"
            onClick={handleDeleteTodo}
            title="Delete Todo">
            <DeleteIcon className="text-red-400" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
