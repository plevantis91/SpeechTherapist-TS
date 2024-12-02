import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CircularProgress, Typography, Box, CardContent } from '@mui/material';

interface Resource {
    title: string;
    link: string;
    description: string;
}

function Resources() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = 'https://speech-therapist-portal.onrender.com/resources';

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get<Resource[]>(API_URL);
                setResources(response.data);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
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
            <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                    <strong>Resources:</strong>
                </Typography>
                {resources.map((resource, index) => (
                    <Box key={index} mb={2}>
                        <Typography variant="body1">
                            {resource.title}
                        </Typography>
                        <Typography variant="body2">
                            <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
}

export default Resources;
