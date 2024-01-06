import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { customerLogin } from "../../../redux/customerAuth/actions/authCustomerActions";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
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
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginForm = () => {
  const dispatch = useDispatch();

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/customer/";

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
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-login-create/${loginData.email}/`
      );
      if (otpCreateResponse.status === 200) {
        setIsSend(true);
      }
    } catch (error) {
      setAlertData("Server not responding");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const otpVerify = async () => {
    try {
      const otpVerifyResponse = await axios.post(
        `${BASE_URL}otp-login-verify/`,
        {
          email: loginData.email,
          otp: loginData.otp,
        }
      );
      if (otpVerifyResponse.status === 200) {
        localStorage.setItem(otpVerifyResponse.data.token);
        dispatch(customerLogin());
        navigate("/");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setLoginData({ ...loginData, otp: "" });
    }
  };

  const passwordLogin = async () => {
    if (loginData.email.length <= 0) {
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
      const passwordLoginResponse = await axios.post(
        `${BASE_URL}password-login/`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      if (passwordLoginResponse.status === 200) {
        localStorage.setItem(passwordLoginResponse.data.token);
        dispatch(customerLogin());
        navigate("/");
      }
    } catch (error) {
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
      setLoginData({ ...loginData, password: "" });
    }
  };

  const loggingIn = () => {
    if (loginData.email.length <= 0) {
      return;
    }

    if (!emailRegex.test(loginData.email)) {
      setAlertData("Enter a valid e-mail id");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    if (loginData.type === "otp") {
      if (isSend && loginData.otp.length < 6) {
        setAlertData("Enter a Valid Otp");
        setAlertEnable(true);
        setAlertSeverity("warning");
      }

      if (!isSend) {
        otpCreate();
      } else {
        otpVerify();
      }
    } else if (loginData.type === "normal") {
      passwordLogin();
    }
  };

  const resendOtp = async () => {
    try {
      const otpCreateResponse = await axios.get(
        `${BASE_URL}otp-login-create/${loginData.email}/`
      );
      if (otpCreateResponse.status === 200) {
        setIsSend(true);
      }
    } catch (error) {
      setAlertData("Server not responding");
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const handleAlertClose = () => {
    setAlertEnable(false)
  }

  const defaultTheme = createTheme();

  return (
    <>
      <div className="container-fluid login-container">
        {alertEnable && (
          <Alert
            severity={alertSeverity}
            onClose={handleAlertClose}
            className="custom-alert"
          >
            <AlertTitle>{alertSeverity}</AlertTitle>
            {alertData}
          </Alert>
        )}
        <Page>
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
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  {!isSend && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      Onchange={handleChange}
                    />
                  )}
                  {loginData.type === "password" || isSend ? (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name={loginData.type === "otp" ? "OTP" : "password"}
                      label={loginData.type === "otp" ? "OTP" : "Password"}
                      type="password"
                      id={loginData.type === "otp" ? "OTP" : "password"}
                      autoComplete="current-password"
                      Onchange={handleChange}
                    />
                  ) : null}
                  {isSend && (
                    <Button
                      type="button"
                      variant="text"
                      onClick={() => {
                        resendOtp();
                      }}
                    >
                      Resend OTP
                    </Button>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={loggingIn}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2" to="/customer-register">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                    <Grid>
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
                          loginData.type === "otp" ? "OTP" : "Password"
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
      )
    </>
  );
};

export default LoginForm;
