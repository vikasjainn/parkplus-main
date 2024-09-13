import React from "react";
import CarBlock from "./CarBlock";
import { useRecoilValue } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

// Import Material-UI components
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Parking: React.FC = () => {
  // Get the current state of parking blocks using Recoil
  const parkState = useRecoilValue(blocksState);

  // Calculate the number of rows needed based on the number of blocks per row
  const numRows = Math.ceil(parkState.length / 10);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Number of blocks to display in each row
  const blocksPerRow = 18;

  // Event handler for adding a car to a random available parking spot
  const handleAdd = () => {
    // Filter out parking spots that are already occupied
    const availableParking = parkState.filter((obj) => !obj.parked);

    if (availableParking.length === 0) {
      toast.error("No available parking spots");
    } else {
      // Select a random available parking spot
      const randomIndex = Math.floor(Math.random() * availableParking.length);
      const selectedParkingSpot = availableParking[randomIndex];

      console.log("Selected Parking Spot:", selectedParkingSpot.id);
      
      // Navigate to the registration page with the selected parking spot's id as state
      navigate("/parking/Register", { state: selectedParkingSpot.id });
    }
  };

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Add Car button positioned at the top left */}
      <Button
        onClick={handleAdd}
        type="submit"
        variant="contained"
        color="primary"
        style={{
          marginTop: "16px",
          marginLeft: "16px",
          position: "absolute",
          top: "16px",
          left: "16px",
        }}
      >
        Add Car
      </Button>

      {/* Container for the grid of parking blocks */}
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Grid for displaying parking blocks */}
        <Grid
          container
          style={{ display: "flex", alignItems: "center", width: "50%" }}
        >
          <Grid
            item
            xs={20}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {/* Mapping through rows and blocks to display CarBlock components */}
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <Grid
                item
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "1rem",
                }}
              >
                {parkState
                  .slice(rowIndex * blocksPerRow, (rowIndex + 1) * blocksPerRow)
                  .map((parkSpace) => (
                    <CarBlock key={parkSpace.id} id={parkSpace.id} />
                  ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>

      {/* Go back button positioned at the bottom left */}
      <Button
        onClick={() => navigate('/')}
        type="submit"
        variant="contained"
        color="primary"
        style={{ position: "absolute", bottom: "16px", left: "16px" }}
      >
        Go back to home page
      </Button>
    </>
  );
};

export default Parking;
