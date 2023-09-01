import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { url } from "../../utils/Constants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/login`, formData);
      const responseData = response.data;
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      if (responseData.success) {
        alert(responseData.message);
        history("/");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      history("/");
    }
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ maxWidth: "450px", width: "100%","backgroundColor":"#252e5f",color:"aliceblue" }}>
        <div className="position-relative">
          <div
            className="position-absolute text-center top-50 start-50 translate-middle border border-info p-2 "
            style={{ width: "150px", zIndex: 1, backgroundColor:"#02edda",borderRadius:"2px" }}
          >
            SIGN IN
          </div>
        </div>
        <Card.Body >
          <div
            className="text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              fontSize: "28px",
              margin: "30px auto 10px",
              backgroundColor: "#02edda",
            }}
          >
            <img
              src="./avtar.png"
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover"}}
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary w-100" type="submit" style={{backgroundColor:"#02edda"}}>
              Login
            </Button>
          </Form>
          <p className="mt-3 text-center">
            <span className="align-middle">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
