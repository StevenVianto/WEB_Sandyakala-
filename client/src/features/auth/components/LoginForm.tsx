import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import AuthLayout from "@/shared/layouts/AuthLayout";

export default function LoginForm() {
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
