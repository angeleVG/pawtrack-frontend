import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function PetForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || "");
  const [gender, setGender] = useState(initialData.gender || "");
  const [birthDate, setBirthDate] = useState(initialData.birthDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ name, gender, birthDate });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, mt: 4 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      />
      <TextField
        label="Birth Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Save Pet
      </Button>
    </Box>
  );
}

export default PetForm;
