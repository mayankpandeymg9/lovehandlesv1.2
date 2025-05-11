import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Badge,
  CircularProgress,
  Divider
} from "@mui/material";
import { keyframes } from '@mui/system';
import { alpha } from '@mui/material/styles';

import activityImgURL from "../assets/images/cookies.svg";
import HomeHeader from "../components/header/HomeHeader.react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Chip from "@mui/material/Chip";
import reminderImgURL from "../assets/images/reminder_dashboard.svg";
import popular from "../assets/images/popular.svg";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import motivation from "../assets/images/motivation.svg";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  AutoGraphOutlined,
  DonutLargeOutlined,
  EmojiEmotionsOutlined,
  TrendingUp,
  TrendingDown,
  FitnessCenter,
  Timer,
  EmojiEvents,
  Info
} from "@mui/icons-material";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
ChartJS.register(...registerables);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Add these gradient styles after the existing animations
const gradientStyles = {
  primary: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
  success: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
  warning: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
  error: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
  secondary: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
  dark: 'linear-gradient(135deg, #263238 0%, #1a237e 100%)',
  light: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
  accent: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
  highlight: 'linear-gradient(135deg, #ff4081 0%, #c2185b 100%)',
  neon: 'linear-gradient(135deg, #00ff9d 0%, #00b8d4 100%)',
  sunset: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
  ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  galaxy: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)'
};

// Add this after the existing gradientStyles
const goalCardStyles = {
  weight: {
    gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    shadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
    hoverGradient: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
  },
  bmi: {
    gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    shadow: '0 8px 16px rgba(76, 175, 80, 0.3)',
    hoverGradient: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)'
  },
  bodyType: {
    gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    shadow: '0 8px 16px rgba(156, 39, 176, 0.3)',
    hoverGradient: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)'
  }
};

// Add this after the existing goalCardStyles
const progressCardStyles = {
  bmi: {
    gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
    shadow: '0 8px 16px rgba(156, 39, 176, 0.3)',
    hoverGradient: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)'
  },
  weight: {
    gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    shadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
    hoverGradient: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
  }
};

