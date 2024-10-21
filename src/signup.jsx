import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Alert,
} from "reactstrap";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strengthMessage, setStrengthMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  // State to handle feedback messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 6) {
      setStrengthMessage("Weak");
    } else if (passwordValue.length < 10) {
      setStrengthMessage("Medium");
    } else {
      const strongPattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])"
      );
      if (strongPattern.test(passwordValue)) {
        setStrengthMessage("Strong");
      } else {
        setStrengthMessage("Medium");
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setConfirmMessage("Passwords do not match");
    } else {
      setConfirmMessage("Passwords match");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset feedback messages
    setErrorMessage("");
    setSuccessMessage("");

    // Ensure passwords match
    if (password !== confirmPassword) {
      setConfirmMessage("Passwords do not match");
      return;
    }

    try {
      // Prepare the data in URL-encoded format
      const formData = new URLSearchParams();
      formData.append("fullName", fullName);
      formData.append("dob", dob);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("password", password);

      // Send POST request to server
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Show success message if user creation was successful
      setSuccessMessage("User created successfully! You can now log in.");

      // Clear form fields after successful signup
      setFullName("");
      setDob("");
      setContact("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStrengthMessage("");
      setConfirmMessage("");
    } catch (error) {
      // Show error message if signup fails
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Signup Page
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/signup">
                Signup
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <Container className="signup-container mt-5">
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="signup-card">
              <CardBody>
                <h1 className="text-center mb-4">Signup</h1>

                {/* Display success message */}
                {successMessage && (
                  <Alert color="success">{successMessage}</Alert>
                )}

                {/* Display error message */}
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSignup}>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dob">Date of Birth</Label>
                    <Input
                      type="date"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="contact">Contact Number</Label>
                    <Input
                      type="tel"
                      id="contact"
                      placeholder="Enter contact number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <span
                      className={`strength ${strengthMessage.toLowerCase()}`}
                    >
                      {strengthMessage}
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirm-password">Confirm Password</Label>
                    <Input
                      type="password"
                      id="confirm-password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    <span
                      className={`strength ${
                        confirmMessage === "Passwords match" ? "strong" : "weak"
                      }`}
                    >
                      {confirmMessage}
                    </span>
                  </FormGroup>
                  <Button color="primary" block type="submit">
                    Signup
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-dark text-light">
        <div className="container text-center">
          <span className="text-muted">
            &copy; 2024 Your Company. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
