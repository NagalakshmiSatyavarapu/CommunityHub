import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";



import {

  Avatar,

  Box,

  Button,

  Card,

  Chip,

  Divider,

  IconButton,

  Stack,

  TextField,

  Typography,

} from "@mui/material";



import {

  ArrowDownwardRounded,

  ArrowUpwardRounded,

  BookmarkBorderRounded,

  ChatBubbleOutlineRounded,

  FavoriteBorderRounded,

  FavoriteRounded,

  HomeRounded,

  LogoutRounded,

  MenuRounded,

  MoreHorizRounded,

  NotificationsNoneRounded,

  PersonAddAltRounded,

  CheckRounded,

  // PersonRemoveAltRounded,

  SearchRounded,

  ShareRounded,

  TrendingUpRounded,

  ExploreRounded,

  AddRounded,

  EditRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";



import api from "../api/axios";

import { useAuth } from "../context/AuthContext";



const HERO_IMAGE =

  "https\://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2200&q=85";



const topics = [

  "Technology",

  "AI & ML",

  "Programming",

  "Careers",

  "Projects",

  "College Life",

];



function Home() {

  const navigate = useNavigate();

  const { logout } = useAuth();



  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");

  const [scrolled, setScrolled] = useState(false);

  const [showTopButton, setShowTopButton] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);



  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 50);

      setShowTopButton(window.scrollY > 500);

    };



    window.addEventListener("scroll", handleScroll);



    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);



  useEffect(() => {

    const fetchUser = async () => {

      try {

        const response = await api.get("/users/me");

        setUser(response.data);

      } catch (error) {

        console.error("Unable to load user:", error);

      }

    };



    fetchUser();

  }, []);



  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response = await api.get("/posts");

        setPosts(response.data);

      } catch (error) {

        console.error("Unable to load posts:", error);

      }

    };



    fetchPosts();

  }, []);



  const getInitials = (person) => {

    if (!person) return "U";



    return (

      `${person.firstName?.charAt(0) || ""}${

        person.lastName?.charAt(0) || ""

      }`.toUpperCase() || "U"

    );

  };



  const getFullName = (person) => {

    if (!person) return "Community Member";



    return `${person.firstName || ""} ${

      person.lastName || ""

    }`.trim();

  };



  const filteredPosts = useMemo(() => {

    const value = search.trim().toLowerCase();



    if (!value) {

      return posts;

    }



    return posts.filter((post) => {

      return (

        post.title?.toLowerCase().includes(value) ||

        post.content?.toLowerCase().includes(value) ||

        post.author?.username?.toLowerCase().includes(value) ||

        post.author?.firstName?.toLowerCase().includes(value)

      );

    });

  }, [posts, search]);



  const scrollToFeed = () => {

    document.getElementById("community-feed")?.scrollIntoView({

      behavior: "smooth",

    });

  };



  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };



  const handleLogout = () => {

    logout();

    navigate("/");

  };



  return (

    <Box

      sx={{

        minHeight: "100vh",

        background: "#f6f7fb",

        color: "#111827",

      }}

    >

      {/* =====================================================

          STICKY NAVBAR

      ====================================================== */}



      <Box

        sx={{

          position: "fixed",

          top: 0,

          left: 0,

          right: 0,

          zIndex: 1000,

          px: { xs: 2, md: 5 },

          py: scrolled ? 1 : 1.5,

          transition: "all 0.3s ease",

        }}

      >

        <Box

          sx={{

            maxWidth: 1400,

            mx: "auto",

            px: { xs: 1.5, md: 2 },

            py: 1,

            borderRadius: 4,

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            gap: 2,

            background: scrolled

              ? "rgba(20, 24, 38, 0.92)"

              : "rgba(20, 24, 38, 0.65)",

            backdropFilter: "blur(20px)",

            border: "1px solid rgba(255,255,255,0.14)",

            boxShadow: scrolled

              ? "0 12px 35px rgba(0,0,0,0.22)"

              : "0 8px 30px rgba(0,0,0,0.12)",

            transition: "all 0.3s ease",

          }}

        >

          {/* LOGO */}



          <Box

            onClick={scrollToTop}

            sx={{

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: 1.2,

            }}

          >

            <Box

              sx={{

                width: 38,

                height: 38,

                borderRadius: 2.5,

                display: "grid",

                placeItems: "center",

                background:

                  "linear-gradient(135deg, #7c3aed, #2563eb)",

                color: "white",

                fontWeight: 900,

                fontSize: 18,

              }}

            >

              C

            </Box>



            <Typography

              sx={{

                color: "white",

                fontWeight: 900,

                fontSize: { xs: 17, md: 20 },

              }}

            >

              CommunityHub

            </Typography>

          </Box>



          {/* DESKTOP NAV */}



          <Stack

            direction="row"

            spacing={0.5}

            sx={{

              display: { xs: "none", md: "flex" },

            }}

          >

            <NavButton

              icon={<HomeRounded />}

              text="Home"

              active

              onClick={scrollToTop}

            />



            <NavButton

              icon={<ExploreRounded />}

              text="Explore"

              onClick={scrollToFeed}

            />



            <NavButton

              icon={<TrendingUpRounded />}

              text="Trending"

              onClick={scrollToFeed}

            />



            <NavButton

              icon={<PersonAddAltRounded />}

              text="People"

              onClick={() => {

                document

                  .getElementById("discover")

                  ?.scrollIntoView({ behavior: "smooth" });

              }}

            />

          </Stack>



          {/* DESKTOP ACTIONS */}



          <Stack

            direction="row"

            spacing={1}

            alignItems="center"

            sx={{

              display: { xs: "none", md: "flex" },

            }}

          >

            <IconButton

              sx={{

                color: "white",

                background: "rgba(255,255,255,0.08)",

              }}

            >

              <NotificationsNoneRounded />

            </IconButton>



            <Avatar

              onClick={() => navigate("/profile")}

              sx={{

                width: 38,

                height: 38,

                cursor: "pointer",

                background:

                  "linear-gradient(135deg, #8b5cf6, #2563eb)",

                fontWeight: 800,

              }}

            >

              {getInitials(user)}

            </Avatar>



            <IconButton

              onClick={handleLogout}

              sx={{

                color: "white",

              }}

            >

              <LogoutRounded />

            </IconButton>

          </Stack>



          {/* MOBILE MENU */}



          <IconButton

            onClick={() => setMobileMenu(!mobileMenu)}

            sx={{

              display: { xs: "flex", md: "none" },

              color: "white",

            }}

          >

            <MenuRounded />

          </IconButton>

        </Box>



        {mobileMenu && (

          <Box

            sx={{

              mt: 1,

              p: 2,

              borderRadius: 3,

              background: "rgba(20,24,38,0.95)",

              backdropFilter: "blur(20px)",

              display: { xs: "block", md: "none" },

            }}

          >

            <Stack spacing={1}>

              <MobileNavItem

                text="Home"

                onClick={() => {

                  scrollToTop();

                  setMobileMenu(false);

                }}

              />



              <MobileNavItem

                text="Explore"

                onClick={() => {

                  scrollToFeed();

                  setMobileMenu(false);

                }}

              />



              <MobileNavItem

                text="Profile"

                onClick={() => navigate("/profile")}

              />



              <MobileNavItem

                text="Logout"

                onClick={handleLogout}

              />

            </Stack>

          </Box>

        )}

      </Box>



      {/* =====================================================

          HERO

      ====================================================== */}



      <Box

        sx={{

          position: "relative",

          height: { xs: 680, md: 760 },

          overflow: "hidden",

          display: "flex",

          alignItems: "center",

        }}

      >

        <Box

          sx={{

            position: "absolute",

            inset: 0,

            backgroundImage: `url(${HERO_IMAGE})`,

            backgroundSize: "cover",

            backgroundPosition: "center",

            transform: `translateY(${scrolled ? 80 : 0}px) scale(1.08)`,

            transition: "transform 0.15s linear",

          }}

        />



        <Box

          sx={{

            position: "absolute",

            inset: 0,

            background: `

              radial-gradient(

                circle at 75% 25%,

                rgba(124,58,237,0.45),

                transparent 35%

              ),

              linear-gradient(

                90deg,

                rgba(10,12,25,0.94) 0%,

                rgba(10,12,25,0.78) 48%,

                rgba(10,12,25,0.35) 100%

              )

            `,

          }}

        />



        <Box

          sx={{

            position: "relative",

            zIndex: 2,

            width: "100%",

            maxWidth: 1400,

            mx: "auto",

            px: { xs: 3, md: 7 },

            pt: 10,

          }}

        >

          <motion.div

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

          >

            <Chip

              label="WELCOME TO THE COMMUNITY"

              sx={{

                mb: 3,

                px: 1,

                height: 34,

                color: "white",

                background: "rgba(255,255,255,0.12)",

                backdropFilter: "blur(12px)",

                border:

                  "1px solid rgba(255,255,255,0.2)",

                fontWeight: 800,

                letterSpacing: 1.2,

              }}

            />



            <Typography

              sx={{

                maxWidth: 780,

                color: "white",

                fontWeight: 900,

                lineHeight: 0.98,

                letterSpacing: -2,

                fontSize: {

                  xs: "3.2rem",

                  sm: "4.4rem",

                  md: "6rem",

                },

              }}

            >

              Connect.

              <br />

              Share.

              <br />

              Discover.

            </Typography>



            <Typography

              sx={{

                maxWidth: 650,

                mt: 3,

                color: "rgba(255,255,255,0.78)",

                fontSize: { xs: 17, md: 20 },

                lineHeight: 1.7,

              }}

            >

              A place where students, developers, creators and

              curious minds come together to share ideas,

              discover opportunities and build meaningful

              connections.

            </Typography>



            <Stack

              direction={{ xs: "column", sm: "row" }}

              spacing={2}

              sx={{ mt: 4 }}

            >

              <Button

                variant="contained"

                size="large"

                startIcon={<ExploreRounded />}

                onClick={scrollToFeed}

                sx={{

                  px: 4,

                  py: 1.6,

                  borderRadius: 3,

                  textTransform: "none",

                  fontWeight: 800,

                  background:

                    "linear-gradient(135deg,#8b5cf6,#2563eb)",

                  boxShadow:

                    "0 12px 30px rgba(37,99,235,0.35)",

                }}

              >

                Explore Community

              </Button>



              <Button

                variant="outlined"

                size="large"

                startIcon={<AddRounded />}

                onClick={() => navigate("/create-post")}

                sx={{

                  px: 4,

                  py: 1.6,

                  borderRadius: 3,

                  textTransform: "none",

                  fontWeight: 800,

                  color: "white",

                  borderColor:

                    "rgba(255,255,255,0.4)",

                  background:

                    "rgba(255,255,255,0.08)",

                  backdropFilter: "blur(10px)",

                }}

              >

                Create a Post

              </Button>

            </Stack>

          </motion.div>



          {/* HERO STATS */}



          <Stack

            direction="row"

            spacing={{ xs: 3, md: 6 }}

            sx={{

              mt: 6,

              flexWrap: "wrap",

            }}

          >

            <HeroStat

              value={`${posts.length}+`}

              label="Posts"

            />



            <HeroStat

              value="10K+"

              label="Members"

            />



            <HeroStat

              value="24/7"

              label="Community"

            />

          </Stack>

        </Box>



        {/* SCROLL INDICATOR */}



        <Box

          onClick={scrollToFeed}

          sx={{

            position: "absolute",

            bottom: 30,

            left: "50%",

            transform: "translateX(-50%)",

            color: "white",

            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            cursor: "pointer",

            opacity: 0.8,

          }}

        >

          <Typography

            variant="caption"

            sx={{ mb: 0.5 }}

          >

            Explore

          </Typography>



          <ArrowDownwardRounded

            sx={{

              animation: "bounce 1.8s infinite",

              "@keyframes bounce": {

                "0%, 100%": {

                  transform: "translateY(0)",

                },

                "50%": {

                  transform: "translateY(7px)",

                },

              },

            }}

          />

        </Box>

      </Box>



      {/* =====================================================

          MAIN CONTENT

      ====================================================== */}



      <Box

        id="community-feed"

        sx={{

          maxWidth: 1400,

          mx: "auto",

          px: { xs: 2, md: 5 },

          py: { xs: 6, md: 9 },

        }}

      >

        {/* TRENDING */}



        <motion.div

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

        >

          <Stack

            direction={{ xs: "column", md: "row" }}

            justifyContent="space-between"

            spacing={3}

            sx={{ mb: 6 }}

          >

            <Box>

              <Typography

                variant="overline"

                sx={{

                  color: "#7c3aed",

                  fontWeight: 900,

                  letterSpacing: 2,

                }}

              >

                DISCOVER

              </Typography>



              <Typography

                sx={{

                  fontSize: { xs: 30, md: 42 },

                  fontWeight: 900,

                  letterSpacing: -1,

                }}

              >

                What's happening?

              </Typography>



              <Typography

                color="text.secondary"

                sx={{ mt: 1 }}

              >

                Explore conversations happening across

                CommunityHub.

              </Typography>

            </Box>



            <Box

              sx={{

                display: "flex",

                alignItems: "center",

                gap: 1,

                flexWrap: "wrap",

              }}

            >

              {topics.map((topic) => (

                <Chip

                  key={topic}

                  label={`#${topic}`}

                  clickable

                  sx={{

                    borderRadius: 2,

                    fontWeight: 600,

                    background: "white",

                    border: "1px solid #e5e7eb",

                  }}

                />

              ))}

            </Box>

          </Stack>

        </motion.div>



        {/* SEARCH */}



        <Box

          sx={{

            maxWidth: 700,

            mb: 5,

          }}

        >

          <TextField

            fullWidth

            value={search}

            onChange={(event) =>

              setSearch(event.target.value)

            }

            placeholder="Search posts, people or topics..."

            variant="outlined"

            InputProps={{

              startAdornment: (

                <SearchRounded

                  sx={{

                    mr: 1,

                    color: "#9ca3af",

                  }}

                />

              ),

            }}

            sx={{

              "& .MuiOutlinedInput-root": {

                background: "white",

                borderRadius: 3,

              },

            }}

          />

        </Box>



        {/* TWO COLUMN CONTENT */}



        <Box

          sx={{

            display: "grid",

            gridTemplateColumns: {

              xs: "1fr",

              lg: "minmax(0, 1fr) 320px",

            },

            gap: 4,

            alignItems: "start",

          }}

        >

          {/* FEED */}



          <Box>

            <Stack

              direction="row"

              alignItems="center"

              justifyContent="space-between"

              sx={{ mb: 3 }}

            >

              <Box>

                <Typography

                  sx={{

                    fontSize: 25,

                    fontWeight: 900,

                  }}

                >

                  Community Feed

                </Typography>



                <Typography

                  variant="body2"

                  color="text.secondary"

                >

                  Fresh conversations from the community

                </Typography>

              </Box>



              <Chip

                icon={<TrendingUpRounded />}

                label="Latest"

                sx={{

                  fontWeight: 700,

                  background: "#ede9fe",

                  color: "#6d28d9",

                }}

              />

            </Stack>



            {filteredPosts.length === 0 ? (

              <Card

                sx={{

                  p: 6,

                  borderRadius: 4,

                  textAlign: "center",

                  border: "1px solid #e5e7eb",

                  boxShadow:

                    "0 10px 30px rgba(0,0,0,0.04)",

                }}

              >

                <Typography

                  variant="h6"

                  fontWeight={800}

                >

                  No posts found

                </Typography>



                <Typography

                  color="text.secondary"

                  sx={{ mt: 1 }}

                >

                  Try another search or start a new

                  conversation.

                </Typography>

              </Card>

            ) : (

              <Stack spacing={3}>

                {filteredPosts.map((post, index) => (

                  <motion.div

                    key={post.id}

                    initial={{

                      opacity: 0,

                      y: 25,

                    }}

                    whileInView={{

                      opacity: 1,

                      y: 0,

                    }}

                    viewport={{

                      once: true,

                      amount: 0.15,

                    }}

                    transition={{

                      duration: 0.45,

                      delay:

                        Math.min(index, 3) * 0.08,

                    }}

                  >

                    <CommunityPost

                      post={post}
                      user={user}

                      getInitials={getInitials}

                      getFullName={getFullName}

                    />

                  </motion.div>

                ))}

              </Stack>

            )}

          </Box>



          {/* RIGHT DISCOVERY PANEL */}



          <Box id="discover">

            <Stack spacing={3}>

              {/* PROFILE */}



              <Card

                sx={{

                  borderRadius: 4,

                  p: 3,

                  border:

                    "1px solid rgba(255,255,255,0.8)",

                  background:

                    "linear-gradient(145deg,#ffffff,#f5f3ff)",

                  boxShadow:

                    "0 15px 40px rgba(0,0,0,0.06)",

                }}

              >

                <Typography

                  variant="overline"

                  sx={{

                    color: "#7c3aed",

                    fontWeight: 900,

                  }}

                >

                  YOUR SPACE

                </Typography>



                <Stack

                  direction="row"

                  spacing={2}

                  alignItems="center"

                  sx={{ mt: 2 }}

                >

                  <Avatar

                    sx={{

                      width: 58,

                      height: 58,

                      fontSize: 20,

                      fontWeight: 900,

                      background:

                        "linear-gradient(135deg,#8b5cf6,#2563eb)",

                    }}

                  >

                    {getInitials(user)}

                  </Avatar>



                  <Box>

                    <Typography fontWeight={900}>

                      {getFullName(user)}

                    </Typography>



                    <Typography

                      variant="body2"

                      color="text.secondary"

                    >

                      @{user?.username || "community"}

                    </Typography>

                  </Box>

                </Stack>



                <Button

                  fullWidth

                  onClick={() => navigate("/profile")}

                  sx={{

                    mt: 3,

                    borderRadius: 2.5,

                    textTransform: "none",

                    fontWeight: 700,

                  }}

                >

                  View Profile

                </Button>

              </Card>



              {/* TRENDING */}



              <Card

                sx={{

                  borderRadius: 4,

                  p: 3,

                  border: "1px solid #e5e7eb",

                  boxShadow:

                    "0 15px 40px rgba(0,0,0,0.04)",

                }}

              >

                <Stack

                  direction="row"

                  spacing={1}

                  alignItems="center"

                >

                  <TrendingUpRounded

                    sx={{ color: "#7c3aed" }}

                  />



                  <Typography fontWeight={900}>

                    Trending Now

                  </Typography>

                </Stack>



                <Stack spacing={2.5} sx={{ mt: 3 }}>

                  <TrendItem

                    number="01"

                    title="#ArtificialIntelligence"

                    count="2.4K discussions"

                  />



                  <TrendItem

                    number="02"

                    title="#JavaProgramming"

                    count="1.8K discussions"

                  />



                  <TrendItem

                    number="03"

                    title="#PlacementSeason"

                    count="1.2K discussions"

                  />



                  <TrendItem

                    number="04"

                    title="#ProjectIdeas"

                    count="860 discussions"

                  />

                </Stack>

              </Card>



              {/* JOIN COMMUNITIES */}



              <Card

                sx={{

                  borderRadius: 4,

                  overflow: "hidden",

                  position: "relative",

                  minHeight: 230,

                  color: "white",

                  backgroundImage: `

                    linear-gradient(

                      rgba(38,20,75,0.88),

                      rgba(29,41,89,0.92)

                    ),

                    url("${HERO_IMAGE}")

                  `,

                  backgroundSize: "cover",

                  backgroundPosition: "center",

                }}

              >

                <Box sx={{ p: 3 }}>

                  <Typography

                    variant="overline"

                    sx={{

                      opacity: 0.7,

                      fontWeight: 900,

                    }}

                  >

                    FIND YOUR PEOPLE

                  </Typography>



                  <Typography

                    sx={{

                      fontSize: 25,

                      fontWeight: 900,

                      mt: 1,

                    }}

                  >

                    Join communities

                    <br />

                    that interest you.

                  </Typography>



                  <Button

                    variant="contained"

                    sx={{

                      mt: 3,

                      borderRadius: 2.5,

                      textTransform: "none",

                      fontWeight: 800,

                      background: "white",

                      color: "#312e81",

                      "&:hover": {

                        background: "#f3f4f6",

                      },

                    }}

                  >

                    Explore Communities

                  </Button>

                </Box>

              </Card>

            </Stack>

          </Box>

        </Box>

      </Box>



      {/* =====================================================

          FOOTER

      ====================================================== */}



      <Box

        sx={{

          background: "#111827",

          color: "white",

          py: 6,

          px: 3,

        }}

      >

        <Box

          sx={{

            maxWidth: 1400,

            mx: "auto",

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            flexWrap: "wrap",

            gap: 3,

          }}

        >

          <Box>

            <Typography

              fontWeight={900}

              fontSize={22}

            >

              CommunityHub

            </Typography>



            <Typography

              color="rgba(255,255,255,0.55)"

              sx={{ mt: 0.5 }}

            >

              Connect. Share. Discover.

            </Typography>

          </Box>



          <Typography

            variant="body2"

            color="rgba(255,255,255,0.45)"

          >

            Built for meaningful communities.

          </Typography>

        </Box>

      </Box>



      {/* =====================================================

          FLOATING CREATE POST

      ====================================================== */}



      <Button

        variant="contained"

        startIcon={<AddRounded />}

        onClick={() => navigate("/create-post")}

        sx={{

          position: "fixed",

          right: { xs: 18, md: 30 },

          bottom: { xs: 18, md: 30 },

          zIndex: 900,

          borderRadius: 4,

          px: 2.5,

          py: 1.4,

          textTransform: "none",

          fontWeight: 800,

          background:

            "linear-gradient(135deg,#7c3aed,#2563eb)",

          boxShadow:

            "0 15px 35px rgba(37,99,235,0.35)",

        }}

      >

        Create Post

      </Button>



      {/* BACK TO TOP */}



      {showTopButton && (

        <IconButton

          onClick={scrollToTop}

          sx={{

            position: "fixed",

            right: { xs: 18, md: 30 },

            bottom: { xs: 78, md: 90 },

            zIndex: 900,

            width: 46,

            height: 46,

            color: "white",

            background: "#111827",

            boxShadow:

              "0 10px 25px rgba(0,0,0,0.2)",

            "&:hover": {

              background: "#1f2937",

            },

          }}

        >

          <ArrowUpwardRounded />

        </IconButton>

      )}

    </Box>

  );

}



