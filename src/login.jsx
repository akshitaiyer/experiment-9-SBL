import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css"; // Assuming you have custom CSS here

const Login = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar color="dark" dark expand="lg">
        <Link className="navbar-brand" to="#">
          Login Page
        </Link>
        <NavbarToggler onClick={handleNavCollapse} />
        <Collapse isOpen={!isNavCollapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/signup">
                Signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/contact">
                Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      {/* Main Content */}
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="login-card">
              <CardBody>
                <h1 className="text-center mb-4">Login</h1>
                <Form>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Enter username"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      required
                    />
                  </FormGroup>
                  <Button type="submit" color="primary" block>
                    Login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-dark text-light">
        <Container className="text-center">
          <span className="text-muted">
            &copy; 2024 Your Company. All rights reserved.
          </span>
        </Container>
      </footer>
    </div>
  );
};

export default Login;
