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
} from "./controllers/dataController.js"; // Pastikan path ini benar

dotenv.config();
const app = express();

// Konfigurasi CORS untuk production dan development
const whitelist = [
  'http://localhost:3000',                  // Alamat development
  'https://satyadatafrontend.vercel.app'     // Alamat production Anda
];

const corsOptions = {
  origin: function (origin, callback) {
    // Izinkan request tanpa 'origin' (seperti dari Postman atau server-side)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

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