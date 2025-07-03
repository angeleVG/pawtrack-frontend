import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

function PetForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/pets", formData)
      .then((response) => {
        onSubmitSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error creating pet:", error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={300}
      width="100%"
    >
      <Typography variant="h6" align="center">Add your first pet</Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Birth Date"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" fullWidth>
        Save Pet
      </Button>
    </Box>
  );
}

export default PetForm;
