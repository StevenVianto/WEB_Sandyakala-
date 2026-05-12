import pool from "../../config/db.js";
import type { RegisterUmkmInput } from "./umkm.schema.js";


const UmkmRepository = {
  createUmkmProfileAndDocs: async (
    userId: number, 
    data: RegisterUmkmInput, 
    files: { logo_url: string; ktp_url: string; nib_file_url: string }
  ) => {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const queryProfile = `
        INSERT INTO umkm_profiles 
        (user_id, nama_pemilik, nib, nama_usaha, kategori_usaha, jumlah_karyawan, alamat_usaha, email_usaha, no_telp_usaha, status, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', NOW())
      `;
      
      const [profileResult] = await connection.execute(queryProfile, [
        userId, data.nama_pemilik, data.nib, data.nama_usaha, data.kategori_usaha, 
        data.jumlah_karyawan, data.alamat_usaha, data.email_usaha, data.no_telp_usaha
      ]);
      
      const umkmId = (profileResult as any).insertId;

      const queryDocs = `
        INSERT INTO umkm_documents 
        (umkm_id, logo_url, ktp_url, nib_file_url, created_at) 
        VALUES (?, ?, ?, ?, NOW())
      `;
      
      await connection.execute(queryDocs, [
        umkmId, files.logo_url, files.ktp_url, files.nib_file_url
      ]);

      await connection.commit();
      return umkmId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

export default UmkmRepository;