/* ============================================================

   COMPONENTS

============================================================ */



function NavButton({

  icon,

  text,

  active,

  onClick,

}) {

  return (

    <Button

      onClick={onClick}

      startIcon={icon}

      sx={{

        color: "white",

        textTransform: "none",

        borderRadius: 2.5,

        px: 1.8,

        background: active

          ? "rgba(255,255,255,0.15)"

          : "transparent",

        "&:hover": {

          background:

            "rgba(255,255,255,0.12)",

        },

      }}

    >

      {text}

    </Button>

  );

}



function MobileNavItem({ text, onClick }) {

  return (

    <Button

      onClick={onClick}

      sx={{

        justifyContent: "flex-start",

        color: "white",

        textTransform: "none",

        py: 1.2,

      }}

    >

      {text}

    </Button>

  );

}



function HeroStat({ value, label }) {

  return (

    <Box>

      <Typography

        sx={{

          color: "white",

          fontWeight: 900,

          fontSize: 28,

        }}

      >

        {value}

      </Typography>



      <Typography

        sx={{

          color: "rgba(255,255,255,0.55)",

          fontSize: 13,

        }}

      >

        {label}

      </Typography>

    </Box>

  );

}



function TrendItem({

  number,

  title,

  count,

}) {

  return (

    <Box>

      <Stack

        direction="row"

        spacing={1.5}

        alignItems="center"

      >

        <Typography

          sx={{

            color: "#a78bfa",

            fontWeight: 900,

            fontSize: 12,

          }}

        >

          {number}

        </Typography>



        <Box>

          <Typography

            fontWeight={800}

            fontSize={14}

          >

            {title}

          </Typography>



          <Typography

            variant="caption"

            color="text.secondary"

          >

            {count}

          </Typography>

        </Box>

      </Stack>

    </Box>

  );

}



