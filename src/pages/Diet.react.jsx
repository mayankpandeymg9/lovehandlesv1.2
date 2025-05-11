import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import HomeHeader from "../components/header/HomeHeader.react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { recipes } from "../data/data";
import { keyframes } from '@mui/system';

// Update background animation
const backgroundPulse = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Diet = () => {
  const [foodDiet, setFoodDiet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const uid = Cookies.get("userID");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting to fetch user data...");

        // Fetch user measurements
        const measurementsRef = doc(db, `user/${uid}/initialMeasurements`, uid);
        const measurementsSnap = await getDoc(measurementsRef);
        
        if (!measurementsSnap.exists()) {
          throw new Error("Please complete your measurements first");
        }

        const measurements = measurementsSnap.data().data;
        console.log("User measurements:", measurements);
        const weight = measurements.weight;
        const height = measurements.height;
        const bmi = measurements.bmi;

        // Fetch user goals
        const goalsRef = doc(db, `user/${uid}/goals`, uid);
        const goalsSnap = await getDoc(goalsRef);
        
        if (!goalsSnap.exists()) {
          throw new Error("Please set your goals first");
        }

        const goals = goalsSnap.data().data;
        console.log("User goals:", goals);
        const goalWeight = goals.weightGoal;
        const goalBmi = goals.bmiGoal;

        // Determine diet type based on goals
        let dietType = "balanced";
        if (goalWeight < weight) {
          dietType = "low-fat";
        } else if (goalWeight > weight) {
          dietType = "high-protein";
        }
        console.log("Selected diet type:", dietType);

        // Get recipes for the selected diet type
        const dietRecipes = recipes[dietType];
        if (!dietRecipes || dietRecipes.length === 0) {
          throw new Error("No recipes found for your diet type");
        }

        setFoodDiet(dietRecipes);
        
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!uid) {
      console.log("No user ID found, redirecting to login");
      alert("Please Login");
      navigate("/");
    } else {
      console.log("User ID found, fetching data");
      fetchUserData();
    }
  }, [uid, navigate]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{
          background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1b262c)',
          backgroundSize: '400% 400%',
          animation: `${backgroundPulse} 15s ease infinite`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1b262c)',
          backgroundSize: '400% 400%',
          animation: `${backgroundPulse} 15s ease infinite`,
          minHeight: '100vh',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Container maxWidth="sm">
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1b262c)',
        backgroundSize: '400% 400%',
        animation: `${backgroundPulse} 15s ease infinite`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }
      }}
    >
      <HomeHeader />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography 
          variant="h4" 
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            background: 'linear-gradient(45deg, #ff4081, #7c4dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              background: 'linear-gradient(45deg, #7c4dff, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          Your Personalized Diet Plan
        </Typography>
        <Grid container spacing={3} sx={{ px: { xs: 2, sm: 4, md: 8 }, width: '100%', margin: 0, overflowX: 'hidden' }}>
          {foodDiet.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', minWidth: 0 }}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.1)',
                    },
                    '& .MuiTypography-h6': {
                      color: '#ff4081',
                      textShadow: '0 0 8px rgba(255, 64, 129, 0.5)'
                    },
                    '& .MuiTypography-body2': {
                      color: '#e0e0e0',
                      textShadow: '0 0 10px rgba(255,255,255,0.3)'
                    }
                  }
                }}
              >
                <Box sx={{ overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.image}
                    alt={recipe.label}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      width: '100%',
                      maxWidth: '100%',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {recipe.label}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2,
                      lineHeight: 1.6,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {recipe.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Calories: {recipe.calories} per serving
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Health Labels: {recipe.healthLabels.join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Diet;
