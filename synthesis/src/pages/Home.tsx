import React, { useState, useRef } from "react";
import Block from "../components/Block.tsx";
import MaterialUISwitch from "../components/Switch.tsx";
import { Stack } from "@mui/material";
import GameButton from "../components/GameButton.tsx";
import PanelButton from "../components/PanelButton.tsx";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { SelectChangeEvent } from "@mui/material";

const Home = () => {
  // State to track the number of blocks in each column
  const [col1Blocks, setCol1Blocks] = useState(5);
  const [col2Blocks, setCol2Blocks] = useState(3);

  // Track the dragged block's index
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(
    null
  );

  // Keep track of the drag start position for comparison
  const startDragPosition = useRef({ x: 0, y: 0 });

  const [lastBoxClicked, setLastBoxClicked] = useState(0);

  const [lookForMove, setLookForMove] = useState(true);

  const [onLine1, setOnLine1] = useState(true); // New state for interaction mode
  const [interactionMode, setInteractionMode] = useState("drawCompare"); // 'none', 'addRemove', 'drawCompare'
  const [comparisonAnimation, setComparisonAnimation] = useState(false); // Track animation state

  // Function to handle changes in interaction mode
  const handleInteractionModeChange = (event: SelectChangeEvent<string>) => {
    setInteractionMode(event.target.value);
  };

  // Comparison animation trigger
  const triggerComparisonAnimation = () => {
    setComparisonAnimation(true);
    // Reset after animation
    setTimeout(() => setComparisonAnimation(false), 1000); // animation duration
  };

  // Handle column block addition (when clicking on the column area)
  const handleClickColumn1 = () => {
    if (col1Blocks < 10) {
      setCol1Blocks(col1Blocks + 1);
    }
  };

  const handleClickColumn2 = () => {
    if (col2Blocks < 10) {
      setCol2Blocks(col2Blocks + 1);
    }
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedBlockIndex(index);
    startDragPosition.current = { x: e.clientX, y: e.clientY }; // Capture the starting drag position
  };

  // Handle drag end to check if the block was moved a certain distance
  const handleDragEnd = (e: React.DragEvent) => {
    if (draggedBlockIndex !== null) {
      const dx = e.clientX - startDragPosition.current.x;
      const dy = e.clientY - startDragPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 100) {
        // Remove the block from its column if dragged far enough
        if (draggedBlockIndex < col1Blocks) {
          setCol1Blocks((prev) => prev - 1); // Remove from column 1
        } else {
          setCol2Blocks((prev) => prev - 1); // Remove from column 2
        }
      }
      // Reset draggedBlockIndex
      setDraggedBlockIndex(null);
    }
  };
  function handleCol2(e: any) {
    if (col2Blocks < 10) {
      setCol2Blocks(Math.max(0, parseInt(e.target.value)) || 0);
    } else if (col2Blocks == 10 && e.target.value < 10) {
      setCol2Blocks(Math.max(0, parseInt(e.target.value)) || 0);
    } else {
    }
  }

  function handleCol1(e: any) {
    if (col1Blocks < 10) {
      setCol1Blocks(Math.max(0, parseInt(e.target.value)) || 0);
    } else if (col1Blocks == 10 && e.target.value < 10) {
      setCol1Blocks(Math.max(0, parseInt(e.target.value)) || 0);
    } else {
    }
  }

  // Track mouse position during drag
  const handleMouseMove = (e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (lineStart && lookForMove && onLine1) {
      setLineEnd({ x: mousePos.current.x, y: mousePos.current.y });
    } else if (onLine1 == false && lookForMove) {
      setLineEnd2({ x: mousePos.current.x, y: mousePos.current.y });
    }
  };

  const [isControlPanelVisible, setControlPanelVisible] = useState(false); // Track panel visibility

  // Function to toggle the control panel visibility
  const toggleControlPanel = () => {
    setControlPanelVisible((prev) => !prev);
  };

  // Handle clicking on a red box to start or finalize the line
  const handleBoxClick = (e: React.MouseEvent, column: 1 | 2, boxNum: any) => {
    // Get the target element (the red box clicked)
    const targetElement = e.target as HTMLElement;

    // Get the bounding rectangle of the clicked element
    const rect = targetElement.getBoundingClientRect();

    if (interactionMode === "addRemove") {
      setLineStart(null);
      setLineEnd(null);
      setLineStart2(null);
      setLineEnd2(null);
      return; // Block further line creation
    } else if (interactionMode === "drawCompare"){
      // Calculate the center of the element (used to attach the line to the center of the box)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    if (onLine1) {
      if (lineStart && lastBoxClicked === boxNum - 1) {
        // For specific connections (e.g., 1-2, 3-4)
        if (boxNum === 2 || boxNum === 4) {
          console.log(`${centerX}, ${centerY}`);
          setLineEnd({ x: centerX, y: centerY });
          setLookForMove(false);
          setOnLine1(false);
        }
      } else if (lineStart && lastBoxClicked === boxNum + 1) {
        // For reverse connections (e.g., 2-1, 4-3)
        if (boxNum === 1 || boxNum === 3) {
          setLineEnd({ x: centerX, y: centerY });
          setLookForMove(false);
          setOnLine1(false);
        }
      } else if (lineStart) {
        // If there was a line started, but not connected yet, set the last box clicked
        setLastBoxClicked(boxNum);
      } else {
        // Start the line from the current box (1, 2, 3, or 4)
        if (boxNum === 1 || boxNum === 2 || boxNum === 3 || boxNum === 4) {
          console.log(`${centerX}, ${centerY}`);
          setLineStart({ x: centerX, y: centerY });
        }
      }
    } else {
      setLookForMove(true);
      if (lineStart2 && lastBoxClicked === boxNum - 1) {
        // For specific connections (e.g., 1-2, 3-4)
        if (boxNum === 2 || boxNum === 4) {
          console.log(`${centerX}, ${centerY}`);
          setLineEnd2({ x: centerX, y: centerY });
          setLookForMove(false);
        }
      } else if (lineStart2 && lastBoxClicked === boxNum + 1) {
        // For reverse connections (e.g., 2-1, 4-3)
        if (boxNum === 1 || boxNum === 3) {
          setLineEnd2({ x: centerX, y: centerY });
          setLookForMove(false);
        }
      } else if (lineStart2) {
        // If there was a line started, but not connected yet, set the last box clicked
        setLastBoxClicked(boxNum);
      } else {
        // Start the line from the current box (1, 2, 3, or 4)
        if (boxNum === 1 || boxNum === 2 || boxNum === 3 || boxNum === 4) {
          console.log(`${centerX}, ${centerY}`);
          setLineStart2({ x: centerX, y: centerY });
        }
      }
    }

    // Set the last box clicked
    setLastBoxClicked(boxNum);
    }

    
  };

  // State to track the start and end of the line
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lineEnd, setLineEnd] = useState<{ x: number; y: number } | null>(null);
  const [lineStart2, setLineStart2] = useState<{ x: number; y: number } | null>(
    null
  );
  const [lineEnd2, setLineEnd2] = useState<{ x: number; y: number } | null>(
    null
  );

  // References for mouse positions
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isSwitchOn, setIsSwitchOn] = useState(false); // Track switch state

  // Handle switch toggle
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwitchOn(event.target.checked);
  };
  const menu = keyframes`
  0% {
    transform: scale(0);
    transform-origin: 0% 50%;
  }
  100% {
    transform: scale(1);
    transform-origin: 0% 50%;
  }
`;

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
      onMouseMove={handleMouseMove}
    >
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
        <GameButton />
        <PanelButton onClick={toggleControlPanel} />

      </Stack>

      {/* Control Panel (conditionally rendered based on switch state) */}
      
      {isControlPanelVisible && (
        <Box
        sx={{
          position: "absolute",
          top: "38%",
          left: {
            xs: "18%",
            md: "15%",
            lg: "10%",
          },
          transform: "translateY(-50%)",
          width: "40vw",
          height: "280px",
          backgroundColor: "rgba(184, 243, 239, 0.5)", // Semi-transparent background
          backdropFilter: "blur(10px)", // Adding background blur
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.6)", // White glow effect
          padding: "20px",
          display: "block",
          opacity: 1,
          animation: `${menu} 1s ease forwards`,
          zIndex: "10",
        }}
      >
      
          <Typography variant="h6" color="text.primary">
            Control Panel
          </Typography>

        {/* Block Count Inputs */}
        <div style={{ paddingBottom: "15px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Typography variant="body2">Column 1 Blocks</Typography>
            <input
              type="number"
              value={col1Blocks}
              onChange={(e) => handleCol1(e)}
              style={{ padding: "5px", width: "50px" }}
            />
          </div>

          <div>
            <Typography variant="body2">Column 2 Blocks</Typography>
            <input
              type="number"
              value={col2Blocks}
              onChange={(e) => handleCol2(e)}
              style={{ padding: "5px", width: "50px" }}
            />
          </div>
        </div>

        {/* Interaction Mode */}
        <FormControl fullWidth>
          <InputLabel>Interaction Mode</InputLabel>
          <Select
            value={interactionMode}
            onChange={handleInteractionModeChange}
            label="Interaction Mode"
          >
            <MenuItem value="drawCompare">Draw and Compare</MenuItem>
            <MenuItem value="addRemove">Add/Remove</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>

        {/* Button to play the comparison animation */}
        <Button
          variant="contained"
          color="primary"
          onClick={triggerComparisonAnimation}
          sx={{ marginTop: "10px" }}
        >
          Play Comparison Animation
        </Button>

        {/* Display animation if triggered */}
        {comparisonAnimation && (
          <Typography
            variant="body2"
            sx={{ marginTop: "10px", color: "green" }}
          >
            Comparison Animation Playing...
          </Typography>
        )}
      </Box>)}

        {/* Comparison Sign */}
{col1Blocks !== col2Blocks && (
  <Typography
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "64px",
      fontWeight: "bold",
      zIndex: 9,
      color: col1Blocks > col2Blocks ? "rgba(95, 209, 229, 0.5)" : "rgba(95, 209, 229, 0.5)", 
    }}
  >
    {col1Blocks > col2Blocks ? ">" : "<"}
  </Typography>
)}
{col1Blocks === col2Blocks && (
  <Typography
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "64px",
      fontWeight: "bold",
      zIndex: 9,
      color: "rgba(95, 209, 229, 0.5)", // Color when blocks are equal
    }}
  >
    {"="}
  </Typography>
)}

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
              style={{ height: "20%", width: "180%", zIndex: "10" }}
              onClick={(e) => handleBoxClick(e, 2, 3)}
            ></div>
            <div
              style={{
                width: "max-content",
                display: "flex",
                flexDirection: "column-reverse",
              }}
              onClick={handleClickColumn1}
            >
              {[...Array(col1Blocks)].map((_, index) => (
                <Block
                  key={index}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
            <div
              style={{ height: "20%", width: "180%", zIndex: "10" }}
              onClick={(e) => handleBoxClick(e, 2, 1)}
            ></div>
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
              style={{ height: "20%", width: "180%", zIndex: "10" }}
              onClick={(e) => handleBoxClick(e, 2, 4)}
            ></div>
            <div
              style={{
                width: "max-content",
                display: "flex",
                flexDirection: "column-reverse",
              }}
              onClick={handleClickColumn2}
            >
              {/* Render blocks in column 2 */}
              {[...Array(col2Blocks)].map((_, index) => (
                <Block
                  key={index + col1Blocks} // Make sure keys are unique by combining column values
                  index={index + col1Blocks}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
            <div
              style={{ height: "20%", width: "180%", zIndex: "10" }}
              onClick={(e) => handleBoxClick(e, 2, 2)}
            ></div>
          </div>
          <Box
            sx={{
                position: "absolute",
                width: "80vw",
                backgroundColor: "rgba(184, 243, 239, 0.5)", // Light icy blue with transparency
                height: "70px",
                top: "88vh",
                left: "10vw",
                borderRadius:    "5px", // Rounded corners
                border: "2px solid white", // White border
                boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.6)", // Slight white glow
                display: "flex",
                flexDirection: "row"
            }}
            >
          <div style={{ marginBottom: "10px" }}>
            <input
              type="number"
              value={col1Blocks}
              onChange={(e) => handleCol1(e)}
              style={{ padding: "5px", width: "50px" }}
            />
          </div>

          <div>
            <input
              type="number"
              value={col2Blocks}
              onChange={(e) => handleCol2(e)}
              style={{ padding: "5px", width: "50px" }}
            />
          </div>

            </Box>


        </div>
        {/* If there is a line being drawn, render the line */}
        {lineStart && lineEnd && (
          <svg
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {/* Outer rounded line */}
            <line
              x1={lineStart.x}
              y1={lineStart.y}
              x2={lineEnd.x}
              y2={lineEnd.y}
              stroke="lightblue"
              strokeWidth={20}
              strokeLinecap="round" // This makes the line edges rounded
            />

            {/* Inner white line */}
            <line
              x1={lineStart.x}
              y1={lineStart.y}
              x2={lineEnd.x}
              y2={lineEnd.y}
              stroke="white"
              strokeWidth={10} // Inner line with smaller strokeWidth
              strokeLinecap="round" // Ensure inner line also has rounded edges
            />
          </svg>
        )}
        {lineStart2 && lineEnd2 && (
          <svg
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {/* Outer rounded line */}
            <line
              x1={lineStart2.x}
              y1={lineStart2.y}
              x2={lineEnd2.x}
              y2={lineEnd2.y}
              stroke="lightblue"
              strokeWidth={20}
              strokeLinecap="round" // This makes the line edges rounded
            />

            {/* Inner white line */}
            <line
              x1={lineStart2.x}
              y1={lineStart2.y}
              x2={lineEnd2.x}
              y2={lineEnd2.y}
              stroke="white"
              strokeWidth={10} // Inner line with smaller strokeWidth
              strokeLinecap="round" // Ensure inner line also has rounded edges
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Home;
