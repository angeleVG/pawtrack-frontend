import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";

function PetForm({ onSubmitSuccess }) {
      const [formData, setFormData] = useState({
  name: "",
  gender: "male",
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
      <Typography variant="h6" align="center" sx={{ color: "#00bfa6" }}>
        Add your first pet
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

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
      <Button type="submit" variant="contained" fullWidth
        sx={{
          backgroundColor: "#00bfa6",
          "&:hover": { backgroundColor: "#00a896" },
        }}>
        Save Pet
      </Button>
    </Box>
  );
}

export default PetForm;
