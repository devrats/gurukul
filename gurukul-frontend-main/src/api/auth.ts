import { auth } from "../firebase";

export const TOKEN_ID = "token";

interface Signup {
    email: string;
    password: string;
}

export const signup = (data: Signup) => {
    // console.log("Signup details : " , data);
    return auth.createUserWithEmailAndPassword(data.email, data.password).then((response) => {
        auth.currentUser?.sendEmailVerification();
        return response;
      });
    
}

interface Login {
    email: string;
    password: string;
}

export const login = (data: Login) => {
    // console.log("Login details : " , data);
    return auth.signInWithEmailAndPassword(data.email, data.password);
}

export const signout = () => {
    // console.log("signout...");
    auth.signOut();
    
    localStorage.removeItem(TOKEN_ID);
    window.location.href = "/login";
}