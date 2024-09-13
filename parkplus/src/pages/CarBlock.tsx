import React from 'react';
import { useRecoilValue } from 'recoil';
import { blocksState } from '../Atom/blocksState';
import { useNavigate } from 'react-router-dom';

// Import Material-UI components
import Button from '@mui/material/Button';

interface CarBlockProps {
  id: number;
}

const CarBlock: React.FC<CarBlockProps> = ({ id }) => {
  // Get the current state of the parking blocks using Recoil
  const blockStateData = useRecoilValue(blocksState);

  // Check if the current parking block is parked
  const parked = blockStateData[id - 1].parked;

  // React Router hook for navigation
  const navigate = useNavigate();

  // Event handler for the button click
  const handleClick = () => {
    console.log(id, parked);
    
    // Navigate to the car details page with the current block's id as state
    navigate('/parking/carDetails', { state: id });
  };

  return (
    <div >
      {/* Material-UI Button for car block */}
      <Button
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: parked ? 'Orange' : 'Blue',
          color: 'black',
          border: '1px solid black',
          margin: '1px',
        }}
        disabled={!parked} // Disable the button if the block is not parked
        onClick={handleClick}
      >
        {id}
      </Button>
    </div>
  );
};

export default CarBlock;
