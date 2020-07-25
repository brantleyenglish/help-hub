import React from "react";
import { auth } from "../firebase/config";
import { login, logout } from "../firebase/auth";

type UserType = {
  id: string;
  agencyId: string;
};

type UserLoginType = {
  email: string;
  password: string;
  setError: any;
};

export type AuthContextType = {
  user: UserType | null;
  logoutUser: () => Promise<void>;
  loginUser: ({ email, password }: UserLoginType) => Promise<void>;
};

export const AuthContext = React.createContext<Partial<AuthContextType>>({});
AuthContext.displayName = "AuthContext";

export const AuthProvider: React.FC<any> = (props) => {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const onAuthStateChange = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ uid: user.uid });
      }
    });
    return onAuthStateChange;
  }, []);

  const loginUser = async ({ password, email, setError }: UserLoginType) => {
    const loginUserData = await login({ email, password, setError });
    setUser({ uid: loginUserData?.user?.uid });
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const value = { user, logoutUser, loginUser };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext<Partial<AuthContextType>>(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
