import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <AuthLayout type="login">
      <form className="space-y-4">
        <Input type="email" placeholder="example@gmail.com" />
        <Input type="password" placeholder="********" />

        <Button className="w-full" variant={"primary-dark"} size={"lg"}>
          Masuk
        </Button>
      </form>
    </AuthLayout>
  );
}
