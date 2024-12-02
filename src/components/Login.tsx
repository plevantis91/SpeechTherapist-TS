import { useState, FormEvent } from "react";
import axios from "axios";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

interface LoginResponse {
  access_token: string;
}

function Login() {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({
    error: null as string | null,
    success: null as string | null,
    loading: false,
  });

  const navigate = useNavigate();
  const { setToken } = useToken();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus({ error: null, success: null, loading: true });

    try {
      const { data } = await axios.post<LoginResponse>(
        "https://speech-therapist-portal.onrender.com/login",
        formData
      );
      
      setToken(data.access_token);
      setAuth({ user: { username: formData.username }, token: data.access_token });
      setStatus(prev => ({ ...prev, success: "Login successful! Redirecting to homepage..." }));
      
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setStatus(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : "Invalid credentials"
      }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Login
      </Typography>
      {status.error && <Alert severity="error">{status.error}</Alert>}
      {status.success && <Alert severity="success">{status.success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={status.loading}
        >
          {status.loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
    </Box>
  );
}

export default Login;
