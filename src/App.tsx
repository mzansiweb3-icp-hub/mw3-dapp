import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/Context";
import LoadingScreen from "./components/LoadingScreen";
import Admin from "./pages/admin/Admin";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
const Home = lazy(() => import("./pages/dashboard/home/Home"));
const Landing = lazy(() => import("./pages/landing/Landing"));
const Register = lazy(() => import("./pages/register/Register"));
const Submissions = lazy(
  () => import("./pages/dashboard/submissions/Submissions")
);
const Profile = lazy(() => import("./pages/dashboard/profile/Profile"));
const Guides = lazy(() => import("./pages/dashboard/guides/Guides"));

const App = () => {
  const { isAuthenticated, backendActor, identity, setUser, setIsAdmin } =
    useAuth();
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
        const admin = await backendActor.isAdmin();
        setIsAdmin(admin);
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
              <Route path="/submissions" element={<Submissions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
          <Route path="/" element={<Landing {...{ isRegistered }} />} />
          <Route
            path="/register"
            element={<Register {...{ setIsRegistered, isRegistered }} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
