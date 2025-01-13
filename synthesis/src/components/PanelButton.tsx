import { Box } from '@mui/material';
import React from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { Link } from 'react-router-dom';

interface PanelButtonProps {
  onClick: () => void;
}

const PanelButton: React.FC<PanelButtonProps> = ({ onClick }) => {
  return (
    <Link to={''} >
    <Box
      style={{
        borderRadius: '5px',
        backgroundColor: 'rgba(184, 243, 239, 0.5)', // Light blue background
        height: '75px',
        width: '75px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: '50px', // Adjusted size for the icon
        border: '2px solid white', // White border
        transition: 'background-color 0.3s ease', // Smooth transition
      }}
      onClick={onClick} // Call the parent onClick function when clicked
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(184, 243, 239, 0.7)'} // Lighter on hover
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(184, 243, 239, 0.5)'} // Revert on leave
    >
      <TuneIcon sx={{ color: '#127BBC', height: '80%', width: '80%' }} />
    </Box>
    </Link>
  );
};

export default PanelButton;
