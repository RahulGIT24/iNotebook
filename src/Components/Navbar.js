import React from 'react'
import { Link, useLocation } from 'react-router-dom'
function Navbar(props) {
    const {renderAlert} = props;
    // useLocation hook to set active status of navbar
    let location = useLocation();
    const logout =()=>{
        localStorage.clear("token")
        renderAlert("primary","Logout Successfully")
        // location.reload();
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token")? <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>
                        </form>:<Link className="btn btn-primary mx-2" to="/login" role="button" onClick={logout}>Log Out</Link>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
