import { auth } from "./config";
import { setCookie, getCookie } from "../utils/cookie";

export const signup = async ({ email, password }) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(`Error on signup: ${e.message}`);
  }
};

export const login = ({ email, password, setError }) => {
  try {
    const hashedPass = btoa(password);
    setCookie("pass", hashedPass, 3);
    return auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    setError(e.message);
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

export const updateUserEmail = async ({ email }) => {
  const user = auth().currentUser;
  const pass = atob(getCookie("pass"));
  if (user) {
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

export const updateUsername = async ({ displayName }) => {
  const user = auth().currentUser;
  if (user) {
    try {
      await user.updateProfile({
        displayName,
      });
    } catch (e) {}
  }
};

export const sendResetPasswordEmail = async () => {
  const user = auth().currentUser;
  await auth().sendPasswordResetEmail(user.email);
};
