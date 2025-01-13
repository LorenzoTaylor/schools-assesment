import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe for floating animation
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const AnimatedWrapper = styled.div<{ delay?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 8100px;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  margin-top: 0px;
`;

interface BlockProps {
  index: number;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const Block: React.FC<BlockProps> = ({ index, onDragStart, onDragEnd }) => {
  const animationDelay = `${index * 0.2}s`;

  // Handle drag start
  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e, index); // Call onDragStart if provided
    }
  };

  // Handle drag end
  const handleDragEnd = (e: React.DragEvent) => {
    if (onDragEnd) {
      onDragEnd(e); // Call onDragEnd if provided
    }
  };

  return (
    <AnimatedWrapper delay={animationDelay}>
      <div
        draggable
        onDragStart={handleDragStart}  // Conditionally call handleDragStart
        onDragEnd={handleDragEnd}  // Conditionally call handleDragEnd
        style={{
          width: "50px",  // Smaller block width
          height: "50px",  // Smaller block height
          margin: "5px",  // Adjust margin to fit smaller blocks
          position: "relative",
          cursor: "move",
          backgroundColor: "#127BBC",
          zIndex: "1",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: 'rotateX(-45deg) rotateY(45deg)',
            transformStyle: 'preserve-3d',
            width: '50px',  // Smaller width
            height: '50px',  // Smaller height
            position: 'relative',
          }}
        >
          {/* Front Face */}
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#127BBC',
              width: '100%',
              height: '100%',
              transform: 'rotateY(0deg) translateZ(25px)',  // Adjust Z to half of block size
            }}
          ></div>

          {/* Top Face */}
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#5FD1E5',
              width: '100%',
              height: '100%',
              transform: 'rotateX(90deg) translateZ(25px)',  // Adjust Z to half of block size
            }}
          ></div>

          {/* Left Face */}
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#B8F3EF',
              width: '100%',
              height: '100%',
              transform: 'rotateY(-90deg) translateZ(25px)',  // Adjust Z to half of block size
            }}
          ></div>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Block;
