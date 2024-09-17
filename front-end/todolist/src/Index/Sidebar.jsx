import React, { useState } from "react";
import TaskFormModal from "./newTaskForm";
import logo from "./image/owner.jpg";

const Sidebar = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleNewTask = () => {
    setShowTaskForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields.");
      return;
    }
    setTitle("");
    setDescription("");
    setError("");
    setShowTaskForm(false);
  };

  return (
    <aside className="bg-white w-64 border-r border-gray-200 flex flex-col justify-between">
      <div className="p-4">
        {/* Profile */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={logo}
            alt="huhu"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <span className="text-gray-800 font-semibold">khongcoten002</span>
          </div>
        </div>

        {/* Add task button */}
        <button
          className="w-full text-left py-2 px-3 text-red-500 hover:bg-gray-100 rounded flex flex-row"
          onClick={handleNewTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add task
        </button>

        {/* Navigation */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-red-100 hover:text-red-500 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h
                    3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                  />
                </svg>
                <span className="ml-3">Inbox</span>
                <span className="ml-auto text-sm text-gray-400">2</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-red-100 hover:text-red-500 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <span className="ml-3">Today</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Projects */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500">My Projects</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                <span>My work 🍎</span>
                <span className="ml-auto text-sm text-gray-400">6</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                <span>Home 🏡</span>
                <span className="ml-auto text-sm text-gray-400">5</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        show={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </aside>
  );
};

export default Sidebar;
