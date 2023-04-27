import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  
import { auth } from "../firebase";
  import { HTTP_METHODS } from "./constant";
  import { request } from "./index";
  class Auth {
    static async getUserProfile(option){
        const config = {
          method: HTTP_METHODS.get,
          url: `/user`,
          body: option.body,
          token: option.token,
        };
        console.log(config)
        
        return request(config).catch((err) => ({ ...err, isOk: false }));
      }
}
export default Auth;