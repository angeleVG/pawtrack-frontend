import React from "react";
import { useEffect, useState } from "react";
import { Box, Avatar, Typography, Grid, Card, CardActionArea } from "@mui/material";
import { MedicationOutlined, PetsOutlined, ContactPhoneOutlined, RestaurantOutlined, VaccinesOutlined, MonitorWeightOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PetForm from "../components/PetForm";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function DashboardPage() {
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  const [error, setError] = useState("");
const [imageError, setImageError] = useState("");


 useEffect(() => {
    setError(""); 
  const storedToken = localStorage.getItem("authToken");

 axios.get(`${process.env.REACT_APP_API_URL}/api/pet`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
    .then((res) => {
      const petData = res.data;

      if (Array.isArray(petData) && petData.length > 0 && petData[0]) {
        setPet(petData[0]); // set the first pet
         localStorage.setItem("activePetId", petData[0]._id); // store pet ID for use in ActivityPage
      } else {
        setPet(null); // no pet = show form
      }
    })
     .catch(() => {
      setError("Failed to load your pet. Please try again.");
      setPet(null);
    });
}, []);

// replacing avatar for image
const handleImageUpload = (e) => {
    setImageError("");
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const storedToken = localStorage.getItem("authToken");

  axios.post(`${process.env.REACT_APP_API_URL}/api/pet/upload`, formData, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => {
    const newImageUrl = res.data.imageUrl;
    setPet((prevPet) => ({ ...prevPet, image: newImageUrl }));
  })
  .catch((err) => {
    setImageError("Failed to upload image. Please try again.");
  });
};

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
    route: "/vaccination",
    bgColor: "#e6fff3", // minty green
  },
  {
    icon: <RestaurantOutlined />,
    label: "Food",
   route: pet ? `/pet/${pet._id}/food` : "#",
    bgColor: "#fff7e6", // light yellow
  },
  {
    icon: <ContactPhoneOutlined />,
    label: "Contacts",
  route: pet ? `/pet/${pet._id}/contacts` : "#",
    bgColor: "#e6f9ff", // light aqua
  },
  {
    icon: <MedicationOutlined />,
    label: "Medications",
    route: "/medication",
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
     {error && (
  <Typography color="error" sx={{ mb: 2, fontSize: "1rem" }}>
    {error}
  </Typography>
)}
{imageError && (
  <Typography color="error" sx={{ mb: 2, fontSize: "1rem" }}>
    {imageError}
  </Typography>
)}
 {!pet ? (
         <PetForm onSubmitSuccess={(newPet) => setPet(newPet)} />
      ) : (
        <>
         <Box mb={4} display="flex" flexDirection="column" alignItems="center">
      <Tooltip title="Klik om afbeelding te wijzigen" arrow>
  
 <Box sx={{ position: "relative", width: 140, height: 140, mb: 2 }}>
  <label htmlFor="avatar-upload">
    <input
      id="avatar-upload"
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleImageUpload}
    />
    <Avatar
      src={pet.image || "https://cdn-icons-png.flaticon.com/512/7280/7280954.png"}
      alt="pet avatar"
      sx={{
        width: 140,
        height: 140,
        border: "2px solid #00bfa6",
        cursor: "pointer",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: 8,
        right: 8,
        bgcolor: "white",
        border: "1px solid #ccc",
        borderRadius: "50%",
        p: 0.5,
      }}
    >
      <EditIcon sx={{ fontSize: 18, color: "#00bfa6" }} />
    </Box>
  </label>
</Box>
</Tooltip>

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