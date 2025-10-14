import { supabase } from "../config/supabaseClient.js";

// --- AUTHENTICATION ---
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi." });
    }
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username.trim());
    if (userError) throw userError;
    if (users.length === 0) {
      return res.status(404).json({ message: "Username tidak ditemukan." });
    }
    const user = users[0];
    const passwordMatch = (password.trim() === user.password.trim());
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password salah." });
    }
    res.status(200).json({ message: "Login berhasil!", user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// --- DATA FETCHING (READ) ---
export const getAllData = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("input_data")
      .select(`*, lokasi_pasar (id, nama_lokasi), komoditas (id, nama_komoditas)`)
      .order('tanggal_input', { ascending: false });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Get all data error:", error.message);
    res.status(500).json({ message: "Gagal mengambil data." });
  }
};

export const getLokasi = async (req, res) => {
  try {
    const { data, error } = await supabase.from("lokasi_pasar").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Get lokasi error:", error.message);
    res.status(500).json({ message: "Gagal mengambil data lokasi." });
  }
};

export const getKomoditas = async (req, res) => {
  try {
    const { data, error } = await supabase.from("komoditas").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Get komoditas error:", error.message);
    res.status(500).json({ message: "Gagal mengambil data komoditas." });
  }
};

// --- DATA SUBMISSION (CREATE) ---
export const postInputData = async (req, res) => {
  try {
    const { lokasi_id, komoditas_id, harga_per_kg, nama_petugas, stok_awal, barang_masuk, barang_keluar } = req.body;
    if (!lokasi_id || !komoditas_id || harga_per_kg === undefined || !nama_petugas || stok_awal === undefined) {
      return res.status(400).json({ message: "Field utama wajib diisi." });
    }
    const { data, error } = await supabase
      .from("input_data")
      .insert([{ lokasi_id, komoditas_id, harga_per_kg, nama_petugas, stok_awal, barang_masuk, barang_keluar }])
      .select();
    if (error) throw error;
    res.status(201).json({ message: "Data berhasil ditambahkan!", data });
  } catch (error) {
    console.error("Supabase insert error:", error);
    res.status(500).json({ message: error.message || "Gagal mengirim data." });
  }
};

// --- DATA UPDATE ---
export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { lokasi_id, komoditas_id, harga_per_kg, stok_awal, barang_masuk, barang_keluar } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID data tidak ditemukan." });
    }
    if (!lokasi_id || !komoditas_id || harga_per_kg === undefined || stok_awal === undefined) {
      return res.status(400).json({ message: "Field utama wajib diisi." });
    }
    const { data, error } = await supabase
      .from("input_data")
      .update({ lokasi_id, komoditas_id, harga_per_kg, stok_awal, barang_masuk, barang_keluar })
      .eq('id', id)
      .select(`*, lokasi_pasar (id, nama_lokasi), komoditas (id, nama_komoditas)`);
    if (error) throw error;
    res.status(200).json({ message: "Data berhasil diperbarui.", data: data[0] });
  } catch (error) {
    console.error("Supabase update error:", error);
    res.status(500).json({ message: error.message || "Gagal memperbarui data." });
  }
};

// --- DATA DELETION ---
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID data tidak ditemukan." });
    }
    const { error } = await supabase.from("input_data").delete().eq('id', id);
    if (error) throw error;
    res.status(200).json({ message: "Data berhasil dihapus." });
  } catch (error) {
    console.error("Supabase delete error:", error);
    res.status(500).json({ message: error.message || "Gagal menghapus data." });
  }
};