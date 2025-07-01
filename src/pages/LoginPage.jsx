
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Container, TextField, Typography, Button, Box, Alert,} from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
          storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
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
        onSubmit={handleLoginSubmit}
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
      Login</Typography>

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
  <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#00bfa6",
            "&:hover": { backgroundColor: "#00a896" },
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >Login</Button>
    
   {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

       <Typography variant="body2" align="center">Don't have an account yet?{" "}
     <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#00bfa6", fontWeight: 500 }}
          >Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;
