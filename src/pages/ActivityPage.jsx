import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState("walk");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [duration, setDuration] = useState(15);
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState(null);
  const petId = localStorage.getItem("activePetId");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/task`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setActivities(res.data))
      .catch((err) => console.error("Error loading tasks", err));
  }, []);

  const resetForm = () => {
    setType("walk");
    setTimesPerDay(1);
    setDuration(15);
    setNotes("");
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const taskData = {
      dog: petId,
      type,
      timesPerDay,
      duration,
      dailyWalks: {
        durations: [duration],
        notes,
      },
    };

    const request = editId
      ? axios.put(`${process.env.REACT_APP_API_URL}/api/task/${editId}`, taskData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
      : axios.post(`${process.env.REACT_APP_API_URL}/api/task`, taskData, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

    request
      .then((res) => {
        if (editId) {
          setActivities((prev) => prev.map((task) => (task._id === editId ? res.data : task)));
        } else {
          setActivities([...activities, res.data]);
        }
        resetForm();
      })
      .catch((err) => console.error("Error saving task", err));
  };

  const handleEdit = (task) => {
    setType(task.type);
    setTimesPerDay(task.timesPerDay);
    setDuration(task.duration);
    setNotes(task.dailyWalks?.notes || "");
    setEditId(task._id);
  };

  const handleDelete = (id) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/task/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => setActivities((prev) => prev.filter((task) => task._id !== id)))
      .catch((err) => console.error("Error deleting task", err));
  };

  const activityIcon = (type) => {
    switch (type) {
      case "walk":
        return <DirectionsWalkIcon sx={{ color: "#2c3e50", fontSize: 28, mr: 1 }} />;
      case "play":
        return <SportsEsportsIcon sx={{ color: "#2c3e50", fontSize: 28, mr: 1 }} />;
      case "train":
        return <EmojiObjectsIcon sx={{ color: "#2c3e50", fontSize: 28, mr: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <Box px={2} py={3} maxWidth="sm" mx="auto" sx={{ backgroundColor: "#f7fdfc", minHeight: "100vh" }}>
      <Typography variant="h5" mb={3} color="primary" sx={{ color: "#00bfa6", fontWeight: 600 }}>
        {editId ? "Edit Activity" : "Add Activity"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="walk">Walk</MenuItem>
            <MenuItem value="play">Play</MenuItem>
            <MenuItem value="train">Train</MenuItem>
          </TextField>

          <TextField
            label="Times per day"
            type="number"
            value={timesPerDay}
            onChange={(e) => setTimesPerDay(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{ min: 1 }}
          />

          <TextField
            label="How long in minutes"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{ min: 1 }}
          />

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
          />

          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#00bfa6", "&:hover": { bgcolor: "#009e8e" } }}>
            {editId ? "Update Activity" : "+ Add Activity"}
          </Button>

          {editId && (
            <Button variant="outlined" color="secondary" onClick={resetForm} fullWidth>
              Cancel
            </Button>
          )}
        </Stack>
      </form>

      <Box mt={4}>
        <Typography variant="h6" mb={2} sx={{ color: "#2c3e50", fontWeight: 500 }}>
          Daily Activities
        </Typography>

        <Stack spacing={2}>
          {activities.map((task) => (
            <Card key={task._id} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  {activityIcon(task.type)}
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#2c3e50" }}>
                    {task.type} – {task.duration} min × {task.timesPerDay}
                  </Typography>
                </Box>
                {task.dailyWalks?.notes && (
                  <Typography variant="body2" color="text.secondary">
                    {task.dailyWalks.notes}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton onClick={() => handleEdit(task)} sx={{ color: "#00bfa6" }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(task._id)} sx={{ color: "#f44336" }}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default ActivityPage;
