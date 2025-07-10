import { useParams } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

function FoodPage() {
  const COLORS = {
    background: "#f7fdfc",
    teal: "#00bfa6",
    tealHover: "#00a896",
    error: "#ef5350",
    errorHover: "#c62828",
  };

  const { petId } = useParams();
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
  const [editMode, setEditMode] = useState(false);

  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState("");
  const [allergiesEnabled, setAllergiesEnabled] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);

  const storedToken = localStorage.getItem("authToken");
const [error, setError] = useState("");

  // get saved food
  const fetchFood = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/food/${petId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      if (res.data) {
        setFood(res.data);
        setFoodId(res.data._id);
        setError("");
        setEditMode(false);
        if (res.data.waterAmount) setShowWater(true);
        if (res.data.snacksPerDay) setShowSnacks(true);
      }
    } catch (err) {
        setError("Failed to load food info. Please try again.");
      setFoodId(null);
      setEditMode(false);
      setShowWater(false);
      setShowSnacks(false);
    }
  };

  // get allergies
  const fetchPet = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/pet/${petId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      if (res.data.allergies?.length) {
        setAllergies(res.data.allergies);
        setAllergiesEnabled(true);
      }
    } catch (err) {
        setError("Failed to load allergies.");
      setAllergies([]);
      setAllergiesEnabled(false);
    }
  };

  useEffect(() => {
    if (petId && storedToken) {
      fetchFood();
      fetchPet();
    }
    // eslint-disable-next-line
  }, [petId, storedToken]);

  const handleChange = (e) => {
      setError("");
    setFood((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const updatedFood = { ...food };
      if (!showWater) updatedFood.waterAmount = "";
      if (!showSnacks) updatedFood.snacksPerDay = "";

      if (foodId && editMode) {
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

      await fetchFood();
      setEditMode(false);
    } catch (err) {
     setError("Failed to save food info. Please try again.");
    }
  };

  const handleDeleteFood = async () => {
    if (!foodId) return;
    if (!window.confirm("Are you sure you want to delete this food info?")) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/food/${foodId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setFood({
        brand: "",
        product: "",
        portionSize: "",
        frequency: "",
        waterAmount: "",
        snacksPerDay: "",
        notes: "",
      });
      setFoodId(null);
      setEditMode(false);
      setShowWater(false);
      setShowSnacks(false);
      setAllergies([]);
      setAllergiesEnabled(false);
      alert("Food info deleted!");
    } catch (err) {
  setError("Failed to delete food info.");
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

  // -------------------------------------------
  // Render
  // -------------------------------------------
  return (
    <Box
      px={2}
      py={5}
      maxWidth="sm"
      mx="auto"
      sx={{ backgroundColor: COLORS.background, minHeight: "100vh" }}
    >
      <Typography
        variant="h5"
        mb={3}
        fontWeight="bold"
        sx={{ color: COLORS.teal }}
      >
        Food Info
      </Typography>

{error && (
  <Typography color="error" sx={{ mb: 2, fontSize: "1rem" }}>
    {error}
  </Typography>
)}

      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Stack spacing={2}>
          {/* --- form (updating and editing) --- */}
          {(!foodId || editMode) && (
            <>
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
                  endAdornment: (
                    <InputAdornment position="end">g</InputAdornment>
                  ),
                }}
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
                      sx={{
                        color: COLORS.teal,
                        borderColor: COLORS.teal,
                        fontWeight: "bold",
                        textTransform: "none",
                        minWidth: 36,
                        px: 0,
                      }}
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
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: COLORS.teal,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: COLORS.teal,
                      },
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">ml</InputAdornment>
                    ),
                  }}
                />
              )}

              {/* Snacks */}
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
            </>
          )}

          {/* icons */}
          {foodId && !editMode && (
            <Box mt={1}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <IconButton
                  aria-label="edit"
                  onClick={() => setEditMode(true)}
                  sx={{
                    color: COLORS.teal,
                    borderRadius: 2,
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={handleDeleteFood}
                  sx={{
                    color: COLORS.error,
                    borderRadius: 2,
                  }}
                >
                  <Delete />
                </IconButton>
              </Stack>
              <Stack spacing={1} mt={1}>
                <Typography>
                  <strong>Brand:</strong> {food.brand}
                </Typography>
                <Typography>
                  <strong>Product:</strong> {food.product}
                </Typography>
                <Typography>
                  <strong>Portion Size:</strong> {food.portionSize} g
                </Typography>
                <Typography>
                  <strong>Meals/Day:</strong> {food.frequency}
                </Typography>
                {showWater && (
                  <Typography>
                    <strong>Water/Day:</strong> {food.waterAmount} ml
                  </Typography>
                )}
                {showSnacks && (
                  <Typography>
                    <strong>Snacks/Day:</strong> {food.snacksPerDay}
                  </Typography>
                )}
                {food.notes && (
                  <Typography>
                    <strong>Notes:</strong> {food.notes}
                  </Typography>
                )}
                {allergiesEnabled && allergies.length > 0 && (
                  <>
                    <Typography>
                      <strong>Allergies:</strong>
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {allergies.map((a) => (
                        <Chip
                          key={a}
                          label={a}
                          sx={{
                            backgroundColor: COLORS.teal,
                            color: "#fff",
                          }}
                        />
                      ))}
                    </Stack>
                  </>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default FoodPage;
