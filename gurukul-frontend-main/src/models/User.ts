export interface User {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
    emailVerified: boolean | null;
    phoneNumber: string | null;
    refreshToken: string;
}