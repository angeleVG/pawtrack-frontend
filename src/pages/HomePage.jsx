import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

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

