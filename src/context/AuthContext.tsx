import { createContext, FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router";
interface AuthProviderProps {
    children:ReactNode
}
interface UserData {
    userId:string;
    username:string;
    token:string;
    lastLogin:Date;
    expiresIn:number;
}
export const AuthContext= createContext<any>(null);

const AuthProvider:FC<AuthProviderProps>  = ({children}) => {
    let [userData, setUserData] = useState<UserData|null>(null);
    const navigate = useNavigate()

  const login = (userData:UserData) => {
    console.log("userdata",userData);
    setUserData(userData);
  }

  let logout = (callback: VoidFunction) => {
    setUserData(null);
    navigate("/login");
    callback&&callback();
  };

  let value = { userData, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider