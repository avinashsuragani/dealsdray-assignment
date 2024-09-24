import express from "express";
import { create, deleteEmployee, getAll, getOne,update  } from "../controller/employee.js";
import upload from "../mult.js"

const route  = express.Router();

route.post("/add", upload.single('Photo'), create); 
route.get("/getall",getAll);
route.get("/getone/:id",getOne);
route.put("/update/:id", upload.single('Photo'), update);
route.delete("/delete/:id", deleteEmployee);
export default route;
