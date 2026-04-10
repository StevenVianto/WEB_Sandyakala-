import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <h1 className="text-primary font-body">Home Page</h1>
      <Link to="/admin/dashboard" className="font-sans">
        Go to Dashboard Admin
      </Link>
      <div className="flex gap-2 my-4">
        <Badge>Default</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="success">Success</Badge>
      </div>
    </>
  );
}
