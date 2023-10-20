import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="app__register">
      <div className="app__register-section">
        <h2>Register</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Your name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Your email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Your password" name="password" />

          <button type="submit">Register</button>
        </form>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
