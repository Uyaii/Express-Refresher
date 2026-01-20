import React from "react";

const InputForm = ({ task, setTask, editId, editTask, addTask }) => {
  return (
    <form className="input-section">
      <label htmlFor="task">What do you want to do? </label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {editId ? (
        <button onClick={(e) => editTask(e)} type="submit">
          Change
        </button>
      ) : (
        <button onClick={(e) => addTask(e)} type="submit">
          Submit
        </button>
      )}
    </form>
  );
};

export default InputForm;
