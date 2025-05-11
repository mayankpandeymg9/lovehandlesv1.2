import React, { useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { useRef } from "react";
import angleBetweenThreePoints from "./angle";
import { Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import imgURL from "../assets/images/squat.gif";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import Cookies from "js-cookie";

const speech = window.speechSynthesis;
let isSpeaking = false;
let speechQueue = [];

const speak = (count) => {
  // Add to queue
  speechQueue.push(count);
  
  // If not speaking, start processing queue
  if (!isSpeaking) {
    processSpeechQueue();
  }
};

const processSpeechQueue = () => {
  if (speechQueue.length === 0) {
    isSpeaking = false;
    return;
  }

  isSpeaking = true;
  const count = speechQueue.shift();
  
  const object = new SpeechSynthesisUtterance(count.toString());
  object.lang = "en-US";
  object.rate = 1.0;
  object.pitch = 1.0;
  object.volume = 1.0;
  
  object.onend = () => {
    // Process next item in queue
    processSpeechQueue();
  };
  
  object.onerror = () => {
    // If error occurs, try next item
    processSpeechQueue();
  };
  
  speech.speak(object);
};

const Squats = () => {
  const navigate = useNavigate();
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lastSpokenCount, setLastSpokenCount] = useState(0);
  
  if (!Cookies.get("userID")) {
    alert("Please Login");
    navigate("/");
  }
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startTime = new Date();
    const startTimeSec = startTime.getSeconds();
    localStorage.setItem("squatsStartTime", startTimeSec);
  }, []);

  function onResult(results) {
    if (results.poseLandmarks && webcamRef.current && webcamRef.current.video) {
      const position = results.poseLandmarks;
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      const leftHand = [];
      const rightHand = [];
      const righthip = [];
      const lefthip = [];
      const hiparr = [11, 12, 23, 24, 25, 26];

      for (let i = 11; i < 17; i++) {
        let obj = {};
        obj["x"] = position[i].x * width;
        obj["y"] = position[i].y * height;
        if (i % 2 === 0) {
          rightHand.push(obj);
        } else {
          leftHand.push(obj);
        }
      }

      for (let i = 0; i < 6; i++) {
        let p = hiparr[i];
        let obj = {};
        obj["x"] = position[p].x * width;
        obj["y"] = position[p].y * height;
        if (p % 2 === 0) {
          righthip.push(obj);
        } else {
          lefthip.push(obj);
        }
      }

      const leftHandAngle = Math.round(angleBetweenThreePoints(leftHand));
      const rightHandAngle = Math.round(angleBetweenThreePoints(rightHand));
      const rightHipAngle = Math.round(angleBetweenThreePoints(righthip));
      const leftHipAngle = Math.round(angleBetweenThreePoints(lefthip));

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // More precise angle ranges for squat form
      let inRangeRightHand;
      if (rightHandAngle >= 70 && rightHandAngle <= 110) { // Arms should be roughly parallel to ground
        inRangeRightHand = true;
      } else {
        inRangeRightHand = false;
      }

      let inRangeLeftHand;
      if (leftHandAngle >= 70 && leftHandAngle <= 110) { // Arms should be roughly parallel to ground
        inRangeLeftHand = true;
      } else {
        inRangeLeftHand = false;
      }

      let inRangeRightHip;
      if (rightHipAngle >= 80 && rightHipAngle <= 100) { // Hips should be roughly at 90 degrees
        inRangeRightHip = true;
      } else {
        inRangeRightHip = false;
      }

      let inRangeLeftHip;
      if (leftHipAngle >= 80 && leftHipAngle <= 100) { // Hips should be roughly at 90 degrees
        inRangeLeftHip = true;
      } else {
        inRangeLeftHip = false;
      }

      // Additional check for knee alignment
      const kneeAlignment = Math.abs(rightHipAngle - leftHipAngle);
      const isKneeAligned = kneeAlignment <= 10; // Knees should be roughly aligned

      // Draw lines and points
      for (let i = 0; i < 2; i++) {
        canvasCtx.beginPath();
        canvasCtx.lineWidth = 8;

        //right hand
        canvasCtx.moveTo(rightHand[i].x, rightHand[i].y);
        canvasCtx.lineTo(rightHand[i + 1].x, rightHand[i + 1].y);
        if (inRangeRightHand) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        //lefthand
        canvasCtx.beginPath();
        canvasCtx.moveTo(leftHand[i].x, leftHand[i].y);
        canvasCtx.lineTo(leftHand[i + 1].x, leftHand[i + 1].y);
        if (inRangeLeftHand) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        //right hip
        canvasCtx.beginPath();
        canvasCtx.moveTo(righthip[i].x, righthip[i].y);
        canvasCtx.lineTo(righthip[i + 1].x, righthip[i + 1].y);
        if (inRangeRightHip && isKneeAligned) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();

        //left hip
        canvasCtx.beginPath();
        canvasCtx.moveTo(lefthip[i].x, lefthip[i].y);
        canvasCtx.lineTo(lefthip[i + 1].x, lefthip[i + 1].y);
        if (inRangeLeftHip && isKneeAligned) {
          canvasCtx.strokeStyle = "green";
        } else {
          canvasCtx.strokeStyle = "red";
        }
        canvasCtx.stroke();
      }

      for (let i = 0; i < 3; i++) {
        canvasCtx.beginPath();
        canvasCtx.arc(rightHand[i].x, rightHand[i].y, 8, 0, Math.PI * 2);
        canvasCtx.arc(leftHand[i].x, leftHand[i].y, 8, 0, Math.PI * 2);
        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();

        canvasCtx.beginPath();
        canvasCtx.arc(righthip[i].x, righthip[i].y, 8, 0, Math.PI * 2);
        canvasCtx.arc(lefthip[i].x, lefthip[i].y, 8, 0, Math.PI * 2);
        canvasCtx.fillStyle = "#AAFF00";
        canvasCtx.fill();
      }

      if (
        inRangeLeftHand === true &&
        inRangeRightHand === true &&
        inRangeRightHip === true &&
        inRangeLeftHip === true &&
        isKneeAligned
      ) {
        if (direction === 0) {
          const newCount = repCount + 1;
          setRepCount(newCount);
          
          // Only speak if this is a new count
          if (newCount !== lastSpokenCount) {
            speak(newCount);
            setLastSpokenCount(newCount);
          }
          
          setDirection(1);
        }
      }

      if (
        !(
          inRangeLeftHand === true &&
          inRangeRightHand === true &&
          inRangeRightHip === true &&
          inRangeLeftHip === true &&
          isKneeAligned
        )
      ) {
        setDirection(0);
      }

      // Add form feedback
      canvasCtx.font = "20px Arial";
      canvasCtx.fillStyle = "white";
      canvasCtx.fillText(`Right Arm: ${rightHandAngle}°`, 10, 30);
      canvasCtx.fillText(`Left Arm: ${leftHandAngle}°`, 10, 60);
      canvasCtx.fillText(`Right Hip: ${rightHipAngle}°`, 10, 90);
      canvasCtx.fillText(`Left Hip: ${leftHipAngle}°`, 10, 120);
      canvasCtx.fillText(`Knee Alignment: ${kneeAlignment}°`, 10, 150);

      // Add form tips
      if (!inRangeRightHand || !inRangeLeftHand) {
        canvasCtx.fillText("Keep arms parallel to ground", 10, 180);
      }
      if (!inRangeRightHip || !inRangeLeftHip) {
        canvasCtx.fillText("Bend knees to 90 degrees", 10, 210);
      }
      if (!isKneeAligned) {
        canvasCtx.fillText("Keep knees aligned", 10, 240);
      }

      canvasCtx.restore();
    }
  }

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
      },
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResult);

    let cameraInstance = null;

    const initializeCamera = () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        isWebcamReady
      ) {
        try {
          cameraInstance = new cam.Camera(webcamRef.current.video, {
            onFrame: async () => {
              if (webcamRef.current && webcamRef.current.video) {
                await pose.send({ image: webcamRef.current.video });
              }
            },
            width: 640,
            height: 480,
          });
          cameraInstance.start();
        } catch (error) {
          console.error("Error initializing camera:", error);
        }
      }
    };

    if (isWebcamReady) {
      initializeCamera();
    }

    return () => {
      if (cameraInstance) {
        cameraInstance.stop();
      }
    };
  }, [isWebcamReady]);

  function resetCount() {
    setRepCount(0);
    setDirection(0);
    setLastSpokenCount(0);
    speechQueue = []; // Clear speech queue
    speech.cancel(); // Cancel any ongoing speech
  }

  const handleClick = () => {
    const ID = Cookies.get("userID");
    const docRef = doc(db, `user/${ID}/squats`, uuidv4());
    const startTimeStamp = localStorage.getItem("squatsStartTime");
    const endTimeVar = new Date();
    const endTimeStamp = endTimeVar.getSeconds();
    const timeSpent = endTimeStamp - startTimeStamp;
    const repsCounter = setDoc(docRef, {
      reps: repCount,
      startTimeStamp: startTimeStamp,
      endTimeStamp: endTimeStamp,
      timeSpent: Math.abs(timeSpent),
      uid: ID,
      exceriseName: "Squats",
    });
    console.log(repsCounter);
  };

  const handleWebcamReady = () => {
    setIsWebcamReady(true);
  };

  const handleWebcamError = (error) => {
    console.error("Webcam error:", error);
    setIsWebcamReady(false);
  };

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      speechQueue = [];
      speech.cancel();
    };
  }, []);

  return (
    <>
      <Container
        maxWidth="100%"
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: "2rem",
          flexDirection: { lg: "row", xs: "column" },
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            borderRadius: "2rem",
            width: "100%",
          }}
        >
          <Webcam 
            ref={webcamRef} 
            className="full-width" 
            onUserMedia={handleWebcamReady}
            onUserMediaError={handleWebcamError}
            style={{ display: isWebcamReady ? 'block' : 'none' }}
          />
          {!isWebcamReady && (
            <Box sx={{ 
              width: "100%", 
              height: "480px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "2rem"
            }}>
              <Typography>Loading webcam...</Typography>
            </Box>
          )}
          <canvas
            ref={canvasRef}
            className="full-width"
            style={{
              position: "absolute",
              display: isWebcamReady ? 'block' : 'none'
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffff",
            borderRadius: "2rem",
            width: { lg: "40%", xs: "100%" },
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            style={{ textTransform: "capitalize" }}
          >
            Squats
          </Typography>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={imgURL} width="100%" alt="Squats"></img>
          </Box>
          <br></br>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                padding: "1rem",
              }}
            >
              <Typography variant="h6" color="secondary">
                Count
              </Typography>
              <input
                value={repCount}
                readOnly
                style={{
                  height: 50,
                  fontSize: 20,
                  width: 80,
                  padding: "1rem",
                  border: "2px solid orange",
                  borderRadius: "10px",
                  textAlign: "center"
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                borderRadius: "2rem",
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={resetCount}
              >
                Reset Counter
              </Button>
              <Link
                to="/workout"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  back
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Squats;
