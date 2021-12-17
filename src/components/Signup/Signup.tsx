import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React, { ChangeEvent, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signupAPI } from "../../apis/authApis";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import  useNotification from "../../hooks/useNotification";
export interface ISignupFormData {
  username: string;
  password: string;
  repeatPassword: string;
}

const Signup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState<ISignupFormData>({
    username: "",
    password: "",
    repeatPassword: "",
  });

  let navigate = useNavigate();
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: ISignupFormData) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await signupAPI(formData);
      showNotification("success",res.data?.message)
      navigate("/login", { replace: true });

    } catch (err: any) {
      showNotification("error", err.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={formData.repeatPassword}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repeat password"
            type="password"
            id="repeatPassword"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
