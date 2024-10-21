import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios"; // Axios for fetching movies
import { initiateCheckout, verifyPayment } from "./paymentService.jsx"; // Import payment service
import "./App.css";

function Home() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [movies, setMovies] = useState([]);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    // Fetch Movies Using Axios
    axios
      .get("http://localhost:5000/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Function to display stars based on the number of stars in the movie
  const renderStars = (stars) => {
    const fullStars = "★".repeat(stars);
    const emptyStars = "☆".repeat(5 - stars);
    return fullStars + emptyStars;
  };

  // Payment handler for when a movie card is clicked
  const handleMoviePayment = async (movie) => {
    try {
      // Initiate the payment for the movie (Assuming movie has a price field)
      const result = await initiateCheckout(movie.price || 100); // Default price if movie doesn't have one

      const options = {
        key: "rzp_test_DAALyOorgRDSJ0",
        amount: result.order.amount,
        currency: "INR",
        name: "MovieZone",
        description: `Payment for ${movie.name}`,
        order_id: result.order.id,
        handler: async function (response) {
          try {
            // Verifying payment
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert("Payment Successful!");
          } catch (error) {
            alert("Payment verification failed.");
            console.log(error);
          }
        },
        prefill: {
          name: "MovieZone User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#121212",
        },
      };

      // Open Razorpay UI
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment.");
    }
  };

  return (
    <>
      <Navbar color="dark" dark expand="lg">
        <NavbarBrand tag={Link} to="/">
          MovieZone
        </NavbarBrand>
        <NavbarToggler onClick={handleNavCollapse} />
        <Collapse isOpen={!isNavCollapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login" className="nav-link">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/signup" className="nav-link">
                Signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/contact" className="nav-link">
                Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <div className="hero text-center py-5">
        <h1>Welcome to MovieZone</h1>
        <p>Your ultimate movie destination</p>
      </div>

      <Container className="mt-5">
        <h2 className="text-center mb-4">Popular Movies</h2>
        <Row>
          {movies.map((movie, index) => (
            <Col
              key={movie._id}
              md="4"
              className="movie-card mb-4"
              onClick={() => handleMoviePayment(movie)}
            >
              <img
                src={`https://via.placeholder.com/350x200?text=${movie.name}`}
                alt={movie.name}
                className="img-fluid"
              />
              <div className="movie-card-title">{movie.name}</div>
              <div className="movie-card-text">{movie.desc}</div>
              <div className="star-rating">{renderStars(movie.stars)}</div>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="footer mt-auto py-3 bg-dark text-light">
        <Container>
          <span className="text-muted">
            &copy; 2024 MovieZone. All rights reserved.
          </span>
        </Container>
      </footer>
    </>
  );
}

export default Home;
