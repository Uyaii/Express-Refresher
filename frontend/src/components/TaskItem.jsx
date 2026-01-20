import React from "react";

const TaskItem = ({ allTasks, editTask, deleteTask, moveLeft,moveRight, TriggerEditTask }) => {
  return (
    <>
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
                <button
                  className="edit-btn"
                  onClick={(e) => TriggerEditTask(e)}>
                  Edit
                </button>
              </span>
            </li>
          );
        } else if (task.status === "in-progress") {
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
                <button className="edit-btn" onClick={(e) => editTask(e)}>
                  Edit
                </button>
              </span>
            </li>
          );
        } else if (task.status === "done") {
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
                <button className="edit-btn" onClick={(e) => editTask(e)}>
                  Edit
                </button>
              </span>
            </li>
          );
        }
      })}
    </>
  );
};

export default TaskItem;
