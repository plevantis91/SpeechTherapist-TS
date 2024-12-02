import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../hooks/useAuth';
import useToken from '../hooks/useToken'; 

const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { removeToken } = useToken(); 
    const API_URL = 'https://speech-therapist-portal.onrender.com/logout';
    
    const handleLogout = async (): Promise<void> => {
        try {
            await axios.post(API_URL);
            removeToken(); // Remove the token after successful logout
            setAuth({}); // Clear the auth state
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Trigger logout on component mount
    useEffect(() => {
        handleLogout();
    }, []); 
    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;