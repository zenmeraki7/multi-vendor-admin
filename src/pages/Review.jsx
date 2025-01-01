import React from "react";
import { Container, Grid, Typography, Avatar, Box, Pagination } from "@mui/material";

function Review() {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid container spacing={4} direction="column">
        {/* First Review */}
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt="Gavin Casalegno"
                src="https://static.tvtropes.org/pmwiki/pub/images/gavincasalegno.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Gavin Casalegno
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt convallis, dui lorem facilisis odio, nec elementum justo sapien in odio.
              </Typography>
              <Box sx={{ display: "flex", marginTop: 1 }}>
                <Typography>⭐⭐⭐⭐⭐</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Second Review */}
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt="Chase Stokes"
                src="https://people.com/thmb/S-AGpRKaWMxHagJKTdlXc6XpV6M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2)/chase-stokes-02-85f1a55be1e049e39a21f28a8b25bb4d.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Chase Stokes
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt convallis, dui lorem facilisis odio, nec elementum justo sapien in odio.
              </Typography>
              <Box sx={{ display: "flex", marginTop: 1 }}>
                <Typography>⭐⭐⭐⭐⭐</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Third Review */}
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt="Christopher Briney"
                src="https://assets.teenvogue.com/photos/64d52ddddb2cea00fdca323c/master/pass/HALE_ChristopherBriney_355.jpg"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Christopher Briney
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt convallis, dui lorem facilisis odio, nec elementum justo sapien in odio.
              </Typography>
              <Box sx={{ display: "flex", marginTop: 1 }}>
                <Typography>⭐⭐⭐⭐⭐</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Container>
  );
}

export default Review;
