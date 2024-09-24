import dotenv from "dotenv"; // Import dotenv
dotenv.config(); // Load environment variables
import path from "path";
import { fileURLToPath } from 'url';
import express from "express"; // Import express
import cors from "cors"; // Import cors
import con from "./DB.js"; // Use import for the database connection
import authRoutes from "./Routes/auth.js"; // Import auth routes
import userRoutes from "./Routes/Users.js"; // Import user routes
import empRoute from "./Routes/empRoute.js"; // Import employee routes

const app = express(); // Create an express application

// Database connection call
con();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", empRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 8080; // Set port
app.listen(port, () => console.log(`Listening  ${port}...`)); // Start the server
