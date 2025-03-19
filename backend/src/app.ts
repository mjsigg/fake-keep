import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/notesRoutes";

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

app.listen(EXPRESS_PORT, () => {
  console.log(`Server running on http://localhost:${EXPRESS_PORT}`);
});
