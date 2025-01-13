import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface PopupProps {
  onSelectMode: (mode: boolean) => void;  // Function passed from Game component to set mode
  onClose: () => void;  // Function to close the popup
}

const Popup: React.FC<PopupProps> = ({ onSelectMode, onClose }) => {
  const handleFreePlay = () => {
    onSelectMode(true); // Set freeplay mode to true
    onClose(); // Close the popup
  };

  const handleTimeTrial = () => {
    onSelectMode(false); // Set freeplay mode to false
    onClose(); // Close the popup
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white background
        backdropFilter: "blur(4px)", // Apply blur to the background
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
        zIndex: 1000,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "Montserrat, serif" }}>
        Choose Game Mode
      </Typography>
      <Button
        variant="contained"
        sx={{
          margin: "10px",
          background: 'linear-gradient(45deg, rgba(0, 221, 255, 1), rgba(184, 243, 239, 1))',
          fontFamily: "Montserrat, serif",
          "&:hover": {
            background: 'linear-gradient(45deg, rgb(59, 229, 255), rgb(59, 229, 255))',
          },
        }}
        onClick={handleTimeTrial}
      >
        Free Play
      </Button>

      <Button
        variant="contained"
        color="secondary"
        sx={{
          margin: "10px",
          background: 'linear-gradient(45deg, rgba(0, 221, 255, 1), rgba(184, 243, 239, 1))',
          fontFamily: "Montserrat, serif",
          "&:hover": {
            background: 'linear-gradient(45deg, rgb(59, 229, 255), rgb(59, 229, 255))',
          },
        }}
        onClick={handleFreePlay}
      >
        Time Trial
      </Button>
    </Box>
  );
};

export default Popup;
