import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import axios from "axios";
import { Route, Routes } from "react-router";
import LoginForm from "./components/LoginForm";
import MainSection from "./components/MainSection";
import WelcomeTab from "./components/WelcomeTab";

function App() {
  const storedTasks = localStorage.getItem("tasks");
  const tasks = JSON.parse(storedTasks);

  const [allTasks, setAllTasks] = useState(tasks ? [...tasks] : []);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // * DONE!!!!!!!!!!!!!!
  const TriggerEditTask = (item) => {
    setTask(item.name);
    setEditId(item.id);
  };
  // * DONE!!!!!!!!!!!!!!
  const editTask = (e) => {
    e.preventDefault();
    if (editId) {
      const updatedTasks = allTasks.map((item) =>
        item.id === editId ? { ...item, name: task } : item,
      );

      setAllTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditId(null); // Reset edit mode
      setTask("");
    }
  };
  // * DONE!!!!!!!!!!!!!!
  const addTask = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 1;
    const name = task;
    const duplicateCheck = allTasks.some((task) => task.name === name);

    if (duplicateCheck) {
      alert("already exists");
      setTask("");
      return;
    }
    const newTask = {
      id,
      name,
      status: "todo",
    };
    const updatedTasks = [...allTasks, newTask];
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    setTask("");
  };
  // * DONE!!!!!!!!!!!!!!
  const deleteTask = (item) => {
    const UpdatedArray = allTasks.filter((task) => task.id !== item.id);

    localStorage.setItem("tasks", JSON.stringify(UpdatedArray));

    setAllTasks(UpdatedArray);

    alert("success!");
  };

  const moveRight = (item) => {
    const updatedTasks = allTasks.map((task) => {
      if (!task) return null; // to avoid null values
      if (task.id === item.id) {
        let newTask = task;
        if (task.status === "todo") {
          newTask = { ...task, status: "in-progress" };
        } else if (task.status === "in-progress") {
          newTask = { ...task, status: "done" };
        } else if (task.status === "done") {
          newTask = { ...task };
          deleteTask(newTask);
          return;
        }
        return newTask;
      }
      return task;
    });
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const moveLeft = (item) => {
    const updatedTasks = allTasks.map((task) => {
      if (!task) return null; // to avoid null values
      if (task.id === item.id) {
        let newTask = task;
        if (task.status === "todo") {
          newTask = { ...task };
        } else if (task.status === "in-progress") {
          newTask = { ...task, status: "todo" };
        } else if (task.status === "done") {
          newTask = { ...task, status: "in-progress" };
        }
        return newTask;
      }
      return task;
    });
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  //  * BACKEND STUFF
  // const apiCheck = () => {
  //   axios.get("http://localhost:3000").then((request) => {
  //     console.log(request.data);
  //   });
  // };

  return (
    <section className="app">
      <Routes>
        <Route path="/" element={<WelcomeTab />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/home" element={<MainSection />} />
      </Routes>
    </section>
  );
}

export default App;
