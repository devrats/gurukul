import axios from "axios";

export const BASE_URL = "http://localhost:8080";

interface BackendSignup {
    id: string;
    role: string;
    name: string;
    email: string;
}

export const backendSignup = (data: BackendSignup) => {
    // console.log("backend signup : ",data);
    const url = BASE_URL+"/signUp"
    return axios.post(url, data).then((res) => {
        return res
    })
}

