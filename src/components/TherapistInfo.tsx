import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CircularProgress, Typography, Box, CardContent } from '@mui/material';
// import defaultPhoto from '../img/default-therapist.jpg';

interface Therapist {
    name: string;
    title: string;
    bio: string;
    image: string;
    email: string;
    phone: string;
    specialty?: string;
    education?: string;
    experience?: string;
}

function TherapistInfo() {
    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = 'https://speech-therapist-portal.onrender.com/therapist-info';

    useEffect(() => {
        const fetchTherapist = async () => {
            try {
                const response = await axios.get<Therapist>(API_URL);
                setTherapist(response.data);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
    };
    fetchTherapist();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }
    if (error) {
        return <Typography variant="body1">Error: {error}</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 700, margin: 'auto', padding: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <img src="https://via.placeholder.com/140x180/cccccc/666666?text=Therapist" alt="Therapist" style={{ borderRadius: '40%', width: 140, height: 180 }} />
            </Box>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {therapist?.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {therapist?.specialty}
                </Typography>
                <Typography variant="body1" paragraph>
                    {therapist?.bio}
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Education:</strong> {therapist?.education}
                </Typography>
                <Typography variant="body1">
                    <strong>Experience:</strong> {therapist?.experience}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TherapistInfo;
