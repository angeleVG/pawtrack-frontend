// src/components/layout/TopNavbar.jsx
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Avatar, Menu, MenuItem } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const COLORS = {
  background: "#f7fdfc",
  teal: "#00bfa6",
  salmon: "#FA8072",
};

function TopNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: COLORS.background,
        color: COLORS.teal,
        borderBottom: `2px solid ${COLORS.teal}`,
        px: 1,
      }}
    >
      <Toolbar sx={{ minHeight: 56, justifyContent: "space-between", p: 0 }}>
        {/* LEFT: Logo/Titel */}
        <Box display="flex" alignItems="center">
          <PetsIcon sx={{ color: COLORS.teal, fontSize: 34, mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: COLORS.teal,
              fontWeight: "bold",
              letterSpacing: 2,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
            }}
          >
            PawTrack
          </Typography>
        </Box>

        {/* RIGHT: Menu/Profile */}
        <Box display="flex" alignItems="center">
          {isLoggedIn ? (
            <>
              {/* Desktop: Profile Avatar + Logout */}
              <IconButton
                onClick={handleMenuOpen}
                size="large"
                sx={{ ml: 1 }}
                color="inherit"
                aria-label="account"
              >
                {user?.image ? (
                  <Avatar src={user.image} alt={user.name} />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 32 }} />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  <AccountCircleIcon sx={{ mr: 1 }} /> Profiel
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    logOutUser();
                  }}
                  sx={{ color: COLORS.salmon }}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> Uitloggen
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Login */}
              <Button
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
                variant="contained"
                sx={{
                  ml: 2,
                  bgcolor: COLORS.teal,
                  ":hover": { bgcolor: COLORS.salmon },
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "none",
                  textTransform: "none",
                }}
              >
                Inloggen
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="outlined"
                sx={{
                  ml: 1,
                  borderColor: COLORS.teal,
                  color: COLORS.teal,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  ":hover": {
                    bgcolor: "#e0f7f5",
                    borderColor: COLORS.teal,
                  },
                }}
              >
                Aanmelden
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavbar;
