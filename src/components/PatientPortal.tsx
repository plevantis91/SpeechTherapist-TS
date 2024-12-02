import { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../hooks/useToken';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import ProfileInfo from './portal/ProfilePP';
import Appointments from './portal/AppointmentPP';
import MedicalHistory from './portal/MedicalHistoryPP';
import ContactInfo from './portal/ContactInfoPP';
import { Patient } from '../types/Patient';

function PatientPortal() {
    const { token } = useToken();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const API_URL = 'https://speech-therapist-portal.onrender.com/profile';

    useEffect(() => {
        // Fetch patient data
        const fetchPatient = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatient(response.data as Patient);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err : new Error('An error occurred'));
            } finally {
                setLoading(false);
            }
        };
        if (token){
        fetchPatient();
        }else {
            setError(new Error("Token not found"));
            setLoading(false);
        }
    }, [token]);
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );          
    }
    if (error) {
        return (
        <Typography variant="body1" color="error">
            Error: {error.message}
        </Typography>
    );
    }


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Patient Portal
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {patient && <ProfileInfo patient={patient} onUpdate={(data) => setPatient(data)} />}
                </Grid>
                <Grid item xs={12} md={6}>
                    {patient && <Appointments patient={patient} />}
                </Grid>
                
                <Grid item xs={12} md={6}>
                    {patient && <ContactInfo patient={patient} />}
                </Grid>
                
                <Grid item xs={12} md={6}>
                    {patient && <MedicalHistory patient={patient} />}
                </Grid>

            </Grid>
        </Box>
    );
}

export default PatientPortal;
