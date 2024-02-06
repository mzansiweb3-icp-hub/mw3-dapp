import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    FC,
  } from "react";
  import {
    AuthClient,
    AuthClientCreateOptions,
    AuthClientLoginOptions,
  } from "@dfinity/auth-client";
  import { canisterId as iiCanId } from "../declarations/internet_identity";
  
  interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  const network = process.env.DFX_NETWORK || "local";
  
  interface DefaultOptions {
    createOptions: AuthClientCreateOptions;
    loginOptions: AuthClientLoginOptions;
  }
  
  const defaultOptions: DefaultOptions = {
    createOptions: {
      idleOptions: {
        disableIdle: true,
      },
    },
    loginOptions: {
      identityProvider:
        network === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=${iiCanId}`,
    },
  };
  
  export const useAuthClient = (options = defaultOptions) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [token, setToken] = useState<string>("");
  
    useEffect(() => {
      AuthClient.create(options.createOptions).then(async (client) => {
        updateClient(client);
      });
    }, []);
  
    const login = () => {
      authClient?.login({
        ...options.loginOptions,
        onSuccess: () => {
          updateClient(authClient);
        },
      });
    };
  
    async function updateClient(client: AuthClient) {
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
  
      setAuthClient(client);
    }
  
    async function logout() {
      await authClient?.logout();
      await updateClient(authClient);
    }
  
    async function loginWUser(t: string) {
      console.log("hitting loginWUser");
      setToken(t);
      setIsAuthenticated(true);
    }
  
    async function logoutWUser() {
      setToken("");
      setIsAuthenticated(false);
    }
  
    return {
      isAuthenticated,
      login,
      logout,
      authClient,
      loginWUser,
      logoutWUser,
      token,
    };
  };
  
  interface LayoutProps {
    children: React.ReactNode;
  }
  
  export const AuthProvider: FC<LayoutProps> = ({ children }) => {
    const auth = useAuthClient();
  
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);