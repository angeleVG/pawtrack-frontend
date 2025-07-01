import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Container, TextField, Typography, Button, Box, Alert, } from "@mui/material";


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

  
    // using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSignupSubmit}
        sx={{
          display: "grid",
          gap: 2,
          bgcolor: "#fff",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" sx={{ color: "#00bfa6", fontWeight: 600 }}>
Sign Up</Typography>

  <TextField
    label="Email"
    type="email"
    name="email"
    value={email}
    onChange={handleEmail}
    required
  />

   <TextField
    label="Password"
    type="password"
    name="password"
    value={password}
    onChange={handlePassword}
    required
  />

   <TextField
    label="Name"
    type="text"
    name="name"
    value={name}
    onChange={handleName}
    required
  />

   <Button type="submit" variant="contained" sx={{ backgroundColor: "#00bfa6" }}>
    Sign Up</Button>

    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#00bfa6", fontWeight: 500 }}>
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>

  );
}

export default SignupPage;
