import React, { useEffect, useState } from "react";
import { Pencil, Square, MessageSquare } from "lucide-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IconButton } from "@mui/material";
import fetchGetTask from "./fetchGetTask";

export default function ShowTasks() {
  const [todos, setTodos] = useState([]);

  const handleEditTask = () => {};

  useEffect(() => {
    async function GetTask() {
      const data = await fetchGetTask();
      setTodos(data);

      console.log(data);
    }

    GetTask();
  }, []);

  const toggleTodo = (TaskID) => {
    setTodos(
      todos.map((todo) =>
        todo.TaskID === TaskID ? { ...todo, Status: !todo.Status } : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white">
      <ul className="divide-y divide-gray-200" role="list">
        {todos.map((todo) => (
          <li
            key={todo.Title}
            className="flex items-center justify-between py-3 px-3"
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
                  todo.Status ? "line-through text-gray-500" : "text-gray-900"
                }
              >
                {todo.Description}
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <IconButton size="small" aria-label="Edit">
                {/* <button onClick={handleEditTask}> */}
                <Pencil className="w-4 h-4" />
                {/* </button> */}
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
      </ul>
    </div>
  );
}
