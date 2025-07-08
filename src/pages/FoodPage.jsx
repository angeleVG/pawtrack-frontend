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
  const [foodId, setFoodId] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [allergiesEnabled, setAllergiesEnabled] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const fetchData = async () => {
    try {
      const foodRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/food/${petId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (foodRes.data) {
        setFood(foodRes.data);
        setFoodId(foodRes.data._id);
        if (foodRes.data.waterAmount) setShowWater(true);
        if (foodRes.data.snacksPerDay) setShowSnacks(true);
      }
    } catch (err) {
      console.error("Error loading food info:", err);
    }

    try {
      const petRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/pet/${petId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (petRes.data.allergies?.length) {
        setAllergies(petRes.data.allergies);
        setAllergiesEnabled(true);
      }
    } catch (err) {
      console.error("Error loading allergies:", err);
    }
  };

  if (petId && storedToken) fetchData();
}, [petId]);

  const handleChange = (e) => {
    setFood((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const updatedFood = { ...food };
      if (!showWater) updatedFood.waterAmount = "";
      if (!showSnacks) updatedFood.snacksPerDay = "";

      if (foodId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/food/${foodId}`,
          updatedFood,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/food`,
          { ...updatedFood, pet: petId },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setFoodId(res.data._id);
      }

      if (allergiesEnabled) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/pet/${petId}`,
          { allergies },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      }

      alert("Food info saved!");
    } catch (err) {
      console.error("Failed to save food:", err);
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
          <TextField label="Brand" name="brand" value={food.brand} onChange={handleChange} fullWidth />
          <TextField label="Product" name="product" value={food.product} onChange={handleChange} fullWidth />
          <TextField
            label="Portion size per meal"
            name="portionSize"
            value={food.portionSize}
            onChange={handleChange}
            fullWidth
            type="number"
            InputProps={{ endAdornment: <InputAdornment position="end">g</InputAdornment> }}
          />
          <TextField
            label="Meals per day"
            name="frequency"
            value={food.frequency}
            onChange={handleChange}
            fullWidth
            type="number"
          />

          {/* Allergies */}
          <FormControlLabel
            control={
              <Switch
                checked={allergiesEnabled}
                onChange={(e) => setAllergiesEnabled(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: COLORS.teal },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: COLORS.teal },
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
                    sx={{ backgroundColor: COLORS.teal, color: "#fff" }}
                  />
                ))}
              </Stack>
            </>
          )}

          {/* Water */}
          <FormControlLabel
            control={
              <Switch
                checked={showWater}
                onChange={(e) => setShowWater(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: COLORS.teal },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: COLORS.teal },
                }}
              />
            }
            label="Track daily water?"
          />
          {showWater && (
            <TextField
              label="Water per day"
              name="waterAmount"
              value={food.waterAmount}
              onChange={handleChange}
              fullWidth
              type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">ml</InputAdornment> }}
            />
          )}

          {/* Snacks */}
          <FormControlLabel
            control={
              <Switch
                checked={showSnacks}
                onChange={(e) => setShowSnacks(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: COLORS.teal },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: COLORS.teal },
                }}
              />
            }
            label="Track snacks?"
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
