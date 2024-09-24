import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = ({ Username }) => {
  return (
    <div className="Body">
      <div className="Header">
        <h1>Welcome, {Username ? Username : "Admin Portal"}</h1> {/* Show Username or fallback to 'Guest' */}
        <div className="Menu">
          <Link to="/emp">
            <button>Employee List</button>
          </Link>
          <Link to="/">
            <button className="logout">Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
