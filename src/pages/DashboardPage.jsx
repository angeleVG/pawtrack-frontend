import { useEffect, useState, useContext } from "react";
import { Box, Avatar, Typography, Grid, Button, Card, CardActionArea, CardContent } from "@mui/material";
import { Pets, Restaurant, Medication, Vaccines, MedicationOutlined, PetsOutlined, CheckCircle, ContactPhoneOutlined, Contacts, MonitorWeight, RestaurantOutlined, VaccinesOutlined, MonitorWeightOutlined } from "@mui/icons-material";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import axios from "axios";
import PetForm from "../components/PetForm";
import React from "react";

function DashboardPage() {
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 useEffect(() => {
   const storedToken = localStorage.getItem("authToken");

  axios.get("/api/pet", {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
    .then((res) => {
      if (res.data.length > 0) {
        setPet(res.data[0]); 
      } else {
        setPet(null);
      }
    })
    .catch((err) => {
      console.error("Error fetching pet:", err);
      setPet(null);
    });
}, []);

  const iconTiles = [
  {
    icon: <MonitorWeightOutlined />,
    label: "Weight",
    route: "/weight",
    bgColor: "#e6f0ff", // light blue
  },
  {
    icon: <VaccinesOutlined />,
    label: "Vaccinations",
    route: "/vaccinations",
    bgColor: "#e6fff3", // minty green
  },
  {
    icon: <RestaurantOutlined />,
    label: "Food",
    route: "/food",
    bgColor: "#fff7e6", // light yellow
  },
  {
    icon: <ContactPhoneOutlined />,
    label: "Contacts",
    route: "/contacts",
    bgColor: "#e6f9ff", // light aqua
  },
  {
    icon: <MedicationOutlined />,
    label: "Medications",
    route: "/medications",
    bgColor: "#f0e6ff", // light purple
  },
  {
    icon: <PetsOutlined />,
    label: "Activity",
    route: "/activity",
    bgColor: "#f5f5f5", // light grey
  },
];


  return (
     <Box p={2} display="flex" flexDirection="column" alignItems="center"   sx={{ backgroundColor: "#f7fdfc", minHeight: "100vh" }}>
      {!pet ? (
         <PetForm onSubmitSuccess={(newPet) => setPet(newPet)} />
      ) : (
        <>
         <Box mb={4} display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={pet.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png"}
            alt="pet avatar"
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            <Pets />
          </Avatar>
          <Typography variant="h5" align="center" sx={{ color: "#00bfa6", fontWeight: 600 }}>{pet.name}</Typography>
          <Typography variant="body1" align="center" color="text.secondary"> {pet.gender} •
            {pet.breed}, Birthday: {new Date(pet.birthDate).toLocaleDateString()}
          </Typography>
          </Box>

  <Grid container spacing={2} justifyContent="center">
            {iconTiles.map(({ icon, label, route, bgColor }) => (
              <Grid item xs={6} key={label}>
                <Card
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: 2,
                    backgroundColor: bgColor,
                    boxShadow: 1,
                  }}
                >
  <CardActionArea
                    onClick={() => navigate(route)}
                    sx={{
                      height: "100%",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      '&:hover': {
                        transform: "scale(1.05)",
                      },
                      '&:focus-visible': {
                        boxShadow: "0 0 0 3px #00bfa6",
                        transform: "scale(1.05)",
                      },
                    }}
                    tabIndex={0}
                    aria-label={`Go to ${label}`}
                  >
                    {React.cloneElement(icon, {
                      sx: { fontSize: 36, mb: 1, color: "#2c3e50" },
                    })}
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ color: "#2c3e50" }}
                    >
                      {label}
                    </Typography>
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