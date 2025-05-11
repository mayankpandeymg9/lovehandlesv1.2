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
        <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/home" style={{ textDecoration: 'none' }}>
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
        </a>
        <List
          sx={{
            width: "60%",
            color: "#fff",
          }}
        >
          <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/bm" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemText primary="Measurements" />
            </ListItemButton>
          </a>
          <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/diet" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemText primary="Diet" />
            </ListItemButton>
          </a>
          <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/yoga" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemText primary="Yoga" />
            </ListItemButton>
          </a>
          <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/workout" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemText primary="Workout" />
            </ListItemButton>
          </a>
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
    </>
  );

  return (
    <>
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
            <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/home" style={{ textDecoration: 'none' }}>
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
            </a>
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
              <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/bm" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="h6">Measurements</Button>
              </a>
              <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/diet" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="h6">Diet</Button>
              </a>
              <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/yoga" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="h6">Yoga</Button>
              </a>
              <a href="https://mayankpandeymg9.github.io/lovehandlesv1.2/#/workout" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="h6">Workout</Button>
              </a>
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
