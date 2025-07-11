import {
  Box,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = {
  background: "#f7fdfc",
  teal: "#00bfa6",
  darkText: "#2E3A59",
  salmon: "#FA8072",
};

function SharedPetPage() {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch pet data from the public API endpoint (readonly)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/pet/public/${petId}`)
      .then((res) => {
        setPet(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shared pet:", err);
        setLoading(false);
      });
  }, [petId]);

  // Show loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: COLORS.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If pet is not found, display a simple message
  if (!pet) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: COLORS.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color={COLORS.darkText}>
          Pet not found.
        </Typography>
      </Box>
    );
  }

  // MAIN CONTENT
  return (
    <Box sx={{ backgroundColor: COLORS.background, minHeight: "100vh", p: 2 }}>
      {/* Pet Name, Breed, Birthday, Allergies */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ color: COLORS.teal }}>
          {pet.name}
        </Typography>
        {pet.image && (
          <Box
            component="img"
            src={pet.image}
            alt={pet.name}
            sx={{
              width: "100%",
              maxWidth: 250,
              height: "auto",
              borderRadius: 2,
              mt: 2,
            }}
          />
        )}
        <Typography variant="body1" sx={{ mt: 2, color: COLORS.darkText }}>
          Breed: {pet.breed || "-"}
        </Typography>
        <Typography variant="body1" sx={{ color: COLORS.darkText }}>
          Birthday:{" "}
          {pet.birthDate
            ? new Date(pet.birthDate).toLocaleDateString()
            : "-"}
        </Typography>
        {pet.allergies && pet.allergies.length > 0 && (
          <Typography
            variant="body1"
            sx={{ mt: 1, color: COLORS.salmon, fontWeight: 500 }}
          >
            Allergies: {pet.allergies.join(", ")}
          </Typography>
        )}
      </Box>

      <Stack spacing={3}>
        {/* Weights */}
        {pet.weights?.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: COLORS.darkText }}>
              Weight History
            </Typography>
            <Divider sx={{ my: 1 }} />
            {pet.weights.map((entry) => (
              <Typography key={entry._id} variant="body2">
                {entry.date
                  ? new Date(entry.date).toLocaleDateString()
                  : ""}{" "}
                {entry.value} kg
              </Typography>
            ))}
          </Box>
        )}

        {/* Food */}
        {pet.food && (
          <Box>
            <Typography variant="h6" sx={{ color: COLORS.darkText }}>
              Food
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">
              Brand: {pet.food.brand || "-"}
            </Typography>
            <Typography variant="body2">
              Product: {pet.food.product || "-"}
            </Typography>
            <Typography variant="body2">
              Portion Size: {pet.food.portionSize ?? "-"}
            </Typography>
            <Typography variant="body2">
              Frequency: {pet.food.frequency ?? "-"}
            </Typography>
            {pet.food.notes && (
              <Typography variant="body2">Notes: {pet.food.notes}</Typography>
            )}
            {pet.food.allergies?.length > 0 && (
              <Typography variant="body2">
                Allergies: {pet.food.allergies.join(", ")}
              </Typography>
            )}
          </Box>
        )}

        {/* Medications */}
        {pet.medications?.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: COLORS.darkText }}>
              Medications
            </Typography>
            <Divider sx={{ my: 1 }} />
            {pet.medications.map((med) => (
              <Typography key={med._id} variant="body2">
                {med.name} – {med.dosage} ({med.purpose})
              </Typography>
            ))}
          </Box>
        )}

        {/* Vaccinations */}
        {pet.vaccinations?.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: COLORS.darkText }}>
              Vaccinations
            </Typography>
            <Divider sx={{ my: 1 }} />
            {pet.vaccinations.map((v, index) => (
              <Typography key={index} variant="body2">
                {v.name} –{" "}
                {v.dateGiven
                  ? new Date(v.dateGiven).toLocaleDateString()
                  : v.date?.slice(0, 10) || ""}
              </Typography>
            ))}
          </Box>
        )}

        {/* Activities */}
        {pet.activities?.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: COLORS.darkText }}>
              Activities
            </Typography>
            <Divider sx={{ my: 1 }} />
            {pet.activities.map((a) => (
              <Typography key={a._id} variant="body2">
                {a.type} – {a.duration} min ({a.timesPerDay}×/day)
              </Typography>
            ))}
          </Box>
        )}

        {/* Contacts */}
        {pet.contacts?.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ color: COLORS.darkText }}>
              Contacts
            </Typography>
            <Divider sx={{ my: 1 }} />
            {pet.contacts.map((c) => (
              <Typography key={c._id} variant="body2">
                {c.name} ({c.relation}) – {c.phone}
              </Typography>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default SharedPetPage;
