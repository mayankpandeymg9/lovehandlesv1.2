import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Yoga from "./pages/Yoga";
import Counter from "./components/counter";
import Landing from "./pages/landing.react";
import Login from "./pages/Login.react";
import Weightloss from "./pages/Weightloss.react";
import Weightgain from "./pages/Weightgain.react";
import Healthy from "./pages/Healthy.react";
import Virabhadrasana from "./components/virabhadrasana";
import Trikonasana from "./components/trikonasana";
import Workout from "./pages/Workout.react";
import AdhoMukhaSvanasana from "./components/AdhoMukhaSvanasana";
import { Container, Box, Typography } from "@mui/material";
import logo from "./assets/images/logo-with-text.svg";
import Diet from "./pages/Diet.react";
import BicepCurls from "./components/BicepCurls";
import PushUps from "./components/PushUps";
import Squats from "./components/Squats";
import BodyMeasurmnets from "./pages/BodyMeasurements.react";

function App() {
  const navigate = useNavigate();
  const location = window.location.pathname;
  if (location === "/yoga" && location === "/bicepcurl") {
    const videoOutput = document.getElementsByClassName("input_video");
    const canvas = document.getElementsByClassName("output_canvas");
    videoOutput.style.display = "flex";
    canvas.style.display = "flex";
  }

  return (
    <>
      <Routes>
        <Route path="*" element={<Landing />} exact />
        <Route path="/" element={<Landing />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/bm" element={<BodyMeasurmnets />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/Diet" element={<Diet />} exact />
        <Route path="/yoga" element={<Yoga />} exact />
        <Route path="/weightloss" element={<Weightloss />} />
        <Route path="/weightgain" element={<Weightgain />} />
        <Route path="/healthy" element={<Healthy />} />
        <Route path="/bicepcurls" element={<BicepCurls />} />
        <Route path="/squats" element={<Squats />} exact />
        <Route path="/pushups" element={<PushUps />} exact />
        <Route path="/crunches" element={<Counter exercise={"crunches"} />} exact />
        <Route path="/workout" exact element={<Workout />} />
        <Route path="/virabhadrasana" element={<Virabhadrasana />} />
        <Route path="/trikonasana" element={<Trikonasana />} />
        <Route path="/AdhoMukhaSvanasana" element={<AdhoMukhaSvanasana />} />
      </Routes>
      {/* footer */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '48px', sm: '56px', md: '64px' },
          background: 'linear-gradient(90deg, #0f172a 0%, #16213e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 500,
          fontSize: { xs: '0.95rem', sm: '1.05rem' },
          boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
          mt: 0
        }}
      >
        © 2025 <span style={{ color: '#2196f3', fontWeight: 700, margin: '0 4px' }}>Love Handles</span>. All rights reserved.
      </Box>
    </>
  );
}

export default App;
