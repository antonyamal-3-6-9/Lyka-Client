import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useSelector } from "react-redux";
import {
  customerLogin,
  customerLogout,
} from "../../redux/customerAuth/actions/authCustomerActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ResponsiveAppBar({ setOption }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [socket, setSocket] = useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null)

  const isLoggedIn = useSelector(
    (state) => state.customerAuth.isCustomerLoggedIn
  );
  const dispatch = useDispatch();

  const BASE_URL = "http://127.0.0.1:8000/customer/";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInResponse = await axios.get(`${BASE_URL}is-logged-in/`, {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (loggedInResponse.status === 200) {
          setUsername(loggedInResponse.data.name);
          console.log(loggedInResponse)
          dispatch(customerLogin());
        }
      } catch (error) {
        console.log(error);
        dispatch(customerLogout());
      }
    };
    fetchData();
}, []);

  const handleLogout = async () => {
    try {
      const logoutResponse = await axios.post(
        `${BASE_URL}logout/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    localStorage.clear("token");
    dispatch(customerLogout());
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
            <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              navigateLink("/seller-login")
            }}

          >
            <AddBusinessIcon />
          </IconButton>
          <p>Login AS Seller</p>
        </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => {
            navigateLink("/cart");
          }}
        >
          <Badge badgeContent={4} color="error">
            <ShoppingBagIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <ShoppingCartCheckoutIcon />
          </Badge>
        </IconButton>
        <p>{isLoggedIn ? username : "Login"}</p>
      </MenuItem>
      {isLoggedIn ? (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              if (isLoggedIn) {
                navigateLink("/account");
              } else {
                navigateLink("customer-login");
              }
            }}
          >
            <ArrowOutwardIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : null}
    </Menu>
  );

  const navigateLink = (option) => {
    navigate(option);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#16213E" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{ paddingLeft: "100px" }}
            onClick={() => {
              navigateLink("/");
            }}
          >
            <a>LYKA</a>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              style={{ width: "400px" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-around",
                flexGrow: 0.2,
              },
            }}
            style={{ paddingRight: "100px" }}
          >
                      <Box
              onClick={() => {
                navigateLink("/seller-login");
              }}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <IconButton edge="end" size="large" color="inherit">
                <AddBusinessIcon />
              </IconButton>
              <Typography>
                <a>Start Selling</a>
              </Typography>
            </Box>
            <Box
              onClick={() => {
                navigateLink("/cart");
              }}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <IconButton edge="end" size="large" color="inherit">
                <ShoppingCartIcon />
              </IconButton>
              <Typography>
                <a>Cart</a>
              </Typography>
            </Box>
            <Box
              onClick={() => {
                if (isLoggedIn) {
                  navigateLink("/account");
                } else {
                  navigateLink("/customer-login");
                }
              }}
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              <IconButton size="large" edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
              <Typography>
                <a>{isLoggedIn ? "Account" : "Login"}</a>
              </Typography>
            </Box>
            {isLoggedIn ? (
              <Box
                onClick={() => {
                  handleLogout();
                }}
                sx={{
                  display: {
                    xs: "none",
                    md: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <IconButton size="large" edge="end" color="inherit">
                <ArrowOutwardIcon />
                </IconButton>
                <Typography>
                  <a>Logout</a>
                </Typography>
              </Box>
            ) : null}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
