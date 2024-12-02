import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useAuth from '../hooks/useAuth'; 

function NavLinks() {
    const { auth } = useAuth(); // Get the token or auth state from the useAuth hook

    return (
        <>
            <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/therapist-info">
                <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/resources">
                <Nav.Link>Resources</Nav.Link>
            </LinkContainer>

            {/* Conditionally render based on authentication state */}
            {auth?.user ? ( // If user is logged in
                <>
                    <LinkContainer to="/patient-portal">
                        <Nav.Link>Patient Portal</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/logout">
                        <Nav.Link>Logout</Nav.Link>
                    </LinkContainer>
                </>
            ) : ( // If user is not logged in
                <>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                </>
            )}
        </>
    );
}

export default NavLinks;
