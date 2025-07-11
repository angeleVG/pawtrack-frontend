import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const COLORS = {
  background: "#f7fdfc",
  teal: "#00bfa6",
  tealHover: "#00a896",
  salmon: "#FA8072",
  blueGray: "#2E3A59"
};

function VaccinationPage() {
  const { petId } = useParams();
  const [vaccinations, setVaccinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    dateGiven: "",
    expiryDate: "",
    vet: "",
    batchNumber: "",
    notes: ""
  });

  const storedToken = localStorage.getItem("authToken");
 const [error, setError] = useState("");

 useEffect(() => {
  if (!petId) return;
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/vaccination/pet/${petId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then(res => {
      setVaccinations(res.data);
      setError("");
    })
    .catch(() => {
      setVaccinations([]);
      setError("Failed to load vaccinations.");
    });
}, [petId, storedToken]);

  const resetForm = () => {
    setForm({
      name: "",
      dateGiven: "",
      expiryDate: "",
      vet: "",
      batchNumber: "",
      notes: ""
    });
    setEditId(null);
      setError("");
  };


const handleSubmit = async e => {
  e.preventDefault();
    setError("");
  try {
    if (editId) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/vaccination/${editId}`,
        { ...form, pet: petId },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
    } else {
 await axios.post(
  `${process.env.REACT_APP_API_URL}/api/vaccination`,
  { ...form, pet: petId },
  { headers: { Authorization: `Bearer ${storedToken}` } }
);
    }
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/vaccination/pet/${petId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    );
    setVaccinations(res.data);
    setShowForm(false);
    resetForm();
       setError("");
  } catch (err) {
      setError("Failed to save vaccination. Please try again.");
  }
};


  const handleEdit = vax => {
    setEditId(vax._id);
    setForm({
      name: vax.name || "",
      dateGiven: vax.dateGiven ? dayjs(vax.dateGiven).format("YYYY-MM-DD") : "",
      expiryDate: vax.expiryDate ? dayjs(vax.expiryDate).format("YYYY-MM-DD") : "",
      vet: vax.vet || "",
      batchNumber: vax.batchNumber || "",
      notes: vax.notes || ""
    });
    setShowForm(true);
  };

  const handleDelete = async id => {
  if (!window.confirm("Are you sure you want to delete this vaccination?")) return;
  setError("");
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/vaccination/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    });
    setVaccinations(vaccinations => vaccinations.filter(v => v._id !== id));
    setError("");
  } catch {
    setError("Failed to delete vaccination.");
  }
};

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: COLORS.background,
        minHeight: "100vh",
        maxWidth: 480,
        mx: "auto"
      }}
    >
      <Typography variant="h5" fontWeight={600} color={COLORS.blueGray} mb={2}>
        Vaccinations
      </Typography>

{error && (
  <Typography color="error" sx={{ mb: 2, fontSize: "1rem" }}>
    {error}
  </Typography>
)}

      {!showForm && (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            bgcolor: COLORS.teal,
            "&:hover": { bgcolor: COLORS.tealHover },
            mb: 2,
            borderRadius: 3,
            boxShadow: 1,
            fontWeight: 500
          }}
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          fullWidth
        >
          Add vaccination
        </Button>
      )}

      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "#fff",
            p: 2,
            borderRadius: 3,
            boxShadow: 1,
            mb: 3
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Name vaccine"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Date given"
              type="date"
              value={form.dateGiven}
              onChange={e => setForm({ ...form, dateGiven: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="Expiry date"
              type="date"
              value={form.expiryDate}
              onChange={e => setForm({ ...form, expiryDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Vet / clinic"
              value={form.vet}
              onChange={e => setForm({ ...form, vet: e.target.value })}
              fullWidth
            />
            <TextField
              label="Batch number"
              value={form.batchNumber}
              onChange={e => setForm({ ...form, batchNumber: e.target.value })}
              fullWidth
            />
            <TextField
              label="Notes"
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />

            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: COLORS.teal,
                  "&:hover": { bgcolor: COLORS.tealHover },
                  borderRadius: 3,
                  fontWeight: 500,
                  flex: 1
                }}
              >
                {editId ? "Save" : "Add"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ borderRadius: 3, flex: 1 }}
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}

      <Stack spacing={2}>
        {vaccinations.length === 0 && (
          <Typography color="text.secondary">No vaccinations added</Typography>
        )}
        {vaccinations.map(vax => (
          <Card
            key={vax._id}
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 8px #eee",
              px: 1,
              py: 0.5
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography fontWeight={600}>{vax.name}</Typography>
                  <Typography fontSize="small">
                   Given on: {dayjs(vax.dateGiven).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography fontSize="small" color="text.secondary">
                    Valid until: {vax.expiryDate ? dayjs(vax.expiryDate).format("DD-MM-YYYY") : "–"}
                  </Typography>
                  {vax.vet && (
                    <Typography fontSize="small" color="text.secondary">
                      Vet: {vax.vet}
                    </Typography>
                  )}
                  {vax.batchNumber && (
                    <Typography fontSize="small" color="text.secondary">
                      Batch: {vax.batchNumber}
                    </Typography>
                  )}
                  {vax.notes && (
                    <Typography fontSize="small" color="text.secondary">
                      {vax.notes}
                    </Typography>
                  )}
                </Box>
                <Stack direction="row">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(vax)} size="small" sx={{ color: COLORS.teal }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(vax._id)} size="small" sx={{ color: COLORS.salmon }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default VaccinationPage;
