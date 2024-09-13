import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { numberofBlocks } from '../Atom/numberofBlocks';
import 'react-toastify/dist/ReactToastify.css';

// Import Material-UI components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const HomePage: React.FC = () => {
  // Recoil state for managing the number of parking spaces
  const [space, setSpace] = useRecoilState<number>(numberofBlocks);
  // React Router hook for navigation
  const navigate = useNavigate();

  // Event handler for handling changes in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the numeric value from the input and update the Recoil state
    const value = Number(e.target.value);
    setSpace(value >= 0 ? value : 0);
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the entered value is greater than zero
    if (space > 0) {
      // If valid, log the number of parking spaces and navigate to the '/parking' page
      console.log('Number of parking spaces: home page', space);
      navigate('/parking');
    } else {
      // If not valid, display an error toast
      toast.error('Please enter a valid number greater than zero.');
    }
  };

  return (
    // Material-UI Container for layout styling
    <Container maxWidth="sm">
      {/* Toast notification component from react-hot-toast */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Material-UI Typography for heading */}
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to ParkPlus
      </Typography>
      {/* Form for entering the number of parking spaces */}
      <form onSubmit={handleSubmit}>
        {/* Material-UI TextField for input */}
        <TextField
          type="number"
          label="Enter number of parking spaces"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          required
        />
        {/* Container for styling the Button */}
        <div >
          {/* Material-UI Button for form submission */}
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '16px', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Start Parking
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default HomePage;
