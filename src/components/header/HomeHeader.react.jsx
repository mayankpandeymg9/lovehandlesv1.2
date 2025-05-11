import React, { useState } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import LogoWithText from "../../assets/images/logo-with-text.svg";
import {
  Box,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Divider,
  Button,
  IconButton,
  AppBar,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../firebase";
import CookieIcon from "@mui/icons-material/Cookie";
const drawerWidth = `100%`;

const HomeHeader = ({ props }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      {/* Navbar */}

      <Container
        sx={{
          background: "#00040f",
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "space-between", xs: "flex-start" },
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Box
          onClick={() => handleNavigation("/home")}
          sx={{
            display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
            justifyContent: {
              md: "flex-start",
              sm: "flex-start",
              xs: "flex-start",
            },
            alignItems: { md: "center", sm: "center", xs: "center" },
            cursor: "pointer"
          }}
        >
          <img src={LogoWithText} alt="logo" width="50%"></img>
        </Box>
        <List
          sx={{
            width: "60%",
            color: "#fff",
          }}
        >
          <ListItemButton onClick={() => handleNavigation("/bm")}>
            <ListItemText primary="Measurements" />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation("/diet")}>
            <ListItemText primary="Diet" />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation("/yoga")}>
            <ListItemText primary="Yoga" />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation("/workout")}>
            <ListItemText primary="Workout" />
          </ListItemButton>
          <Divider
            color="#fff"
            sx={{
              width: "50%",
            }}
          />
          <ListItemButton>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick}
            >
              Logout
            </Button>
          </ListItemButton>
        </List>
      </Container>
      {/* Navbar */}
    </>
  );
  return (
    <>
      {/* Navbar */}

      <Box
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <AppBar
          component="nav"
          position="relative"
          sx={{
            boxShadow: " 0 0 10px 0 #ffffff64",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: {
                lg: "center",
                md: "flex-start",
                sm: "flex-start",
                xs: "center",
              },
              aligncenter: "center",
              background: "primary",
            }}
          >
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              onClick={() => handleNavigation("/home")}
              sx={{
                display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
                justifyContent: {
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                },
                alignItems: { md: "center", sm: "center", xs: "center" },
                cursor: "pointer"
              }}
            >
              <img src={LogoWithText} alt="logo" width="50%"></img>
            </Box>
            <Box
              sx={{
                display: { lg: "flex", xs: "none", md: "none", sm: "none" },
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                textTransform: "capitalize",
                color: "#ffffff",
              }}
            >
              <Button variant="h6" onClick={() => handleNavigation("/bm")}>Measurements</Button>
              <Button variant="h6" onClick={() => handleNavigation("/diet")}>Diet</Button>
              <Button variant="h6" onClick={() => handleNavigation("/yoga")}>Yoga</Button>
              <Button variant="h6" onClick={() => handleNavigation("/workout")}>Workout</Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "flex", md: "flex", lg: "none" },
            height: "100%",
            overflowY: { xs: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#00040f",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default HomeHeader;
