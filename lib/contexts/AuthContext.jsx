// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

// const AuthContext = createContext();

// export default function AuthContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         setIsLoading(true);
//         const unsub = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setUser(user);
//             }
//             else {
//                 setUser(null);
                
//             }

//             setIsLoading(false);
//         });
        
//         return () => unsub();
//     }, []);
    
//     const handleSignInWithEmailAndPassword = async (email, password) => {
//         setIsLoading(true);

//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//         }
//         catch (error) {
//             setError(error?.message);
//         }

//         setIsLoading(false);
//     }

//     const handleLogout = async () => {
//         setIsLoading(true);

//         try {
//             await signOut(auth);
//         }
//         catch (error) {
//             setError(error?.message);
//         }

//         setIsLoading(false);
//     }

//     return <AuthContext.Provider
//         value={{
//             user,
//             isLoading,
//             error,
//             handleSignInWithEmailAndPassword,
//             handleLogout,
//         }}
//     >
//         {children}
//     </AuthContext.Provider>
// }

// export const useAuth = () => useContext(AuthContext);