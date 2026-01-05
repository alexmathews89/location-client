import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchKey,
  onSearchChange,
}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Seattle Spots App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Form>
            <Form.Control
              onChange={(e) => {
                e.target.value;
              }}
            ></Form.Control>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
