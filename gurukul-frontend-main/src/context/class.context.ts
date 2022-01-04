import { createContext } from "react";
import { Class } from "../models/Class";

interface ClassContextData {
    classroom: Class[];
    setClassroom: (u: Class[]) => void;
}

const ClassContext = createContext<ClassContextData>({
    classroom: [], 
    setClassroom: () => {},
});

export default ClassContext;

