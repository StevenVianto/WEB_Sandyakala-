import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="container">
      <h1 className="text-primary">Home Page</h1>
      <p className="text-h1 leading-base">Welcome to the Home Page!</p>
      <Link to="/admin/dashboard" className="font-sans">
        Go to Dashboard Admin
      </Link>
      <div className="flex gap-2 my-4">
        <Badge>Default</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="success">Success</Badge>
      </div>
    </div>
  );
}
