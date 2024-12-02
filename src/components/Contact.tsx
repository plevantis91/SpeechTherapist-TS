import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CircularProgress, Typography, Box, CardContent } from "@mui/material";

// Types
interface ContactInfo {
    email: string;
    phone: string;
}

// Constants
const API_URL = 'https://speech-therapist-portal.onrender.com/contact';

// Component
const Contact: React.FC = () => {
    const [contact, setContact] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchContact = async (): Promise<void> => {
            try {
                const response = await axios.get<ContactInfo>(API_URL);
                setContact(response.data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching contact information';
                setError(new Error(errorMessage));
            } finally {
                setLoading(false);
            }
        };

        void fetchContact();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="body1" color="error">
                    Error: {error.message}
                </Typography>
            </Box>
        );
    }

    return (
        <Card sx={{ maxWidth: 700, margin: 'auto', padding: 2 }}>
            <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                    <strong>Contact Info:</strong>
                </Typography>
                {contact && (
                    <>
                        <Typography variant="body1" gutterBottom>
                            <strong>Email:</strong> {contact.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Phone:</strong> {contact.phone}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default Contact;
