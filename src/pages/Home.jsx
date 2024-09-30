import React from 'react';
import { Typography, Container, Grid, Button, Box, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AttachMoney, TrendingUp, Savings } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import InvestmentGif from '../assets/Investment.gif';
import Spline from '@splinetool/react-spline';
import splinedesign from '../assets/scene.splinecode'



const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        position: 'relative', // Added for positioning the background
    },
    hero: {
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
        position: 'relative', // Positioning context for absolute children
        overflow: 'hidden', // Prevent overflow
    },
    splineBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Behind other content
    },
    features: {
        padding: '50px 20px',
        backgroundColor: '#f4f4f4',
        '@media (max-width: 600px)': {
            padding: '30px 10px',
        },
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
        '@media (max-width: 600px)': {
            padding: '10px',
        },
    },
    carousel: {
        padding: '50px 20px',
        textAlign: 'center',
        overflowX: 'hidden', // Prevent horizontal scroll
        '@media (max-width: 600px)': {
            padding: '30px 10px',
        },
    },
    footer: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
    },
    iconBox: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '15px',
        '@media (max-width: 600px)': {
            marginBottom: '10px',
        },
    },
    iconText: {
        marginTop: '10px',
        fontWeight: 'bold',
    },
}));

const Home = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                <Spline
                    scene={splinedesign}
                    className={classes.splineBackground} // Add spline as background
                />
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        {/* Left side: Motion text content */}
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Typography variant={isMobile ? 'h4' : 'h3'}>
                                    Empowering Smarter Financial Decisions
                                </Typography>
                                <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mt: 2 }}>
                                    Bridging the Financial Literacy Gap
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Our platform helps you master essential financial concepts like budgeting,
                                    saving, investing, and retirement planning, so you can make informed decisions
                                    for a secure financial future.
                                </Typography>
                                <Button variant="contained" color="secondary" size="large" sx={{ mt: 4 }}>
                                    Get Started
                                </Button>
                            </motion.div>
                        </Grid>

                        {/* Right side: Finance-themed image and icons */}
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2 }}
                            >
                                <img
                                    src={InvestmentGif}
                                    alt="Finance Illustration"
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />
                                <Box className={classes.iconBox}>
                                    <Box className={classes.iconWrapper}>
                                        <AttachMoney fontSize="large" sx={{ color: '#4CAF50' }} />
                                        <Typography variant="h6" className={classes.iconText}>
                                            Budgeting
                                        </Typography>
                                    </Box>
                                    <Box className={classes.iconWrapper}>
                                        <TrendingUp fontSize="large" sx={{ color: '#FF9800' }} />
                                        <Typography variant="h6" className={classes.iconText}>
                                            Investing
                                        </Typography>
                                    </Box>
                                    <Box className={classes.iconWrapper}>
                                        <Savings fontSize="large" sx={{ color: '#3f51b5' }} />
                                        <Typography variant="h6" className={classes.iconText}>
                                            Saving
                                        </Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box className={classes.features}>
                <Container maxWidth="lg">
                    <Typography variant={isMobile ? 'h5' : 'h4'} align="center" sx={{ mb: 4 }}>
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
                                        <Typography variant="h6">{feature.title}</Typography>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
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
                <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 4 }}>
                    Real-World Examples
                </Typography>
                <Slider {...carouselSettings}>
                    <div>
                        <Typography variant="h6">Case Study 1</Typography>
                        <Typography variant="body2">
                            Learn how John managed to pay off debt and start investing.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6">Case Study 2</Typography>
                        <Typography variant="body2">
                            Discover how Maria saved for her first home.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6">Case Study 3</Typography>
                        <Typography variant="body2">
                            Learn how to build a budget that works for your family.
                        </Typography>
                    </div>
                </Slider>
            </Box>

            {/* Footer */}
            <Box className={classes.footer}>
                <Typography variant="body2">© 2024 Financial Literacy Platform. All rights reserved.</Typography>
            </Box>
        </div>
    );
};

export default Home;














// import React from 'react';
// import { Typography, Container, Grid, Button, Box, useMediaQuery } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { motion } from 'framer-motion';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { AttachMoney, TrendingUp, Savings } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';
// import InvestmentGif from '../assets/Investment.gif';


// const useStyles = makeStyles(() => ({
//     root: {
//         flexGrow: 1,
//     },
//     hero: {
//         backgroundImage: 'linear-gradient(to right, #3f51b5, #2196f3)',
//         height: '90vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         color: '#fff',
//         textAlign: 'center',
//         padding: '0 20px',
//         '@media (max-width: 600px)': {
//             height: 'auto',
//             padding: '40px 20px',
//         },
//     },
//     features: {
//         padding: '50px 20px',
//         backgroundColor: '#f4f4f4',
//         '@media (max-width: 600px)': {
//             padding: '30px 10px',
//         },
//     },
//     featureBox: {
//         padding: '20px',
//         backgroundColor: '#fff',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//         textAlign: 'center',
//         transition: 'transform 0.3s',
//         '&:hover': {
//             transform: 'translateY(-10px)',
//         },
//         '@media (max-width: 600px)': {
//             padding: '10px',
//         },
//     },
//     carousel: {
//         padding: '50px 20px',
//         textAlign: 'center',
//         overflowX: 'hidden', // Prevent horizontal scroll
//         '@media (max-width: 600px)': {
//             padding: '30px 10px',
//         },
//     },
//     footer: {
//         backgroundColor: '#3f51b5',
//         color: '#fff',
//         padding: '20px',
//         textAlign: 'center',
//     },
//     iconBox: {
//         display: 'flex',
//         justifyContent: 'space-around',
//         marginTop: '20px',
//         '@media (max-width: 600px)': {
//             flexDirection: 'column',
//             alignItems: 'center',
//         },
//     },
//     iconWrapper: {
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         marginBottom: '15px',
//         '@media (max-width: 600px)': {
//             marginBottom: '10px',
//         },
//     },
//     iconText: {
//         marginTop: '10px',
//         fontWeight: 'bold',
//     },
// }));

