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
import { getAuthClient } from "./nfid";
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { _SERVICE } from "../declarations/mw3_backend/mw3_backend.did";
import { canisterId, idlFactory } from "../declarations/mw3_backend";

const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

interface AuthContextType {
  isAuthenticated: boolean | string;
  backendActor: ActorSubclass<_SERVICE> | null;
  identity: Identity | null;
  login: () => void;
  nfidlogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | string>(
    "loading"
  );
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [backendActor, setBackendActor] =
    useState<ActorSubclass<_SERVICE> | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

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

  /************************
   * NFID LOGIN
   **********************/

  const nfidlogin = async () => {
    const authClient = await getAuthClient();
    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      updateClient(authClient);
      return;
    }

    await nfidLogin(authClient!);
  };

  const APPLICATION_NAME = "Mzansi web3";
  const APPLICATION_LOGO_URL =
    "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg";
  const AUTH_PATH =
    "/authenticate/?applicationName=" +
    APPLICATION_NAME +
    "&applicationLogo=" +
    APPLICATION_LOGO_URL +
    "#authorize";
  const NFID_AUTH_URL = "https://nfid.one" + AUTH_PATH;

  const nfidLogin = async (authClient: AuthClient) => {
    await new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: NFID_AUTH_URL,
        windowOpenerFeatures:
          `left=${window.screen.width / 2 - 525 / 2}, ` +
          `top=${window.screen.height / 2 - 705 / 2},` +
          `toolbar=0,location=0,menubar=0,width=525,height=705`,
        onSuccess: () => {
          setIsAuthenticated(true);
          updateClient(authClient);
        },
        onError: (err) => {
          console.log("error", err);
          reject();
        },
      });
    });

    return authClient.getIdentity();
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    setAuthClient(client);

    const _identity = client.getIdentity();
    setIdentity(_identity);

    let agent = new HttpAgent({
      host: network === "local" ? localhost : host,
      identity: _identity,
    });

    if (network === "local") {
      agent.fetchRootKey();
    }

    const _backendActor: ActorSubclass<_SERVICE> = Actor.createActor(
      idlFactory,
      {
        agent,
        canisterId: canisterId,
      }
    );
    setBackendActor(_backendActor);
  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
  }

  return {
    isAuthenticated,
    backendActor,
    login,
    logout,
    nfidlogin,
    identity
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
