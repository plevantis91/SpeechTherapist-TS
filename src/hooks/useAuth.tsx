import { useContext, useDebugValue } from "react";
import AuthContext from "../components/context/AuthProvider";

const useAuth = () => {
    // Check if the context is available
    const context = useContext(AuthContext);
    // If the context is not available, throw an error
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    // Destructure the auth and setAuth from the context
    const { auth, setAuth } = context;
    // Use the debug value to log the auth state
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    // Return the auth and setAuth from the context
    return { auth, setAuth };
};

export default useAuth;
