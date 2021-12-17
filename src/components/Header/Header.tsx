import { AccountCircle } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { MouseEvent } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";


const Header = () => {
  const { userData, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const {isShowNotification, notification} = useNotification();
  const navigate = useNavigate();
  const handleMenu = (e: MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  }
  return (
    <AppBar position="static">
      <Toolbar sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <Typography variant="h5" component="div"> Event List</Typography>
        {userData ? (
          <div style={{display:"flex", alignItems:"center"}}>
             <Typography variant="subtitle2" component="div">
        {`Welcome, ${userData.username}!`}
      </Typography>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/Signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
      {isShowNotification?<Alert color={notification?.type}>{notification?.content}</Alert>:<></>}
    </AppBar>
  );
};

export default Header;
