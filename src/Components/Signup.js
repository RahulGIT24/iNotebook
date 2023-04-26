import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextValue from "../context/darkmode/darkContext";
import api_address from "../context/api/config"

function Signup(props) {
  const context = useContext(contextValue);
  const { renderAlert } = props;
  const { signup } = api_address;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();
  const { name, email, password, cpassword } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //* Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      renderAlert("success", "Account Created Successfully");
    } else {
      renderAlert("danger", "User already exist");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter your name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            aria-describedby="textHelp"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
          />
        </div>
        <button className={`btn btn-${context.mode === "light" ? "primary" : "light"
          } mx-2 bg-${context.mode === "light" ? "primary" : "dark"
          } text-light`} type="submit" disabled={
            password.length !== cpassword.length ||
            name === "" ||
            email === "" ||
            password === ""
          }>
          Sign Up
        </button>
      </form>
    </div>
  );
}

// type="submit"

//           disabled={
//             password.length !== cpassword.length ||
//             name === "" ||
//             email === "" ||
//             password === ""
//           }

export default Signup;
