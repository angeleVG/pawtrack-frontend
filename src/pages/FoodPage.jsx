import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Chip,
  Stack,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function FoodPage({ petId }) {
  const COLORS = {
    background: "#f7fdfc",
    teal: "#00bfa6",
    tealHover: "#00a896",
    salmon: "#FA8072",
  };

  const [food, setFood] = useState({
    brand: "",
    product: "",
    portionSize: "",
    frequency: "",
    waterAmount: "",
    snacksPerDay: "",
    notes: "",

  });
  const [allergiesEnabled, setAllergiesEnabled] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);
  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pet/${petId}/food`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        if (res.data.food) {
          setFood((prev) => ({ ...prev, ...res.data.food }));
          if (res.data.food.waterAmount) setShowWater(true);
          if (res.data.food.snacksPerDay) setShowSnacks(true);
        }
        if (res.data.allergies?.length) {
          setAllergies(res.data.allergies);
          setAllergiesEnabled(true);
        }
      })
      .catch((err) => console.error("Error loading food info", err));
  }, [petId]);

  const handleChange = (e) => {
    setFood((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async () => {
  try {
    const updatedFood = { ...food };
    if (!showWater) updatedFood.waterAmount = "";
    if (!showSnacks) updatedFood.snacksPerDay = "";

    // ✅ Update food info via juiste endpoint
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/pet/${petId}/food`,
      updatedFood,
      {
        headers: { Authorization: `Bearer ${storedToken}` }
      }
    );

    // update allergies
    if (allergiesEnabled) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/pet/${petId}`,
        { allergies },
        {
          headers: { Authorization: `Bearer ${storedToken}` }
        }
      );
    }

    alert("Food info saved!");
  } catch (error) {
    console.error("Failed to save food:", error);
  }
};

  const handleAddAllergy = () => {
    if (allergyInput && !allergies.includes(allergyInput)) {
      setAllergies((prev) => [...prev, allergyInput]);
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (item) =>
    setAllergies((prev) => prev.filter((a) => a !== item));

  return (
    <Box px={3} py={6} maxWidth="sm" mx="auto" sx={{ backgroundColor: COLORS.background, minHeight: "100vh" }}>
      <Typography variant="h5" mb={3} fontWeight="bold" sx={{ color: COLORS.teal }}>
        Food Info
      </Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Brand"
            name="brand"
            value={food.brand}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Product"
            name="product"
            value={food.product}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Portion size per meal"
            name="portionSize"
            value={food.portionSize}
            onChange={handleChange}
            fullWidth
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
          <TextField
            label="Number of meals per day"
            name="frequency"
            value={food.frequency}
            onChange={handleChange}
            fullWidth
            type="number"
          />

          <FormControlLabel
            control={
              <Switch
                checked={allergiesEnabled}
                onChange={(e) => setAllergiesEnabled(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: COLORS.teal,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: COLORS.teal,
                  },
                }}
              />
            }
            label="Track allergies?"
          />

          {allergiesEnabled && (
            <>
              <Stack direction="row" spacing={1}>
                <TextField
                  label="Add allergy"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddAllergy()}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  onClick={handleAddAllergy}
                  sx={{ color: COLORS.teal, borderColor: COLORS.teal, textTransform: "none", fontWeight: "bold" }}
                >
                  +
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {allergies.map((a) => (
                  <Chip
                    key={a}
                    label={a}
                    onDelete={() => handleRemoveAllergy(a)}
                    sx={{ backgroundColor: COLORS.teal, color: "#fff", fontWeight: 500 }}
                  />
                ))}
              </Stack>
            </>
          )}

          {/* Water toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={showWater}
                onChange={(e) => setShowWater(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: COLORS.teal,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: COLORS.teal,
                  },
                }}
              />
            }
            label="Track daily water intake?"
          />
          {showWater && (
            <TextField
              label="Water intake per day"
              name="waterAmount"
              value={food.waterAmount}
              onChange={handleChange}
              fullWidth
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">ml</InputAdornment>,
              }}
            />
          )}

          {/* Snacks toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={showSnacks}
                onChange={(e) => setShowSnacks(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: COLORS.teal,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: COLORS.teal,
                  },
                }}
              />
            }
            label="Track snacks per day?"
          />
          {showSnacks && (
            <TextField
              label="Snacks per day"
              name="snacksPerDay"
              value={food.snacksPerDay}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          )}
  <TextField
            label="Notes"
            name="notes"
            value={food.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: COLORS.teal,
              "&:hover": { backgroundColor: COLORS.tealHover },
              mt: 2,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default FoodPage;
