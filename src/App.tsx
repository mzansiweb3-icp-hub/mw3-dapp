import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/Context";
import { User } from "./declarations/mw3_backend/mw3_backend.did";
import LoadingScreen from "./components/LoadingScreen";
const Home = lazy(() => import("./pages/dashboard/home/Home"));
const Landing = lazy(() => import("./pages/landing/Landing"));
const Register = lazy(() => import("./pages/register/Register"));
const Layout = lazy(() => import("./pages/dashboard/home/components/Layout"));
const Submit = lazy(() => import("./pages/dashboard/submit/Submit"));
const Profile = lazy(() => import("./pages/dashboard/profile/Profile"));
const Guides = lazy(() => import("./pages/dashboard/guides/Guides"));

const App = () => {
  const { isAuthenticated, backendActor, identity } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
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
    if (isAuthenticated && isRegistered) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/guides" element={<Guides />} />
            </Route>
          </Route>
          <Route path="/" element={<Landing {...{ isRegistered }} />} />
          <Route path="/register" element={<Register {...{setIsRegistered, isRegistered}} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
