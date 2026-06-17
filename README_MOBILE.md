# Panduan Integrasi API Mobile - Sandyakala

Dokumen ini berisi dokumentasi lengkap dan rinci mengenai cara mengintegrasikan aplikasi mobile (Flutter / React Native) ke backend server **FreshStart (Sandyakala)**.

---

## 🌐 1. Base URL & Lingkungan

Semua request HTTP harus diarahkan ke URL dasar berikut:

* **Production (Railway Host)**:
  ```http
  https://websandyakala-production.up.railway.app/api
  ```
* **Lokal / Development**:
  * **Android Emulator**: `http://10.0.2.2:3000/api`
  * **iOS Simulator**: `http://localhost:3000/api`
  * **HP Fisik (Wi-Fi Lokal)**: `http://<IP_KOMPUTER_ANDA>:3000/api`

---

## 🔑 2. Autentikasi (JWT Token)

Hampir semua endpoint (kecuali Login & Register) dilindungi oleh keamanan Role-based.
1. Saat pengguna login, backend akan mengembalikan `accessToken`.
2. Simpan token ini secara aman di sisi mobile (misal: *Flutter Secure Storage*, *EncryptedSharedPreferences*, atau *AsyncStorage*).
3. Kirimkan token di header pada setiap request selanjutnya dengan format:
   ```http
   Authorization: Bearer <ACCESS_TOKEN>
   ```

---

## 🎯 3. Endpoint Khusus Mobile (Role: USER)

Berikut adalah daftar endpoint lengkap yang dapat dikonsumsi oleh aplikasi mobile untuk pencari kerja (*Fresh Graduate*).

### A. Autentikasi & Akun

#### 1. Registrasi Akun
* **Endpoint**: `POST` `/auth/register`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "fullname": "Budi Santoso",
    "email": "budisantoso@example.com",
    "password": "Password123"
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registrasi berhasil",
    "data": {
      "fullname": "Budi Santoso",
      "email": "budisantoso@example.com",
      "is_verified": true
    }
  }
  ```

#### 2. Login Akun
* **Endpoint**: `POST` `/auth/login`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "email": "budisantoso@example.com",
    "password": "Password123"
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login berhasil",
    "data": {
      "user": {
        "id": 12,
        "fullname": "Budi Santoso",
        "email": "budisantoso@example.com",
        "role": "USER"
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsIn..."
    }
  }
  ```

#### 3. Cek Sesi / Get Data User Saat Ini
* **Endpoint**: `GET` `/auth/me`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Berhasil mendapatkan data user",
    "data": {
      "id": 12,
      "fullname": "Budi Santoso",
      "email": "budisantoso@example.com",
      "role": "USER"
    }
  }
  ```

---

### B. Lowongan Pekerjaan (Jobs)

#### 1. Melihat Semua Lowongan Terbuka
* **Endpoint**: `GET` `/jobs`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Berhasil mengambil data lowongan",
    "data": [
      {
        "id_job": 1,
        "title": "Junior Web Developer",
        "job_category": "TI & Software",
        "description": "Dibutuhkan Junior Web Developer untuk proyek e-commerce...",
        "type": "PROJECT",
        "salary_min": 1500000,
        "salary_max": 3000000,
        "worker_needed": 2,
        "minimum_education": "SMK/Sederajat",
        "qualification_description": "Mengerti HTML, CSS, JS basik.",
        "portfolio_requirement": "Wajib melampirkan portofolio web",
        "deadline": "2026-07-20T00:00:00.000Z",
        "status": "OPEN"
      }
    ]
  }
  ```

#### 2. Melihat Detail Lowongan Terbuka
* **Endpoint**: `GET` `/jobs/:id` (ganti `:id` dengan `id_job`)
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**: Mengembalikan objek detail lowongan pekerjaan yang dipilih.

#### 3. Simpan / Bookmark Lowongan
* **Endpoint**: `POST` `/jobs/:id/toggle-save`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Lowongan berhasil disimpan" // Atau "Batal menyimpan lowongan"
  }
  ```

#### 4. Melihat Daftar Lowongan Tersimpan
* **Endpoint**: `GET` `/jobs/saved/me`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**: Mengembalikan array data lowongan yang di-bookmark oleh pengguna.

---

### C. Lamaran Pekerjaan (Applications)

#### 1. Mengirim Lamaran
* **Endpoint**: `POST` `/applications/:jobId/apply`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Lamaran berhasil dikirim!"
  }
  ```

#### 2. Melihat Semua Status Lamaran Saya
* **Endpoint**: `GET` `/applications/me` *(Catatan: Route ini otomatis mengecek ID User dari Token)*
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**: Mengembalikan array riwayat lamaran yang dikirim beserta statusnya (`PENDING`, `ACCEPTED`, `REJECTED`).

---

