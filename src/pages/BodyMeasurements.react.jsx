import React, { useState, useEffect } from "react";
import initialImgURL from "../assets/images/initialIMG.svg";
import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Cookies from "js-cookie";
import Toastify from "../components/Toastify";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/header/HomeHeader.react";
import { v4 } from "uuid";

const BodyMeasurements = () => {
  const navigate = useNavigate();
  const uid = Cookies.get("userID");

  // Verify Firebase connection and user authentication
  useEffect(() => {
    console.log("Component mounted");
    console.log("Firebase db instance:", db ? "Available" : "Not available");
    console.log("User ID:", uid);
    
    // Check if user is logged in
    if (!uid) {
      console.error("No user ID found");
      setStatus("error");
      setMessage("Please login first");
      navigate("/login");
      return;
    }
  }, [uid, navigate]);

  // Initialize all state values
  const [weight, setWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmiGoal, setBmiGoal] = useState("");
  const [bodyTypeGoal, setBodyTypeGoal] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [currentBMI, setCurrentBMI] = useState("");
  const [currentBodyType, setCurrentBodyType] = useState("");

  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    if (weight && height) {
      const bmiValue = (Number(weight) / ((Number(height) / 100) * (Number(height) / 100))).toFixed(2);
      setCurrentBMI(bmiValue);
      
      // Set body type based on BMI
      if (Number(bmiValue) > 30) {
        setCurrentBodyType("Obese");
      } else if (Number(bmiValue) >= 20 && Number(bmiValue) <= 25) {
        setCurrentBodyType("Healthy");
      } else if (Number(bmiValue) >= 18.5 && Number(bmiValue) <= 20) {
        setCurrentBodyType("Fit");
      } else if (Number(bmiValue) < 18.5) {
        setCurrentBodyType("Underweight");
      } else {
        setCurrentBodyType("Overweight");
      }
    }
  }, [weight, height]);

  const handleChange = (event) => {
    setBodyTypeGoal(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Debug log
    
    try {
      // Check if user is logged in
      if (!uid) {
        console.error("No user ID found");
        setStatus("error");
        setMessage("Please login first");
        return;
      }

      console.log("User ID found:", uid); // Debug log

      // Debug logs
      console.log("Form values:", {
        weight,
        height,
        age,
        weightGoal,
        bmiGoal,
        bodyTypeGoal,
        currentBMI,
        currentBodyType
      });

      // Basic validation
      if (!weight || !height || !age || !weightGoal || !bmiGoal || !bodyTypeGoal) {
        console.log("Validation failed - missing fields"); // Debug log
        setStatus("error");
        setMessage("Please fill all the fields");
        return;
      }

      console.log("Validation passed"); // Debug log

      // Save measurements
      console.log("Starting to save measurements..."); // Debug log
      const measurementData = {
        weight: Number(weight),
        height: Number(height),
        age: Number(age),
        bmi: Number(currentBMI),
        bodyType: currentBodyType
      };

      console.log("Measurement data prepared:", measurementData); // Debug log

      try {
        // Save to initialMeasurements
        console.log("Attempting to save to initialMeasurements..."); // Debug log
        const initialMeasurementsRef = doc(db, `user/${uid}/initialMeasurements`, uid);
        await setDoc(initialMeasurementsRef, {
          data: measurementData,
          timestamp: serverTimestamp()
        });
        console.log("Measurements saved successfully"); // Debug log
      } catch (error) {
        console.error("Error saving measurements:", error);
        throw new Error(`Failed to save measurements: ${error.message}`);
      }

      try {
        // Save to sevenDays
        console.log("Attempting to save to sevenDays..."); // Debug log
        const sevenDaysRef = doc(db, `user/${uid}/sevenDays`, v4());
        await setDoc(sevenDaysRef, {
          data: measurementData,
          timestamp: serverTimestamp(),
          id: v4()
        });
        console.log("Seven days data saved successfully"); // Debug log
      } catch (error) {
        console.error("Error saving seven days data:", error);
        throw new Error(`Failed to save seven days data: ${error.message}`);
      }

      try {
        // Save goals
        console.log("Attempting to save goals..."); // Debug log
        const goalData = {
          weightGoal: Number(weightGoal),
          bmiGoal: Number(bmiGoal),
          bodyTypeGoal: bodyTypeGoal
        };

        const goalsRef = doc(db, `user/${uid}/goals`, uid);
        await setDoc(goalsRef, {
          data: goalData,
          timestamp: serverTimestamp()
        });
        console.log("Goals saved successfully"); // Debug log
      } catch (error) {
        console.error("Error saving goals:", error);
        throw new Error(`Failed to save goals: ${error.message}`);
      }

      console.log("All data saved successfully"); // Debug log
      setStatus("success");
      setMessage("Your measurements and goals have been saved successfully!");
      
      // Wait a moment before navigating
      console.log("Preparing to navigate..."); // Debug log
      setTimeout(() => {
        console.log("Navigating to home page..."); // Debug log
        navigate("/home", { replace: true });
      }, 1500);
      
    } catch (error) {
      console.error("Error in handleSubmit:", error); // Debug log
      setStatus("error");
      setMessage(error.message || "Failed to save data. Please try again.");
    }
  };

  return (
    <>
      <HomeHeader />
      {status !== "" && <Toastify status={status} message={message} />}
      <Container
        sx={{
          display: "flex",
          justifyContent: { lg: "space-around", xs: "center" },
          height: { lg: "100vh" },
          alignItems: "center",
          flexDirection: { lg: "row", sm: "row", xs: "column" },
          padding: "2rem",
          position: "relative",
        }}
        maxWidth="false"
        className="gradient__bg_white"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { lg: "40%", sm: "50%", xs: "100%" },
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: '0 4px 16px rgba(124,77,255,0.15)',
          }}
        >
          <img 
            src={initialImgURL} 
            alt="Let's Go" 
            width="100%" 
            style={{ 
              borderRadius: '50%', 
              objectFit: 'cover', 
              boxShadow: '0 2px 8px rgba(124,77,255,0.10)',
              animation: 'floatImg 3s ease-in-out infinite'
            }}
          />
          <style>
            {`
              @keyframes floatImg {
                0% { transform: translateY(0); }
                50% { transform: translateY(-18px); }
                100% { transform: translateY(0); }
              }
            `}
          </style>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              color="secondary"
              sx={{
                fontSize: { lg: "2.5rem", sm: "2rem", xs: "1.5rem" },
                background: 'linear-gradient(45deg, #ff4081, #7c4dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' }
                },
                '&:hover': {
                  transform: 'scale(1.07)',
                  background: 'linear-gradient(45deg, #7c4dff, #ff4081)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 12px #ff4081',
                }
              }}
            >
              {`✨ Ready to Begin? Let's Start with the Basics! ✨`}
            </Typography>
            <Typography variant="h6" 
              color="#fff"
              sx={{
                background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
                fontSize: { lg: '1.5rem', sm: '1.2rem', xs: '1rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                opacity: 0.85,
                animation: 'fadeIn 2s',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 0.85 }
                },
                '&:hover': {
                  opacity: 1,
                  background: 'linear-gradient(90deg, #ff4081, #7c4dff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 8px #7c4dff',
                }
              }}
            >
              {`📏 Enter your body measurements`}
            </Typography>
          </Box>
          
          <form 
            onSubmit={(e) => {
              console.log("Form submitted"); // Immediate log
              handleSubmit(e);
            }} 
            style={{ width: '100%' }}
          >
            {/* Height and Age */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                mb: 2,
              }}
            >
              <TextField
                label="Height(CM)"
                variant="outlined"
                type="number"
                color="secondary"
                required
                value={height}
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                label="Age"
                variant="outlined"
                type="number"
                color="secondary"
                required
                value={age}
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                onChange={(e) => setAge(e.target.value)}
              />
            </Box>

            {/* Weight */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                mb: 2,
              }}
            >
              <TextField
                label="Weight(KG)"
                type="number"
                variant="outlined"
                color="secondary"
                required
                value={weight}
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                onChange={(e) => setWeight(e.target.value)}
              />
              <TextField
                label="Weight Goal(KG)"
                variant="outlined"
                type="number"
                color="secondary"
                required
                value={weightGoal}
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                onChange={(e) => setWeightGoal(e.target.value)}
              />
            </Box>

            {/* BMI */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                mb: 2,
              }}
            >
              <TextField
                label="Current BMI"
                value={currentBMI || "Enter Weight and Height"}
                variant="standard"
                color="success"
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="BMI GOAL"
                variant="outlined"
                type="number"
                color="secondary"
                required
                value={bmiGoal}
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                onChange={(e) => setBmiGoal(e.target.value)}
              />
            </Box>

            {/* Body Type */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                mb: 2,
              }}
            >
              <TextField
                label="Current Body Type"
                value={currentBodyType || "Enter Weight and Height"}
                variant="standard"
                color="success"
                className="placeholder"
                sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                InputProps={{ readOnly: true }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  flexDirection: { lg: "row", sm: "row", xs: "column" },
                }}
              >
                <InputLabel id="demo-simple-select-label" sx={{ color: "#fff" }}>
                  Goal Body Type:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bodyTypeGoal}
                  onChange={handleChange}
                  required
                  sx={{
                    input: { color: "#000" },
                    label: { color: "#fff" },
                    background: "#fff",
                  }}
                >
                  <MenuItem value="Fit">Fit</MenuItem>
                  <MenuItem value="Muscular">Muscular</MenuItem>
                  <MenuItem value="Lean">Lean</MenuItem>
                </Select>
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="secondary" 
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => console.log("Button clicked")} // Immediate log
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default BodyMeasurements;
