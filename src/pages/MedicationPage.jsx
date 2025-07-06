import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


dayjs.extend(isSameOrAfter); 

function MedicationPage() {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);



  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [dosage, setDosage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const fetchMedications = () => {
    axios
      .get("/api/medications", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => setMedications(res.data))
      .catch((err) => console.error("Failed to fetch medications:", err));
  };

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMed = { name, purpose, dosage, startDate, endDate };

    const request = editId
      ? axios.put(`/api/medications/${editId}`, newMed, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
      : axios.post("/api/medications", newMed, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

    request
      .then(() => {
        fetchMedications();
        resetForm();
      })
      .catch((err) => console.error("Failed to save medication:", err));
  };

  const handleEdit = (med) => {
    setName(med.name);
    setPurpose(med.purpose);
    setDosage(med.dosage);
    setStartDate(med.startDate?.substring(0, 10));
    setEndDate(med.endDate?.substring(0, 10) || "");
    setEditId(med._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/medications/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => fetchMedications())
      .catch((err) => console.error("Failed to delete medication:", err));
  };

  const resetForm = () => {
    setName("");
    setPurpose("");
    setDosage("");
    setStartDate("");
    setEndDate("");
    setEditId(null);
    setShowForm(false);
  };

  const currentMeds = medications.filter(
    (med) =>
      !med.endDate || dayjs(med.endDate).isSameOrAfter(dayjs(), "day")
  );
  const previousMeds = medications.filter(
    (med) => med.endDate && dayjs(med.endDate).isBefore(dayjs(), "day")
  );

  const MedicationCard = ({ med, isPrevious }) => (
  <Card
    variant="outlined"
    sx={{
      borderRadius: 3,
      boxShadow: 1,
      backgroundColor: isPrevious ? "#f5f5f5" : "#ffffff",
      p: 1,
    }}
  >
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: "#00bfa6" }}>
  {med.name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {med.purpose}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {med.dosage}
      </Typography>

      <Typography variant="caption" color="text.disabled">
        {isPrevious
          ? `${dayjs(med.startDate).format("DD MMM YYYY")} – ${dayjs(med.endDate).format("DD MMM YYYY")}`
          : `Since ${dayjs(med.startDate).format("DD MMM YYYY")}`}
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="flex-end" mt={1}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => handleEdit(med)}>
        
            <EditIcon fontSize="small" sx={{ color: "#00796b" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => handleDelete(med._id)}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  </Card>
);
  return (
    <Box px={2} py={3} sx={{ backgroundColor: "#f7fdfc", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#00bfa6"
        mb={2}
        textAlign="center"
      >
        Medication
      </Typography>

      {!showForm && (
        <Box display="flex" justifyContent="flex-start" mb={3}>
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            sx={{
              px: 3,
              py: 1,
              backgroundColor: "#00bfa6",
              "&:hover": { backgroundColor: "#00a896" },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            + Add New Medication
          </Button>
        </Box>
      )}

      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          <TextField label="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mt={1}>
            <Button type="submit" variant="contained" sx={{
              px: 3,
              py: 1,
              backgroundColor: "#00bfa6",
              "&:hover": { backgroundColor: "#00a896" },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}>
              {editId ? "Update" : "Save"}
            </Button>
            <Button variant="text" color="secondary" onClick={resetForm}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Current Medication
      </Typography>
      <Stack spacing={2}>
        {currentMeds.length > 0 ? (
          currentMeds.map((med) => (
            <MedicationCard key={med._id} med={med} isPrevious={false} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No current medication.
          </Typography>
        )}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Previous Medication
      </Typography>
      <Stack spacing={2}>
        {previousMeds.length > 0 ? (
          previousMeds.map((med) => (
            <MedicationCard key={med._id} med={med} isPrevious={true} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No previous medication.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default MedicationPage;
