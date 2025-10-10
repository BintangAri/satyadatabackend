// /server/routes/dataRoutes.js

import express from "express";
import {
  loginUser,
  getAllData,
  getLokasi,
  getKomoditas,
  postInputData,
  updateData,
  deleteData,
} from "../controllers/dataController.js";

const router = express.Router();

// Auth routes
router.post("/login", loginUser);

// Master data routes
router.get("/lokasi", getLokasi);
router.get("/komoditas", getKomoditas);

// Main data CRUD routes
router.get("/data", getAllData);
router.post("/data", postInputData);
router.put("/data/:id", updateData);   // <-- PASTIKAN BARIS INI ADA
router.delete("/data/:id", deleteData); // <-- PASTIKAN BARIS INI ADA

export default router;