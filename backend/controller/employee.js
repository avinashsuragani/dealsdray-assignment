import Employee from "../models/EmployeeModal.js";
import path from "path";
import { fileURLToPath } from "url";

// Helper function to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const create = async (req, res) => {
    try {
        const { body, file } = req;
        const newEmployee = new Employee({
            ...body,
            Photo: file ? `/uploads/${file.filename}` : null // Store the file path
        });

        const savedData = await newEmployee.save();
        res.status(200).json({ msg: "Employee Added Successfully" });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
export const getAll = async (req, res) => {
    try {
        const userData = await Employee.find();
        if(!userData){
            return res.status(404).json({msg:"Details Not Found"});
    
        }
        res.status(200).json(userData);
    }
    catch(err){
        res.status(500).send({ error:err});
    }
}

export const  getOne = async (req , res) => {
    try {
        const id = req.params.id;
        const userExist = await Employee.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"Employee Details not Found"});
        }
        res.status(200).json(userExist);
    }
    catch(err) {
        res.status(500).send({ error:err});
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, file } = req;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ msg: "Employee not Found" });
        }

        // Update fields and file if uploaded
        const updatedData = {
            ...body,
            Photo: file ? `/uploads/${file.filename}` : employee.Photo, // Only update Photo if a file is uploaded
        };

        await Employee.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ msg: "Details Updated Successfully" });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const deleteEmployee = async (req,res) => {
    try{
        const id =req.params.id;
        const userExist = await Employee.findById(id);
        if(!userExist){
            return res.status(404),json({msg:"Employee not Exist"});
        }
        await Employee.findByIdAndDelete(id) ;
        res.status(200).json({msg:"Employee Details Deleted Succuessfully"});

    } 
    catch(err){
        res.status(500).send({ error:err});
    }
}