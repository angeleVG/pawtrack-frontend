import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Pets } from "@mui/icons-material";
import axios from "axios";

function WeightPage() {
  const [weights, setWeights] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get("/api/weight", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setWeights(res.data);
        if (res.data.length > 0) {
          setLatestWeight(res.data[res.data.length - 1].value);
        }
      })
      .catch((err) => console.error("Error fetching weight data:", err));
  }, []);

  const handleAddWeight = () => {
    // Navigation to add weight
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="medium" mb={1} color="#00bfa6">
        Weight
      </Typography>

      {weights.length === 0 ? (
        <Box textAlign="center" mt={4} mb={4}>
          <Typography color="text.secondary">
            No weight entries yet.
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddWeight}
            sx={{
              mt: 2,
              backgroundColor: "#00bfa6",
              '&:hover': { backgroundColor: "#00a896" },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            + Add your first weight
          </Button>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddWeight}
              sx={{
                borderRadius: 5,
                backgroundColor: "#00bfa6",
                '&:hover': {
                  backgroundColor: "#00a896",
                },
              }}
            >
              + Add Weight
            </Button>
          </Box>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={weights}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#757575" }} />
              <YAxis domain={[14, 22]} tick={{ fontSize: 12, fill: "#757575" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", borderColor: "#BDBDBD" }}
                labelStyle={{ color: "#212121" }}
                itemStyle={{ color: "#212121" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00bfa6"
                strokeWidth={2}
                dot={{ r: 4, stroke: "#FF7043", strokeWidth: 1.5 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <Typography mt={2} variant="body2" color="#757575">
            Current Weight
          </Typography>
          <Typography variant="h4" fontWeight="bold" mb={2} color="#212121">
            {latestWeight ? `${latestWeight} kg` : "-- kg"}
          </Typography>

          <Card
            sx={{
              backgroundColor: "#00bfa6",
              color: "#ffffff",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center">
                <Pets sx={{ mr: 1 }} />
                <Typography variant="body2">
                  The weight chart displays the recorded weight entries over time.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}

export default WeightPage;