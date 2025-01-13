import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  transform: "rotate(90deg)",

  // Double the size of the switch
  width: 180, // Double width
  height: 100, // Double height
  padding: 25, // Double padding

  '& .MuiSwitch-switchBase': {
    margin: 13, // Adjusted margin to fit the larger thumb
    padding: 0,
    transform: 'translateX(12px)', // Increase thumb translation for larger thumb
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(80px)', // Increase translation for a larger thumb movement
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('https://cdn-icons-png.flaticon.com/128/9554/9554945.png')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },

  // Adjust thumb size to match new switch dimensions
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 75, // Double the thumb size
    height: 75, // Double the thumb size
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('https://cdn-icons-png.flaticon.com/128/9554/9554945.png')`,
      backgroundSize: "80px",
      transform: "rotate(270deg)"
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },

  // Adjust track size to match the new larger thumb
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 130 / 2,  // Make sure track is circular around the larger thumb
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

export default MaterialUISwitch;
