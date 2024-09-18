import React, { useEffect, useState } from "react";
import { Pencil, Square, MessageSquare } from "lucide-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IconButton } from "@mui/material";
import fetchGetTask from "./fetchGetTask";
import fetchDeleteTask from "./fetchDeleteTask";
import EditTask from "./EditTask";

export default function ShowTasks() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);

  const [task, setTask] = useState({
    TaskID: "",
    Title: "",
    Description: "",
    Priority: 1,
    Repeat: false,
    Status: false,
  });

  const handleDeleteTask = async (TaskID) => {
    console.log(TaskID);
    fetchDeleteTask(TaskID);
    window.location.reload();
  };

  const handleEditTask = (todo) => () => {
    setTask(todo);
    setShow(true);
  };

  useEffect(() => {
    async function GetTask() {
      const data = await fetchGetTask();
      setTodos(data);
    }

    GetTask();
  }, []);

  const toggleTodo = (TaskID) => {
    handleDeleteTask(TaskID); // Call the delete function
    setTodos(todos.filter((todo) => todo.TaskID !== TaskID)); // Remove the task from state
  };

  return (
    <div className="w-4/5 mx-auto mt-4 bg-white">
      <ul className="divide-y divide-gray-200 " role="list">
        {todos.map((todo) => (
          <li
            key={todo.Title}
            className="flex items-center justify-between py-3 px-3 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Checkbox.Root
                className="w-5 h-5 border border-gray-300 rounded-full mr-3"
                checked={todo.Status}
                onCheckedChange={() => toggleTodo(todo.TaskID)}
                id={`todo-${todo.TaskID}`}
              >
                <Checkbox.Indicator className="flex items-center justify-center">
                  {todo.Status && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                htmlFor={`todo-${todo.TaskID}`}
                className={
                  todo.Status
                    ? "line-through text-gray-500 flex flex-row"
                    : "text-gray-900 flex flex-row"
                }
              >
                {todo.Title} | {todo.Description}
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <IconButton
                size="small"
                aria-label="Edit"
                onClick={handleEditTask(todo)}
              >
                <Pencil className="w-4 h-4" />
              </IconButton>
              <IconButton size="small" aria-label="Duplicate">
                <Square className="w-4 h-4" />
              </IconButton>
              <IconButton size="small" aria-label="Comment">
                <MessageSquare className="w-4 h-4" />
              </IconButton>
            </div>
          </li>
        ))}
        {todos.length === 0 && (
          <div className="flex items-center justify-center py-3 px-3">
            <p className="text-gray-500">No tasks available</p>
          </div>
        )}
      </ul>
      {show && (
        <EditTask show={show} onClose={() => setShow(false)} todo={task} />
      )}
    </div>
  );
}
