import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import HomeHeader from "../components/header/HomeHeader.react";
import { YogaVariation } from "../data/data";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Yoga = () => {
  const navigate = useNavigate();

  if (!Cookies.get("userID")) {
    alert("Please Login");
    navigate("/");
  }
  return (
    <>
      <HomeHeader />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: { lg: "100vh", sm: "100%", xs: "100%" },
          textAlign: "center",
          gap: "2rem",
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          position: 'relative'
        }}
      >
        <Typography 
          variant="h3" 
          className="text-gradient"
          sx={{
            background: 'linear-gradient(45deg, #ff4081, #7c4dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              background: 'linear-gradient(45deg, #7c4dff, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          Yoga
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexWrap: "wrap",
            gap: "2rem",
            position: 'relative',
            zIndex: 1
          }}
        >
          {YogaVariation.map((item, index) => {
            return (
              <Link to={item.route} className="link-primary" key={index} style={{ textDecoration: "none" }}>
                <CardActions>
                  <Card
                    sx={{
                      maxWidth: 345,
                      textDecoration: "none",
                      transition: "all 0.3s ease-in-out",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
                        background: "rgba(255, 255, 255, 0.08)",
                        "& .MuiTypography-h5": {
                          color: "#ff4081",
                          textShadow: "0 0 8px rgba(255, 64, 129, 0.5)"
                        },
                        "& .MuiTypography-body2": {
                          color: "#e0e0e0",
                          textShadow: "0 0 10px rgba(255,255,255,0.3)"
                        }
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={item.title}
                      image={item.image}
                      sx={{
                        height: 200,
                        objectFit: "cover",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div"
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          transition: "all 0.3s ease"
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          mb: 3,
                          lineHeight: 1.6,
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          transition: "all 0.3s ease"
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActions>
              </Link>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default Yoga;
