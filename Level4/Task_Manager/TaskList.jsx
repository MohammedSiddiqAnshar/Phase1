import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/add-task">Add New Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
