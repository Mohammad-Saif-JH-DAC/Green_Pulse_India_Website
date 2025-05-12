import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "C:/Users/LENOVO/Desktop/PG_DAC/WBT/Excercise/Green_Pulse_India/frontEnd/Green_Pulse/src/assets/logo.jpg";
export function NavigationBar() {
  const linkStyle = {
    color: "#155724",       // Dark green
    fontWeight: "600"       // Semi-bold
  };
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#d4edda" }} className="mb-4">
      <Container fluid>
        <Navbar.Brand style={{ color: "#155724", fontWeight: "700", fontSize: "3rem" }} as={Link} to="/" ><img
          src={logo}
          alt="Green Pulse Logo"
          height="90"
          className="me-2"
          style={{ marginRight: "2px", borderRadius: "45%" }}
        />Green Pulse India</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ fontSize: "1.3rem" }}>
            <Nav.Link as={Link} to="/" style={linkStyle} >Home</Nav.Link>
            <Nav.Link as={Link} to="events" style={linkStyle} >Join Events</Nav.Link>
            <Nav.Link as={Link} to="About" style={linkStyle} >About Us</Nav.Link>
            <Nav.Link as={Link} to="Gallery" style={linkStyle} >Gallery</Nav.Link>
            <Nav.Link as={Link} to="Contact" style={linkStyle} >Contact Us</Nav.Link>
            <Nav.Link as={Link} to="Signup" style={linkStyle} >Sign Up</Nav.Link>
            <Nav.Link as={Link} to="Login" style={linkStyle} >Login</Nav.Link>
            <Nav.Link as={Link} to="Profile" style={linkStyle} >Profile  <FaUser style={{ marginRight: "5px" }} /></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}