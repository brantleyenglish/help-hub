import { auth } from "./config";
import { setCookie, getCookie } from "../utils/cookie";

type SignupType = {
  email: string;
  password: string;
}

type LoginType = {
  email: string;
  password: string;
  // setError: (value: string) => Promise<void>;
}

type UpdateUserEmail = {
  email: string;
}

type DisplayNameType = {
  displayName: string;
}

export const signup = async ({ email, password }: SignupType) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(`Error on signup: ${e.message}`);
  }
};

export const login = ({ email, password }: LoginType) => {
  try {
    const hashedPass = btoa(password);
    setCookie("pass", hashedPass, 3);
    return auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    // setError(e.message);
    console.log(`Error on login: ${e.message}`);
  }
};

export const logout = () => {
  try {
    auth().signOut();
  } catch (e) {
    console.log(`Error on signOut: ${e.message}`);
  }
};

export const updateUserEmail = async ({ email }: UpdateUserEmail) => {
  const user = auth().currentUser;
  const pass = atob(await getCookie("pass"));
  if (user?.email) {
    try {
      const credential = await auth.EmailAuthProvider.credential(
        user.email,
        pass
      );
      await user.reauthenticateWithCredential(credential);
      await user.updateEmail(email);
    } catch (e) {
      console.log(`Error on updateUserEmail: ${e.message}`);
    }
  }
};

export const updateUsername = async ({ displayName }: DisplayNameType) => {
  const user = auth().currentUser;
  if (user) {
    try {
      await user.updateProfile({
        displayName,
      });
    } catch (e) {}
  }
};

export const sendResetPasswordEmail = async ({email}: {email: string}) => {
  if (email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return true
    }
    catch (e) {
      console.log({e})
    } 
  }
  return false;
};
