import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, List, ListItem, ListItemText,
  MenuItem, Stack, IconButton
} from "@mui/material";
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


  // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
  const storedToken = localStorage.getItem("authToken");

    axios.get(`${process.env.REACT_APP_API_URL}/api/task`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(res => setActivities(res.data))
      .catch(err => console.error("Error loading tasks", err));
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
        notes
      }
    };

    const request = editId
      ? axios.put(`${process.env.REACT_APP_API_URL}/api/task/${editId}`, taskData, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
      : axios.post(`${process.env.REACT_APP_API_URL}/api/task`, taskData, {
          headers: { Authorization: `Bearer ${storedToken}` }
        });

    request
      .then(res => {
        if (editId) {
          setActivities((prev) =>
            prev.map((task) => (task._id === editId ? res.data : task))
          );
        } else {
          setActivities([...activities, res.data]);
        }
        resetForm();
      })
      .catch(err => console.error("Error saving task", err));
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
    axios.delete(`${process.env.REACT_APP_API_URL}/api/task/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then(() => setActivities((prev) => prev.filter((task) => task._id !== id)))
      .catch(err => console.error("Error deleting task", err));
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        {editId ? "Edit Activity" : "Add Activity"}
      </Typography>

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
            {editId ? "Update Activity" : "Add Activity"}
          </Button>
          {editId && (
            <Button variant="outlined" color="secondary" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Stack>
      </form>

      <List>
        {activities.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEdit(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${task.type} (${task.duration} minutes x ${task.timesPerDay}) a day`}
              secondary={task.dailyWalks?.notes}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ActivityPage;
