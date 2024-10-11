import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {/* Card 1 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card
            className="scrollable-div"
            elevation={3}
            sx={{ width: "360px" }}
          >
            <CardContent>
              <Box>
                <img
                  src="https://sp-seller.webkul.com/img/admin_sliced/icon-dashboard.png"
                  alt="dashboard-icon"
                />
              </Box>
              <Typography variant="h4" gutterBottom>
                Holla!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Here are the Current Activities on your Store.
              </Typography>

              {[
                "Today Total Sales",
                "This Week Total Sales",
                "Overall Sales",
              ].map((text) => (
                <Box
                  sx={{
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {text}
                  </Typography>
                  <Box
                    sx={{ backgroundColor: "lightblue", padding: "4px 12px" }}
                  >
                    0.00
                  </Box>
                </Box>
              ))}

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "16px", my: 2 }}
              >
                GO TO DASHBOARD
              </Button>
              <Typography variant="body2" fontStyle="italic">
                Go To Dashboard to view all your Stats Related to your Store.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card
            elevation={3}
            className="scrollable-div"
            sx={{ width: "360px" }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                All Functionalities
              </Typography>
              <Typography variant="body2" gutterBottom>
                Here are the list of the functionalities on Multivendor
                Marketplace.
              </Typography>

              {[
                {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyjMbigtBTz2HlXZ7wC6WmlBhta3ppkgjKg&s",
                  text: "All Products",
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/306/306458.png",
                  text: "All Orders",
                },
                {
                  img: "https://cdn1.iconfinder.com/data/icons/business-and-finance-2-5/130/77-512.png",
                  text: "Unfulfilled Orders",
                },
                {
                  img: "https://cdn-icons-png.freepik.com/512/5003/5003538.png",
                  text: "Payment Methods",
                },
              ].map(({ img, text }) => (
                <Box
                  key={text}
                  sx={{
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={img} alt={text} height={90} />
                  <Typography variant="h6" sx={{ marginLeft: "20px" }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card
            elevation={3}
            className="scrollable-div"
            sx={{ width: "360px" }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recent Updates
              </Typography>
              <Typography variant="body2" gutterBottom>
                Here you can check the Recent Updates.
              </Typography>

              {[
                {
                  title: "Grouping of Custom Fields",
                  description:
                    "Now, the admin can group multiple custom fields together into different groups for improved display structure.",
                },
                {
                  title: "Low Inventory Email Notifications",
                  description:
                    "A configuration has been added to send email notifications to sellers if product inventory is low.",
                },
                {
                  title: "Multivendor API Enhancement",
                  description:
                    "The Multivendor API now supports Ask a Question and Make an Offer listings for both admin and seller sides.",
                },
              ].map(({ title, description }) => (
                <Box sx={{ marginBottom: "16px", position: "relative" }}>
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                  <a href="#" style={{ position: "absolute", right: 0 }}>
                    Explore
                  </a>
                </Box>
              ))}

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "16px", my: 2 }}
              >
                VIEW ALL
              </Button>
              <Typography variant="body2" fontStyle="italic">
                Click on the Button above to View all recent updates.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 4 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card
            elevation={3}
            className="scrollable-div"
            sx={{ width: "360px" }}
          >
            <CardContent>
              <Box>
                <img
                  src="https://sp-seller.webkul.com/img/admin_sliced/icon-feature-apps.png"
                  alt="feature-apps"
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                Feature Apps
              </Typography>
              <Typography variant="body2" gutterBottom>
                Here you can check the recent Add-Ons added to your Market
                Store.
              </Typography>

              {[
                {
                  title: "Shipping",
                  description:
                    "Shipping features allow the admin to configure shipping methods from his end for sellers and sellers can configure shipping methods based on price or weight.",
                },
                {
                  title: "Hyperlocal Marketplace",
                  description:
                    'Hyperlocal marketplace helps scan the nearest registered service provider and delivers services/goods in a very short time based on "Near Me" concept.',
                },
              ].map(({ title, description }) => (
                <Box sx={{ marginBottom: "16px", position: "relative" }}>
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                  <a href="#" style={{ position: "absolute", right: 0 }}>
                    Explore
                  </a>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Card 5 (My Plans) */}
        <Grid item xs={12} md={6} lg={3}>
          <Card
            elevation={3}
            className="scrollable-div"
            sx={{ width: "360px" }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                My Plans
              </Typography>
              <Typography variant="body2" gutterBottom>
                Here you can check all your Marketplace Plans with Different
                Features & Functionalities.
              </Typography>

              <Box sx={{ marginBottom: "16px" }}>
                <Typography variant="h6">Current Plan</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Basic Plan
                </Typography>
                <Typography>Pricing - $15.00/Month</Typography>
                <Typography>Storage - 3GB</Typography>
              </Box>

              <Box sx={{ marginBottom: "16px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Executive Plan
                </Typography>
                <Typography>Pricing - $40.00/Month</Typography>
                <Typography>Storage - 5GB</Typography>
              </Box>

              <Box sx={{ marginBottom: "16px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Pro Plan
                </Typography>
                <Typography>Pricing - $60.00/Month</Typography>
                <Typography>Storage - 15GB</Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "16px", my: 2 }}
              >
                VIEW DETAILS
              </Button>
              <Typography variant="body2" fontStyle="italic">
                Click on the Button above to check all the Details of plans.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
