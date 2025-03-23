import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/notesRoutes";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  user: process.env.GCP_DB_USER || process.env.LOCAL_DB_DB_USER,
  host: process.env.GCP_DB_HOST || process.env.LOCAL_DB_DB_HOST,
  database: process.env.GCP_DB_NAME || process.env.LOCAL_DB_DB_NAME,
  password: process.env.GCP_DB_PASSWORD || process.env.LOCAL_DB_DB_PASSWORD,
  port: Number(process.env.GCP_DB_PORT || process.env.LOCAL_DB_DB_PORT),
});

dotenv.config();

const app = express();
const EXPRESS_PORT = 4000;

app.use(cors());
app.use(express.json()); // Allow JSON request bodies

app.use("/api", noteRoutes); // Prefix for API routes

// Test Route
app.get("/", (req, res) => {
  res.send("Express backend is running!");
});

// pool
//   .query("SELECT * from notes;")
//   .then((response) => console.log("Database connected successfully", response))
//   .catch((err) =>
//     console.error("Database connection error:", err.message, err.stack)
//   );

app.listen(EXPRESS_PORT, () => {
  console.log(`Server running on http://localhost:${EXPRESS_PORT}`);
});
