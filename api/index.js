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

// --- REVISI FINAL: SEMUA PREFIX /api DIHAPUS DARI SINI ---
app.post("/login", loginUser);
app.get("/lokasi", getLokasi);
app.get("/komoditas", getKomoditas);
app.get("/data", getAllData);
app.post("/data", postInputData);
app.put("/data/:id", updateData);
app.delete("/data/:id", deleteData);

export default app;