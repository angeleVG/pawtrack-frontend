import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: "#f7fdfc",
  darkText: "#2E3A59",
  button: "#003366",
  buttonHover: "#002244",
};

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
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
          🐾 404: page is napping
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: COLORS.darkText,
            fontSize: { xs: "0.95rem", sm: "1rem" },
          }}
        >
          Try again later. Or bring a snack.
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
            Go Home
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default NotFoundPage;
