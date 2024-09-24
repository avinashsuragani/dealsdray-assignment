    import mongoose from "mongoose";

    const EmployeeSchema = new mongoose.Schema({
        Name : {
            type:String,
            required: true
        },
        Email : {
            type : String,
            required : true,
            unique:true
        },
        Mobile : {
            type : Number,
            required : true
        },
        Designation : {
            type : String,
            required : true
        },
        Gender : {
            type : String,
            required : true
        },
        Course : {
            type : String,
            required : true
        },
        Photo : {
            type:String,
            required:true
            
        },
    })

    export default mongoose.model("EmployeeModel", EmployeeSchema) ;