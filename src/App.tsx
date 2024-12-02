import { BrowserRouter as Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TherapistInfo from './components/TherapistInfo';
import Contact from './components/Contact';
import Resources from './components/Resources';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import PatientPortal from './components/PatientPortal';





function App() {
  
  return (
    <>
      <NavBar />
     
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/therapist-info" element={<TherapistInfo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />  
            <Route path="/patient-portal" element={<PatientPortal/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="*" element={<h1>Not Found</h1>} />    
          </Routes> 
        </div>
    </>
  );
}

export default App;
