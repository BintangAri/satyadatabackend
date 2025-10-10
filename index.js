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
} from "./controllers/dataController.js"; // Pastikan path ini benar jika struktur folder Anda berbeda

dotenv.config();
const app = express();

// Mengizinkan semua permintaan cross-origin
app.use(cors());

// Middleware untuk membaca body JSON
app.use(express.json());

// --- ROUTES ---

// Auth
app.post("/api/login", loginUser);

// Master Data
app.get("/api/lokasi", getLokasi);
app.get("/api/komoditas", getKomoditas);

// CRUD Operations
app.get("/api/data", getAllData);
app.post("/api/data", postInputData);
app.put("/api/data/:id", updateData);
app.delete("/api/data/:id", deleteData);


// Export app untuk Vercel
export default app;