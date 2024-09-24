import React , {useEffect}from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../addEmployee/addEmp.css"

const UpdateEmp = () => {
	
	const [data, setData] = useState({
		Name: "",
		Email: "",
		Mobile: "",
		Designation:"",
		Gender:"",
		Course:"",
		Photo:""
	});
	const Navigate = useNavigate()
	const {id} = useParams();
	
	const handleChange = (e) => {
		const {name,value}=e.target;
		setData({ ...data, [name]: value });
		console.log(data)
	};
	useEffect(()=>{
		axios.get(`http://localhost:8080/api/getone/${id}`)
		   .then((response)=>{
			   setData(response.data)
		   })
		   .catch((err)=>{
			   console.log(err)
		   })
	   },[id])
	const handleSubmit = async (e) => {
		e.preventDefault()
		await axios.put(`http://localhost:8080/api/update/${id}`,data)
		.then((response)=>{
			toast.success(response.data.msg,{position:"top-right"})
			Navigate("/emp")
		}).catch((err)=>console.log(err))
	  };
	
    return (
        <div className="addEmp">
            <Link to={"/emp"}>
                    <button className="backbtn">Back</button>
            </Link>
            <h3>Edit Employee </h3>
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
						<button type="submit" className="green_btn">
							Add Employee
						</button>
                        </div>
					
            </form>
        </div>
    )
}

export default UpdateEmp;