import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((task) => setTasks((prev) => [...prev, task]));
    setNewTask({ title: "", description: "" });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks((prev) => prev.filter((task) => task._id !== id)));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description}{" "}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task title"
      />
      <input
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Task description"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default App;

