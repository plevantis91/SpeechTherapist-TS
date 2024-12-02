import { useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    IconButton,
    Modal,
    Box,
    TextField,
    Button,
    Snackbar,
    CircularProgress
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { Add, Edit, Save } from '@mui/icons-material';
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

interface ContactInfo {
    email: string;
    phone: string;
}


function ContactInfo({ patient }: { patient: Patient }) {
    const [contact, setContact] = useState<ContactInfo>({ 
        email: patient.email || '', 
        phone: patient.phone || '' 
    });
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { token } = useToken();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const API_URL = 'https://speech-therapist-portal.onrender.com/profile'

    const handleOpen = () => {
        setOpen(true);
        setIsEdit(!!contact.email || !!contact.phone);
    };

    const handleClose = () => setOpen(false);

    const handleSaveContact = async () => {
        setLoading(true);
        const contactInfo = { email: contact.email, phone: contact.phone };
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };
            const response = await axios.post<{ contact: ContactInfo }>(API_URL, { contact: contactInfo }, config);
            
            // Update the contact information in state
            setContact(response.data.contact);
            setError(null);
            handleClose();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            console.error('Failed to save contact information', errorMessage);
            setError(errorMessage);
        }
        setLoading(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Contact Information
                    </Typography>
                    {contact.email || contact.phone ? (
                        <>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Email:</strong> {contact.email || 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Phone:</strong> {contact.phone || 'N/A'}
                            </Typography>
                            <Box mt={2}>
                                <IconButton color="primary" onClick={handleOpen}>
                                    <Edit />
                                </IconButton>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No contact information available
                        </Typography>
                    )}
                    {!contact.email && !contact.phone && (
                        <IconButton color="primary" onClick={handleOpen}>
                            <Add />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
            
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {isEdit ? 'Edit Contact Information' : 'Add Contact Information'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        value={contact.email || ''}
                        onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Phone"
                        value={contact.phone || ''}
                        onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={handleSaveContact}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
            {loading && <CircularProgress />}
            {error && <Snackbar open={Boolean(error)} autoHideDuration={6000}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>}
        </>
    );
}

export default ContactInfo;
