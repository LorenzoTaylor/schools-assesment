import React, { useState, useRef } from "react";
import Block from "../components/Block.tsx";

const Home = () => {
  // State to track the number of blocks in each column
  const [col1Blocks, setCol1Blocks] = useState(10);
  const [col2Blocks, setCol2Blocks] = useState(3);
  
  // Track the dragged block's index
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);

  // Keep track of the drag start position for comparison
  const startDragPosition = useRef({ x: 0, y: 0 });

  const [lastBoxClicked, setLastBoxClicked] = useState(0);

  const [lookForMove, setLookForMove] = useState(true);

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
    startDragPosition.current = { x: e.clientX, y: e.clientY };  // Capture the starting drag position
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
          setCol1Blocks((prev) => prev - 1);  // Remove from column 1
        } else {
          setCol2Blocks((prev) => prev - 1);  // Remove from column 2
        }
      }
      // Reset draggedBlockIndex
      setDraggedBlockIndex(null);
    }
  };
  function handleCol2(e:any){
    if(col2Blocks<10){
        setCol2Blocks(Math.max(0, parseInt(e.target.value))||0)
    } else if(col2Blocks==10 && e.target.value < 10){
        setCol2Blocks(Math.max(0, parseInt(e.target.value))||0)
    } else {

    }
  }

  function handleCol1(e:any){
    if(col1Blocks<10){
        setCol1Blocks(Math.max(0, parseInt(e.target.value))||0)
    } else if(col1Blocks==10 && e.target.value < 10){
        setCol1Blocks(Math.max(0, parseInt(e.target.value))||0)
    } else {
        
    }
  }

  // Track mouse position during drag
  const handleMouseMove = (e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (lineStart && lookForMove) {
      setLineEnd({ x: mousePos.current.x, y: mousePos.current.y });
    } 
  };


  // Handle clicking on a red box to start or finalize the line
  const handleBoxClick = (e: React.MouseEvent, column: 1 | 2, boxNum: any) => {
    // Get the target element (the red box clicked)
    const targetElement = e.target as HTMLElement;
    
    // Get the bounding rectangle of the clicked element
    const rect = targetElement.getBoundingClientRect();
    
    // Calculate the center of the element (used to attach the line to the center of the box)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
  
    if (lineStart && lastBoxClicked === boxNum - 1) {
      // For specific connections (e.g., 1-2, 3-4)
      if (boxNum === 2 || boxNum === 4) {
        console.log(`${centerX}, ${centerY}`)
        setLineEnd({ x: centerX, y: centerY });
        setLookForMove(false);
      }
    } else if (lineStart && lastBoxClicked === boxNum + 1) {
      // For reverse connections (e.g., 2-1, 4-3)
      if (boxNum === 1 || boxNum === 3) {
        setLineEnd({ x: centerX, y: centerY });
        setLookForMove(false);
      }
    } else if (lineStart) {
      // If there was a line started, but not connected yet, set the last box clicked   
      setLastBoxClicked(boxNum);
    } else {
      // Start the line from the current box (1, 2, 3, or 4)
      if (boxNum === 1 || boxNum === 2 || boxNum === 3 || boxNum === 4) {
        console.log(`${centerX}, ${centerY}`)
        setLineStart({ x: centerX, y: centerY });
      }
    }
  
    // Set the last box clicked
    setLastBoxClicked(boxNum);
  };


  // State to track the start and end of the line
    const [lineStart, setLineStart] = useState<{ x: number, y: number } | null>(null);
    const [lineEnd, setLineEnd] = useState<{ x: number, y: number } | null>(null);
  
    // References for mouse positions
    const mousePos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#093651",
        justifyContent: "space-between"
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Column 1 */}
      <div>
      <div style={{height: "10%", width: "100%", backgroundColor: "red"}} onClick={(e) => handleBoxClick(e, 2, 1)}>
            1
        </div>
      <div
        style={{
          width: "max-content",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleClickColumn1}
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
          {/* Render blocks in column 1 */}
          {[...Array(col1Blocks)].map((_, index) => (
            <Block
              key={index}
              index={index}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
        <div style={{ marginTop: "10px", color: "white" }}>
            <input
              type="number"
              value={col1Blocks}
              onChange={(e) => handleCol1(e)}
              style={{ padding: "5px", width: "50px" }}
            />
          </div>
      </div>
      <div style={{height: "10%", width: "100%", backgroundColor: "red"}} onClick={(e) => handleBoxClick(e, 2, 3)}>
            3
        </div>
      </div>

      {/* Column 2 */}
      <div>
      <div style={{height: "10%", width: "100%", backgroundColor: "red"}} onClick={(e) => handleBoxClick(e, 2, 2)}>
            2
        </div>
      <div
        style={{
          width: "max-content",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleClickColumn2}
      >
        <div
          style={{
            width: "max-content",
            height: "100%",
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "26vw"
          }}
        >
          {/* Render blocks in column 2 */}
          {[...Array(col2Blocks)].map((_, index) => (
            <Block
              key={index + col1Blocks}  // Make sure keys are unique by combining column values
              index={index + col1Blocks}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
        <div style={{ marginTop: "10px", color: "white" }}>
            <input
              type="number"
              value={col2Blocks}
              onChange={(e) => handleCol2(e)}
              style={{ padding: "5px", width: "50px" }}
            />
          </div>
        </div>
        <div style={{height: "10%", width: "100%", backgroundColor: "red"}} onClick={(e) => handleBoxClick(e, 2, 4)}>
            4
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
                <line
                    x1={lineStart.x}
                    y1={lineStart.y}
                    x2={lineEnd.x}
                    y2={lineEnd.y}
                    stroke="white"
                    strokeWidth={2}
                />
                </svg>
            )}
        </div>
      </div>
    
  );
};

export default Home;
