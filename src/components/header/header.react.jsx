import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoWithText from "../../assets/images/logo-with-text.svg";

const drawerWidth = 240;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      {/* Navbar */}

      <Container
        sx={{
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "space-between", xs: "flex-start" },
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Link to="/">
          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
              justifyContent: {
                md: "flex-start",
                sm: "flex-start",
                xs: "flex-start",
              },
              alignItems: { md: "center", sm: "center", xs: "center" },
              width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
            }}
          >
            <img src={LogoWithText} alt="logo" width="100%"></img>
          </Box>
        </Link>

        <List
          sx={{
            width: "60%",
          }}
        >
          <Divider
            color="#fff"
            sx={{
              width: "80%",
            }}
          />
          <Link to="/Login" className="link" onClick={handleDrawerToggle}>
            <ListItemButton>
              <Button variant="contained" color="secondary">
                Sign In
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
            background: "#0f172a",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
              background: "#0f172a",
            }}
          >
            {/* <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link to="/">
                <Box
                  sx={{
                    display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
                    justifyContent: {
                      md: "flex-start",
                      sm: "flex-start",
                      xs: "flex-start",
                    },
                    alignItems: { md: "center", sm: "center", xs: "center" },
                    width: { lg: "50%", sm: "50%", xs: "80%" },
                  }}
                >
                  <img src={LogoWithText} alt="logo" width="100%"></img>
                </Box>
              </Link>
              <Link to="/login" className="link">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    display: { lg: "none", xs: "flex", md: "flex", sm: "flex" },
                    width: "100%",
                    fontSize: "15px",
                  }}
                >
                  Log in
                </Button>
              </Link>
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
              <Link to="/login" className="link">
                <Button variant="contained" color="secondary">
                  SignIn
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>

        {/* <Drawer
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
        </Drawer> */}
      </Box>
    </>
  );
};

export default Header;
