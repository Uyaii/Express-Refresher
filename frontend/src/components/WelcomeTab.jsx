import React from "react";
import { Link } from "react-router";

const WelcomeTab = () => {
  return (
    <div>
      <h2>Login/SignUp</h2>


      <Link to={'/login'}>Login</Link>
    </div>
  );
};

export default WelcomeTab;