function CommunityPost({
  post,
  user,
  getInitials,
  getFullName,
}) {
  const isOwner =
    user?.id && post.author?.id
      ? user.id === post.author.id
      : false;

  // ================= LIKE =================



  const [liked, setLiked] = useState(false);

  const [likeCount, setLikeCount] = useState(0);

  const [liking, setLiking] = useState(false);



  // ================= FOLLOW =================



  const [following, setFollowing] = useState(false);

  const [followLoading, setFollowLoading] = useState(false);

  const [followersCount, setFollowersCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);



  // ================= COMMENTS =================



  const [comments, setComments] = useState([]);

  const [commentsOpen, setCommentsOpen] = useState(false);

  const [commentText, setCommentText] = useState("");

  const [loadingComments, setLoadingComments] = useState(false);

  const [postingComment, setPostingComment] = useState(false);



  // ================= LIKE COUNT =================



  useEffect(() => {

    const fetchLikeCount = async () => {

      try {

        const response = await api.get(

          `/likes/posts/${post.id}/count`

        );



        setLikeCount(response.data);

      } catch (error) {

        console.error(

          "Unable to load like count:",

          error

        );

      }

    };



    fetchLikeCount();

  }, [post.id]);



  // ================= LIKE =================



  const handleLike = async () => {

    if (liking) return;



    try {

      setLiking(true);



      const response = await api.post(

        `/likes/posts/${post.id}`

      );



      const message = response.data;



      if (message === "Post liked") {

        setLiked(true);

        setLikeCount((prev) => prev + 1);

      } else if (message === "Post unliked") {

        setLiked(false);

        setLikeCount((prev) =>

          Math.max(0, prev - 1)

        );

      }

    } catch (error) {

      console.error(

        "Unable to like post:",

        error

      );

    } finally {

      setLiking(false);

    }

  };



  // ================= FOLLOW STATUS + COUNT =================



  useEffect(() => {

    const fetchFollowData = async () => {

      try {

        if (!post.author?.id) return;



        const [statusResponse, countResponse] =

          await Promise.all([

            api.get(

              `/follows/${post.author.id}/status`

            ),

            api.get(

              `/follows/${post.author.id}/followers/count`

            ),

          ]);



        setFollowing(statusResponse.data);

        setFollowersCount(countResponse.data);

      } catch (error) {

        console.error(

          "Unable to load follow data:",

          error

        );

      }

    };



    fetchFollowData();

  }, [post.author?.id]);



  // ================= FOLLOW / UNFOLLOW =================



  const handleFollow = async () => {

    if (followLoading || !post.author?.id) {

      return;

    }



    try {

      setFollowLoading(true);



      const response = await api.post(

        `/follows/${post.author.id}`

      );



      const message = response.data;



      console.log("Follow response:", message);



      if (message === "User followed") {

        setFollowing(true);

        setFollowersCount((prev) => prev + 1);

      } else if (message === "User unfollowed") {

        setFollowing(false);

        setFollowersCount((prev) =>

          Math.max(0, prev - 1)

        );

      } else if (

        message === "You cannot follow yourself"

      ) {

        console.log(

          "You cannot follow your own account."

        );

      }

    } catch (error) {

      console.error(

        "Unable to follow user:",

        error

      );



      console.error(

        "Follow error response:",

        error.response?.data

      );

    } finally {

      setFollowLoading(false);

    }

  };



  // ================= EDIT / DELETE =================

  const handleEdit = () => {
    console.log("Edit post:", post.id);
    setMenuOpen(false);
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmed) {
        return;
      }

      await api.delete(`/posts/${post.id}`);

      console.log("Post deleted successfully:", post.id);
      setMenuOpen(false);
    } catch (error) {
      console.error("Unable to delete post:", error);
      console.error("Delete error response:", error.response?.data);
    }
  };


  // ================= FETCH COMMENTS =================



  const fetchComments = async () => {

    try {

      setLoadingComments(true);



      const response = await api.get(

        `/comments/posts/${post.id}`

      );



      setComments(response.data);

    } catch (error) {

      console.error(

        "Unable to load comments:",

        error

      );

    } finally {

      setLoadingComments(false);

    }

  };



  // ================= TOGGLE COMMENTS =================



  const handleComments = async () => {

    if (!commentsOpen) {

      await fetchComments();

    }



    setCommentsOpen((prev) => !prev);

  };



  // ================= ADD COMMENT =================



  const handleAddComment = async () => {

    if (

      !commentText.trim() ||

      postingComment

    ) {

      return;

    }



    try {

      setPostingComment(true);



      const response = await api.post(

        `/comments/posts/${post.id}`,

        {

          content: commentText.trim(),

        }

      );



      setComments((prev) => [

        ...prev,

        response.data,

      ]);



      setCommentText("");

    } catch (error) {

      console.error(

        "Unable to add comment:",

        error

      );

    } finally {

      setPostingComment(false);

    }

  };



  return (

    <Card

      sx={{

        borderRadius: 4,

        overflow: "hidden",

        border: "1px solid #e5e7eb",

        boxShadow:

          "0 12px 35px rgba(0,0,0,0.045)",

        transition:

          "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {

          transform: "translateY(-4px)",

          boxShadow:

            "0 20px 45px rgba(0,0,0,0.09)",

        },

      }}

    >

      <Box

        sx={{

          p: { xs: 2.5, md: 3 },

        }}

      >

        {/* ================= AUTHOR ================= */}



        <Stack

          direction="row"

          alignItems="center"

          spacing={1.5}
          position="relative"

        >

          <Avatar

            sx={{

              width: 48,

              height: 48,

              fontWeight: 900,

              background:

                "linear-gradient(135deg,#a78bfa,#2563eb)",

            }}

          >

            {getInitials(post.author)}

          </Avatar>



          <Box sx={{ flex: 1 }}>

            <Typography fontWeight={900}>

              {getFullName(post.author)}

            </Typography>



            <Typography

              variant="body2"

              color="text.secondary"

            >

              @{post.author?.username || "user"}

            </Typography>



            {/* Followers count */}

            <Typography

              variant="caption"

              color="text.secondary"

            >

              {followersCount}{" "}

              {followersCount === 1

                ? "follower"

                : "followers"}

            </Typography>

          </Box>



          {/* ================= FOLLOW BUTTON ================= */}



          <Button

            size="small"

            onClick={handleFollow}

            disabled={followLoading}

            startIcon={

  following ? (

    <CheckRounded />

  ) : (

    <PersonAddAltRounded />

  )

}

            variant={

              following

                ? "outlined"

                : "contained"

            }

            sx={{

              display: {

                xs: "none",

                sm: "flex",

              },

              borderRadius: 2,

              textTransform: "none",

              fontWeight: 700,

              minWidth: 105,

            }}

          >

            {followLoading

              ? "..."

              : following

              ? "Following"

              : "Follow"}

          </Button>



          {isOwner && (
            <IconButton
              size="small"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <MoreHorizRounded />
            </IconButton>
          )}

          {isOwner && menuOpen && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 42,
                zIndex: 20,
                minWidth: 140,
                background: "white",
                borderRadius: 2,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
            >
              <Button
                fullWidth
                startIcon={<EditRounded />}
                onClick={handleEdit}
                sx={{
                  justifyContent: "flex-start",
                  px: 2,
                  py: 1.2,
                  color: "#333",
                }}
              >
                Edit
              </Button>

              <Button
                fullWidth
                startIcon={<DeleteOutlineRounded />}
                onClick={handleDelete}
                sx={{
                  justifyContent: "flex-start",
                  px: 2,
                  py: 1.2,
                  color: "#d32f2f",
                }}
              >
                Delete
              </Button>
            </Box>
          )}

        </Stack>



        {/* ================= POST ================= */}



        <Box sx={{ mt: 3 }}>

          <Typography

            sx={{

              fontSize: {

                xs: 21,

                md: 25,

              },

              fontWeight: 900,

              letterSpacing: -0.4,

            }}

          >

            {post.title}

          </Typography>



          <Typography

            sx={{

              mt: 1.2,

              color: "#4b5563",

              lineHeight: 1.8,

              fontSize: 16,

            }}

          >

            {post.content}

          </Typography>



          <Stack

            direction="row"

            spacing={1}

            sx={{ mt: 2 }}

          >

            <Chip

              label="#Community"

              size="small"

              sx={{

                background: "#f3f4f6",

                fontWeight: 600,

              }}

            />



            <Chip

              label="#Discussion"

              size="small"

              sx={{

                background: "#f3f4f6",

                fontWeight: 600,

              }}

            />

          </Stack>

        </Box>



        <Divider sx={{ my: 2.5 }} />



        {/* ================= ACTION BAR ================= */}



        <Stack

          direction="row"

          justifyContent="space-between"

          alignItems="center"

        >

          <Stack

            direction="row"

            spacing={0.5}

          >

            {/* LIKE */}



            <Button

              onClick={handleLike}

              disabled={liking}

              startIcon={

                liked ? (

                  <FavoriteRounded />

                ) : (

                  <FavoriteBorderRounded />

                )

              }

              sx={{

                color: liked

                  ? "#ef4444"

                  : "#6b7280",

                textTransform: "none",

                borderRadius: 2,

                fontWeight: liked

                  ? 800

                  : 600,

              }}

            >

              {likeCount > 0

                ? `${likeCount} ${

                    likeCount === 1

                      ? "Like"

                      : "Likes"

                  }`

                : "Like"}

            </Button>



            {/* COMMENTS */}



            <Button

              onClick={handleComments}

              startIcon={

                <ChatBubbleOutlineRounded />

              }

              sx={{

                color: commentsOpen

                  ? "#2563eb"

                  : "#6b7280",

                textTransform: "none",

                borderRadius: 2,

                fontWeight: commentsOpen

                  ? 700

                  : 600,

              }}

            >

              {comments.length > 0

                ? comments.length

                : post.comments?.length || 0}

            </Button>

          </Stack>



          <Stack

            direction="row"

            spacing={0.5}

          >

            <IconButton>

              <BookmarkBorderRounded />

            </IconButton>



            <IconButton>

              <ShareRounded />

            </IconButton>

          </Stack>

        </Stack>



        {/* ================= COMMENTS ================= */}



        {commentsOpen && (

          <Box

            sx={{

              mt: 2.5,

              pt: 2.5,

              borderTop:

                "1px solid #e5e7eb",

            }}

          >

            {/* COMMENT INPUT */}



            <Stack

              direction="row"

              spacing={1}

              alignItems="flex-start"

            >

              <TextField

                fullWidth

                size="small"

                placeholder="Write a comment..."

                value={commentText}

                onChange={(e) =>

                  setCommentText(

                    e.target.value

                  )

                }

                onKeyDown={(e) => {

                  if (

                    e.key === "Enter" &&

                    !e.shiftKey

                  ) {

                    e.preventDefault();

                    handleAddComment();

                  }

                }}

                multiline

                maxRows={3}

              />



              <Button

                variant="contained"

                onClick={handleAddComment}

                disabled={

                  !commentText.trim() ||

                  postingComment

                }

                sx={{

                  minWidth: 85,

                  height: 40,

                  borderRadius: 2,

                  textTransform: "none",

                  fontWeight: 700,

                }}

              >

                {postingComment

                  ? "..."

                  : "Post"}

              </Button>

            </Stack>



            {/* COMMENTS LIST */}



            <Box sx={{ mt: 2.5 }}>

              {loadingComments ? (

                <Typography

                  variant="body2"

                  color="text.secondary"

                  sx={{ py: 2 }}

                >

                  Loading comments...

                </Typography>

              ) : comments.length === 0 ? (

                <Typography

                  variant="body2"

                  color="text.secondary"

                  sx={{

                    py: 2,

                    textAlign: "center",

                  }}

                >

                  No comments yet. Be the

                  first to comment!

                </Typography>

              ) : (

                <Stack spacing={1.5}>

                  {comments.map((comment) => (

                    <Box

                      key={comment.id}

                      sx={{

                        p: 1.5,

                        borderRadius: 2.5,

                        background: "#f8fafc",

                        border:

                          "1px solid #eef0f3",

                      }}

                    >

                      <Typography

                        variant="body2"

                        sx={{

                          color: "#374151",

                          lineHeight: 1.6,

                        }}

                      >

                        {comment.content}

                      </Typography>

                    </Box>

                  ))}

                </Stack>

              )}

            </Box>

          </Box>

        )}

      </Box>

    </Card>

  );

}

export default Home;