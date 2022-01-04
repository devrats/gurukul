import axios from "axios";
import { BASE_URL } from "./backendAuth";

export const getClasses = (uid: string) => {
    const url = BASE_URL+"/classes";
    return axios.post(url, {id: uid}).then((response) => {
        // console.log(response);
        return response;
    });
}

interface CreateClass {
    id: string;
    title: string;
    topic: string;
    motto: string;
}
export const createClass = (data: CreateClass) => {
    const url = BASE_URL+"/createClass";
    return axios.post(url, data).then((response) => {
        return response;
    });
}

interface JoinClass {
    id: string;
    secretCode: number;
}
export const joinClass = (data: JoinClass) => {
    const url = BASE_URL+"/studentJoinClass";
    return axios.post(url, data).then((response) => {
        return response;
    });
}

interface GetRole {
    id: string;
}
export const getRole = (data: GetRole) => {
    const url = BASE_URL+"/role";
    return axios.post(url, data).then((response) => {
        return response;
    });
}

interface AddAnnouncement {
    title: string;
    msg: string;
    dueDate: string;
    secretCode: number;
}
export const addAnnouncement = (data: AddAnnouncement) => {
    const url = BASE_URL+"/announce";
    return axios.post(url, data).then((response) => {
        return response;
    });
}

interface FetchAnnouncements {
    secretCode: string;
}
export const fetchAnnouncements = (data: FetchAnnouncements) => {
    const url = BASE_URL+"/fetchAnnouncements";
    return axios.post(url, data).then((response) => {
        return response;
    });
}

interface FetchAnnouncementsDetails {
    announcementId: number;
    uId: string;
}
export const fetchAnnouncementsDetails = (data: FetchAnnouncementsDetails) => {
    const url = BASE_URL+"/fetchAnnouncementsDetails";
    return axios.post(url, data).then((response) => {
        return response;
    });
}

interface AddComment {
    uId: string;
    announcementId: string;
    message: string;
}
export const addComment = (data: AddComment) => {
    const url = BASE_URL+"/comments";
    return axios.post(url, data).then((response) => {
        return response;
    })
}

export interface SubmitAssignment {
    uId: string;
    announcementId: string;
    downloadUrl: string;
}
export const submitAssignment = (data: SubmitAssignment) => {
    const url = BASE_URL+"/submitAnnouncements";
    console.log(data);
    return axios.post(url, data).then((response) => {
        return response;
    })
}