import { React, useEffect, useState } from "react";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, TextField, Box } from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";
import { Link } from "react-router-dom";
import { initialAction } from "../../../redux/actions/authUserActions";
import { useDispatch } from "react-redux";
import "./login.css";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const AddPassword = ({ password, setPassword, submit }) => {
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Set Password
        </Typography>
        <TextField
          label="Enter Password"
          type="password"
          fullWidth
          margin="normal"
          name="pass1"
          value={password.pass1}
          onChange={handleChange}
        />
        <TextField
          label="Repeat Password"
          type="password"
          fullWidth
          margin="normal"
          name="pass2"
          value={password.pass2}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={submit}  style={{backgroundColor:"#16213E"}}>Submit</Button>
      </Box>
    </>
  );
};

const Failed = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h6 className="h6 text-dark">The provided link has been expired</h6>
        <Link variant="contained" to="/customer-register">
          Register Again
        </Link>
      </div>
    </>
  );
};

const CustomerVerify = () => {
  const dispatch = useDispatch()
  const { email, token } = useParams();
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    pass1: "",
    pass2: "",
  });

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/customer/";

  const verification = async () => {
    setIsLoading(true);
    try {
      const verifyResponse = await axios.post(`${BASE_URL}auth/verify-link/`, {
        email: email,
        token: token,
      });
      if (verifyResponse.status === 200) {
        setIsVerified(true);
        setIsLoading(false);
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
      setIsVerified(false);
    }
  };

  const passwordSubmit = async () => {
    if (passwordData.pass1.length <= 0 || passwordData.pass2.length <= 0) {
      return;
    }
    if (passwordData.pass1 !== passwordData.pass2) {
      return;
    }

    try {
      setIsLoading(true);
      const passwordResponse = await axios.post(`${BASE_URL}create/`, {
        email: email,
        password: passwordData.pass1,
        token: token,
      });
      if (passwordResponse.status === 200) {
        localStorage.setItem("token", passwordResponse.data.token);
        dispatch(initialAction())
        navigate("/");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verification();
  }, []);

  return (
    <>
      <Page>
        <FloatingAlert
          message={alertData}
          enable={alertEnable}
          setEnable={setAlertEnable}
          severity={alertSeverity}
        />
        <Backdrop open={isLoading}>
          <CircularProgress />
        </Backdrop>

        <div className="container-fluid login-container" style={{marginTop: "84px"}}>
          <h5>Lyka Verification</h5>
          {isVerified ? (
            <AddPassword
              password={passwordData}
              setPassword={setPasswordData}
              submit={passwordSubmit}
            />
          ) : (
            <Failed />
          )}
        </div>
      </Page>
    </>
  );
};

export default CustomerVerify;
