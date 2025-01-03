import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/baseUrl";

function removeHtmlTags(str) {
  return str.replace(/<[^>]*>/g, "");
}

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/product/get-one/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
          },
        }
      );
      console.log(response);
      setProduct(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching product data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating.average ? <Star key={i} /> : <StarBorder key={i} />
      );
    }
    return stars;
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side - Product Info */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              alt={product.thumbnail.altText}
              height="300"
              image={product.thumbnail.url}
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="h5">{product.title}</Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {removeHtmlTags(product.description)}
              </Typography>
              <Divider sx={{ marginBottom: 1 }} />
              <Typography variant="h6">
                Price: ₹{product.discountedPrice || product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brand: {product.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {product.category?.name || "Not available"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sub-category: {product.subcategory?.name || "Not available"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Main Category Type:{" "}
                {product.categoryType?.name || "Not available"}
              </Typography>
              <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
              <Typography variant="h6">Stock: {product.stock}</Typography>
              <Typography variant="body2" color="text.secondary">
                Sold: {product.productSold} units
              </Typography>
              <Stack sx={{ marginTop: 2 }} direction={"row"} spacing={2}>
                <Chip
                  label={product.inStock ? "In Stock" : "Out of Stock"}
                  color={product.inStock ? "success" : "error"}
                />
                {/* Chip for isActive */}
                <Chip
                  label={product.isActive ? "Active" : "Inactive"}
                  color={product.isActive ? "success" : "default"}
                />
                {/* Chip for isApproved */}
                <Chip
                  label={product.isApproved ? "Approved" : "Not Approved"}
                  color={product.isApproved ? "success" : "error"}
                />
              </Stack>
            </CardContent>
          </Card>
          {/* Offers */}
          <Grid mt={2} item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Special Offers</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {product.offers && product.offers.length > 0 ? (
                product.offers.map((offer, index) => (
                  <Box key={index} sx={{ marginBottom: 2 }}>
                    <Typography variant="body2">
                      <strong>{offer.title}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.description}
                    </Typography>
                    <Typography variant="body2">
                      Discount: {offer.discountPercentage}% | Valid until:{" "}
                      {new Date(offer.validUntil).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No special offers provided yet.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Right Side - Additional Information */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Specifications */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Specifications</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {product.specifications &&
                product.specifications.length > 0 &&
                product.specifications[0].key ? (
                  product.specifications.map((spec, index) => (
                    <Typography key={index} variant="body2">
                      <strong>{spec.key}:</strong> {spec.value}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Specifications not provided.
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Product Variants */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Variants</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {product.variants && product.variants.length > 0 ? (
                  product.variants.map((variant, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <Typography variant="body2">
                        <strong>{variant.attribute}:</strong> {variant.value} |
                        Additional Price: ${variant.additionalPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Stock: {variant.stock}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Variants not provided.
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Return Policy */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Return Policy</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body2">
                  <strong>Returnable:</strong>{" "}
                  {product.returnPolicy.isReturnable ? "Yes" : "No"}
                </Typography>
                {product.returnPolicy.isReturnable && (
                  <Typography variant="body2">
                    <strong>Return Window:</strong>{" "}
                    {product.returnPolicy.returnWindow} days
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Metadata - Meta Title and Description */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Metadata</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body2">
                  <strong>SEO Meta Title:</strong>{" "}
                  {product.meta.title || "Not available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>SEO Meta Description:</strong>{" "}
                  {product.meta.description || "Not available"}
                </Typography>
              </Paper>
            </Grid>

            {/* Seller Info */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Seller Information</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body2">
                  <strong>Seller :</strong>{" "}
                  {product.seller?.companyName || "Not available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Contact Info:</strong>{" "}
                  {product.seller?.email || "Not available"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Product Images Gallery */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Product Images</Typography>
        <Grid container spacing={2}>
          {product.images.map((image, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card variant="outlined">
                <CardMedia
                  component="img"
                  alt={image.altText}
                  height="200"
                  image={image.url}
                  sx={{ objectFit: "contain" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Footer Section - Rating and Action Buttons */}
      <Box sx={{ marginTop: 4 }}>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h6">Product Rating</Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">
              Average Rating: {product.rating.average}
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: 2 }}>
              ({product.rating.count} Reviews)
            </Typography>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary">
              Edit Product
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewProduct;
