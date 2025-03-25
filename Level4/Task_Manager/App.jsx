import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "./LoginForm";
import TaskList from "./schemas/TaskList";
import TaskForm from "./TaskForm";

const AuthContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
        
  <Route path="/" element={user ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
  <Route path="/login" element={<LoginForm />} />
  <Route path="/tasks" element={user ? <TaskList tasks={tasks} fetchTasks={fetchTasks} /> : <Navigate to="/login" />} />
  <Route path="/add-task" element={user ? <TaskForm fetchTasks={fetchTasks} /> : <Navigate to="/login" />} />
</Routes>

        
      </Router>
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default App;
