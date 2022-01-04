import { createContext } from "react";

interface Role {
    role: string;
    setRole: (u: string) => void;
}

const RoleContext = createContext<Role>({
    role: "", 
    setRole: () => {},
});

export default RoleContext;

