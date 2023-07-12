import { useContext } from "react";
import { AuthContext } from "./hooks/useAuth";
import DashBoard from "./pages/Dashboard";
import SignIn from "./pages/Signin";

function App() {
  return (
    <>
      <SignIn />;
    </>
  );
}

export default App;
