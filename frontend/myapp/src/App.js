import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Employee from "./components/getEmployee/Employee";
import AddEmp from "./components/addEmployee/addEmp";
import UpdateEmp from "./components/updateEmployee/updateEmp";
import Signup from "./components/User/signup.js";
import Login from "./components/Auth/login.js";
import Dashboard from "./components/Main/dashboard.jsx";

function App() {
  const [Username, setUsername] = useState(""); // State to store the logged-in username

  const route = createBrowserRouter([
    {
      path: "/emp",
      element: <Employee />
    },
    {
      path: "/",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login setUsername={setUsername} /> // Pass setUsername to Login
    },
    {
      path: "/dash",
      element: <Dashboard Username={Username} /> // Pass Username to Dashboard
    },
    {
      path: "/add",
      element: <AddEmp />
    },
    {
      path: "/edit/:id",
      element: <UpdateEmp />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
