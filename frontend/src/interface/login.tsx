import { Dispatch, SetStateAction } from "react";

export interface Credentials {
    email: string,
    password: string
}

export interface userAuth {
    token: string,
    id: number,
    refreshToken?: string,
    name: string, 
    email: string
}

export interface AuthContextType {
    userAuth: userAuth | null;
    setUserAuth: Dispatch<SetStateAction<userAuth | null>>;
}
  