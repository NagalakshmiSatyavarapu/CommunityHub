import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      login(response.data.token);

      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        style={{
          width: "100%",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            CommunityHub
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Welcome Back 👋
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
          >
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            {error && (
              <Alert
                severity="error"
                sx={{ mt: 2 }}
              >
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 3,

                borderRadius: 3,

                py: 1.5,
              }}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

            <Typography
              align="center"
              mt={3}
            >
              Don't have an account?{" "}

              <Link to="/register">
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default Login;