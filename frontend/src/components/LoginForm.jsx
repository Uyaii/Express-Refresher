import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import MainSection from "./MainSection";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = "http://localhost:3000";
  let navigate = useNavigate();
  const authUser = async (e, username, password) => {
    e.preventDefault();
    try {
      // .post because we're sending info there
      const response = await axios.post(`${api}/login`, { username, password });
      if (response.data.message === "Authenticated") navigate(<MainSection />);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="">
      <label htmlFor="">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={(e) => authUser(e, username, password)}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
