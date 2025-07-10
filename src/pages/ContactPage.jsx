
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useEffect, useState, useCallback} from "react";
import axios from "axios";

const COLORS = {
  background: "#f7fdfc",
  teal: "#00bfa6",
  tealHover: "#00a896",
  error: "#ef5350",
  errorHover: "#c62828",
};
const contactTypes = [
  { value: "owner", label: "Owner" },
  { value: "vet", label: "Vet" },
  { value: "animal ambulance", label: "Animal ambulance" },
  { value: "groomer", label: "Groomer" },
  { value: "trainer", label: "Trainer" },
  { value: "petsitter", label: "Petsitter" },
  { value: "walker", label: "Walker" },
  { value: "breeder", label: "Breeder" },
  { value: "insurance", label: "Insurance" },
  { value: "emergency contact", label: "Emergency contact" },
  { value: "shelter", label: "Shelter" },
  { value: "boarding", label: "Boarding" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "other", label: "Other" },
];

function ContactsPage() {
  const { petId } = useParams();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", relation: "" });

  // get contacts
const fetchContacts = useCallback(async () => {
  if (petId) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts/${petId}`);
      setContacts(res.data);
    } catch (err) {
      console.log("Error fetching contacts:", err.response?.data || err.message);
      setContacts([]);
    }
  }
}, [petId]);

useEffect(() => {
  fetchContacts();
}, [fetchContacts]);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/contacts/${editId}`, form);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/contacts`, { ...form, pet: petId });
      }
      fetchContacts();
      setShowForm(false);
      setEditId(null);
      setForm({ name: "", phone: "", relation: "" });
    } catch (err) {
  console.log("Error creating contact:", err.response?.data || err.message);
}
  };

  const handleEdit = (contact) => {
    setForm({ name: contact.name, phone: contact.phone, relation: contact.relation });
    setEditId(contact._id);
    setShowForm(true);
  };

const handleDelete = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/contacts/${id}`);
    fetchContacts();
  } catch (err) {
    console.log("Error deleting contact:", err.response?.data || err.message);
  }
};

  return (
    <Box
      px={2}
      py={5}
      maxWidth="sm"
      mx="auto"
      sx={{
        backgroundColor: COLORS.background,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        mb={3}
        fontWeight="bold"
        sx={{ color: COLORS.teal, textAlign: "center" }}
      >
        Contacts
      </Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, mb: 3 }}>
        <Stack spacing={2}>
          {contacts.map((contact) => (
            <Paper
              key={contact._id}
              elevation={1}
              sx={{
                p: 1.5,
                mb: 1,
                borderRadius: 2,
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box flex={1}>
                <Typography fontWeight={600}>{contact.name}</Typography>
                <Typography sx={{ fontSize: 14 }}>
                  <a href={`tel:${contact.phone}`} style={{ color: "#2E3A59", textDecoration: "none" }}>
                    {contact.phone}
                  </a>
                </Typography>
                <Typography sx={{ fontSize: 13, color: "grey.600" }}>{contact.relation}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => handleEdit(contact)}
                sx={{ color: COLORS.teal, borderRadius: 2 }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDelete(contact._id)}
                sx={{ color: COLORS.error, borderRadius: 2 }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Paper>
          ))}
        </Stack>

        {showForm ? (
          <Box component="form" onSubmit={handleSubmit} mt={2}>
            <Stack spacing={1.5}>

   <TextField
  select
  label="Contact type"
  name="relation"
  value={form.relation}
  onChange={handleChange}
  fullWidth
  required
>
  {contactTypes.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>
              <TextField
                label="Name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                fullWidth
                autoFocus
              />
              <TextField
                label="Phone"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                inputProps={{ inputMode: "tel" }}
                fullWidth
              />
  
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: COLORS.teal,
                  "&:hover": { backgroundColor: COLORS.tealHover },
                  fontWeight: "bold",
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                {editId ? "Save Changes" : "Add Contact"}
              </Button>
              <Button onClick={() => { setShowForm(false); setEditId(null); setForm({ name: "", phone: "", relation: "" }); }}>
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Button
            startIcon={<Add />}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#2E7CF6",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 2,
              mt: 2,
            }}
            onClick={() => setShowForm(true)}
          >
            Add Contact
          </Button>
        )}
      </Paper>
    </Box>
  );
}

export default ContactsPage;
