import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <AuthLayout type="register">
      <form className="space-y-4">
        <Input type="text" placeholder="Jhone Doe" />
        <Input type="email" placeholder="example@gmail.com" />
        <Input type="password" placeholder="********" />
        <Input type="password" placeholder="********" />

        <Button className="bg-info-300 w-full" size={"lg"}>
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
