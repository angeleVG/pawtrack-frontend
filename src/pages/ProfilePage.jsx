import { useContext, useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  // State for changing password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 4,
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 3,
      }}
    >
      {/* Profile info */}
      <Typography variant="h5" fontWeight={700} color="#00bfa6" mb={1}>
        Profile
      </Typography>
      <Typography sx={{ fontSize: "1.1rem" }}>
        <strong>Name:</strong> {user?.name || "Anonymous"}
      </Typography>
      <Typography sx={{ fontSize: "1.1rem" }}>
        <strong>Email:</strong> {user?.email}
      </Typography>

      {/* change password */}
      <Box
        component="form"
        onSubmit={handlePasswordSubmit}
        sx={{ mt: 4, width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6" color="#00bfa6" sx={{ mb: 1 }}>
          Change Password
        </Typography>
        <TextField
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Confirm new password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#00bfa6",
            "&:hover": { backgroundColor: "#00a896" },
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            mt: 1,
          }}
        >
          Change password
        </Button>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  );
}

export default ProfilePage;
