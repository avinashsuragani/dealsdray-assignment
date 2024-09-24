import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Employee.css";

const Employee = () => {
    const [Employee, setEmployee] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8080/api/getall");
            setEmployee(response.data);
        };
        fetchData();
    }, []);

    const deleteEmp = async (userId) => {
        await axios
            .delete(`http://localhost:8080/api/delete/${userId}`)
            .then((response) => {
                setEmployee((prevEmployee) =>
                    prevEmployee.filter((emp) => emp._id !== userId)
                );
                toast.success(response.data.msg, { position: "top-right" });
            })
            .catch((err) => console.log(err));
    };

    const filteredEmployees = Employee.filter((user) =>
        user.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="empTable">
            <div className="btns">
                <Link to={"/dash"}>
                    <p className="backbtn"><i class="fa-solid fa-arrow-left"></i></p>
                </Link>
                <Link to={"/add"}>
                    <button className="addbtn"><i class="fa-solid fa-user-plus"></i>  </button>
                </Link>
            </div>
            <div className="searchContainer">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="searchInput"
            />
        </div>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={`http://localhost:8080${user.Photo}`}
                                    alt={user.Name}
                                    width="100"
                                    height="100"
                                />
                            </td>
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td>{user.Mobile}</td>
                            <td>{user.Designation}</td>
                            <td>{user.Gender}</td>
                            <td>{user.Course}</td>
                            <td className="actionbtn">
                                <Link to={`/edit/${user._id}`}>
                                    <button className="e"><i class="fa-regular fa-pen-to-square"></i></button>
                                </Link>
                                <button className="d" onClick={() => deleteEmp(user._id)}>
                                <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;
