import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDjJh6tRsu6y_ihnBYWSkOtJscy2NYDsJg",
  authDomain: "netflix-clone-23d4d.firebaseapp.com",
  projectId: "netflix-clone-23d4d",
  storageBucket: "netflix-clone-23d4d.appspot.com",
  messagingSenderId: "988763555614",
  appId: "1:988763555614:web:23fac6694884b27f602b0f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/'[1].split('-').join(" ")));
    }
}

const login = async(email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/'[1].split('-').join(" ")));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };