import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicationIcon from "@mui/icons-material/Medication";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define mapping for easier control
  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/dashboard" },
    { label: "Weight", icon: <MonitorWeightIcon />, path: "/weight" },
    { label: "Food", icon: <RestaurantIcon />, path: "/food" },
    { label: "Medication", icon: <MedicationIcon />, path: "/medication" },
    { label: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  ];

  // Active tab based on current route
  const currentTab = navItems.findIndex((item) => location.pathname.startsWith(item.path));

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200, // Above other content
        borderRadius: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentTab !== -1 ? currentTab : 0}
        onChange={(_, newValue) => navigate(navItems[newValue].path)}
        sx={{
          height: 60,
          bgcolor: "#f7fdfc",
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            sx={{
              color: "#00bfa6",
              "&.Mui-selected": {
                color: "#FA8072", // Salmon
              },
              fontSize: 12,
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
