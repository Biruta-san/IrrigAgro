import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./credentials";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        return error;
    }
}

export const logUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.error(error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        return error.code;
    }
}