// const Home = () => {
//     const classes = useStyles();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const featureData = [
//         {
//             title: 'Budgeting',
//             description: 'Learn to plan your spending and save more.',
//         },
//         {
//             title: 'Saving',
//             description: 'Discover strategies to save for your future goals.',
//         },
//         {
//             title: 'Investing',
//             description: 'Get insights on how to grow your wealth through smart investments.',
//         },
//         {
//             title: 'Retirement Planning',
//             description: 'Plan early and secure your financial future.',
//         },
//     ];

//     const carouselSettings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };

//     return (
//         <div className={classes.root}>
//             {/* Hero Section */}
//             <Box className={classes.hero}>
//                 <Container>
//                     <Grid container spacing={4} alignItems="center">
//                         {/* Left side: Motion text content */}
//                         <Grid item xs={12} md={6}>
//                             <motion.div
//                                 initial={{ opacity: 0, y: -50 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 1 }}
//                             >
//                                 <Typography variant={isMobile ? 'h4' : 'h3'}>
//                                     Empowering Smarter Financial Decisions
//                                 </Typography>
//                                 <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mt: 2 }}>
//                                     Bridging the Financial Literacy Gap
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ mt: 2 }}>
//                                     Our platform helps you master essential financial concepts like budgeting,
//                                     saving, investing, and retirement planning, so you can make informed decisions
//                                     for a secure financial future.
//                                 </Typography>
//                                 <Button variant="contained" color="secondary" size="large" sx={{ mt: 4 }}>
//                                     Get Started
//                                 </Button>
//                             </motion.div>
//                         </Grid>

//                         {/* Right side: Finance-themed image and icons */}
//                         <Grid item xs={12} md={6}>
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 1.2 }}
//                             >
//                                 <img
//                                     src={InvestmentGif}
//                                     alt="Finance Illustration"
//                                     style={{ width: '100%', borderRadius: '10px' }}
//                                 />
//                                 <Box className={classes.iconBox}>
//                                     <Box className={classes.iconWrapper}>
//                                         <AttachMoney fontSize="large" sx={{ color: '#4CAF50' }} />
//                                         <Typography variant="h6" className={classes.iconText}>
//                                             Budgeting
//                                         </Typography>
//                                     </Box>
//                                     <Box className={classes.iconWrapper}>
//                                         <TrendingUp fontSize="large" sx={{ color: '#FF9800' }} />
//                                         <Typography variant="h6" className={classes.iconText}>
//                                             Investing
//                                         </Typography>
//                                     </Box>
//                                     <Box className={classes.iconWrapper}>
//                                         <Savings fontSize="large" sx={{ color: '#3f51b5' }} />
//                                         <Typography variant="h6" className={classes.iconText}>
//                                             Saving
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </motion.div>
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </Box>

//             {/* Features Section */}
//             <Box className={classes.features}>
//                 <Container maxWidth="lg">
//                     <Typography variant={isMobile ? 'h5' : 'h4'} align="center" sx={{ mb: 4 }}>
//                         Key Areas of Financial Literacy
//                     </Typography>
//                     <Grid container spacing={4}>
//                         {featureData.map((feature, index) => (
//                             <Grid item xs={12} sm={6} md={3} key={index}>
//                                 <motion.div
//                                     initial={{ opacity: 0, scale: 0.9 }}
//                                     whileInView={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.5 }}
//                                 >
//                                     <Box className={classes.featureBox}>
//                                         <Typography variant="h6">{feature.title}</Typography>
//                                         <Typography variant="body2" sx={{ mt: 2 }}>
//                                             {feature.description}
//                                         </Typography>
//                                     </Box>
//                                 </motion.div>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Container>
//             </Box>

//             {/* Carousel Section */}
//             <Box className={classes.carousel}>
//                 <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 4 }}>
//                     Real-World Examples
//                 </Typography>
//                 <Slider {...carouselSettings}>
//                     <div>
//                         <Typography variant="h6">Case Study 1</Typography>
//                         <Typography variant="body2">
//                             Learn how John managed to pay off debt and start investing.
//                         </Typography>
//                     </div>
//                     <div>
//                         <Typography variant="h6">Case Study 2</Typography>
//                         <Typography variant="body2">
//                             Discover how Maria saved for her first home.
//                         </Typography>
//                     </div>
//                     <div>
//                         <Typography variant="h6">Case Study 3</Typography>
//                         <Typography variant="body2">
//                             Learn how to build a budget that works for your family.
//                         </Typography>
//                     </div>
//                 </Slider>
//             </Box>

//             {/* Footer */}
//             <Box className={classes.footer}>
//                 <Typography variant="body2">© 2024 Financial Literacy Platform. All rights reserved.</Typography>
//             </Box>
//         </div>
//     );
// };

// export default Home;