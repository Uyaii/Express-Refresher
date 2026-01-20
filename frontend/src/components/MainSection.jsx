import React from "react";

const MainSection = ({
  task,
  setTask,
  editId,
  editTask,
  addTask,
  moveLeft,
  moveRight,
  deleteTask,
  allTasks,
  TriggerEditTask,
}) => {
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
                      <button
                        className="move-left"
                        onClick={() => moveLeft(task)}>
                        {" "}
                        =={" "}
                      </button>
                      {task.name}
                      <button
                        className="move-right"
                        onClick={() => moveRight(task)}>
                        {" "}
                        =={" "}
                      </button>
                    </label>
                    <span className="buttons">
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task)}>
                        Delete
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => TriggerEditTask(task)}>
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
                      <button
                        className="move-left"
                        onClick={() => moveLeft(task)}>
                        {" "}
                        =={" "}
                      </button>
                      {task.name}
                      <button
                        className="move-right"
                        onClick={() => moveRight(task)}>
                        {" "}
                        =={" "}
                      </button>
                    </label>
                    <span className="buttons">
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task)}>
                        Delete
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => TriggerEditTask(task)}>
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
                      <button
                        className="move-left"
                        onClick={() => moveLeft(task)}>
                        {" "}
                        =={" "}
                      </button>
                      {task.name}
                      <button
                        className="move-right"
                        onClick={() => moveRight(task)}>
                        {" "}
                        =={" "}
                      </button>
                    </label>
                    <span className="buttons">
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task)}>
                        Delete
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => TriggerEditTask(task)}>
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
