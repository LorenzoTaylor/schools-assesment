import { Box } from '@mui/material';
import React from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { Link } from 'react-router-dom';

interface PanelButtonProps {
  onClick: () => void;
}

const PanelButton: React.FC<PanelButtonProps> = ({ onClick }) => {
  return (
    <Link to={''}>
      <Box
        style={{
          borderRadius: '15px',
          background: 'linear-gradient(45deg, rgba(0, 221, 255, 0.3), rgba(184, 243, 239, 0.4))',
          height: '75px',
          width: '75px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid rgba(255, 255, 255, 0.5)', // Subtle white border
          transition: 'all 0.3s ease',
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 221, 255, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <TuneIcon sx={{ color: '#00D7FF', height: '70%', width: '70%' }} />
      </Box>
    </Link>
  );
};

export default PanelButton;
