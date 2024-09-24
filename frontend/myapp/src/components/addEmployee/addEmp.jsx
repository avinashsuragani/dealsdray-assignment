import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "./addEmp.css"

const AddEmp =() =>{
    const [data, setData] = useState({
		Name: "",
		Email: "",
		Mobile: "",
		Designation:"",
		Gender:"",
		Course:"",
		Photo:null
	});
	const Navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "Photo") {
		  setData({ ...data, Photo: files[0] }); // Capture the file
		} else {
		  setData({ ...data, [name]: value });
		}
	  };
	const handleSubmit = async (e) => {
		e.preventDefault();
	 
		await axios.post("http://localhost:8080/api/add", data,{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((response) => {
		   toast.success(response.data.msg,{position:"top-right"})
		   Navigate("/emp")
		})
		.catch((err) => {
		   console.log("Error:", err);
		});
	 };
	 
    return (
        <div className="addEmp">
            <Link to={"/emp"}>
                    <button className="backbtn">Back</button>
            </Link>
            <h1>Add New Employee</h1>
			<div>
			
			
			<form className="form_container" onSubmit={handleSubmit}>
						<div className="inputGroup">
                        <label htmlFor="Name"> Full Name </label>
						<input
							type="text"
							placeholder="Enter Your Name"
							name="Name"
							onChange={handleChange}
							value={data.Name}
							required
							className="input"
						/>
                        </div>
                        <div className="inputGroup">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							placeholder="Enter Email"
							name="Email"
							onChange={handleChange}
							value={data.Email}
							required
							className="input"
						/>
						</div>
                        <div className="inputGroup">
						<label htmlFor="mobil">Mobile</label>
						<input
							type="text"
							placeholder="Enter mobile number"
							name="Mobile"
							onChange={handleChange}
							value={data.Mobile}
							required
							className="input"
						/>
						</div>
                        <div className="inputOther">
						<label htmlFor="designation" >Designation</label>
						
						<select
    						name="Designation"
    						onChange={handleChange}
    						value={data.Designation}
    						required
    						className="input"
  						>
    					<option value="">Select Designation</option>
    					<option value="HR">HR</option>
    					<option value="Manager">Manager</option>
    					<option value="Sales">Sales</option>
  						</select>
						</div>
                        <div className="inputOther">
						<label>Gender</label>
						<input
							type="radio"
							name="Gender"
							onChange={handleChange}
							checked={data.Gender==="Male"}
							value="Male"
							required
							className="input"
						/>
						<span>Male</span>
						<input
							type="radio"
							name="Gender"
							onChange={handleChange}
							checked={data.Gender==="Female"}
							value="Female"
							required
							className="input"
						/>
						<span>Female</span>
						</div>
                        <div className="inputOther">
						<label>Course</label>
						<input
							type="checkbox"
							name="Course"
							value="MCA"
							checked={data.Course === 'MCA'}
							onChange={handleChange}
							className="input"
						/>
						<span>MCA</span>
						<input
							type="checkbox"
          					name="Course"
          					value="BCA"
          					checked={data.Course === 'BCA'}
          					onChange={handleChange}
          					className="input"
						/>
						<span>BCA</span>
						<input
							type="checkbox"
							name="Course"
							value="BSC"
							checked={data.Course === 'BSC'}
							onChange={handleChange}
							className="input"
						/>
						<span>BSC</span>
						</div>
                        <div className="inputOther">
          				<label>Photo</label>
          				<input 
						type="file" 
						name="Photo" 
						
						onChange={handleChange} 
						/>
        				</div>
						<div className="inputbtn">
						<button type="submit" className="addbtn">
							Add Employee
						</button>
                        </div>
					
            </form>
			</div>
        </div>
    )
}

export default AddEmp;