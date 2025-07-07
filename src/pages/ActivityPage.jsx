import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, List, ListItem, ListItemText,
  MenuItem, Stack
} from "@mui/material";
import axios from "axios";

function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState("walk");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [duration, setDuration] = useState(15);
  const [notes, setNotes] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const petId = localStorage.getItem("activePetId");
  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/task`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(res => setActivities(res.data))
      .catch(err => console.error("Error loading tasks", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      dog: petId, 
      type,
      timesPerDay,
      duration,
      dailyWalks: {
        durations: [duration],
        notes
      }
    };

console.log("petId:", petId);
console.log("newTask:", newTask);
console.log("Pet ID uit localStorage:", petId);

    axios.post(`${process.env.REACT_APP_API_URL}/api/task`, newTask, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(res => {
        setActivities([...activities, res.data]);
        setNotes("");
      })
      .catch(err => console.error("Error creating task", err));
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>Activity Tracker</Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} mb={2}>
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          />

          <TextField
            label="How long in minutes"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={2}
          />

          <Button type="submit" variant="contained" color="primary">
            Add Activity
          </Button>
        </Stack>
      </form>

      <List>
        {activities.map((task) => (
          <ListItem key={task._id}>
            <ListItemText
              primary={`${task.type} (${task.duration} min x ${task.timesPerDay})`}
              secondary={task.dailyWalks?.notes}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ActivityPage;
