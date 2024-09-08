import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDhv3Q5t9d2N9UesU1SZT_1EQ4hcj3YKrA",
  authDomain: "chat-app-d7920.firebaseapp.com",
  projectId: "chat-app-d7920",
  storageBucket: "chat-app-d7920.appspot.com",
  messagingSenderId: "305552343003",
  appId: "1:305552343003:web:0f870980267e048ba571fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(username, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid),{
            id: user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()
            
        });
        await setDoc(doc(db, "chats", user.uid), {
            chatData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email, password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async()=>{
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

export {signup, login, logout, auth, db}