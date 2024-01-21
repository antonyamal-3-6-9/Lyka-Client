import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useSelector } from "react-redux";
import { Logout, NotificationSignal } from "../../../../redux/actions/authUserActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";


export default function SellerHomeNavbar({ setOption }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const userName = useSelector((state) => state.userAuth.name);
  const userRole = useSelector((state) => state.userAuth.role)
  const businessName = useSelector((state) => state.userAuth.businessName)


  const isLoggedIn = useSelector(
    (state) => state.userAuth.isLoggedIn
  );
  const dispatch = useDispatch();

  const BASE_URL = "http://127.0.0.1:8000/seller/";
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
      localStorage.clear("token");
      dispatch(Logout());
      navigate("/")
    } catch (error) {
      setLoading(false)
      localStorage.clear("token");
      dispatch(Logout());
      navigate("/")
      console.log(error);
    }
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
            navigateLink("/seller-login");
          }}
        >
          <AddBusinessIcon />
        </IconButton>
        <p>Login AS Seller</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => {
            dispatch(NotificationSignal())
          }}
        >
          <NotificationsActiveIcon />
        </IconButton>
        <p>Notifications</p>
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
          onClick={() => {
            if (isLoggedIn) {
              navigateLink("/account");
            } else {
              navigateLink("customer-login");
            }
          }}
        >
          <Badge badgeContent={17} color="error">
            <ShoppingCartCheckoutIcon />
          </Badge>
        </IconButton>
        <p>{isLoggedIn ? userName : "Login"}</p>
      </MenuItem>
      {isLoggedIn ?  (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              handleLogout();
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
    <Backdrop open={loading}>
      <CircularProgress/>
    </Backdrop>
      <AppBar position="fixed" style={{ backgroundColor: "#3E3232" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{ paddingLeft: "100px" }}
            onClick={() => {
              navigateLink("/seller/home");
            }}
          >
            <a>{businessName.toUpperCase()}</a>
          </Typography>
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
                navigateLink("/seller/products");
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
                <CategoryIcon />
              </IconButton>
              <Typography>
                <a>SKU</a>
              </Typography>
            </Box>
            <Box
              onClick={() => {
                navigateLink("/seller/store");
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
                <InventoryIcon />
              </IconButton>
              <Typography>
                <a>Inventory</a>
              </Typography>
            </Box>
            <Box
              onClick={() => {
                navigateLink("/seller/orders");
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
                <ShoppingBagIcon />
              </IconButton>
              <Typography>
                <a>Order</a>
              </Typography>
            </Box>
            <Box
              onClick={() => {
                navigateLink("/seller/verify");
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
                <CheckCircleIcon />
              </IconButton>
              <Typography>
                <a>Verify</a>
              </Typography>
            </Box>
            <Box
              onClick={() => {
                if (isLoggedIn && userRole === "seller") {
                  navigateLink("/seller/profile");
                } else {
                  navigateLink("/seller-login");
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
                <a>{isLoggedIn && userRole === "seller" ? userName : "Login"}</a>
              </Typography>
            </Box>
            {isLoggedIn && userRole === "seller" ? (
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
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
              onClick={() => {
                dispatch(NotificationSignal())
              }}
            >
              <IconButton edge="end" size="large" color="inherit">
              <Badge>
                <NotificationsActiveIcon />
                </Badge>
              </IconButton>
              <Typography>
                <a></a>
              </Typography>
            </Box>
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
