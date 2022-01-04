import { createContext } from "react";
import {User} from "../models/User";

interface AuthContextData {
    user?: User;
    setUser: (u: User) => void;
}

const AuthContext = createContext<AuthContextData>({
    user: undefined, 
    setUser: () => {},
});

export default AuthContext;

