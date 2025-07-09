// src/components/layout/TopNavbar.jsx
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";
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
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <IconButton component={Link} to="/" sx={{ color: COLORS.teal }}>
            <PetsIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.teal,
              fontWeight: "bold",
              ml: 1,
              display: { xs: "none", sm: "block" },
              letterSpacing: 2,
              textDecoration: "none",
            }}
            component={Link}
            to="/"
          >
            Pawtrack
          </Typography>
        </Box>

        {/* icons only right */}
        <Box display="flex" alignItems="center">
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: COLORS.teal }}>
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
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                  <AccountCircleIcon sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    logOutUser();
                  }}
                  sx={{ color: COLORS.salmon }}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <IconButton component={Link} to="/login" sx={{ color: COLORS.teal }}>
                <LoginIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavbar;