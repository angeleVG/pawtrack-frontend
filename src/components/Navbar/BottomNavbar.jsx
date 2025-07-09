import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonIcon from "@mui/icons-material/Person";

export default function AppDrawer({ open, onClose, onNavigate }) {
  const menu = [
    { label: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { label: "Weight", icon: <MonitorWeightIcon />, path: "/weight" },
    { label: "Food", icon: <RestaurantIcon />, path: "/food" },
    { label: "Medication", icon: <MedicationIcon />, path: "/medication" },
    { label: "Vaccination", icon: <VaccinesIcon />, path: "/vaccination" },
    { label: "Contacts", icon: <ContactsIcon />, path: "/contacts" },
    { label: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "75vw", sm: 240 }, // <= Past zich aan per scherm! xs = mobiel
          bgcolor: "#f7fdfc",
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ pt: 2, pb: 1, px: 3 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#00bfa6"
          sx={{
            fontSize: { xs: "1.3rem", sm: "1.18rem" },
          }}
        >
          🐾 PawTrack
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 0 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => onNavigate(item.path)}
            sx={{
              minHeight: 52,
              borderRadius: 2,
              mb: 0.5,
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                sx: {
                  fontSize: { xs: "1.15rem", sm: "1.09rem" },
                  fontWeight: 500,
                  color: "#212121",
                  lineHeight: 1.2,
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
  );
}
