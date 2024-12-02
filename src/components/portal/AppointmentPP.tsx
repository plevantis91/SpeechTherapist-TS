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
} from '@mui/material';
import { Add, Edit, Delete, Save } from '@mui/icons-material';
import axios from 'axios';
import useToken from '../../hooks/useToken';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
} as const;

interface Appointment {
    id: number;
    profile_id: number;
    date: string;
    time: string;
    notes?: string;
}

interface Patient {
    profile_id: number;
    appointments: Appointment[];
}

interface AppointmentResponse {
    appointment: Appointment;
}

interface AppointmentRequest {
    appointment: Omit<Appointment, 'id'> & {
        id?: number;
    };
}

const API_URL = 'https://speech-therapist-portal.onrender.com/profile';

function Appointments({ patient }: { patient: Patient }) {
    const [myAppointments, setMyAppointments] = useState<Appointment[]>(patient.appointments || []);
    const [openAppointments, setOpenAppointments] = useState<boolean>(false);
    const [appointmentId, setAppointmentId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Omit<Appointment, 'id' | 'profile_id'>>({
        date: '',
        time: '',
        notes: '',
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { token } = useToken();

    const handleOpenAppointments = (appointment: Appointment | null = null): void => {
        setIsEdit(!!appointment);
        if (appointment) {
            setAppointmentId(appointment.id);
            setFormData({
                date: appointment.date,
                time: appointment.time,
                notes: appointment.notes || '',
            });
        } else {
            setAppointmentId(null);
            setFormData({
                date: '',
                time: '',
                notes: '',
            });
        }
        setOpenAppointments(true);
    };

    const handleCloseAppointments = (): void => setOpenAppointments(false);

    const handleSaveAppointment = async (): Promise<void> => {
        const appointmentData: AppointmentRequest = {
            appointment: {
                id: appointmentId || undefined,
                profile_id: patient.profile_id,
                ...formData,
            }
        };
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            };

            const response = isEdit
                ? await axios.put<AppointmentResponse>(API_URL, appointmentData, config)
                : await axios.post<AppointmentResponse>(API_URL, appointmentData, config);

            setMyAppointments(prev => isEdit
                ? prev.map(app => app.id === appointmentId ? response.data.appointment : app)
                : [...prev, response.data.appointment]
            );

            handleCloseAppointments();
        } catch (error) {
            console.error('Failed to save appointment', error);
        }
    };

    const handleDeleteAppointment = async (id: number, profile_id: number): Promise<void> => {
        try {
            const response = await axios.delete(`${API_URL}?id=${id}&profile_id=${profile_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                setMyAppointments(prev => prev.filter(appointment => appointment.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete appointment', error);
        }
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Appointments
                    </Typography>
                    {myAppointments.length > 0 ? (
                        myAppointments.map((appointment) => (
                            <Card key={appointment.id} variant="outlined" sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Date:</strong> {appointment.date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Time:</strong> {appointment.time}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Notes:</strong> {appointment.notes || 'Add notes'}
                                    </Typography>
                                    <Box mt={2}>
                                        <IconButton 
                                            color="primary" 
                                            onClick={() => handleOpenAppointments(appointment)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton 
                                            color="secondary" 
                                            onClick={() => handleDeleteAppointment(appointment.id, appointment.profile_id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No appointments available
                        </Typography>
                    )}
                    <IconButton color="primary" onClick={() => handleOpenAppointments(null)}>
                        <Add />
                    </IconButton>
                </CardContent>
            </Card>

            <Modal open={openAppointments} onClose={handleCloseAppointments}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {isEdit ? 'Edit Appointment' : 'Add Appointment'}
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Notes"
                        multiline
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={handleSaveAppointment}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default Appointments;
