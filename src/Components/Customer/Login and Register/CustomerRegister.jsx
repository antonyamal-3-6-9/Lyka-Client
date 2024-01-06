import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider } from "@mui/material/styles";
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

const RegisterForm = () => {

  const navigate = useNavigate();
  const [alertData, setAlertData] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertEnable, setAlertEnable] = useState(false);
  const BASE_URL = "http://127.0.0.1:8000/customer/";

  const [regData, setRegData] = useState({
    email : ""
  });
  const [isSend, setIsSend] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    setRegData({...regData, [e.target.name] : e.target.value})
  }

  const onEmailSubmit = async () => {
    console.log(regData.email)
    if (regData.length === 0) {
      setAlertData("Enter a valid e-mail address");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    if (emailRegex.test(regData)) {
      setAlertData("Invalid Email");
      setAlertEnable(true);
      setAlertSeverity("error");
      return;
    }

    try {
      const emailResponse = await axios.get(`${BASE_URL}auth/${regData.email}/`);
      if (emailResponse.status === 200) {
        setIsSend(true)
      }
    } catch (error) {
      setAlertData(error.response.data.message);
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
        {isSend ? (
          <Page>
            <div className="container-fluid">
              <h5>Check your mail</h5>
              <p>
                A verification link has been send to your email. Follow the link
                to continue signing up
              </p>
            </div>
          </Page>
        ) : (
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
                    Sign UP
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={regData.email}
                        onChange={handleChange}
                      />
                      <Button
                       variant="contained"
                       fullWidth
                       onClick={onEmailSubmit}
                      >
                        Continue
                      </Button>
                    <Grid container>
                      <Grid item>
                        <Link href="#" variant="body2" oncliCk={() => navigate("customer-login")}>
                          {"Already have an account! Sign In"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </Page>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
