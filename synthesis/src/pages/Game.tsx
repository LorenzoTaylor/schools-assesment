import React, { useState, useEffect } from "react";
import Block from "../components/Block.tsx";
import { Stack } from "@mui/material";
import GameButton from "../components/GameButton.tsx";
import {
  Box,
  Typography,
} from "@mui/material";
import FancyText from '@carefully-coded/react-text-gradient';
import Popup from "../components/Popup.tsx";
import CloseIcon from '@mui/icons-material/Close';
import SoundButton from "../components/SoundButton.tsx";

const Game = () => {
  const [col1Blocks, setCol1Blocks] = useState(Math.floor(Math.random() * 11));
  const [col2Blocks, setCol2Blocks] = useState(Math.floor(Math.random() * 11));
  const [inputValue, setInputValue] = useState("");
  const [tally, setTally] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFreePlay, setIsFreePlay] = useState(false); // Free Play state
  const [showInstructions, setShowInstructions] = useState(false); // Show instructions for Free Play
  const [countdown, setCountdown] = useState(10); // Countdown timer for Free Play
  const [canInteract, setCanInteract] = useState(true);
  const [showPopup, setShowPopup] = useState(true);  // Popup visibility state
  const [showScore, setShowScore] = useState(false);  // Popup visibility state
    const [playSounds, setPlaySounds] = useState(true);
  
    const handleSoundToggle = () => {
      console.log( `clicked,${playSounds},`)
      setPlaySounds((prev) => !prev); // Toggle the playSounds state
  
    };




  let success = new Audio("/assets/sounds/success.wav");
  
  success.volume = 0.2; // 20% of max volume

  useEffect(() => {
    // Reset game state when mode changes or on game start
    if (isFreePlay) {
      setShowInstructions(true);
      setTotal(0); // Reset total question count
      setTally(0); // Reset tally count
      setCountdown(10); // Reset countdown
    }

    let timer: any;
    if (isFreePlay) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setShowInstructions(false);
            promptEndGame(); // Show popup when time is up
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Clean up timer
  }, [isFreePlay]); // Trigger useEffect whenever isFreePlay changes

  // Function to prompt the user after Free Play timer ends
  const promptEndGame = () => {
    setCanInteract(false); // Prevent further interaction
    setShowScore(true);
  }
    
  // Handle mode selection (either Free Play or Time Trial)
  const handleModeSelect = (mode: boolean) => {
    setIsFreePlay(mode);  // Set the selected mode (Free Play or Time Trial)
    setShowPopup(false);  // Close the popup after selecting mode
  };

const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // Only allow interaction if the user can interact (not in cooldown)
  if (!canInteract) return; // Exit early if the user can't interact
  // Only consider valid key inputs (>, <, =)
  if (e.key === ">" || e.key === "<" || e.key === "=") {
    // Check the user's input with the actual comparison
    if (
      (e.key === ">" && col1Blocks > col2Blocks) ||
      (e.key === "<" && col1Blocks < col2Blocks) ||
      (e.key === "=" && col1Blocks === col2Blocks)
    ) {
      setTally(tally + 1);
      if (playSounds){
        success.play(); // Play success sound
      }
    }

    // Set new random values for col1Blocks and col2Blocks
    setCol1Blocks(Math.floor(Math.random() * 11));
    setCol2Blocks(Math.floor(Math.random() * 11));

    // Clear input value after checking
    setInputValue('');

    // Disable interaction for a short period (500ms)
    setCanInteract(false);

    setTimeout(() => {
      setCanInteract(true);
    }, 60);
    setTotal(total + 1);
  }
};

// Handle input change, set the value of the input field
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value); // Update the state with the current input value
};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#EAFDFF",
        justifyContent: "space-between",
      }}
    >

      {/* Instructions for Free Play */}
      {showInstructions && (
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 999,
            fontSize: "24px",
            color: "#127BBC",
            fontWeight: "bold",
          }}
        >
          <Typography>
            You have 10 seconds to get as many right as you can.
          </Typography>
          <Typography>
            No need to delete or retype the new operator, just continue typing!
          </Typography>
        </Box>
      )}

      {/* Countdown Timer */}
      {isFreePlay && (
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 999,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#127BBC" }}>
            Time Remaining: {countdown} seconds
          </Typography>
        </Box>
      )}
       {/* Buttons to start Free Play and Time Trial */}
       {/* Conditionally render Popup */}
      {showPopup && <Popup onSelectMode={handleModeSelect} onClose={() => setShowPopup(false)} />}
      {showScore && <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "48%",
    width: "200px",
    height: "100px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white background
    backdropFilter: "blur(6px)", // Apply blur to the background
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
    zIndex: 1000,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // Ensure the box is positioned relative for absolute positioning of the CloseIcon
  }}
