import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { initialAction } from "../../../redux/actions/authUserActions";
import FloatingAlert from "../../FloatingAlert/FloatingAlert";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Page = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  height: "100%",
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

const AdminLogin = () => {
  const dispatch = useDispatch();

  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000/lyka-admin/";

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const inputCleaner = (e) => {
    setLoginData({ ...loginData, password: ""});
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async () => {
    if (!emailRegex.test(loginData.email) || loginData.email.length === 0) {
      setAlertData("Enter a valid email");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    if (loginData.password.length === 0) {
      inputCleaner()
      setAlertData("Password is required");
      setAlertEnable(true);
      setAlertSeverity("warning");
      return;
    }

    try {
      setIsLoading(true);
      const loginResponse = await axios.post(`${BASE_URL}login/`, {
        email: loginData.email,
        password: loginData.password,
      });
      if (loginResponse.status === 200) {
        localStorage.setItem("token", loginResponse.data.token);
        navigate("/admin/home");
        dispatch(initialAction())
    }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAlertData(error.response.data.message);
      setAlertEnable(true);
      setAlertSeverity("error");
    }
  };

  const defaultTheme = createTheme();

  return (
    <>
      <div
        className="container-fluid login-container"
        style={{ marginTop: "20px" }}
      >
        <Page>
          <FloatingAlert
            enable={alertEnable}
            setEnable={setAlertEnable}
            severity={alertSeverity}
            message={alertData}
          />
          <Backdrop open={isLoading}>
            <CircularProgress />
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
                <Avatar sx={{ m: 1, bgcolor: "#294B29" }}>
                  <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className="text-dark">
                  sign In as Admin
                </Typography>
                <Box noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus="email"
                    value={loginData.email}
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="password"
                    autoFocus="password"
                    onChange={handleChange}
                    value={loginData.password}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                    style={{ backgroundColor: "#294B29" }}
                  >
                    Sign In
                  </Button>
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

export default AdminLogin;