### D. Profil & Upload Dokumen (Fresh Graduate)

Fresh Graduate wajib mengunggah file KTP, CV, dan dokumen pendukung lainnya agar profil dapat diverifikasi oleh admin.

#### 1. Melihat Data Profil Fresh Graduate
* **Endpoint**: `GET` `/freshgraduate/my-profile`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": 5,
      "fullname": "Budi Santoso",
      "email": "budisantoso@example.com",
      "no_hp": "081234567890",
      "last_education": "S1 Teknik Informatika",
      "status": "PENDING",
      "cv_url": "https://cloudinary.com/...",
      "ktp_url": "https://cloudinary.com/...",
      "portfolio_url": "https://cloudinary.com/...",
      "profile_pic": "https://cloudinary.com/..."
    }
  }
  ```

#### 2. Melengkapi Profil & Unggah Berkas (Multipart Form Data)
* **Endpoint**: `POST` `/freshgraduate/profile`
* **Headers**: 
  * `Authorization: Bearer <TOKEN>`
  * `Content-Type: multipart/form-data`
* **Body Form Data**:
  * `fullName` (Text): Nama Lengkap
  * `phone` (Text): Nomor HP aktif
  * `lastEducation` (Text): Pendidikan terakhir
  * `cv` (File): Dokumen CV (PDF)
  * `ktp` (File): Foto KTP (PNG/JPG)
  * `portfolio` (File): File Portofolio (PDF/ZIP)
  * `profile_pic` (File): Foto Profil (PNG/JPG)
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profil berhasil diperbarui.",
    "data": { ... }
  }
  ```

---

### E. Tugas Pekerja (Tasks)

Jika lamaran diterima, pekerja dapat melihat dan mengunggah tugas yang diberikan UMKM.

#### 1. Melihat Daftar Tugas Saya
* **Endpoint**: `GET` `/tasks/me`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**: Mengembalikan daftar tugas aktif beserta status pengerjaannya.

#### 2. Mengirimkan Penyelesaian Tugas
* **Endpoint**: `PUT` `/tasks/:taskId/submit`
* **Headers**: 
  * `Authorization: Bearer <TOKEN>`
  * `Content-Type: application/json` (atau multipart jika ada unggahan file tugas)
* **Request Body**:
  ```json
  {
    "submissionText": "Berikut link tugas Github: https://github.com/...",
    "attachmentUrl": "https://drive.google.com/..."
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Tugas berhasil diserahkan."
  }
  ```

#### 3. Melihat Riwayat Revisi Tugas
* **Endpoint**: `GET` `/tasks/:taskId/revisions`
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Response (200 OK)**: Mengembalikan komentar revisi dari pihak UMKM.

---

## 🛠️ 4. Contoh Implementasi Kode di Mobile

### A. Contoh di Flutter (Menggunakan Library `dio`)

```dart
import 'dart:io';
import 'package:dio/dio.dart';

final dio = Dio(BaseOptions(
  baseUrl: 'https://websandyakala-production.up.railway.app/api',
));

// 1. Fungsi Login & Simpan Token
Future<String?> login(String email, String password) async {
  try {
    final response = await dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    
    if (response.data['success'] == true) {
      String token = response.data['data']['accessToken'];
      // Simpan token ke secure storage Anda di sini
      return token;
    }
  } on DioException catch (e) {
    print('Gagal Login: ${e.response?.data['message']}');
  }
  return null;
}

// 2. Fungsi Melengkapi Profil & Upload File (Multipart)
Future<void> uploadProfile({
  required String token,
  required String fullName,
  required String phone,
  required String education,
  required File cvFile,
  required File ktpFile,
}) async {
  try {
    // Membentuk Multipart Form Data
    final formData = FormData.fromMap({
      'fullName': fullName,
      'phone': phone,
      'lastEducation': education,
      'cv': await MultipartFile.fromFile(cvFile.path, filename: 'cv.pdf'),
      'ktp': await MultipartFile.fromFile(ktpFile.path, filename: 'ktp.jpg'),
    });

    final response = await dio.post(
      '/freshgraduate/profile',
      data: formData,
      options: Options(
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'multipart/form-data',
        },
      ),
    );
    print('Update Profil Sukses: ${response.data['message']}');
  } on DioException catch (e) {
    print('Gagal Update Profil: ${e.response?.data['message']}');
  }
}
```

### B. Contoh di React Native (Menggunakan `axios`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://websandyakala-production.up.railway.app/api',
});

// Mengirim lamaran pekerjaan
const applyForJob = async (jobId, token) => {
  try {
    const response = await api.post(
      `/applications/${jobId}/apply`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(response.data.message); // "Lamaran berhasil dikirim!"
  } catch (error) {
    console.error(error.response?.data?.message || 'Gagal mengirim lamaran');
  }
};
```
