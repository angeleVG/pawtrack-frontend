import React from "react";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#f7fdfc",
  teal: "#00bfa6",
  darkText: "#2E3A59",
  button: "#003366",
  buttonHover: "#002244",
};

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { xs: 320, sm: 400 },
          padding: { xs: 3, sm: 4 },
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: COLORS.darkText,
            fontSize: { xs: "1.6rem", sm: "2rem" },
          }}
        >
          🐾 404: Sorry, this page is napping.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: COLORS.darkText,
            fontSize: { xs: "0.95rem", sm: "1rem" },
          }}
        >
          Try again later. Or bring snacks.
        </Typography>

        <Box
          component="img"
          src="/sleeping-dog.png"
          alt="Sleeping dog"
          sx={{
            width: "100%",
            maxWidth: { xs: 200, sm: 250 },
            margin: "0 auto",
            mb: 3,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            fontStyle: "italic",
            color: COLORS.darkText,
            fontWeight: 500,
          }}
        >
          Do not disturb
        </Typography>

        <Stack spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleGoHome}
            sx={{
              backgroundColor: COLORS.button,
              "&:hover": { backgroundColor: COLORS.buttonHover },
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              paddingX: 3,
            }}
          >
            Let's head back
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default NotFoundPage;
