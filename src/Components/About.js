import React from "react";

const About = () => {
  return (
    <div className="about">
      <h1>About My Notebook App</h1>
      <p>
        Welcome to my notebook app, which is built with the MERN stack. With
        this app, you can add, update, and delete notes in the cloud. With our
        login and signup feature, you can securely store your notes and access
        them from anywhere.{" "}
      </p>
      <p>
        Our app uses React on the frontend to provide a smooth and dynamic user
        interface. We use Node.js and Express on the backend to handle API
        requests, and MongoDB as our database to store user data and notes.
      </p>
      <p>
        Thank you for using our app, and we hope it helps you stay organized and
        productive.
      </p>
    </div>
  );
};

export default About;
