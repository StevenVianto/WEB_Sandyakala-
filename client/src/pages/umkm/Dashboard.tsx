import { Outlet, useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const context = useOutletContext();

  return (
    <div>
      <Outlet context={context} />
    </div>
  );
}