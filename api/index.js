import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Pastikan path ini sesuai dengan struktur folder Anda
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

// Konfigurasi CORS untuk production dan development
const whitelist = [
  'http://localhost:3000',
  'https://satyadatafrontend-ot6ezmqji-bintangaris-projects.vercel.app' 
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));
app.use(express.json());

// --- REVISI: SEMUA RUTE DIBERIKAN KEMBALI PREFIX /api ---
app.post("/api/login", loginUser);
app.get("/api/lokasi", getLokasi);
app.get("/api/komoditas", getKomoditas);
app.get("/api/data", getAllData);
app.post("/api/data", postInputData);
app.put("/api/data/:id", updateData);
app.delete("/api/data/:id", deleteData);

export default app;