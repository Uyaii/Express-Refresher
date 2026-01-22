/* eslint-disable no-unused-vars */
import React from "react";
import InputForm from "./InputForm";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import { useState } from "react";
const MainSection = ({ task, setTask, editId, setEditId, api }) => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${api}/home`);

        setAllTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [api]);
  //  * Backend stuff

  // * DONE!!!!!!!!!!!!!!
  const TriggerEditTask = (item) => {
    setTask(item.name);
    setEditId(item.id);
  };

  // * DONE!!!!!!!!!!!!!! X2
  const editTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${api}/editTask/${editId}`, {
        name: task,
      });

      setAllTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setEditId(null); // Reset edit mode
    setTask("");
  };
  // * DONE!!!!!!!!!!!!!! X2
  const addTask = async (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 1;
    const name = task;

    try {
      const response = await axios.post(`${api}/addTask`, {
        id,
        name,
        status: "todo",
      });
      if (response.data.message === "duplicate") {
        alert("duplicate");
      }
      setAllTasks(response.data);
    } catch (error) {
      console.log(error);
    }
    setTask("");
  };
  // * DONE!!!!!!!!!!!!!! X2
  const deleteTask = async (item) => {
    try {
      const response = await axios.delete(`${api}/deleteTask`, { data: item });

      setAllTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // * DONE!!!!!!!!!!!!!! X2
  const moveRight = async (item) => {
    console.log(item);
    try {
      if ((await item.status) === "done") {
        deleteTask(item);
        return;
      }
      const response = await axios.patch(`${api}/moveRight/${item.id}`);
      console.log(response.data);
      setAllTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const moveLeft = async (item) => {
    try {
      const response = await axios.patch(`${api}/moveLeft/${item.id}`);

      setAllTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* INPUT SECTION */}

      <InputForm
        task={task}
        setTask={setTask}
        editId={editId}
        editTask={editTask}
        addTask={addTask}
      />
      <section className="main-section">
        <div className="todo-section tasks">
          <h2>TODO</h2>
          <div className="list-container">
            {allTasks.map((task) => {
              if (task.status === "todo") {
                return (
                  <li key={task.id}>
                    <label htmlFor="name">
                      <button className="move-left" onClick={() => moveLeft(task)}>
                        {" "}
                        =={" "}
                      </button>
                      {task.name}
                      <button className="move-right" onClick={() => moveRight(task)}>
                        {" "}
                        =={" "}
                      </button>
                    </label>
                    <span className="buttons">
                      <button className="delete-btn" onClick={() => deleteTask(task)}>
                        Delete
                      </button>
                      <button className="edit-btn" onClick={() => TriggerEditTask(task)}>
                        Edit
                      </button>
                    </span>
                  </li>
                );
              }
            })}
          </div>
        </div>

        <div className="in-progress-section tasks">
          <h2>In Progress</h2>
          <div className="list-container">
            {allTasks.map((task) => {
              if (task.status === "in-progress") {
                return (
                  <li key={task.id}>
                    <label htmlFor="name">
                      {" "}
                      <button className="move-left" onClick={() => moveLeft(task)}>
                        {" "}
                        =={" "}
                      </button>
                      {task.name}
                      <button className="move-right" onClick={() => moveRight(task)}>
                        {" "}
                        =={" "}
                      </button>
                    </label>
                    <span className="buttons">
                      <button className="delete-btn" onClick={() => deleteTask(task)}>
                        Delete
                      </button>
                      <button className="edit-btn" onClick={() => TriggerEditTask(task)}>
                        Edit
                      </button>
                    </span>
                  </li>
                );
              }
            })}
          </div>
        </div>

        <div className="done-section tasks">
          <h2>Done</h2>
          <div className="list-container">
            {allTasks.map((task) => {
              if (task.status === "done") {
                return (
                  <li key={task.id}>
                    <label htmlFor="name">
                      {" "}
                      <button className="move-left" onClick={() => moveLeft(task)}>
                        {" "}
                        =={" "}
                      </button>
                      {task.name}
                      <button className="move-right" onClick={() => moveRight(task)}>
                        {" "}
                        =={" "}
                      </button>
                    </label>
                    <span className="buttons">
                      <button className="delete-btn" onClick={() => deleteTask(task)}>
                        Delete
                      </button>
                      <button className="edit-btn" onClick={() => TriggerEditTask(task)}>
                        Edit
                      </button>
                    </span>
                  </li>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
