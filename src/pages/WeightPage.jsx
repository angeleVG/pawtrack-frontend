import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText, 
  IconButton
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

 const API_URL = process.env.REACT_APP_API_URL;

function WeightPage() {
  const [weights, setWeights] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [showForm, setShowForm] = useState(false);


  const storedToken = localStorage.getItem("authToken");

const fetchWeights = useCallback(async () => {
  try {
    const res = await axios.get(`${API_URL}/api/weight`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    setWeights(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Error fetching weights:", err);
    setWeights([]);
  }
}, [storedToken]); 

  useEffect(() => {
    fetchWeights();
  }, [fetchWeights]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/weight`,
        { value: newWeight },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setNewWeight("");
      setShowForm(false);
      fetchWeights();
    } catch (err) {
      console.error("Error submitting weight:", err);
    }
  };

const handleDelete = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/weight/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    fetchWeights(); // Refresh list 
  } catch (err) {
    console.error("Error deleting weight:", err);
  }
};

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="#00bfa6">
        Weight
      </Typography>

      {weights.length > 0 && (
        <>
          <Typography    variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#00bfa6" }}
            >
            Weight over time
          </Typography>

          <Box sx={{ width: "100%", height: { xs: 240, sm: 300 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weights}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => new Date(str).toLocaleDateString()}
                  fontSize={10}
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00bfa6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}

      {/* Add weight button */}
      {!showForm && (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{
  width: "fit-content",
  alignSelf: "center",
             backgroundColor: "#00bfa6",
            "&:hover": { backgroundColor: "#00a896"},
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          + Add weight
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 1 }}
        >
          <TextField
            type="number"
            size="small"
            label="Weight (kg)"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#00bfa6",
              "&:hover": { backgroundColor: "#00a896" },
              textTransform: "none",
            }}
          >
            Add
          </Button>
        </Box>
      )}

      {weights.length > 0 && (
        <>
          <Box mt={1}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#00bfa6" }}
            >
              Current weight
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="#212121">
              {weights[weights.length - 1].value} kg
            </Typography>
          </Box>

{weights.length > 1 && (
  <>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: "bold",
        color: "#00bfa6",
        mt: 2,
        mb: 1,
      }}
    >
      Previous weights
    </Typography>

    <List dense>
      {weights
        .slice(0, -1)
        .reverse()
        .map((entry) => (
          <ListItem
            key={entry._id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(entry._id)}
              >
                <DeleteIcon sx={{ color: "#e53935" }} />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${entry.value} kg`}
              secondary={new Date(entry.date).toLocaleDateString()}
            />
          </ListItem>
        ))}
    </List>
  </>
)}

        </>
      )}
    </Box>
  );
}

export default WeightPage;
