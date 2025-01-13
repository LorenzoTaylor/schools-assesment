import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

interface GameButtonProps {
  to: string;
}

const GameButton: React.FC<GameButtonProps> = ({ to }) => {
  return (
    <Link to={to}>
      <Box
        style={{
          borderRadius: '15px', // Rounded to match the futuristic style
          background: 'linear-gradient(45deg, rgba(0, 221, 255, 0.3), rgba(184, 243, 239, 0.4))', // Gradient icy color
          height: '80px',
          width: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)', // Subtle white border for a frosty look
          transition: 'all 0.3s ease', // Smooth transition for all properties
          boxShadow: '0 0 20px rgba(184, 243, 239, 0.7)', // Soft glow around the button
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarges the button on hover
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 221, 255, 0.8)'; // Intensifies the glow
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'; // Reverts to normal size
          e.currentTarget.style.boxShadow = '0 0 20px rgba(184, 243, 239, 0.7)'; // Reverts the glow
        }}
      >
        <VideogameAssetIcon sx={{ color: '#00D7FF', height: '70%', width: '70%' }} />
      </Box>
    </Link>
  );
};

export default GameButton;
