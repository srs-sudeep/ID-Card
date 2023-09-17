import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log(response.data);
    } catch (error) {
      // Handle error response here
  if (error.response && error.response.data && error.response.data.msg) {
    const errorMessage = error.response.data.msg;
    // Display the error message to the user (e.g., using an alert or on the UI)
    alert(errorMessage);
  } else {
    // Handle unexpected errors
    console.error(error);
  }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
