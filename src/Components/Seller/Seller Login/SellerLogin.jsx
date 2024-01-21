import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";
import { useDispatch } from "react-redux";
import { initialAction } from "../../../redux/actions/authUserActions";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Lyka
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SellerLogin = () => {
  const dispatch = useDispatch();

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/seller/";

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    otp: "",
    type: "password",
  });

  const [isSend, setIsSend] = useState(false);

  const onTypeChange = (type) => {
    setLoginData({ ...loginData, type: type });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const inputCleaner = (e) => {
    setLoginData({ ...loginData, email: "", password: "", otp: "" });
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const otpCreate = async () => {
    try {
      setIsLoading(true)
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-login-create/${loginData.email}/`
      );
      if (otpCreateResponse.status === 200) {
        setIsSend(true);
        setIsLoading(false)
        setAlertData("OTP successfully send")
        setAlertEnable(true)
        setAlertSeverity("success")
      }
    } catch (error) {
      setAlertData("OTP sending failed");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
    }
  };

  const otpVerify = async () => {
    try {
      setIsLoading(true)
      const otpVerifyResponse = await axios.post(
        `${BASE_URL}otp-login-verify/`,
        {
          email: loginData.email,
          otp: loginData.otp,
        }
      );

      if (otpVerifyResponse.status === 200) {
        localStorage.setItem("token", otpVerifyResponse.data.token);
        setIsLoading(false)
        dispatch(initialAction())
        navigate("/seller/home");
      }
    } catch (error) {
      setIsLoading(false)
      setAlertData("OTP verification Failed");
      setAlertEnable(true);
      setAlertSeverity("error");
      setLoginData({ ...loginData, otp: "" });
    }
  };

  const passwordLogin = async () => {
    if (loginData.email.length <= 0) {
      setAlertData("Enter a valid e-mail id");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    if (!emailRegex.test(loginData.email)) {
      setAlertData("Enter a valid e-mail id");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    if (loginData.password.length <= 0) {
      setAlertData("Enter a valid password");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    try {
      setIsLoading(true)
      const passwordLoginResponse = await axios.post(
        `${BASE_URL}password-login/`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      if (passwordLoginResponse.status === 200) {
        localStorage.setItem("token", passwordLoginResponse.data.token);
        dispatch(initialAction())
        setIsLoading(false)
        navigate("/seller/home");
      }
    } catch (error) {
      setIsLoading(false)
      setAlertData("Login Failed");
      setAlertEnable(true);
      setAlertSeverity("error");
      setLoginData({ ...loginData, password: "" });
    }
  };

  const loggingIn = async () => {
    if (loginData.email === "") {
      setAlertData("Enter a valid e-mail id");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    if (!emailRegex.test(loginData.email)) {
      setAlertData("Enter a valid e-mail id");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    if (loginData.type === "otp") {
      if (loginData.otp.length < 6 && isSend) {
        setAlertData("Enter a Valid Otp");
        setAlertEnable(true);
        setAlertSeverity("warning");
      }

      if (isSend) {
        await otpVerify();
      } else {
        await otpCreate();
      }
    } else if (loginData.type === "password") {
      await passwordLogin();
    }
  };

  const resendOtp = async () => {
    try {
      setIsLoading(true)
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-login-create/${loginData.email}/`
      );
      if (otpCreateResponse.status === 200) {
        setIsSend(true);
        setIsLoading(false)
        setAlertData("OTP successfully send")
        setAlertEnable(true)
        setAlertSeverity("success")
      }
    } catch (error) {
      setAlertData("OTP sending failed");
      setAlertEnable(true);
      setAlertSeverity("error");
      setIsLoading(false)
    }
  };

  const defaultTheme = createTheme();

  return (
    <>
      <div className="container-fluid login-container" style={{marginTop: "20px"}}>
      <Page>
          <FloatingAlert
            enable={alertEnable}
            setEnable={setAlertEnable}
            severity={alertSeverity}
            message={alertData}
          />
          <Backdrop
            open={isLoading}
          >
            <CircularProgress/>
          </Backdrop>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  sign In
                </Typography>
                <Box noValidate sx={{ mt: 1 }}>
                  {!isSend && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={loginData.email}
                      onChange={handleChange}
                    />
                  )}
                  {loginData.type === "password" || isSend ? (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name={loginData.type === "otp" ? "otp" : "password"}
                      label={loginData.type === "otp" ? "OTP" : "Password"}
                      type="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={loginData.type === "otp" ? loginData.otp : loginData.password}
                    />
                  ) : null}
                  {isSend && (
                    <Button
                      type="button"
                      variant="text"
                      onClick={() => {
                        resendOtp();
                      }}
                      style={{color:"#16213E"}}
                    >
                      Resend OTP
                    </Button>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={loggingIn}
                    style={{backgroundColor:"#16213E"}}
                  >
                    {loginData.type === "otp" ? "Continue" : "Sign In"}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Link href="#" variant="body2" to="/seller-register">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        onClick={() => {
                          loginData.type === "password"
                            ? onTypeChange("otp")
                            : onTypeChange("password");
                        }}
                        variant="body2"
                      >
                        {`Login Using ${
                          loginData.type === "otp" ? "Password" : "OTP"
                        }`}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
          </Page>
      </div>
    </>
  );
};

export default SellerLogin;
