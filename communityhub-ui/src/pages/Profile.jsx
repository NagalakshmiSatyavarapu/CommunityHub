import { useEffect, useRef, useState } from "react";

import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";

import {
  ArticleRounded,
  CameraAltRounded,
  PeopleRounded,
  PersonAddAltRounded,
  DeleteOutlineRounded,
  EditRounded,
  CloseRounded,
  SaveRounded,
} from "@mui/icons-material";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function Profile() {
  // ================= USER =================

  const [user, setUser] = useState(null);

  // ================= FOLLOW DATA =================

  const [followersCount, setFollowersCount] =
    useState(0);

  const [followingCount, setFollowingCount] =
    useState(0);

  // ================= POSTS =================

  const [posts, setPosts] = useState([]);

  // ================= PAGE STATE =================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ================= PROFILE IMAGE =================

  const [profileImage, setProfileImage] =
    useState(
      localStorage.getItem("profileImage") || ""
    );

  const fileInputRef = useRef(null);

  // ================= EDIT POST =================

  const [editingPostId, setEditingPostId] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editContent, setEditContent] =
    useState("");

  const [savingEdit, setSavingEdit] =
    useState(false);

  // =====================================================
  // FETCH PROFILE
  // =====================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // ================= USER =================

        const userResponse =
          await api.get("/users/me");

        const currentUser =
          userResponse.data;

        setUser(currentUser);

        // ================= FOLLOW DATA =================

        const [
          followersResponse,
          followingResponse,
        ] = await Promise.all([
          api.get(
            `/follows/${currentUser.id}/followers/count`
          ),

          api.get(
            `/follows/${currentUser.id}/following/count`
          ),
        ]);

        setFollowersCount(
          followersResponse.data
        );

        setFollowingCount(
          followingResponse.data
        );

        // ================= POSTS =================

        const postsResponse =
          await api.get("/posts");

        const userPosts =
          postsResponse.data.filter(
            (post) =>
              post.author?.id ===
              currentUser.id
          );

        setPosts(userPosts);
      } catch (err) {
        console.error(
          "Profile error:",
          err
        );

        setError(
          "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const handleProfileImage = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const image =
        reader.result;

      setProfileImage(image);

      localStorage.setItem(
        "profileImage",
        image
      );
    };

    reader.readAsDataURL(file);
  };

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = () => {
    if (!user) return "U";

    const first =
      user.firstName?.charAt(0) || "";

    const last =
      user.lastName?.charAt(0) || "";

    return (
      first + last
    ).toUpperCase();
  };

  // =====================================================
  // START EDIT
  // =====================================================

  const handleStartEdit = (post) => {
    setEditingPostId(post.id);

    setEditTitle(
      post.title || ""
    );

    setEditContent(
      post.content || ""
    );

    setError("");

    // Smoothly bring the selected
    // post into view
    setTimeout(() => {
      document
        .getElementById(
          `post-${post.id}`
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 50);
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit = () => {
    setEditingPostId(null);

    setEditTitle("");

    setEditContent("");

    setError("");
  };

  // =====================================================
  // SAVE EDIT
  // =====================================================

  const handleSaveEdit = async (
    postId
  ) => {
    if (
      !editTitle.trim() ||
      !editContent.trim()
    ) {
      setError(
        "Title and content are required."
      );

      return;
    }

    try {
      setSavingEdit(true);
      setError("");

      const response =
        await api.put(
          `/posts/${postId}`,
          {
            title: editTitle.trim(),
            content: editContent.trim(),
          }
        );

      const updatedPost =
        response.data;

      // Update the post immediately
      // without reloading the page
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                title:
                  updatedPost.title,
                content:
                  updatedPost.content,
              }
            : post
        )
      );

      // Close edit mode
      setEditingPostId(null);

      setEditTitle("");

      setEditContent("");
    } catch (err) {
      console.error(
        "Update post error:",
        err
      );

      console.error(
        "Server response:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to update the post."
      );
    } finally {
      setSavingEdit(false);
    }
  };

  // =====================================================
  // DELETE POST
  // =====================================================

  const handleDeletePost = async (
    postId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this post?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/posts/${postId}`
      );

      // Remove post immediately
      setPosts((prevPosts) =>
        prevPosts.filter(
          (post) =>
            post.id !== postId
        )
      );

      // If this post was being edited,
      // close edit mode
      if (editingPostId === postId) {
        setEditingPostId(null);
        setEditTitle("");
        setEditContent("");
      }
    } catch (err) {
      console.error(
        "Delete post error:",
        err
      );

      console.error(
        "Server response:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to delete the post."
      );
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef2ff 45%, #f8fafc 100%)",

        scrollBehavior: "smooth",

        pb: 8,
      }}
    >
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >
        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <Box
            sx={{
              minHeight: "60vh",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && !loading && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
          >
            {error}
          </Alert>
        )}

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        {user &&
          !loading &&
          !error && (
            <>
              {/* ================================================= */}
              {/* PROFILE HEADER */}
              {/* ================================================= */}

              <Paper
                elevation={0}
                sx={{
                  overflow: "hidden",

                  borderRadius: {
                    xs: 3,
                    md: 5,
                  },

                  background:
                    "rgba(255,255,255,0.94)",

                  border:
                    "1px solid rgba(226,232,240,0.9)",

                  boxShadow:
                    "0 20px 60px rgba(15,23,42,0.08)",

                  backdropFilter:
                    "blur(20px)",
                }}
              >
                {/* COVER */}

                <Box
                  sx={{
                    height: {
                      xs: 150,
                      md: 210,
                    },

                    position:
                      "relative",

                    background:
                      "linear-gradient(135deg, #312e81 0%, #6366f1 45%, #8b5cf6 100%)",

                    overflow: "hidden",

                    "&::before": {
                      content: '""',
                      position:
                        "absolute",
                      width: 300,
                      height: 300,
                      borderRadius:
                        "50%",
                      background:
                        "rgba(255,255,255,0.10)",
                      top: -150,
                      right: -80,
                    },

                    "&::after": {
                      content: '""',
                      position:
                        "absolute",
                      width: 220,
                      height: 220,
                      borderRadius:
                        "50%",
                      background:
                        "rgba(255,255,255,0.08)",
                      bottom: -130,
                      left: -50,
                    },
                  }}
                />

                {/* PROFILE CONTENT */}

                <Box
                  sx={{
                    px: {
                      xs: 2.5,
                      md: 5,
                    },

                    pb: 4,
                  }}
                >
                  {/* PROFILE IMAGE */}

                  <Box
                    sx={{
                      position:
                        "relative",

                      width: {
                        xs: 100,
                        md: 120,
                      },

                      mt: {
                        xs: -6,
                        md: -7,
                      },
                    }}
                  >
                    <Avatar
                      src={
                        profileImage
                      }
                      sx={{
                        width: {
                          xs: 100,
                          md: 120,
                        },

                        height: {
                          xs: 100,
                          md: 120,
                        },

                        border:
                          "6px solid white",

                        background:
                          "linear-gradient(135deg,#7c3aed,#2563eb)",

                        fontSize: {
                          xs: 32,
                          md: 40,
                        },

                        fontWeight: 900,

                        boxShadow:
                          "0 12px 35px rgba(15,23,42,0.18)",
                      }}
                    >
                      {!profileImage &&
                        getInitials()}
                    </Avatar>

                    {/* CAMERA */}

                    <IconButton
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      sx={{
                        position:
                          "absolute",

                        right: -4,

                        bottom: 4,

                        width: 36,

                        height: 36,

                        background:
                          "#ffffff",

                        border:
                          "2px solid #e5e7eb",

                        boxShadow:
                          "0 5px 15px rgba(0,0,0,0.15)",

                        "&:hover": {
                          background:
                            "#f3f4f6",
                        },
                      }}
                    >
                      <CameraAltRounded
                        sx={{
                          fontSize: 18,
                        }}
                      />
                    </IconButton>

                    <input
                      ref={
                        fileInputRef
                      }
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={
                        handleProfileImage
                      }
                    />
                  </Box>

                  {/* USER INFO */}

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 28,
                          md: 34,
                        },

                        fontWeight: 900,

                        letterSpacing:
                          "-0.7px",

                        color:
                          "#111827",
                      }}
                    >
                      {user.firstName}{" "}
                      {user.lastName}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.3,
                        color:
                          "#64748b",
                        fontSize: 16,
                      }}
                    >
                      @{user.username}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.8,
                        color:
                          "#94a3b8",
                        fontSize: 14,
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>

                  {/* STATS */}

                  <Stack
                    direction="row"
                    spacing={{
                      xs: 3,
                      sm: 6,
                    }}
                    sx={{
                      mt: 4,
                    }}
                  >
                    {/* POSTS */}

                    <Box>
                      <Stack
                        direction="row"
                        spacing={0.7}
                        alignItems="center"
                      >
                        <ArticleRounded
                          sx={{
                            fontSize: 18,
                            color:
                              "#6366f1",
                          }}
                        />

                        <Typography
                          fontWeight={
                            900
                          }
                          fontSize={21}
                        >
                          {posts.length}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.3,
                        }}
                      >
                        Posts
                      </Typography>
                    </Box>

                    {/* FOLLOWERS */}

                    <Box>
                      <Stack
                        direction="row"
                        spacing={0.7}
                        alignItems="center"
                      >
                        <PeopleRounded
                          sx={{
                            fontSize: 18,
                            color:
                              "#8b5cf6",
                          }}
                        />

                        <Typography
                          fontWeight={
                            900
                          }
                          fontSize={21}
                        >
                          {
                            followersCount
                          }
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.3,
                        }}
                      >
                        Followers
                      </Typography>
                    </Box>

                    {/* FOLLOWING */}

                    <Box>
                      <Stack
                        direction="row"
                        spacing={0.7}
                        alignItems="center"
                      >
                        <PersonAddAltRounded
                          sx={{
                            fontSize: 18,
                            color:
                              "#2563eb",
                          }}
                        />

                        <Typography
                          fontWeight={
                            900
                          }
                          fontSize={21}
                        >
                          {
                            followingCount
                          }
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.3,
                        }}
                      >
                        Following
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Paper>

              {/* ================================================= */}
              {/* MY POSTS */}
              {/* ================================================= */}

              <Box
                sx={{
                  mt: 5,
                }}
              >
                {/* SECTION TITLE */}

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      background:
                        "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    }}
                  >
                    <ArticleRounded
                      sx={{
                        color:
                          "white",
                        fontSize: 21,
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 23,
                        fontWeight: 900,
                        color:
                          "#111827",
                      }}
                    >
                      My Posts
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Your latest
                      contributions
                    </Typography>
                  </Box>
                </Stack>

                {/* ================================================= */}
                {/* NO POSTS */}
                {/* ================================================= */}

                {posts.length ===
                0 ? (
                  <Paper
                    elevation={0}
                    sx={{
                      p: {
                        xs: 4,
                        md: 6,
                      },

                      borderRadius: 4,

                      textAlign:
                        "center",

                      background:
                        "rgba(255,255,255,0.9)",

                      border:
                        "1px solid #e2e8f0",

                      boxShadow:
                        "0 10px 35px rgba(15,23,42,0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius:
                          "50%",
                        mx: "auto",
                        mb: 2,
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        background:
                          "#eef2ff",
                      }}
                    >
                      <ArticleRounded
                        sx={{
                          fontSize: 34,
                          color:
                            "#6366f1",
                        }}
                      />
                    </Box>

                    <Typography
                      fontWeight={800}
                      fontSize={18}
                    >
                      No posts yet
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.7,
                      }}
                    >
                      Share something
                      with the
                      CommunityHub!
                    </Typography>
                  </Paper>
                ) : (
                  /* ================================================= */
                  /* POSTS */
                  /* ================================================= */

                  <Stack spacing={2.5}>
                    {posts.map(
                      (post) => {
                        const isEditing =
                          editingPostId ===
                          post.id;

                        return (
                          <Paper
                            id={`post-${post.id}`}
                            key={post.id}
                            elevation={0}
                            sx={{
                              p: {
                                xs: 2.5,
                                md: 3,
                              },

                              borderRadius: 4,

                              background:
                                "rgba(255,255,255,0.94)",

                              border:
                                isEditing
                                  ? "1px solid #818cf8"
                                  : "1px solid #e2e8f0",

                              boxShadow:
                                isEditing
                                  ? "0 12px 35px rgba(99,102,241,0.12)"
                                  : "none",

                              transition:
                                "all 0.25s ease",

                              "&:hover":
                                {
                                  transform:
                                    isEditing
                                      ? "none"
                                      : "translateY(-4px)",

                                  boxShadow:
                                    isEditing
                                      ? "0 12px 35px rgba(99,102,241,0.12)"
                                      : "0 16px 40px rgba(15,23,42,0.09)",

                                  borderColor:
                                    "#c7d2fe",
                                },
                            }}
                          >
                            {/* ================= AUTHOR ROW ================= */}

                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Avatar
                                src={
                                  profileImage
                                }
                                sx={{
                                  width: 42,
                                  height: 42,
                                  fontSize: 15,
                                  fontWeight:
                                    800,
                                  background:
                                    "linear-gradient(135deg,#7c3aed,#2563eb)",
                                }}
                              >
                                {!profileImage &&
                                  getInitials()}
                              </Avatar>

                              <Box
                                sx={{
                                  flex: 1,
                                }}
                              >
                                <Typography
                                  fontWeight={
                                    800
                                  }
                                  fontSize={
                                    14
                                  }
                                >
                                  {
                                    user.firstName
                                  }{" "}
                                  {
                                    user.lastName
                                  }
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  @
                                  {
                                    user.username
                                  }
                                </Typography>
                              </Box>

                              {/* EDIT */}

                              {!isEditing && (
                                <IconButton
                                  onClick={() =>
                                    handleStartEdit(
                                      post
                                    )
                                  }
                                  aria-label="Edit post"
                                  sx={{
                                    color:
                                      "#94a3b8",

                                    "&:hover":
                                      {
                                        color:
                                          "#6366f1",
                                        background:
                                          "rgba(99,102,241,0.08)",
                                      },
                                  }}
                                >
                                  <EditRounded />
                                </IconButton>
                              )}

                              {/* DELETE */}

                              {!isEditing && (
                                <IconButton
                                  onClick={() =>
                                    handleDeletePost(
                                      post.id
                                    )
                                  }
                                  aria-label="Delete post"
                                  sx={{
                                    color:
                                      "#94a3b8",

                                    "&:hover":
                                      {
                                        color:
                                          "#ef4444",
                                        background:
                                          "rgba(239,68,68,0.08)",
                                      },
                                  }}
                                >
                                  <DeleteOutlineRounded />
                                </IconButton>
                              )}
                            </Stack>

                            <Divider
                              sx={{
                                my: 2,
                              }}
                            />

                            {/* ================================================= */}
                            {/* EDIT MODE */}
                            {/* ================================================= */}

                            {isEditing ? (
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: 18,
                                    fontWeight:
                                      800,
                                    mb: 2,
                                    color:
                                      "#111827",
                                  }}
                                >
                                  Edit your
                                  post
                                </Typography>

                                <TextField
                                  fullWidth
                                  label="Post Title"
                                  value={
                                    editTitle
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    setEditTitle(
                                      e.target
                                        .value
                                    )
                                  }
                                  sx={{
                                    mb: 2,
                                  }}
                                />

                                <TextField
                                  fullWidth
                                  multiline
                                  minRows={5}
                                  label="Post Content"
                                  value={
                                    editContent
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    setEditContent(
                                      e.target
                                        .value
                                    )
                                  }
                                />

                                <Stack
                                  direction="row"
                                  justifyContent="flex-end"
                                  spacing={1.5}
                                  sx={{
                                    mt: 2,
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    startIcon={
                                      <CloseRounded />
                                    }
                                    onClick={
                                      handleCancelEdit
                                    }
                                    disabled={
                                      savingEdit
                                    }
                                    sx={{
                                      borderRadius:
                                        2.5,
                                      textTransform:
                                        "none",
                                      fontWeight:
                                        700,
                                    }}
                                  >
                                    Cancel
                                  </Button>

                                  <Button
                                    variant="contained"
                                    startIcon={
                                      <SaveRounded />
                                    }
                                    onClick={() =>
                                      handleSaveEdit(
                                        post.id
                                      )
                                    }
                                    disabled={
                                      savingEdit ||
                                      !editTitle.trim() ||
                                      !editContent.trim()
                                    }
                                    sx={{
                                      borderRadius:
                                        2.5,
                                      textTransform:
                                        "none",
                                      fontWeight:
                                        700,
                                    }}
                                  >
                                    {savingEdit
                                      ? "Saving..."
                                      : "Save Changes"}
                                  </Button>
                                </Stack>
                              </Box>
                            ) : (
                              <>
                                {/* ================= POST TITLE ================= */}

                                <Typography
                                  sx={{
                                    fontSize: 20,
                                    fontWeight:
                                      900,
                                    color:
                                      "#111827",
                                  }}
                                >
                                  {
                                    post.title
                                  }
                                </Typography>

                                {/* ================= POST CONTENT ================= */}

                                <Typography
                                  sx={{
                                    mt: 1,
                                    color:
                                      "#475569",
                                    lineHeight:
                                      1.8,
                                  }}
                                >
                                  {
                                    post.content
                                  }
                                </Typography>

                                {/* ================= TAGS ================= */}

                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    mt: 2,
                                  }}
                                >
                                  <Chip
                                    label="#Community"
                                    size="small"
                                    sx={{
                                      fontWeight:
                                        600,
                                    }}
                                  />

                                  <Chip
                                    label="#Discussion"
                                    size="small"
                                    sx={{
                                      fontWeight:
                                        600,
                                    }}
                                  />
                                </Stack>
                              </>
                            )}
                          </Paper>
                        );
                      }
                    )}
                  </Stack>
                )}
              </Box>
            </>
          )}
      </Container>
    </Box>
  );
}

export default Profile;