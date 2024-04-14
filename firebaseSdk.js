import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./credentials";

const app = initializeApp(firebaseConfig);

console.log(firebaseConfig);

const auth = getAuth(app);

export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        return error;
    }
}

export const logUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        console.log(error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        return error.code;
    }
}