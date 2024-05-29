import { AuthContextType } from "@/interface/login";
import { Dispatch, SetStateAction, createContext } from "react";


export const AuthContext = createContext<AuthContextType | null>(null); 