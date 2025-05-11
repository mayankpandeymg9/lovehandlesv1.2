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
  Button,
} from "@mui/material";
import HomeHeader from "../components/header/HomeHeader.react";
import { WorkoutVariation } from "../data/data";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StarIcon from '@mui/icons-material/Star';
import TimerIcon from '@mui/icons-material/Timer';

const Workout = () => {
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
          minHeight: { lg: "100vh", sm: "100%", xs: "100%" },
          textAlign: "center",
          gap: "3rem",
          py: 6,
          background: "linear-gradient(180deg, rgba(0,4,15,0.8) 0%, rgba(0,4,15,0.95) 100%)",
        }}
        maxWidth="false"
      >
        <Typography 
          variant="h3" 
          className="text-gradient"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            mb: 2,
          }}
        >
          Workout
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexWrap: "wrap",
            gap: 4,
            px: { xs: 2, sm: 4 },
          }}
        >
          {WorkoutVariation.map((item, index) => (
            <Link to={item.route} className="link-primary" key={index} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  maxWidth: 345,
                  textDecoration: "none",
                  transition: "all 0.3s ease-in-out",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
                    background: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt={item.title}
                  sx={{
                    height: 200,
                    objectFit: "cover",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  image={item.image}
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
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1,
                      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                      },
                    }}
                  >
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Workout;
