import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import {
  ArrowBackRounded,
  SendRounded,
  DeleteOutlineRounded,
MoreHorizRounded,

} from "@mui/icons-material";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

 const handleCreatePost = async (e) => {
  e.preventDefault();

  setError("");

  if (
    !title.trim() ||
    !content.trim()
  ) {
    setError(
      "Title and content are required."
    );

    return;
  }

  setLoading(true);

  try {
    // Get the currently logged-in user
    const userResponse =
      await api.get("/users/me");

    const userId =
      userResponse.data.id;

    // Create post for that user
    const response =
      await api.post(
        `/posts/user/${userId}`,
        {
          title: title.trim(),
          content: content.trim(),
        }
      );

    console.log(
      "Created post:",
      response.data
    );

    navigate("/home");
  } catch (err) {
    console.error(
      "Create post error:",
      err
    );

    console.error(
      "Server response:",
      err.response?.data
    );

    setError(
      err.response?.data?.message ||
        err.response?.data ||
        "Unable to create post."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundImage: `
          linear-gradient(
            rgba(20, 15, 45, 0.78),
            rgba(45, 20, 80, 0.82)
          ),
          url("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80")
        `,

        backgroundSize: "cover",

        backgroundPosition:
          "center",

        backgroundAttachment:
          "fixed",
      }}
    >
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          py: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },

            borderRadius: 5,

            background:
              "rgba(255,255,255,0.94)",

            backdropFilter:
              "blur(18px)",

            border:
              "1px solid rgba(255,255,255,0.5)",
          }}
        >
          {/* Back */}

          <Button
            startIcon={
              <ArrowBackRounded />
            }
            onClick={() =>
              navigate("/home")
            }
            sx={{
              mb: 3,
              textTransform: "none",
            }}
          >
            Back to Home
          </Button>

          {/* Heading */}

          <Typography
            variant="h4"
            fontWeight={800}
          >
            Create a Post
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 4,
            }}
          >
            Share something with your
            community.
          </Typography>

          {/* Form */}

          <Box
            component="form"
            onSubmit={
              handleCreatePost
            }
          >
            <TextField
              fullWidth
              label="Post Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              multiline
              minRows={6}
              label="What's on your mind?"
              value={content}
              onChange={(e) =>
                setContent(
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

            <Box
              sx={{
                display: "flex",

                justifyContent:
                  "flex-end",

                mt: 3,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={
                  <SendRounded />
                }
                disabled={loading}
                sx={{
                  px: 4,

                  py: 1.4,

                  borderRadius: 3,

                  textTransform:
                    "none",

                  fontWeight: 700,
                }}
              >
                {loading
                  ? "Publishing..."
                  : "Publish Post"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreatePost;