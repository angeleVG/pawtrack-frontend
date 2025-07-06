import { useState, useEffect} from "react";
import { TextField, Button, Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel,
  Radio, Select, MenuItem, InputLabel
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PetForm({ onSubmitSuccess }) {
      const [formData, setFormData] = useState({
  name: "",
  gender: "male",
   breed: "",
  birthDate: "",
});

const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios
     .get("/api/pet/breeds")
    .then((res) => {
      console.log("Received breeds:", res.data); // temporary check
      if (Array.isArray(res.data)) {
        setBreeds(res.data);
      } else {
        console.error("Expected an array of breeds, but got:", res.data);
        setBreeds([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching breeds:", err);
      setBreeds([]);
    });
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

 const storedToken = localStorage.getItem("authToken");

    axios
    
      .post("/api/pet", formData, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
      .then((response) => {
        onSubmitSuccess(response.data);
          navigate("/dashboard");
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
        + Add your pet
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
      <FormControl fullWidth>
        <InputLabel id="breed-label">Breed</InputLabel>
        <Select
          labelId="breed-label"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
            label="Breed"
          required
        >
           {Array.isArray(breeds) &&
      breeds.map((breed) => (
        <MenuItem key={breed} value={breed}>
          {breed}
            </MenuItem>
          ))}
        </Select>
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
