import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Comment {
    "id": number;
    "message": string;
    "teacher": Teacher;
    "student": Student;
}