>
  <FancyText
    style={{
      fontSize: "80px",
      fontWeight: "bold",
      fontFamily: "Montserrat, serif",
      zIndex: 9,
    }}
    gradient={{ from: "rgb(59, 229, 255)", to: "rgb(161, 235, 247)" }}
    animate
    animateDuration={700}
  >
    {isFreePlay ? `${tally}/${total}` : tally}
  </FancyText>

  {/* CloseIcon positioned in the top-right corner */}
  <div
    onClick={() => window.location.reload()}
    style={{
      position: "absolute",
      top: "10px", // Adjust to move it a bit lower or higher if needed
      right: "10px", // Adjust to move it left/right
      cursor: "pointer",
    }}
  >
    <CloseIcon sx={{ transform: "translate(0%, 0%)" }} />
  </div>
</Box>
}
      <Stack
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10vh",
          paddingBottom: "2%",
          paddingTop: "2%",
          left: "2%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "20vw",
          maxWidth: "100px",
          zIndex: "12",
        }}
      >
        <SoundButton onClick={handleSoundToggle} />

        <GameButton to={"/"}/>

      </Stack>
      <input
          type="text"
          value={inputValue} // Bind the input value to inputValue state
          onChange={handleInputChange} // Update state as the user types
          onKeyDown={handleInputKeyDown} // Handle key press to trigger logic
          style={{
            width: "90px",
            height: "90px",
            fontSize: "155px",
            borderColor: "white",
            backgroundColor: "#EAFDFF",
            borderRadius: "5px",
            color: "#127BBC",
            position: "absolute",
            top: "44%",
            left: "45%",
          }}
        />

      {/* Column 1 */}
      <div>
        <div
          style={{
            width: "max-content",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1",
          }}
        >
          <div
            style={{
              width: "max-content",
              height: "100%",
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "26vw",
            }}
          >
            <div
              style={{
                width: "max-content",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {[...Array(col1Blocks)].map((_, index) => (
                <Block
                  key={index}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div>
        <div
          style={{
            width: "max-content",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "max-content",
              height: "100%",
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "26vw",
            }}
          >
            <div
              style={{
                width: "max-content",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {/* Render blocks in column 2 */}
              {[...Array(col2Blocks)].map((_, index) => (
                <Block
                  key={index + col1Blocks} // Make sure keys are unique by combining column values
                  index={index + col1Blocks}
                />
              ))}
            </div>
          </div>
          <Box
                      sx={{
                          position: "absolute",
                          width: "80vw",
                          backgroundColor: "rgba(184, 243, 239, 0.1)", // Light icy blue with transparency
                          height: "70px",
                          top: "88vh",
                          left: "10vw",
                          borderRadius:    "5px", // Rounded corners
                          border: "2px solid white", // White border
                          display: "flex",
                          flexDirection: "row",
                          gap: "22vw",
                          maxWidth: "80vw",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          background: 'linear-gradient(45deg, rgba(0, 221, 255, 0.3), rgba(184, 243, 239, 0.4))',

                      }}
                      >
                    <div style={{}}>
                    <FancyText
                        style={{position: "absolute",
                        transform: "translate(-50%, -50%)",
                        fontSize: "70px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, serif",
                        zIndex: 9,}}
                          gradient={{ from: 'rgb(59, 229, 255)', to: 'rgb(59, 229, 255)' }}
                          animate
                          animateDuration={70000000000}
                        >
                        {col1Blocks}
                      </FancyText>
                    </div>
                      <div>
                      <FancyText
                        style={{position: "absolute",
                        transform: "translate(-50%, -50%)",
                        fontSize: "80px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, serif",
                        zIndex: 9,}}
                          gradient={{ from:  'rgb(59, 229, 255)', to: 'rgb(161, 235, 247)'  }}
                          animate
                          animateDuration={700}
                        >
                        {isFreePlay? `${tally}/${total}` : tally} 
                      </FancyText>
                      </div>
                    <div>
                    <FancyText
                        style={{position: "absolute",
                        transform: "translate(-50%, -50%)",
                        fontSize: "70px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, serif",
                        zIndex: 9,}}
                          gradient={{ from: 'rgb(59, 229, 255)', to: 'rgb(59, 229, 255)' }}
                          animate
                          animateDuration={100000000000000}
                        >
                        {col2Blocks}
                      </FancyText>
                    </div>
          
                      </Box>


        </div>

      </div>
    </div>
  );
};

export default Game;
