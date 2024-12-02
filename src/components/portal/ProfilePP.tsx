import { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    Modal,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Card,
    CardContent,
    MenuItem,
    Avatar,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import { Patient } from '../../types/Patient';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function ProfileInfo({ patient, onUpdate }: { patient: Patient; onUpdate: (data: any) => void }) {
    const { token } = useToken();
    const [updatedProfile, setUpdatedProfile] = useState({ ...patient });
    const [openProfile, setOpenProfile] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const API_URL = 'https://speech-therapist-portal.onrender.com/profile'

    useEffect(() => {
        setUpdatedProfile({ ...patient });
    }, [patient]);

    const handleOpenProfile = () => {
        setOpenProfile(true);
    };

    const handleCloseProfile = () => {
        setOpenProfile(false);
        // Do not reset updatedProfile here to retain user changes
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            // Create an object with updated data
            const profileData = {
                first_name: updatedProfile.first_name,
                last_name: updatedProfile.last_name,
                gender: updatedProfile.gender,
                date_of_birth: updatedProfile.date_of_birth,
                profile_image: updatedProfile.profile_image,
            };

            const response = await axios.put(API_URL, {
                profile: profileData
            }, config);

            // Update the local state and notify parent component
            if (onUpdate) {
                onUpdate(response.data); // Notify parent to update its state
            }
            setError(null);
            handleCloseProfile(); // Close the modal on successful save
        } catch (error) {
            console.error('Failed to update profile', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Avatar
                        src={updatedProfile.profile_image} // Use updatedProfile to reflect changes
                        alt="Profile Image"
                        sx={{ width: 150, height: 200, mb: 3 }}
                    />
                    <Typography variant="body1" color="text.secondary">
                        <strong>{updatedProfile.first_name} {updatedProfile.last_name}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Gender:</strong> {updatedProfile.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Date of Birth:</strong> {updatedProfile.date_of_birth}
                    </Typography>
                    <IconButton color="primary" onClick={handleOpenProfile} sx={{ mt: 2 }}>
                        <Edit />
                    </IconButton>
                </CardContent>
            </Card>

            <Modal open={openProfile} onClose={handleCloseProfile}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Edit Profile
                    </Typography>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        value={updatedProfile.first_name}
                        onChange={(e) => setUpdatedProfile(prev => ({ ...prev, first_name: e.target.value }))}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        value={updatedProfile.last_name}
                        onChange={(e) => setUpdatedProfile(prev => ({ ...prev, last_name: e.target.value }))}
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={updatedProfile.gender}
                            onChange={(e) => setUpdatedProfile(prev => ({ ...prev, gender: e.target.value }))}
                            label="Gender"
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        variant="outlined"
                        margin="normal"
                        type="date"
                        value={updatedProfile.date_of_birth}
                        onChange={(e) => setUpdatedProfile(prev => ({ ...prev, date_of_birth: e.target.value }))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Profile Image"
                        variant="outlined"
                        margin="normal"
                        value={updatedProfile.profile_image}
                        onChange={(e) => setUpdatedProfile(prev => ({ ...prev, profile_image: e.target.value }))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={handleSaveProfile}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </Modal>

            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}

export default ProfileInfo;
