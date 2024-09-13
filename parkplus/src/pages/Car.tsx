import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { blocksState } from "../Atom/blocksState";
import myGif from "../assets/paymneet.gif";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface CarProps {
  id: number;
}

const Car: React.FC<CarProps> = () => {
  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const [parkState, setParkState] = useRecoilState(blocksState);
  const [fare, setFare] = useState(0);
  const [curr, setCurr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    // Calculate time difference and update fare
    const time1 = new Date("2000/01/01 " + parkState[id - 1].parked_at).getTime();

    const intervalId = setInterval(() => {
      const currentTime = performance.now();
      const timeElapsed: number = (currentTime - time1) / (1000 * 60 * 60);

      setCurr(new Date(currentTime).toLocaleTimeString());

      if (timeElapsed <= 2) {
        setFare(10);
      } else {
        const extraHours = Math.ceil(timeElapsed - 2);
        setFare(10 + extraHours * 10);
      }
    }, 100);

    // Cleanup the interval
    return () => clearInterval(intervalId);
  }, [id, parkState]);

  // Function to send payment request to the server
  const fetchPay = async () => {
    const body = {
      "car-registration": parkState[id - 1].Car_no,
      "charge": fare,
    };
    const res = await fetch('https://httpstat.us/200', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log(data);
  };

  // Function to handle payment completion
  const payDone = () => {
    setParkState((prevParkState) => {
      return prevParkState.map((parkingSpace) => {
        if (parkingSpace.id === id) {
          return {
            ...parkingSpace,
            parked: false,
            parked_at: null,
            fare: 0,
            Car_no: null,
          };
        } else {
          return parkingSpace;
        }
      });
    });
    setLoading(false);
    navigate("/parking");
  };

  // Function to handle payment initiation
  const handlePay = () => {
    setDisabled(false);
    fetchPay();
    setLoading(true);
    // Simulate delay for payment process, then execute payDone
    setTimeout(payDone, 10000);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {/* Go Back Button */}
      <Button
        variant="contained"
        onClick={() => {
          navigate("/parking");
        }}
        disabled={!isDisabled}
        style={{ marginBottom: "20px", alignSelf: "flex-start" }}
      >
        Go Back
      </Button>
      {/* Highlighted Border Container */}
      <Box
        style={{
          border: "4px solid #f0f0f0",
          borderRadius: "20px",
          padding: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center content horizontally
        }}
      >
        <div>
          {loading ? (
            <div>
              {/* Payment in progress message */}
              <Typography variant="h4">
                Payment In progress Please wait...
              </Typography>
              {/* Loading gif */}
              <img src={myGif} alt="my-gif" />
            </div>
          ) : (
            <>
              {/* Car Entry Information */}
              <Typography variant="h4">Car Entry</Typography>
              <div>
                <p>Car Registration Number: {parkState[id - 1].Car_no}</p>
                <p>Time parked at: {parkState[id - 1].parked_at}</p>
                <p>Current Time: {curr}</p>
                <p>Fare: {fare}$</p>
              </div>
              {/* Pay Button */}
              <Button
                variant="contained"
                onClick={handlePay}
                disabled={fare === 0}
                style={{ marginTop: "20px" }}
              >
                Pay
              </Button>
            </>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default Car;
