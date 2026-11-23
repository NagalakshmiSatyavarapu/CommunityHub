import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import {
  HomeRounded,
  PersonRounded,
  LogoutRounded,
} from "@mui/icons-material";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navButtonStyle = (active) => ({
    color: active
      ? "#ffffff"
      : "rgba(255,255,255,0.75)",

    borderRadius: 2.5,

    px: 2,
    py: 1,

    transition: "all 0.25s ease",

    backgroundColor: active
      ? "rgba(255,255,255,0.16)"
      : "transparent",

    "&:hover": {
      color: "#ffffff",
      backgroundColor:
        "rgba(255,255,255,0.12)",
      transform: "translateY(-2px)",
    },
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "rgba(18, 18, 35, 0.72)",

        backdropFilter: "blur(18px)",

        WebkitBackdropFilter:
          "blur(18px)",

        borderBottom:
          "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          minHeight:
            "72px !important",

          px: {
            xs: 2,
            md: 5,
          },

          display: "flex",

          justifyContent:
            "space-between",
        }}
      >
        {/* Logo */}

        <Typography
          variant="h5"
          fontWeight={800}
          onClick={() =>
            navigate("/home")
          }
          sx={{
            cursor: "pointer",

            letterSpacing: "-0.5px",

            background:
              "linear-gradient(90deg, #ffffff, #c4b5fd)",

            WebkitBackgroundClip:
              "text",

            WebkitTextFillColor:
              "transparent",

            transition:
              "transform 0.25s ease",

            "&:hover": {
              transform:
                "scale(1.04)",
            },
          }}
        >
          CommunityHub
        </Typography>

        {/* Navigation */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            startIcon={
              <HomeRounded />
            }
            onClick={() =>
              navigate("/home")
            }
            sx={navButtonStyle(
              location.pathname ===
                "/home"
            )}
          >
            Home
          </Button>

          <Button
            startIcon={
              <PersonRounded />
            }
            onClick={() =>
              navigate("/profile")
            }
            sx={navButtonStyle(
              location.pathname ===
                "/profile"
            )}
          >
            Profile
          </Button>

          <Button
            startIcon={
              <LogoutRounded />
            }
            onClick={handleLogout}
            sx={{
              ml: 1,

              px: 2,

              borderRadius: 2.5,

              color: "#fff",

              border:
                "1px solid rgba(255,255,255,0.25)",

              transition:
                "all 0.25s ease",

              "&:hover": {
                backgroundColor:
                  "rgba(255,80,80,0.18)",

                borderColor:
                  "rgba(255,120,120,0.5)",

                transform:
                  "translateY(-2px)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;