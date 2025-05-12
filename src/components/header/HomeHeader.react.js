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
        <Link to="/home">
          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
              justifyContent: {
                md: "flex-start",
                sm: "flex-start",
                xs: "flex-start",
              },
              alignItems: { md: "center", sm: "center", xs: "center" },
            }}
          >
            <img src={LogoWithText} alt="logo" width="50%"></img>
          </Box>
        </Link>
        <List
          sx={{
            width: "60%",
            color: "#fff",
          }}
        >
        <Link to="/bm" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Measurements" />
          </ListItemButton>
        </Link>

        <Link to="/diet" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Diet" />
          </ListItemButton>
        </Link>

        <Link to="/yoga" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Yoga" />
          </ListItemButton>
        </Link>

        <Link to="/workout" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Workout" />
          </ListItemButton>
        </Link>
          <Divider
            color="#fff"
            sx={{
              width: "50%",
            }}
          />
          <Link to="/Login" className="link" onClick={handleDrawerToggle}>
            <ListItemButton>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Logout
              </Button>
            </ListItemButton>
          </Link>
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
            <Link to="/home">
              <Box
                sx={{
                  display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
                  justifyContent: {
                    md: "flex-start",
                    sm: "flex-start",
                    xs: "flex-start",
                  },
                  alignItems: { md: "center", sm: "center", xs: "center" },
                }}
              >
                <img src={LogoWithText} alt="logo" width="50%"></img>
              </Box>
            </Link>
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

            <Link to="/bm" className="link">
              <Button variant="h6">Measurements</Button>
            </Link>
            <Link to="/diet" className="link">
              <Button variant="h6">Diet</Button>
            </Link>
            <Link to="/yoga" className="link">
              <Button variant="h6">Yoga</Button>
            </Link>
            <Link to="/workout" className="link">
              <Button variant="h6">Workout</Button>
            </Link>

              <Link to="/" className="link">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClick}
                >
                  Logout
                </Button>
              </Link>
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