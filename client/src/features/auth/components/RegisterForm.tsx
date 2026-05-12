import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/auth/login");
  };

  return (
    <AuthLayout type="register">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input type="text" placeholder="Jhone Doe" />
        <Input type="email" placeholder="example@gmail.com" />
        <Input type="password" placeholder="********" />
        <Input type="password" placeholder="********" />

        <Button className="w-full" variant={"primary-dark"} size={"lg"} type="submit">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
