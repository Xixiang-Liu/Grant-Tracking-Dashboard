import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "About", path: "about" },
          { label: "Profile", path: "profile" },
          { label: "Edit", path: "edit"},
          { label: "Upload", path: "upload" }
          
        ]}
      />
      {outlet}
    </div>
  );
};