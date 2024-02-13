import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import GroupIcon from "@mui/icons-material/Group";
import { useSelector } from "react-redux";
import {
  Logout,
  NotificationSignal,
} from "../../../redux/actions/authUserActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function AdminNavBar({ setOption }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userName = useSelector((state) => state.userAuth.name);
  const userRole = useSelector((state) => state.userAuth.role);

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const dispatch = useDispatch();

  const BASE_URL = "http://127.0.0.1:8000/lyka-admin/logout/";
  const token = localStorage.getItem("token");
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
      navigateLink("/");
    } catch (error) {
      console.log(error);
    }
    localStorage.clear("token");
    navigateLink("/");
    dispatch(Logout());
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigateLink = (option) => {
    navigate(option);
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
            dispatch(NotificationSignal());
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
      {isLoggedIn ? (
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#294B29" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{ paddingLeft: "100px" }}
          >
            <Link to={"/admin/home"} style={{ color: "white" }}>
              LYKA ADMIN
            </Link>
            <IconButton>
              <AdminPanelSettingsIcon style={{ color: "white" }} />
            </IconButton>
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
                <Link to={"/seller-login"} style={{ color: "white" }}>
                  Login as Seller
                </Link>
              </Typography>
            </Box>
            <Box
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
                <AccountCircleIcon />
              </IconButton>
              <Typography>
                <Link to={"/customer-login"} style={{ color: "white" }}>
                  Login as Customer
                </Link>
              </Typography>
            </Box>
            <Box
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
                <MonetizationOnIcon />
              </IconButton>
              <Typography>
                <Link to={"/admin/coupons&charges/"} style={{ color: "white" }}>
                  Charges & Coupons
                </Link>
              </Typography>
            </Box>
            <Box
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
                <InventoryIcon />
              </IconButton>
              <Typography>
                <Link to={"/admin/catalog"} style={{ color: "white" }}>
                  Catalog
                </Link>
              </Typography>
            </Box>
            {isLoggedIn && userRole === "ADMIN" ? (
              <Box
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
                  <Link to={"/"} style={{ color: "white" }}>
                    Logout
                  </Link>
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
