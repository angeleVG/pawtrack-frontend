import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicationIcon from "@mui/icons-material/Medication";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate, useLocation } from "react-router-dom";

// Mint and salmon PawTrack palette
const COLORS = {
  background: "#f7fdfc",
  primary: "#00bfa6",
  accent: "#FA8072",
  divider: "#e0e0e0",
};

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Only the Home icon is in the bottom nav, Menu opens drawer
  const navItems = [
    { label: "Home", icon: <HomeIcon />, path: "/dashboard" },
    { label: "Menu", icon: <MenuIcon />, isDrawer: true },
  ];

  // All other pages in the drawer
  const drawerPages = [
    { label: "Weight", icon: <MonitorWeightIcon />, path: "/weight" },
    { label: "Food", icon: <RestaurantIcon />, path: "/food" },
    { label: "Medication", icon: <MedicationIcon />, path: "/medication" },
    { label: "Activity", icon: <DirectionsRunIcon />, path: "/activity" },
    { label: "Vaccination", icon: <VaccinesIcon />, path: "/vaccination" },
    { label: "Contacts", icon: <ContactsIcon />, path: "/contacts" },
  ];

  // Highlight Home if on dashboard
  const currentTab = navItems.findIndex(
    (item) => !item.isDrawer && location.pathname.startsWith(item.path)
  );

  return (
    <>
      {/* Bottom Navigation */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          borderRadius: 0,
          bgcolor: "#fff",
          borderTop: `1px solid ${COLORS.divider}`,
          maxWidth: 600,
          margin: "0 auto",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={currentTab !== -1 ? currentTab : 0}
          onChange={(_, newValue) => {
            const item = navItems[newValue];
            if (item.isDrawer) {
              setDrawerOpen(true);
            } else {
              navigate(item.path);
            }
          }}
          sx={{
            height: 60,
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              sx={{
                color: COLORS.primary,
                "&.Mui-selected": { color: COLORS.accent },
                fontSize: 14,
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>

     
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 270,
            maxWidth: "90vw",
            bgcolor: COLORS.background,
            pt: 2,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ px: 2, mb: 2 }}>
          <Box
            sx={{
              fontWeight: 600,
              fontSize: 18,
              mb: 1,
              color: COLORS.primary,
            }}
          >
            Menu
          </Box>
        </Box>
        <List>
          {drawerPages.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                minHeight: 48,
                "&:active, &:hover": {
                  bgcolor: COLORS.accent + "20",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: COLORS.primary,
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    fontSize: 17,
                    fontWeight: 500,
                    color: "#2E3A59",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
