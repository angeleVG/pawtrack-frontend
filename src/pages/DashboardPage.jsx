import { useEffect, useState, useContext } from "react";
import { Box, Avatar, Typography, Grid, Button, Card, CardActionArea, CardContent } from "@mui/material";
import { Pets, Restaurant, Medication, Vaccines, CheckCircle, Contacts, MonitorWeight } from "@mui/icons-material";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import axios from "axios";

function DashboardPage() {
  const [pet, setPet] = useState(null);
   const [formData, setFormData] = useState({ name: "", gender: "", birthDate: "" });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 useEffect(() => {
    authService.getPetProfile()
      .then(response => setPet(response.data))
      .catch(() => setPet(null));
  }, []);


    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/pets", formData)
      .then((response) => setPet(response.data))
      .catch((err) => console.error(err));
  };

   const iconTiles = [
    { icon: <MonitorWeight fontSize="large" />, label: "Weight", route: "/weight" },
    { icon: <Restaurant fontSize="large" />, label: "Food", route: "/food" },
    { icon: <Medication fontSize="large" />, label: "Medications", route: "/medications" },
    { icon: <Vaccines fontSize="large" />, label: "Vaccinations", route: "/vaccinations" },
    { icon: <CheckCircle fontSize="large" />, label: "Tasks", route: "/tasks" },
    { icon: <Contacts fontSize="large" />, label: "Contacts", route: "/contacts" },
  ];

  return (
     <Box p={2} display="flex" flexDirection="column" alignItems="center">
      {!pet ? (
         <PetForm onSubmitSuccess={(newPet) => setPet(newPet)} />
      ) : (
        <>
          <Avatar
            src={pet.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png"}
            alt="pet avatar"
            sx={{ width: 80, height: 80, mb: 2 }}
          >
            <Pets />
          </Avatar>
          <Typography variant="h6" align="center">{pet.name}</Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            {pet.gender}, Birthday: {new Date(pet.birthDate).toLocaleDateString()}
          </Typography>

          <Grid container spacing={2} mt={2} justifyContent="center">
            {iconTiles.map(({ icon, label, route }) => (
              <Grid item xs={6} key={label}>
                <Card onClick={() => navigate(route)}>
                  <CardActionArea>
                    <CardContent sx={{ textAlign: "center" }}>
                      {icon}
                      <Typography variant="body2">{label}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default DashboardPage;