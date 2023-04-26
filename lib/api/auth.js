import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  
  import { auth } from "../lib/firebase";
  import { HTTP_METHODS } from "./constant";
  import { request } from "./index";
  class Auth {
    static async login(email, password) {
      const emailTrimed = email.trim();
      const passwordTrimed = password.trim();
      const user = await signInWithEmailAndPassword(
        auth,
        emailTrimed,
        passwordTrimed
      );
        console.log("user: ", user)
      return user;
    }
  
    static async logout() {
      await signOut(auth);
    }
}
export default Auth;