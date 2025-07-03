import { useEffect, useState, useContext } from "react";
import { Box, Avatar, Typography, Grid, Button, Card, CardActionArea, CardContent } from "@mui/material";
import { Pets, Restaurant, Medication, Vaccines, CheckCircle, Contacts, MonitorWeight } from "@mui/icons-material";
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

  //  const iconTiles = [
  //   { icon: <MonitorWeight fontSize="large" />, label: "Weight", route: "/weight" },
  //   { icon: <Restaurant fontSize="large" />, label: "Food", route: "/food" },
  //   { icon: <Medication fontSize="large" />, label: "Medications", route: "/medications" },
  //   { icon: <Vaccines fontSize="large" />, label: "Vaccinations", route: "/vaccinations" },
  //   { icon: <CheckCircle fontSize="large" />, label: "Tasks", route: "/tasks" },
  //   { icon: <Contacts fontSize="large" />, label: "Contacts", route: "/contacts" },
  // ];

  const iconTiles = [
  {
    icon: <MonitorWeight />,
    label: "Weight",
    route: "/weight",
    bgColor: "#e6f0ff", // light blue
  },
  {
    icon: <Vaccines />,
    label: "Vaccinations",
    route: "/vaccinations",
    bgColor: "#e6fff3", // minty green
  },
  {
    icon: <Restaurant />,
    label: "Food",
    route: "/food",
    bgColor: "#fff7e6", // light yellow
  },
  {
    icon: <Contacts />,
    label: "Contacts",
    route: "/contacts",
    bgColor: "#e6f9ff", // light aqua
  },
  {
    icon: <Medication />,
    label: "Medications",
    route: "/medications",
    bgColor: "#f0e6ff", // licht purple
  },
  {
    icon: <CheckCircle />,
    label: "Tasks",
    route: "/tasks",
    bgColor: "#f5f5f5", // light grey
  },
];


  return (
     <Box p={2} display="flex" flexDirection="column" alignItems="center"   sx={{ backgroundColor: "#f7fdfc", minHeight: "100vh" }}>
      {!pet ? (
         <PetForm onSubmitSuccess={(newPet) => setPet(newPet)} />
      ) : (
        <>
          <Avatar
            src={pet.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png"}
            alt="pet avatar"
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            <Pets />
          </Avatar>
          <Typography variant="h6" align="center" sx={{ color: "#00bfa6" }}>{pet.name}</Typography>
          <Typography variant="body2" align="center" color="text.secondary"> {pet.gender} •
            {pet.breed}, Birthday: {new Date(pet.birthDate).toLocaleDateString()}
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            {iconTiles.map(({ icon, label, route, bgColor }) => (
              <Grid item xs={6} sm={4} key={label}>
                <Card onClick={() => navigate(route)} sx={{ 
                    backgroundColor: bgColor,
                     height: 120,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}>
         <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {React.cloneElement(icon, {
            sx: { fontSize: 36, mb: 1, color: "#2c3e50" }, // donkere neutrale tekstkleur
          })}
          <Typography variant="body2" fontWeight={500} sx={{ color: "#2c3e50" }}>
            {label}
          </Typography>
        </Box>
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