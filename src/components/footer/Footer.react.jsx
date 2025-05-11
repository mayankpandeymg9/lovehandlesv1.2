import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: '100%',
      background: 'linear-gradient(90deg, #0f172a 0%, #16213e 100%)',
      color: '#fff',
      py: 3,
      px: 2,
      mt: 6,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
      fontSize: '1rem',
      zIndex: 10
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      © {new Date().getFullYear()} Love Handles. All rights reserved.
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
      <Link href="/" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>
        Home
      </Link>
      <Link href="/about" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>
        About
      </Link>
      <Link href="/contact" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>
        Contact
      </Link>
    </Box>
  </Box>
);

export default Footer; 