/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm.jsx";
import axios from "axios";
import { Route, Routes } from "react-router";
import LoginForm from "./components/LoginForm.jsx";
import MainSection from "./components/MainSection.jsx";
import WelcomeTab from "./components/WelcomeTab.jsx";

function App() {
  const storedTasks = localStorage.getItem("tasks");
  const tasks = JSON.parse(storedTasks);

  const [allTasks, setAllTasks] = useState(tasks ? [...tasks] : []);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const api = "http://localhost:3000";
  
  //  * BACKEND STUFF
  // const apiCheck = () => {
  //   axios.get("http://localhost:3000").then((request) => {
  //     console.log(request.data);
  //   });
  // };

  return (
    <section className="app">
      <Routes>
        <Route index path="/" element={<WelcomeTab />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/home"
          element={
            <MainSection
              allTasks={allTasks}
              tasks={tasks}
              editId={editId}
              setEditId={setEditId}
              task={task}
              setTask={setTask}
              api={api}
            />
          }
        />
      </Routes>
    </section>
  );
}

export default App;
