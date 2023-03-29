import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextValue from "../context/darkmode/darkContext";
import api_address from "../context/api/config"

const Login = (props) => {
  const context = useContext(contextValue);
  const { renderAlert } = props;
  const {login} = api_address;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //* Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      renderAlert("success", "Login Success");
      navigate("/");
    } else {
      renderAlert("danger", "Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className={`btn btn-${
            context.mode === "light" ? "primary" : "light"
          } mx-2 bg-${
            context.mode === "light" ? "primary" : "dark"
          } text-light`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
