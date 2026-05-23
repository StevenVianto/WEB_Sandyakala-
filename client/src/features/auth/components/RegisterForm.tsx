import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import AuthLayout from "@/shared/layouts/AuthLayout";
import { apiRequest } from "@/shared/lib/api";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!fullname || !email || !password || !confirmPassword) {
      setError("Semua kolom wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    const response = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
    });

    setLoading(false);

    if (response.success) {
      localStorage.removeItem("umkm_verification_status");
      localStorage.removeItem(`umkm_verification_status_${email}`);
      localStorage.removeItem(`registered_umkm_profile_${email}`);
      setSuccess("Registrasi berhasil! Mengalihkan ke halaman masuk...");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } else {
      setError(response.message || "Registrasi gagal");
    }
  };

  return (
    <AuthLayout type="register">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs mb-4">
          {success}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nama Lengkap"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          disabled={loading || !!success}
          required
        />
        <Input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || !!success}
          required
        />
        <Input
          type="password"
          placeholder="Kata Sandi (Min. 6 Karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading || !!success}
          required
        />
        <Input
          type="password"
          placeholder="Konfirmasi Kata Sandi"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading || !!success}
          required
        />

        <Button
          className="w-full"
          variant={"primary-dark"}
          size={"lg"}
          type="submit"
          disabled={loading || !!success}
        >
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </Button>
      </form>
    </AuthLayout>
  );
}
