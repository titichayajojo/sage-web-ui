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
      static async getAllEmergencyCases(option){
        const config = {
          method: HTTP_METHODS.get,
          url: `emergency/case/tok/job/${option.params.id}`,
          body: option.body,
          token: option.token,
        };
        console.log(config)
        
        return request(config).catch((err) => ({ ...err, isOk: false }));
      }
      static async getMedicalStaff(option){
        const config = {
          method: HTTP_METHODS.get,
          url: `/medical/staff/hospital/${option.params.id}`,
          body: option.body,
          token: option.token,
        };
        console.log(config)
        
        return request(config).catch((err) => ({ ...err, isOk: false }));
      }
      static async acceptCase(option){
        const config = {
          method: HTTP_METHODS.post,
          url: `/job/accept`,
          body: option.body,
          token: option.token,
        };
        console.log(config)
        
        return request(config).catch((err) => ({ ...err, isOk: false }));
      }
      static async getCaseAndMedInfo(option){
        const config = {
          method: HTTP_METHODS.get,
          url: `/emergency/case/medical/information/${option.params.id}`,
          body: option.body,
          token: option.token,
        };
        console.log(config)
        
        return request(config).catch((err) => ({ ...err, isOk: false }));
      }

      

}
export default Auth;