import React from "react";
import { useHistory } from "react-router-dom";
import { login, logout } from "../firebase/auth";
import { auth } from "../firebase/config";

type UserType = {
  uid: string;
  agencyId: string;
};

type UserLoginType = {
  email: string;
  password: string;
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
  const history = useHistory();

  React.useEffect(() => {
    const onAuthStateChange = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ uid: user.uid });
      }
    });
    return onAuthStateChange;
  }, []);

  const loginUser = async ({ password, email }: UserLoginType) => {
    const loginUserData = await login({ email, password });
    setUser({ uid: loginUserData?.user?.uid });
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    history.push("/");
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
