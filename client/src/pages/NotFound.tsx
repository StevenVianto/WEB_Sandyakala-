import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-black flex-col">
      <h1 className="text-5xl text-white text-center font-bold">
        404 Not Found
      </h1>
      <p className="text-white text-center mt-4">
        Back to{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </p>
    </div>
  );
}
