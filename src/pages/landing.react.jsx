import React, { useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Header from "../components/header/header.react";
import heroImg from "../assets/images/hero-section-new.png";
import { Icon } from "@mui/material";
import features from "../data/data";
import about from "../assets/images/reminder.svg";
import impFeature from "../assets/images/tracking.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import user from "../assets/images/people01.png";
import quotes from "../assets/images/quotes.svg";
import { testimonial } from "../data/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { keyframes } from '@mui/system';
import { alpha } from '@mui/material/styles';
import mayankImg from "../assets/images/mayank-pandey.jpg";

// Add new animations
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("uat")) {
      navigate("/home");
    }
    if (!Cookies.get("userID")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: { lg: "row", sm: "row", xs: "column-reverse" },
          position: "relative",
          background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1b262c)',
          backgroundSize: '400% 400%',
          animation: `${backgroundPulse} 15s ease infinite`,
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
        maxWidth="false"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100vh",
            width: "100%",
            color: "#fff",
            gap: "1rem",
            position: 'relative',
            zIndex: 1,
            animation: `${fadeIn} 1s ease-out forwards`
          }}
        >
          <Typography
            variant="h5"
            color="secondary"
            sx={{
              display: { lg: "flex", sm: "flex", xs: "none" },
              fontSize: "2rem",
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              animation: `${pulse} 2s ease-in-out infinite`,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#ff4081',
                textShadow: '0 0 8px rgba(255, 64, 129, 0.5)'
              }
            }}
          >
            Unleash Your Potential!
          </Typography>
          <Typography
            variant="h2"
            className="text-gradient"
            sx={{
              fontWeight: "bold",
              fontSize: { lg: "6rem", sm: "4rem", xs: "2rem" },
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              animation: `${float} 3s ease-in-out infinite`,
              transition: 'all 0.3s ease',
              background: 'linear-gradient(45deg, #ff4081, #7c4dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                background: 'linear-gradient(45deg, #7c4dff, #ff4081)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'scale(1.02)'
              }
            }}
          >
            Transform Your Fitness Journey
          </Typography>
          <Typography
            varient="h6"
            sx={{
              fontSize: { lg: "1.5rem", sm: "1rem" },
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              maxWidth: '600px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0e0e0',
                textShadow: '0 0 10px rgba(255,255,255,0.3)'
              }
            }}
          >
            Experience personalized, AI-driven workouts and real-time feedback. Achieve your goals with smart tracking, expert guidance, and a supportive community—anytime, anywhere.
          </Typography>
          <Link to="/login" className="link">
            <Button 
              variant="contained" 
              color="secondary"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                }
              }}
            >
              Get Started
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            width: { lg: "80%", sm: "95%", xs: "100%" },
            height: { lg: "100%", xs: "100vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            animation: `${float} 3s ease-in-out infinite`
          }}
        >
          <img src={heroImg} alt="gif" width="100%" style={{ borderRadius: '32px', objectFit: 'cover' }} />
        </Box>
      </Container>

      {/* Features Section */}
      <Container
        sx={{
          display: "flex",
          justifyContent: { lg: "space-between", sm: "center", xs: "center" },
          alignItems: "center",
          height: { lg: "100vh", sm: "100vh", xs: "100%" },
          width: "100%",
          flexDirection: { lg: "row", sm: "column", xs: "column" },
          color: "#fff",
          gap: "1rem",
          position: "relative",
          padding: { lg: "2rem", xs: "0" },
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
        maxWidth="false"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            gap: "2rem",
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              textAlign: { lg: "left", sm: "center", xs: "center" },
              fontSize: { lg: "6rem", sm: "4rem", xs: "1.5rem" },
              width: "100%",
              paddingTop: { lg: 0, xs: "2rem" },
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              animation: `${fadeIn} 1s ease-out forwards`,
              transition: 'all 0.3s ease',
              background: 'linear-gradient(45deg, #ff4081, #7c4dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                background: 'linear-gradient(45deg, #7c4dff, #ff4081)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'scale(1.02)'
              }
            }}
            className="text-gradient"
          >
            Why Love Handles?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { lg: "1.5rem", sm: "1rem" },
              width: { lg: "60%", sm: "80%", xs: "90%" },
              textAlign: { lg: "left", sm: "center", xs: "center" },
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              animation: `${fadeIn} 1s ease-out 0.2s forwards`,
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#e0e0e0',
                textShadow: '0 0 10px rgba(255,255,255,0.3)'
              }
            }}
          >
            Love Handles empowers you to work out safely and effectively at home. Our intelligent system monitors your form, tracks your progress, and motivates you to reach your fitness goals—no personal trainer required!
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
            mb: "1rem",
            width: { lg: "70%", md: "85%", xs: "100%" },
            flexWrap: "wrap",
            position: 'relative',
            zIndex: 1
          }}
        >
          {features.map((feature, key) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 160, sm: 180, md: 200, lg: 220 },
                height: { xs: 160, sm: 180, md: 200, lg: 220 },
                minWidth: 140,
                maxWidth: 260,
                minHeight: 140,
                maxHeight: 260,
                p: 2,
                borderRadius: 3,
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                animation: `${fadeIn} 1s ease-out ${key * 0.1}s forwards`,
                aspectRatio: '1 / 1',
                '&:hover': {
                  transform: 'translateY(-5px) scale(1.04)',
                  background: 'rgba(30, 41, 59, 0.8)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                  '& .MuiSvgIcon-root': {
                    animation: `${pulse} 1s ease-in-out infinite`
                  }
                }
              }}
              key={key}
            >
              <Icon 
                color="secondary" 
                fontSize="large"
                sx={{
                  transition: 'all 0.3s ease',
                  mb: 1.5
                }}
              >
                {feature.icon}
              </Icon>
              <Typography
                variant="h6"
                color="secondary"
                sx={{
                  fontWeight: "bold",
                  fontSize: { lg: "1.2rem", sm: "1.1rem", xs: "1rem" },
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  mb: 0.5,
                  '&:hover': {
                    color: '#ff4081',
                    textShadow: '0 0 8px rgba(255, 64, 129, 0.5)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: { lg: "1rem", sm: "0.95rem", xs: "0.9rem" },
                  color: 'rgba(255, 255, 255, 0.85)',
                  textAlign: 'center',
                  mt: 0.5,
                  lineHeight: 1.2,
                  maxWidth: '90%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#ffffff',
                    textShadow: '0 0 8px rgba(255,255,255,0.3)'
                  }
                }}
              >
                {/* Short one-line description for each feature */}
                {key === 0 && 'Personalized feedback for safe, effective workouts.'}
                {key === 1 && 'Plans tailored to your unique fitness goals.'}
                {key === 2 && 'Start, track, and stay motivated with ease.'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: { lg: "100vh", xs: "100%" },
          width: "100%",
          gap: "5rem",
          position: "relative",
          padding: "2rem",
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
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
        maxWidth="false"
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "2rem" },
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            animation: `${fadeIn} 1s ease-out forwards`,
            position: 'relative',
            zIndex: 1
          }}
          className="text-gradient"
        >
          Effective workouts at home without a personal trainer!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
            width: "80%",
            position: 'relative',
            zIndex: 1
          }}
        >
          {testimonial.filter(item => item.name === "Mayank Pandey").map((item, key) => (
            <Card
              key={key}
              sx={{
                maxWidth: 500,
                height: 600,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: "1rem",
                color: "#fff",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                transition: 'all 0.3s ease',
                animation: `${fadeIn} 1s ease-out ${key * 0.1}s forwards`,
                '&:hover': {
                  transform: 'translateY(-10px)',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '& .MuiTypography-h4': {
                    animation: `${pulse} 1s ease-in-out infinite`
                  }
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  height: "40px",
                  opacity: 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <img src={quotes} alt="quotes" />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "1.5rem",
                  color: "#fff",
                  width: '100%',
                  padding: '1.5rem'
                }}
              >
                <Box
                  sx={{
                    width: "200px",
                    height: "200px",
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  <img src={mayankImg} alt={item.name} width="100%" style={{ objectFit: 'cover' }} />
                </Box>

                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  className="text-gradient"
                  sx={{
                    textAlign: "center",
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    fontWeight: 600,
                    fontSize: '2rem'
                  }}
                >
                  {item.name}
                </Typography>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    maxWidth: '400px'
                  }} 
                  className="wrap"
                >
                  Love Handles is your personal AI-powered fitness companion. Whether you're at home or outdoors, it guides you through effective workouts, tracks your progress, and ensures your form is correct—just like a real trainer. Achieve your health goals, stay motivated, and transform your fitness journey with smart, interactive features designed for everyone.
                </Typography>
                <Typography 
                  variant="h6" 
                  color="secondary"
                  sx={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    fontWeight: 500,
                    fontSize: '1.2rem',
                    opacity: 0.9
                  }}
                >
                  Founder
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Landing;
