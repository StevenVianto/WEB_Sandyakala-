import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import AuthLayout from "@/shared/layouts/AuthLayout";
import { apiRequest } from "@/shared/lib/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    const response = await apiRequest<{
      accessToken: string;
      user: { fullname: string; email: string; role: string };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (response.success && response.data) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      const role = response.data.user.role;
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "UMKM") {
        navigate("/umkm/dashboard");
      } else {
        navigate("/umkm/verification");
      }
    } else {
      setError(response.message || "Email atau password salah");
    }
  };

  return (
    <AuthLayout type="login">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs mb-4">
          {error}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <Button
          className="w-full"
          variant={"primary-dark"}
          size={"lg"}
          type="submit"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </AuthLayout>
  );
}
