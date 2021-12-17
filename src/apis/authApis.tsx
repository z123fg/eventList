import axios from "axios"
import { ISignupFormData } from "../components/Signup/Signup";

const authClient = axios.create({baseURL: 'http://localhost:4000/api/user/',});
export interface IUserData{
    username:string;
    password:string;
}

export const signupAPI = (userData:ISignupFormData) => {
    return authClient.post("signup",userData)
}

export const loginAPI = (userData:IUserData) => {
    return authClient.post("login",userData)
}