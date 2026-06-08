import pool from "../../config/db.js";

const ReportsRepository = {
  findAll: async () => {
    const query = `
      SELECT ur.id, ur.reported_umkm_id, up.business_name AS namaUsaha, up.owner_name AS ownerName, up.business_category AS category,
             ur.violation_category AS kategoriPelanggaran, ur.report_reason AS alasanPelaporan, ur.status, ur.created_at
      FROM umkm_reports ur
      JOIN umkm_profiles up ON ur.reported_umkm_id = up.id_umkm
      ORDER BY ur.created_at DESC
    `;
    const [rows] = await pool.execute(query);
    return rows;
  },

  findBySlug: async (slug: string) => {
    // Slug is LOWER(REPLACE(business_name, ' ', '-'))
    // E.g. "Usaha Sendiri - The Real Full Stack" -> "usaha-sendiri---the-real-full-stack"
    // To handle multiple hyphens from spaces around symbols, we can replace spaces with hyphens in the query.
    const query = `
      SELECT ur.id, ur.reported_umkm_id, up.business_name AS namaUsaha, up.owner_name AS ownerName, up.business_category AS category,
             ur.violation_category AS kategoriPelanggaran, ur.report_reason AS alasanPelaporan, ur.status, ur.created_at
      FROM umkm_reports ur
      JOIN umkm_profiles up ON ur.reported_umkm_id = up.id_umkm
      WHERE LOWER(REPLACE(up.business_name, ' ', '-')) = ?
      LIMIT 1
    `;
    const [rows]: any = await pool.execute(query, [slug]);
    return rows[0];
  },

  findById: async (id: number) => {
    const query = `
      SELECT ur.*, up.business_name AS namaUsaha
      FROM umkm_reports ur
      JOIN umkm_profiles up ON ur.reported_umkm_id = up.id_umkm
      WHERE ur.id = ?
    `;
    const [rows]: any = await pool.execute(query, [id]);
    return rows[0];
  },

  updateStatus: async (id: number, status: string) => {
    const query = "UPDATE umkm_reports SET status = ? WHERE id = ?";
    await pool.execute(query, [status, id]);
  },
};

export default ReportsRepository;
