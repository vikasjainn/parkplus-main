import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { blocksState } from "../Atom/blocksState";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Carinput: React.FC = () => {
  // State variables for car registration and parking time
  const [carRegistration, setCarRegistration] = useState("");
  const [parkingTime, setParkingTime] = useState("");

  // React Router hooks for location and navigation
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state; // Extracting 'id' from the location state

  console.log("hello inside the Car input");

  // Recoil state hook to update the global state
  const setParkState = useSetRecoilState(blocksState);

  // Function to set the current time to the 'parkingTime' state
  const handleSetCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setParkingTime(currentTime);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Update Recoil state with the new parking information
    setParkState((prevParkState) => {
      return prevParkState.map((parkingSpace) => {
        if (parkingSpace.id === id) {
          return {
            ...parkingSpace,
            parked: true,
            parked_at: parkingTime,
            Car_no: carRegistration,
          };
        } else {
          return parkingSpace;
        }
      });
    });

    // Navigate to the '/parking' route after submission
    navigate("/parking");
  };

  return (
    <>
      {/* Go Back Button */}
      <Button variant="contained" onClick={() => navigate("/parking")}>
        Go Back
      </Button>
      {/* Form Container */}
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          margin: "auto",
        }}
      >
        {/* Form Title */}
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Car Entry
        </Typography>
        {/* Form Box */}
        <Box
          style={{
            maxWidth: "800px",
            padding: "20px",
            width: "100%",
            border: "4px solid black",
            borderRadius: "20px",
            background: "#f0f0f0",
          }}
        >
          {/* Car Registration Input */}
          <TextField
            type="text"
            label="Car Registration Number"
            variant="outlined"
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith(" ")) {
                setCarRegistration(value.trimStart());
              } else {
                setCarRegistration(value);
              }
            }}
            sx={{ margin: "20px", width: "95%" }}
          />
          {/* Parking Time Input */}
          <Box style={{ display: "flex", alignItems: "center", gap: "1" }}>
            <TextField
              type="text"
              label="Parking Time"
              variant="outlined"
              value={parkingTime}
              disabled
              sx={{ margin: "20px" }}
            />
            {/* Button to set current time */}
            <Button variant="contained" onClick={handleSetCurrentTime}>
              Set Current Time
            </Button>
          </Box>
          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={carRegistration.length === 0 || parkingTime.length === 0}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Carinput;
