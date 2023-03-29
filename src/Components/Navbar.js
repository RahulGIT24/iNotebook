import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import contextValue from "../context/darkmode/darkContext";

function Navbar(props) {
  const context = useContext(contextValue);
  const { toogleBtn, mode } = context;
  const { renderAlert } = props;
  // useLocation hook to set active status of navbar
  let location = useLocation();
  const logout = () => {
    localStorage.clear("token");
    renderAlert("primary", "Logout Successfully");
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${
          mode === "light" ? "light" : "dark"
        } bg-${mode === "light" ? "light" : "dark"}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className={`btn btn-${
                    mode === "light" ? "primary" : "light"
                  } mx-2 bg-${
                    mode === "light" ? "primary" : "dark"
                  } text-light`}
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className={`btn btn-${
                    mode === "light" ? "primary" : "light"
                  } mx-2 bg-${
                    mode === "light" ? "primary" : "dark"
                  } text-light`}
                  to="/signup"
                  role="button"
                >
                  Sign Up
                </Link>
              </form>
            ) : (
              <Link
                className={`btn btn-${
                  mode === "light" ? "primary" : "light"
                } mx-2 bg-${mode === "light" ? "primary" : "dark"} text-light`}
                to="/login"
                role="button"
                onClick={logout}
              >
                Log Out
              </Link>
            )}
          </div>
          <div className="form-check form-switch mx-3">
            <input
              onClick={toogleBtn}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className={`form-check-label text-${
                mode === "light" ? "dark" : "light"
              }`}
              htmlFor="flexSwitchCheckDefault"
            >
              {mode==='light'?"Dark":"Light"} Mode
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
