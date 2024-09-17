import React, { useRef, useEffect, useState } from "react";
import fetchNewTask from "./fetchNewTask";
import Button from "@mui/material/Button"; // MUI Button
import TextField from "@mui/material/TextField"; // MUI TextField
import Select from "@mui/material/Select"; // MUI Select
import MenuItem from "@mui/material/MenuItem"; // MUI MenuItem
import InputLabel from "@mui/material/InputLabel"; // MUI InputLabel
import FormControl from "@mui/material/FormControl"; // MUI FormControl
import {
  CalendarIcon,
  FlagIcon,
  BellIcon,
  InboxIcon,
  MoreHorizontal,
} from "lucide-react";

function NewTaskForm({
  show,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
}) {
  const [error, setError] = useState("");
  const [project, setProject] = useState(""); // State for select value
  const modalRef = useRef(null);

  const handleNewTask = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    const response = await fetchNewTask({
      Title: title,
      Description: description,
      Priority: 1,
      Repeat: false,
      status: false,
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-6 w-100 rounded shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add Task</h3>
            <button onClick={onClose} aria-label="Close form">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleNewTask}>
            {/* Task name input using MUI TextField */}
            <TextField
              label="Task name"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />

            {/* Task description input using MUI TextField with multiline */}
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />

            {/* Task action buttons */}
            <div className="flex space-x-2">
              <Button variant="outlined" startIcon={<CalendarIcon />}>
                Due date
              </Button>
              <Button variant="outlined" startIcon={<FlagIcon />}>
                Priority
              </Button>
              <Button variant="outlined" startIcon={<BellIcon />}>
                Reminders
              </Button>
              <Button variant="outlined">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Material UI Select for project selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="project-select-label">Project</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                value={project}
                label="Project"
                onChange={(e) => setProject(e.target.value)}
              >
                <MenuItem value="inbox">
                  <InboxIcon className="h-4 w-4 mr-2" />
                  Inbox
                </MenuItem>
                {/* Add more project options here */}
              </Select>
            </FormControl>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" onClick={handleNewTask}>
                Add task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTaskForm;
