import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import { login, logout, sendResetPasswordEmail } from "../firebase/auth";
import { auth } from "../firebase/config";

type UserType = {
  uid: string;
  agencyId: string;
};

type UserLoginType = {
  email: string;
  password: string;
};

type resetPasswordType = {
  email: string;
  setError: Dispatch<SetStateAction<string>>;
};

export type AuthContextType = {
  user: UserType | null;
  logoutUser: () => Promise<void>;
  loginUser: ({ email, password }: UserLoginType) => Promise<void>;
  resetPassword: ({ email, setError }: resetPasswordType) => Promise<void>;
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
    await setUser({ uid: loginUserData?.user?.uid });
    history.push(`/agencies/${loginUserData?.user?.uid}`);
  };

  const resetPassword = async ({ email, setError }: resetPasswordType) => {
    const emailData = await sendResetPasswordEmail({ email });
    if (emailData) {
      setError("Email sent");
    } else {
      setError("Sending email failed. Please contact United Way.");
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    history.push("/");
  };

  const value = { user, logoutUser, loginUser, resetPassword };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = React.useContext<Partial<AuthContextType>>(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
