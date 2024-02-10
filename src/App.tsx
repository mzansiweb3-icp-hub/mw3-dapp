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
  const [user, setUser] = useState<User | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean| null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    } else if (isAuthenticated === false) {
      setLoading(false);
      setUser(null);
    }
  }, [isAuthenticated]);

  const getUser = async () => {
    if (backendActor && identity) {
      try {
        const user = await backendActor.getUser(identity.getPrincipal());
        console.log(user, "user");
        if ("ok" in user) {
          setUser(user.ok);
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(user, isAuthenticated);

  const ProtectedRoutes = () => {
    if (isAuthenticated && isRegistered ) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(
    "isAuthenticated",
    isAuthenticated,
    "loading",
    loading,
    "user",
    user,
    "isRegistered",
    isRegistered
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route
          path="/"
          element={<Landing {...{isRegistered}} /> }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
