import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🍴 FoodSaver</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/donate">Donate</Nav.Link>
            <Nav.Link as={Link} to="/request">Request For Food</Nav.Link>
            <Nav.Link as={Link} to="/contributors">Contributors</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Button variant="outline-light" className="me-2">Profile</Button>
          <Button variant="danger">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
