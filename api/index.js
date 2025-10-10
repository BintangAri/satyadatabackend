// File: /api/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { 
  loginUser, 
  getAllData, 
  getLokasi, 
  getKomoditas, 
  postInputData, 
  updateData, 
  deleteData 
} from "../controllers/dataController.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- PASTIKAN SEMUA RUTE INI ADA ---
app.post("/api/login", loginUser);
app.get("/api/lokasi", getLokasi);
app.get("/api/komoditas", getKomoditas);
app.get("/api/data", getAllData);
app.post("/api/data", postInputData);
app.put("/api/data/:id", updateData);
app.delete("/api/data/:id", deleteData);

// Export app untuk Vercel
export default app;