import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import { useAuth } from "./hooks/Context";
import Home from "./pages/dashboard/home/Home";
import { User } from "./declarations/mw3_backend/mw3_backend.did";
import Register from "./pages/register/Register";

const App = () => {
  const { isAuthenticated, backendActor, identity } = useAuth();
  const [user, setUser] = useState<User | null | string >("loading");

  const ProtectedRoutes = () => {
    if (isAuthenticated === true && user) {
      return <Outlet />;
    } else if (isAuthenticated === false && !user) {
      return <Navigate to="/" />;
    } else if (isAuthenticated && user === "loading") {
      return <h3>Loading user</h3>;
    } else if (isAuthenticated === true && user === "not_found") {
      return <Register />;
    }
  };

  useEffect(() => {
    if (isAuthenticated ) {
      getUser();
    }
  }, [isAuthenticated]);

  const getUser = async () => {
    if (backendActor && identity) {
      try {
        const user = await backendActor.getUser(identity.getPrincipal());
        console.log(user, "user")
        if ("ok" in user) {
          setUser(user.ok);
        } else {
          setUser("not_found");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(user, isAuthenticated, "identity", identity, "backendActor", backendActor);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
