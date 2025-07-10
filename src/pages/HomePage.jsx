import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";


const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
    const location = useLocation();
  const error = location.state?.error || "";


 useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

    return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7fdfc",
        px: 3,  // padding horizontal 
        py: 6, // padding vertical
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src="/logo-pawtrack.png"
        alt="PawTrack logo"
        sx={{ width: 100, mb: 4 }}
      />

      <Typography variant="h5" fontWeight="bold" mb={2}>
        Welcome to PawTrack
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Keep your pet's health organized, all in one place.
      </Typography>

  {/* Error message */}
      {error && (
        <Typography color="error" sx={{ mb: 2, fontSize: "1rem" }}>
          {error}
        </Typography>
      )}

      <Box sx={{ width: "100%", maxWidth: 300 }}>
        <Button
          fullWidth
          variant="contained" // color-filled button
          onClick={() => navigate("/login")} // go to login page when clicked
          sx={{
            backgroundColor: "#00bfa6",
            "&:hover": { backgroundColor: "#00a896" },
            mb: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Log in
        </Button>

        <Button
          fullWidth
          variant="outlined" // border only button
          onClick={() => navigate("/signup")} // go to signup page when clicked
          sx={{
            borderColor: "#00bfa6",
            color: "#00bfa6",
            "&:hover": { borderColor: "#00a896", color: "#00a896" },
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;

