import React from 'react';
import { Typography, Container, Grid, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  hero: {
    backgroundImage: 'linear-gradient(to right, #3f51b5, #2196f3)',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  features: {
    padding: '50px 20px',
    backgroundColor: '#f4f4f4',
  },
  featureBox: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-10px)',
    },
  },
  carousel: {
    padding: '50px 20px',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();

  const featureData = [
    {
      title: 'Budgeting',
      description: 'Learn to plan your spending and save more.',
    },
    {
      title: 'Saving',
      description: 'Discover strategies to save for your future goals.',
    },
    {
      title: 'Investing',
      description: 'Get insights on how to grow your wealth through smart investments.',
    },
    {
      title: 'Retirement Planning',
      description: 'Plan early and secure your financial future.',
    },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={classes.root}>
      {/* Hero Section */}
      <Box className={classes.hero}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h1">Empowering Smarter Financial Decisions</Typography>
            <Typography variant="h2" sx={{ mt: 2 }}>
              Bridging the Financial Literacy Gap
            </Typography>
            <Button variant="contained" color="secondary" size="large" sx={{ mt: 4 }}>
              Get Started
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className={classes.features}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 4 }}>
            Key Areas of Financial Literacy
          </Typography>
          <Grid container spacing={4}>
            {featureData.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box className={classes.featureBox}>
                    <Typography variant="h5">{feature.title}</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Carousel Section */}
      <Box className={classes.carousel}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Real-World Examples
        </Typography>
        <Slider {...carouselSettings}>
          <div>
            <Typography variant="h5">Case Study 1</Typography>
            <Typography variant="body1">
              Learn how John managed to pay off debt and start investing.
            </Typography>
          </div>
          <div>
            <Typography variant="h5">Case Study 2</Typography>
            <Typography variant="body1">
              Discover how Maria saved for her first home.
            </Typography>
          </div>
          <div>
            <Typography variant="h5">Case Study 3</Typography>
            <Typography variant="body1">
              Learn how to build a budget that works for your family.
            </Typography>
          </div>
        </Slider>
      </Box>

      {/* Footer */}
      <Box className={classes.footer}>
        <Typography variant="body1">© 2024 Financial Literacy Platform. All rights reserved.</Typography>
      </Box>
    </div>
  );
};

export default Home;
