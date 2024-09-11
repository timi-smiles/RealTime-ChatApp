import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);


    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setUserData(userData);
    
            // Handle redirection based on user data, but only if the current path is not already correct
            if (userData.avatar && userData.name) {
                // if (window.location.pathname !== '/profile') {
                //     navigate('/profile');
                // }
                navigate('/chat');
            } 
            else{
                navigate('/profile');
            }
            // else if (window.location.pathname !== '/chat') {
            //     navigate('/chat');
            // }
    
            // Update the last seen time
            await updateDoc(userRef, {
                lastSeen: Date.now()
            });
    
            // Continuously update last seen time every minute
            setInterval(async () => {
                if (auth.currentUser) {
                    await updateDoc(userRef, {
                        lastSeen: Date.now()
                    });
                }
            }, 60000);
        } catch (error) {
            console.error('Error loading user data:', error); // Log any errors for debugging
        }
    };
    
    useEffect(() => {
        if (userData) {
            const chatRef = doc(db, 'chats', userData.id);
            const unSub = onSnapshot(chatRef, async (res) => {
                const chatItems = res.data().chatsData;
                console.log(res.data())
                const tempData = [];
                for(const item of chatItems){
                  const userRef = doc(db, 'users', item.rId);
                  const userSnap = await getDoc(userRef); 
                  const userData = userSnap.data();
                  tempData.push({...item, userData}) 
                }
                setChatData(tempData.sort((a,b) => b.updatedAt - a.updatedAt))
            })
            return() => {
                unSub();
            }
            
        }
    }, [userData])

    const value = {
        userData, setUserData,
        chatData, setChatData,
        loadUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )
}

export default AppContextProvider