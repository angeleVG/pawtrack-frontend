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
      {/* Logo links */}
      <Box display="flex" alignItems="center">
        <IconButton component={Link} to={logoTarget} sx={{ color: COLORS.teal }}>
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
          to={logoTarget}
        >
          Pawtrack
        </Typography>
      </Box>

      {/* Profielicoon (en naam, en menu) rechts */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleMenuOpen} color="inherit">
          {isLoggedIn && user?.image ? (
            <Avatar src={user.image} alt={user.name} />
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </IconButton>
        {isLoggedIn && (
          <Typography
            variant="subtitle1"
            fontWeight={600}
            ml={1}
            color="text.primary"
            noWrap
          >
            {user?.name}
          </Typography>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {isLoggedIn ? (
            <>
              <MenuItem disabled sx={{ opacity: 1, fontWeight: 600 }}>
                {user?.name}
              </MenuItem>
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
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/login");
                }}
              >
                <LoginIcon sx={{ mr: 1 }} /> Log in
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/signup");
                }}
              >
                <AccountCircleIcon sx={{ mr: 1 }} /> Sign up
              </MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>
);
