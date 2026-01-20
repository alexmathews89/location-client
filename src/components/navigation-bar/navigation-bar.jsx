import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./navigation-bar.scss";

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
          <div className="app-title">Seattle Spots App</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <div className="nav-option">Login</div>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <div className="nav-option">Sign Up</div>
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  <div className="nav-option">Home</div>
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  <div className="nav-option">Profile</div>
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  <div className="nav-option">Logout</div>
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form>
              <Form.Control
                type="text"
                placeholder="search locations..."
                value={searchKey}
                onChange={(e) => onSearchChange(e.target.value)}
              ></Form.Control>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