// Add new animations
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(33, 150, 243, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Add new animations for background
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

const cardHover = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

export const Home = () => {
  const navigate = useNavigate();
  const uid = Cookies.get("userID");
  const name = localStorage.getItem("name");
  const photo = localStorage.getItem("photo");

  if (!Cookies.get("userID")) {
    alert("Please Login");
    navigate("/");
  }

  // Exercise related states
  const [bicepsstartTimeCol, setBicepsStartTimeCol] = useState("");
  const [pushUpstartTimeCol, setPushUpStartTimeCol] = useState("");
  const [squatsstartTimeCol, setSquatsStartTimeCol] = useState("");
  const [crunchesstartTimeCol, setCrunchesStartTimeCol] = useState("");
  const [quotes, setQuotes] = useState("");
  const [bicepLength, setBicepLength] = useState("");
  const [pushUpLength, setPushUpLength] = useState("");
  const [squatsLength, setSquatsLength] = useState("");
  const [crunchesLength, setCrunchesLength] = useState("");
  const [favExcerise, setFavExcerise] = useState("");

  // Measurement related states
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [goalBmi, setGoalBmi] = useState("");
  const [goalBodyType, setGoalBodyType] = useState("");
  const [weightProgress, setWeightProgress] = useState(0);
  const [bmiProgress, setBmiProgress] = useState(0);
  const [weightData, setWeightData] = useState([]);
  const [bmiData, setBmiData] = useState([]);

  // Time tracking states
  const [bicepsTime, setBicepsTime] = useState("");
  const [pushUpTime, setPushUpTime] = useState("");
  const [squatsTime, setSquatsTime] = useState("");
  const [crunchesTime, setCrunchesTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch initial measurements
        const initialMeasurementsRef = doc(db, `user/${uid}/initialMeasurements`, uid);
        const initialMeasurementsSnap = await getDoc(initialMeasurementsRef);
        
        if (initialMeasurementsSnap.exists()) {
          const initialData = initialMeasurementsSnap.data().data;
          setWeight(Number(initialData.weight));
          setHeight(Number(initialData.height));
          setAge(Number(initialData.age));
          setBmi(Number(initialData.bmi));
          setBodyType(initialData.bodyType);
        }

        // Fetch goals
        const goalsRef = doc(db, `user/${uid}/goals`, uid);
        const goalsSnap = await getDoc(goalsRef);
        
        if (goalsSnap.exists()) {
          const goalsData = goalsSnap.data().data;
          setGoalWeight(Number(goalsData.weightGoal));
          setGoalBmi(Number(goalsData.bmiGoal));
          setGoalBodyType(goalsData.bodyTypeGoal);
        }

        // Fetch seven days data
        const sevenDaysRef = collection(db, `user/${uid}/sevenDays`);
        const sevenDaysSnap = await getDocs(sevenDaysRef);
        
        if (!sevenDaysSnap.empty) {
          const sevenDaysData = sevenDaysSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Sort by timestamp
          sevenDaysData.sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds);

          // Extract BMI and weight data
          const bmiData = sevenDaysData.map(item => ({
            date: new Date(item.timestamp?.seconds * 1000).toLocaleDateString(),
            value: Number(item.data.bmi)
          }));

          const weightData = sevenDaysData.map(item => ({
            date: new Date(item.timestamp?.seconds * 1000).toLocaleDateString(),
            value: Number(item.data.weight)
          }));

          setBmiData(bmiData);
          setWeightData(weightData);
        }

        // Calculate progress
        if (initialMeasurementsSnap.exists() && goalsSnap.exists()) {
          const initialData = initialMeasurementsSnap.data().data;
          const goalsData = goalsSnap.data().data;
          
          const weightProgress = ((Number(initialData.weight) - Number(goalsData.weightGoal)) / Number(initialData.weight)) * 100;
          const bmiProgress = ((Number(initialData.bmi) - Number(goalsData.bmiGoal)) / Number(initialData.bmi)) * 100;
          
          setWeightProgress(Math.abs(weightProgress));
          setBmiProgress(Math.abs(bmiProgress));
        }

        // Fetch exercise data
        const fetchExerciseData = async () => {
          const bicepsRef = collection(db, `user/${uid}/bicepsCurls`);
          const pushUpsRef = collection(db, `user/${uid}/pushups`);
          const squatsRef = collection(db, `user/${uid}/squats`);
          const crunchesRef = collection(db, `user/${uid}/crunches`);

          const [bicepsSnap, pushUpsSnap, squatsSnap, crunchesSnap] = await Promise.all([
            getDocs(bicepsRef),
            getDocs(pushUpsRef),
            getDocs(squatsRef),
            getDocs(crunchesRef)
          ]);

          setBicepLength(bicepsSnap.docs.map(doc => doc.data()));
          setPushUpLength(pushUpsSnap.docs.map(doc => doc.data()));
          setSquatsLength(squatsSnap.docs.map(doc => doc.data()));
          setCrunchesLength(crunchesSnap.docs.map(doc => doc.data()));
        };

        await fetchExerciseData();

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uid]);

  // Calculate exercise times
  useEffect(() => {
    if (Array.isArray(bicepsstartTimeCol)) {
      const bicepTimeSpent = bicepsstartTimeCol.reduce((acc, item) => acc + (item.timeSpent || 0), 0);
      setBicepsTime(bicepTimeSpent);
    }
    if (Array.isArray(pushUpstartTimeCol)) {
      const pushUpTimeSpent = pushUpstartTimeCol.reduce((acc, item) => acc + (item.timeSpent || 0), 0);
      setPushUpTime(pushUpTimeSpent);
    }
    if (Array.isArray(squatsstartTimeCol)) {
      const squatsTimeSpent = squatsstartTimeCol.reduce((acc, item) => acc + (item.timeSpent || 0), 0);
      setSquatsTime(squatsTimeSpent);
    }
    if (Array.isArray(crunchesstartTimeCol)) {
      const crunchesTimeSpent = crunchesstartTimeCol.reduce((acc, item) => acc + (item.timeSpent || 0), 0);
      setCrunchesTime(crunchesTimeSpent);
    }
  }, [bicepsstartTimeCol, pushUpstartTimeCol, squatsstartTimeCol, crunchesstartTimeCol]);

  // Calculate favorite exercise
  useEffect(() => {
    const exercises = [
      { name: "Biceps", count: bicepLength.length },
      { name: "Push Ups", count: pushUpLength.length },
      { name: "Squats", count: squatsLength.length },
      { name: "Crunches", count: crunchesLength.length }
    ];

    const favorite = exercises.reduce((prev, current) => 
      (prev.count > current.count) ? prev : current
    );

    setFavExcerise(favorite.name);
  }, [bicepLength, pushUpLength, squatsLength, crunchesLength]);

  const timeSpent = (bicepsTime + pushUpTime + squatsTime + crunchesTime) * 60;
  const bicepPoints = bicepLength.length * 5;
  const pushUpPoints = pushUpLength.length * 5;
  const squatsPoints = squatsLength.length * 20;
  const crunchesPoints = crunchesLength.length * 10;
  const totalPoints = bicepPoints + pushUpPoints + squatsPoints + crunchesPoints;
  const cookiesPercentage = (totalPoints * 100) / 1000;

  const ExercisePerformanceCard = ({ title, count, time, icon, color }) => (
    <Card
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        transition: 'all 0.5s ease',
        animation: `${fadeIn} 0.5s ease-out`,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          zIndex: 0,
          animation: `${shimmer} 3s infinite linear`
        },
        '&:hover': {
          animation: `${cardHover} 0.5s ease-in-out`,
          transform: 'scale(1.05)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          '& .MuiTypography-h4': {
            transform: 'scale(1.1)',
            color: '#fff'
          },
          '& .MuiSvgIcon-root': {
            animation: `${rotate} 1s linear`
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            p: 1,
            mr: 1,
            animation: `${pulse} 2s infinite`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
            {icon}
          </Box>
          <Typography variant="h6" sx={{ 
            ml: 1, 
            fontWeight: 600, 
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: 'white', 
          mb: 1,
          transition: 'all 0.3s ease',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {count}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}>
          <Timer sx={{ fontSize: '1rem' }} />
          {time} minutes
        </Typography>
      </Box>
    </Card>
  );

  const ProgressIndicator = ({ current, goal, label, unit }) => {
    const progress = (current / goal) * 100;
    const isComplete = current >= goal;
    const color = isComplete ? '#4caf50' : '#2196f3';
    
    return (
      <Card 
        elevation={3} 
        sx={{ 
          p: 2, 
          height: '100%',
          transition: 'all 0.3s ease',
          animation: `${fadeIn} 0.5s ease-out`,
          background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.05)} 100%)`,
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.1)} 100%)`,
            zIndex: 0,
            animation: `${shimmer} 3s infinite linear`
          },
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: `0 8px 16px ${alpha(color, 0.4)}`,
            '&::before': {
              background: `linear-gradient(45deg, ${alpha(color, 0.25)} 0%, ${alpha(color, 0.15)} 100%)`
            }
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: alpha(color, 0.9),
              textShadow: `0 2px 4px ${alpha(color, 0.2)}`
            }}>
              {label}
            </Typography>
            <Tooltip title={`${current}${unit} / ${goal}${unit}`}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: color,
                  animation: `${pulse} 2s infinite`,
                  '&:hover': {
                    animation: `${rotate} 1s linear`
                  }
                }}
              >
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              size={100}
              thickness={4}
              sx={{ 
                color: color,
                animation: `${pulse} 2s infinite`,
                filter: `drop-shadow(0 4px 8px ${alpha(color, 0.4)})`
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: color,
                  textShadow: `0 2px 4px ${alpha(color, 0.3)}`,
                  animation: `${glow} 2s infinite`
                }}
              >
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <>
      <HomeHeader donutCount={totalPoints} />
      <Container 
        maxWidth="false" 
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1b262c)',
          backgroundSize: '400% 400%',
          animation: `${backgroundPulse} 15s ease infinite`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(10px)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ 
          padding: "2rem",
          position: 'relative',
          zIndex: 1
        }}>
          {/* Current Stats Section */}
          <Box sx={{ mb: 4, animation: `${fadeIn} 0.5s ease-out` }}>
            <Typography 
              variant="h4" 
              color="secondary" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, #fff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              Your Current Stats
            </Typography>
            <Grid container spacing={3}>
              {[
                { label: 'Weight', value: `${Number(weight).toFixed(1)} kg`, color: '#2196f3' },
                { label: 'Height', value: `${Number(height).toFixed(1)} cm`, color: '#4caf50' },
                { label: 'BMI', value: Number(bmi).toFixed(1), color: '#ff9800' },
                { label: 'Body Type', value: bodyType, color: '#f44336' }
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s`,
                      background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                      backdropFilter: 'blur(10px)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${alpha(stat.color, 0.1)} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                        zIndex: 0
                      },
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 8px 16px ${alpha(stat.color, 0.2)}`,
                        '&::before': {
                          background: `linear-gradient(45deg, ${alpha(stat.color, 0.15)} 0%, ${alpha(stat.color, 0.1)} 100%)`
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: alpha(stat.color, 0.9)
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700,
                          mt: 1,
                          background: `linear-gradient(45deg, ${stat.color}, ${alpha(stat.color, 0.7)})`,
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: `0 2px 4px ${alpha(stat.color, 0.2)}`
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Goals Section */}
          <Box sx={{ mb: 4, animation: `${fadeIn} 0.5s ease-out` }}>
            <Typography 
              variant="h4" 
              color="secondary" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, #fff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              Your Goals
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: goalCardStyles.weight.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: goalCardStyles.weight.shadow,
                      background: goalCardStyles.weight.hoverGradient
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <FitnessCenter sx={{ 
                        mr: 1, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                      }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        Target Weight
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 700,
                        mb: 2,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {Number(goalWeight).toFixed(1)} kg
                    </Typography>
                    <Box sx={{ position: 'relative', mb: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={weightProgress} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                          }
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'white',
                        opacity: 0.9,
                        textAlign: 'right',
                        mt: 1
                      }}
                    >
                      {Math.round(weightProgress)}% Complete
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out 0.1s`,
                    background: goalCardStyles.bmi.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: goalCardStyles.bmi.shadow,
                      background: goalCardStyles.bmi.hoverGradient
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AutoGraphOutlined sx={{ 
                        mr: 1, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                      }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        Target BMI
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 700,
                        mb: 2,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {Number(goalBmi).toFixed(1)}
                    </Typography>
                    <Box sx={{ position: 'relative', mb: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={bmiProgress} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                          }
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'white',
                        opacity: 0.9,
                        textAlign: 'right',
                        mt: 1
                      }}
                    >
                      {Math.round(bmiProgress)}% Complete
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out 0.2s`,
                    background: goalCardStyles.bodyType.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: goalCardStyles.bodyType.shadow,
                      background: goalCardStyles.bodyType.hoverGradient
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmojiEmotionsOutlined sx={{ 
                        mr: 1, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                      }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        Target Body Type
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 700,
                        mb: 2,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {goalBodyType}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mt: 2
                    }}>
                      <Chip
                        label="In Progress"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)'
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Progress Charts */}
          <Box sx={{ mb: 4, animation: `${fadeIn} 0.5s ease-out` }}>
            <Typography 
              variant="h4" 
              color="secondary" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, #fff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              Your Progress
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: progressCardStyles.bmi.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: progressCardStyles.bmi.shadow,
                      background: progressCardStyles.bmi.hoverGradient
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AutoGraphOutlined sx={{ 
                        mr: 1, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                      }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        BMI Progress
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      borderRadius: 2,
                      p: 2,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <LineChart
                        width={500}
                        height={300}
                        data={bmiData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="white"
                          tick={{ fill: 'white' }}
                        />
                        <YAxis 
                          stroke="white"
                          tick={{ fill: 'white' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 8,
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ color: 'white' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#ffffff" 
                          strokeWidth={2}
                          dot={{ 
                            fill: '#ffffff',
                            stroke: '#9c27b0',
                            strokeWidth: 2,
                            r: 4
                          }}
                          activeDot={{ 
                            fill: '#9c27b0',
                            stroke: '#ffffff',
                            strokeWidth: 2,
                            r: 6
                          }}
                        />
                      </LineChart>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out 0.1s`,
                    background: progressCardStyles.weight.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: progressCardStyles.weight.shadow,
                      background: progressCardStyles.weight.hoverGradient
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUp sx={{ 
                        mr: 1, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                      }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        Weight Progress
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      borderRadius: 2,
                      p: 2,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <LineChart
                        width={500}
                        height={300}
                        data={weightData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis 
                          dataKey="date" 
                          stroke="white"
                          tick={{ fill: 'white' }}
                        />
                        <YAxis 
                          stroke="white"
                          tick={{ fill: 'white' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 8,
                            border: 'none',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ color: 'white' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#ffffff" 
                          strokeWidth={2}
                          dot={{ 
                            fill: '#ffffff',
                            stroke: '#2196f3',
                            strokeWidth: 2,
                            r: 4
                          }}
                          activeDot={{ 
                            fill: '#2196f3',
                            stroke: '#ffffff',
                            strokeWidth: 2,
                            r: 6
                          }}
                        />
                      </LineChart>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Analysis Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              color="secondary" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, #fff, transparent)',
                  borderRadius: 2
                }
              }}
            >
              Your Analysis
            </Typography>
            
            {/* Exercise Performance */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Exercise Performance
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                    height: '100%',
                    transition: 'all 0.5s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      zIndex: 0,
                      animation: `${shimmer} 3s infinite linear`
                    },
                    '&:hover': {
                      animation: `${cardHover} 0.5s ease-in-out`,
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                      '& .MuiTypography-h4': {
                        transform: 'scale(1.1)',
                        color: '#fff'
                      },
                      '& .MuiSvgIcon-root': {
                        animation: `${rotate} 1s linear`
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        p: 1,
                        mr: 1,
                        animation: `${pulse} 2s infinite`,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}>
                        <FitnessCenter sx={{ color: '#fff' }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Bicep Curls
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: 'white',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {bicepLength.length}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Timer sx={{ fontSize: '1rem' }} />
                      {bicepsTime} minutes
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                    height: '100%',
                    transition: 'all 0.5s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      zIndex: 0,
                      animation: `${shimmer} 3s infinite linear`
                    },
                    '&:hover': {
                      animation: `${cardHover} 0.5s ease-in-out`,
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                      '& .MuiTypography-h4': {
                        transform: 'scale(1.1)',
                        color: '#fff'
                      },
                      '& .MuiSvgIcon-root': {
                        animation: `${rotate} 1s linear`
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        p: 1,
                        mr: 1,
                        animation: `${pulse} 2s infinite`,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}>
                        <FitnessCenter sx={{ color: '#fff' }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Push Ups
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: 'white',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {pushUpLength.length}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Timer sx={{ fontSize: '1rem' }} />
                      {pushUpTime} minutes
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                    height: '100%',
                    transition: 'all 0.5s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      zIndex: 0,
                      animation: `${shimmer} 3s infinite linear`
                    },
                    '&:hover': {
                      animation: `${cardHover} 0.5s ease-in-out`,
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                      '& .MuiTypography-h4': {
                        transform: 'scale(1.1)',
                        color: '#fff'
                      },
                      '& .MuiSvgIcon-root': {
                        animation: `${rotate} 1s linear`
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        p: 1,
                        mr: 1,
                        animation: `${pulse} 2s infinite`,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}>
                        <FitnessCenter sx={{ color: '#fff' }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Squats
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: 'white',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {squatsLength.length}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Timer sx={{ fontSize: '1rem' }} />
                      {squatsTime} minutes
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                    height: '100%',
                    transition: 'all 0.5s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      zIndex: 0,
                      animation: `${shimmer} 3s infinite linear`
                    },
                    '&:hover': {
                      animation: `${cardHover} 0.5s ease-in-out`,
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                      '& .MuiTypography-h4': {
                        transform: 'scale(1.1)',
                        color: '#fff'
                      },
                      '& .MuiSvgIcon-root': {
                        animation: `${rotate} 1s linear`
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        p: 1,
                        mr: 1,
                        animation: `${pulse} 2s infinite`,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}>
                        <FitnessCenter sx={{ color: '#fff' }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Crunches
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        color: 'white',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {crunchesLength.length}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Timer sx={{ fontSize: '1rem' }} />
                      {crunchesTime} minutes
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>

            {/* Progress Indicators */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Goal Progress
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProgressIndicator
                  current={Number(weight)}
                  goal={Number(goalWeight)}
                  label="Weight Goal"
                  unit=" kg"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ProgressIndicator
                  current={Number(bmi)}
                  goal={Number(goalBmi)}
                  label="BMI Goal"
                  unit=""
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    animation: `${fadeIn} 0.5s ease-out`,
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
                      zIndex: 0
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(255, 215, 0, 0.2)',
                      '&::before': {
                        background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)'
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmojiEvents sx={{ 
                        mr: 1, 
                        color: '#ffd700', 
                        animation: `${pulse} 2s infinite`,
                        filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.2))'
                      }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: alpha('#ffd700', 0.9) }}>Achievements</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.1) 100%)',
                          transform: 'translateX(5px)'
                        }
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: alpha('#2196f3', 0.9) }}>Total Workouts</Typography>
                        <Badge 
                          badgeContent={bicepLength.length + pushUpLength.length + squatsLength.length + crunchesLength.length} 
                          color="primary"
                          sx={{ 
                            '& .MuiBadge-badge': { 
                              fontSize: '0.8rem', 
                              height: 24, 
                              minWidth: 24,
                              boxShadow: '0 2px 4px rgba(33, 150, 243, 0.2)'
                            } 
                          }}
                        />
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(156, 39, 176, 0.1) 100%)',
                          transform: 'translateX(5px)'
                        }
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: alpha('#9c27b0', 0.9) }}>Favorite Exercise</Typography>
                        <Chip 
                          label={favExcerise} 
                          color="secondary" 
                          size="small"
                          sx={{ 
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(156, 39, 176, 0.2)',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.1) 100%)',
                          transform: 'translateX(5px)'
                        }
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: alpha('#4caf50', 0.9) }}>Total Time</Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            color: '#4caf50',
                            textShadow: '0 2px 4px rgba(76, 175, 80, 0.2)'
                          }}
                        >
                          {timeSpent} minutes
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>

            {/* Detailed Analysis */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3,
                transition: 'all 0.5s ease',
                animation: `${fadeIn} 0.5s ease-out`,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  zIndex: 0,
                  animation: `${shimmer} 3s infinite linear`
                },
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    position: 'relative',
                    color: alpha('#2196f3', 0.9),
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: 60,
                      height: 4,
                      background: 'linear-gradient(90deg, #2196f3, transparent)',
                      borderRadius: 2
                    }
                  }}
                >
                  Detailed Analysis
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1,
                        p: 2,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.1) 100%)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <TrendingUp sx={{ mr: 1, color: '#4caf50', filter: 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.2))' }} />
                      <Typography variant="body1" sx={{ color: alpha('#4caf50', 0.9) }}>
                        {weight && goalWeight && (
                          <>
                            Your current weight is {Number(weight).toFixed(1)} kg, and your goal weight is {Number(goalWeight).toFixed(1)} kg.
                            You need to {Number(weight) > Number(goalWeight) ? 'lose' : 'gain'} {Math.abs(Number(weight) - Number(goalWeight)).toFixed(1)} kg to reach your target.
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1,
                        p: 2,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.15) 0%, rgba(244, 67, 54, 0.1) 100%)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <TrendingDown sx={{ mr: 1, color: '#f44336', filter: 'drop-shadow(0 2px 4px rgba(244, 67, 54, 0.2))' }} />
                      <Typography variant="body1" sx={{ color: alpha('#f44336', 0.9) }}>
                        {bmi && goalBmi && (
                          <>
                            Your current BMI is {Number(bmi).toFixed(1)}, and your goal BMI is {Number(goalBmi).toFixed(1)}.
                            This indicates you are currently {bodyType} and aiming to become {goalBodyType}.
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 1,
                        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.1) 100%)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <Timer sx={{ mr: 1, color: '#2196f3', filter: 'drop-shadow(0 2px 4px rgba(33, 150, 243, 0.2))' }} />
                      <Typography variant="body1" sx={{ color: alpha('#2196f3', 0.9) }}>
                        {bmiData.length > 0 && (
                          <>
                            Based on your progress over the last {bmiData.length} days, 
                            you are {Number(bmiData[bmiData.length - 1].value) > Number(bmiData[0].value) ? 'gaining' : 'losing'} weight at a rate of 
                            {Math.abs(Number(bmiData[bmiData.length - 1].value) - Number(bmiData[0].value)) / bmiData.length} BMI points per day.
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
