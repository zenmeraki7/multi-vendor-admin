import React, { useState, useCallback, useEffect } from "react";
import JoditEditor from "jodit-react";
import AddVariant from "../components/AddVariant";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"; // Import MUI components for select fields
import { Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import CustomInput from "../components/SharedComponents/CustomInput";
import CustomSelect from "../components/SharedComponents/CustomSelect";
import { logoutUser } from "../utils/authUtils";

function AddProduct() {
  const [productImages, setProductImages] = useState([null, null, null, null]);
  const [thumbnail, setThumbnail] = useState(null);
  const [features, setFeatures] = useState([{ name: "", details: "" }]);
  const [offers, setOffers] = useState([{ name: "", details: "" }]);
  const [description, setDescription] = useState("");
  const [categoryTypes, setCategoryType] = useState("");
  const [category, setCategory] = useState(""); // State for Category
  const [subcategory, setSubcategory] = useState(""); // State for Sub-Category
  const [categories, setCategories] = useState([]); // For storing fetched categories
  const [subcategories, setSubcategories] = useState([]); // For storing fetched subcategories
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [shippingCharge, setShippingCharge] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/all");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("/api/subcategory/all");
        setSubcategories(response.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        if (error.response && (error.response.status === 404 || error.response.status === 401)) {
          logoutUser(); // Call logoutUser if 404 or 401 status code
        }
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleFreeShippingToggle = (event) => {
    setIsFreeShipping(event.target.checked);
    if (event.target.checked) {
      setShippingCharge(""); // Reset shipping charge when Free Shipping is enabled
    }
  };
  const handleAddFeature = () => {
    setFeatures([...features, { name: "", details: "" }]);
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleAddOffer = () => {
    setOffers([...offers, { name: "", details: "" }]);
  };

  const handleRemoveOffer = (index) => {
    const updatedOffers = offers.filter((_, i) => i !== index);
    setOffers(updatedOffers);
  };

  // Debounce function for handling onChange efficiently
  const debouncedSetDescription = useCallback(
    debounce((newContent) => setDescription(newContent), 300),
    []
  );

  const config = {
    readonly: false,
  };

  // Handle image upload for individual image slots
  const handleProductImageChange = (e, index) => {
    const file = e.target.files[0];
    const newImageURL = URL.createObjectURL(file);
    const updatedProductImages = [...productImages];
    updatedProductImages[index] = newImageURL;
    setProductImages(updatedProductImages);
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const newThumbnailURL = URL.createObjectURL(file);
    setThumbnail(newThumbnailURL);
  };

  const [isReturnPolicyEnabled, setIsReturnPolicyEnabled] = useState(false);
  const [returnDays, setReturnDays] = useState("");

  const handleSwitchChange = (event) => {
    setIsReturnPolicyEnabled(event.target.checked);
  };

  const handleInputChange = (event) => {
    setReturnDays(event.target.value);
  };
  return (
    <div
      className="container"
      style={{ maxWidth: "1200px", margin: "10px auto" }}
    >
      <h2>Add Product</h2>
      <br />
      <div style={{ display: "flex", gap: "30px" }}>
        {/* Image Upload Section */}
        <div style={{ flex: "1" }}>
          <h5>Product Images</h5>
          <br />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {productImages.map((image, index) => (
              <label key={index} style={{ cursor: "pointer" }}>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleProductImageChange(e, index)}
                />
                <img
                  src={
                    image ||
                    "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                  }
                  alt={`Product Image ${index + 1}`}
                  height={"100px"}
                  width={"100px"}
                />
              </label>
            ))}
          </div>

          <div style={{ marginTop: "20px" }}>
            <h5>Product Thumbnail</h5>
            <br />
            <label style={{ cursor: "pointer" }}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleThumbnailChange}
              />
              <img
                src={
                  thumbnail ||
                  "https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                }
                alt="Thumbnail"
                height="100px"
                width="100px"
              />
            </label>
          </div>

          {/* Product Description Editor */}
          <div style={{ marginTop: "20px" }}>
            <h5>Product Description</h5>
            <JoditEditor
              value={description}
              config={config}
              onChange={debouncedSetDescription}
            />
          </div>
        </div>

        {/* Form Section */}
        <div style={{ flex: "1" }}>
          <form>
            {/* Product Name */}
            <CustomInput
              id="productname"
              name="productName"
              label="Product Name"
              placeholder="Enter product name"
            />
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                id="brandname"
                name="brandName"
                label="Brand Name"
                placeholder="Enter brand name"
              />
              <CustomSelect
                id="categoryType"
                label="Category Type"
                MenuItems={["Electronics", "Fashion", "Home"]}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomSelect
               id="category"
               label="Category"
               MenuItems={["Clothes", "Footwear"]}
              />
              <CustomSelect
                id="Sub-category"
                label="Sub-Category"
                MenuItems={["Mens", "Women"]}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
               id="originalprice"
               name="originalprice"
               label="Original Price"
               placeholder="Enter Original Price"
              type="number"
              />
              <CustomInput
                id="salePrice"
                name="salePrice"
                label="Sale Price"
                placeholder="Enter Sale Price"
                type="number"

              />
            </div>
            {/* Input Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Input Fields */}
              {[
               
                
               
                {
                  id: "stockQuantity",
                  label: "Stock Quantity",
                  placeholder: "Enter stock quantity",
                  type: "number",
                },
                {
                  id: "Tags",
                  label: "Tags",
                  placeholder: "Enter Tags",
                  type: "text",
                },
              ].map((input, index) => (
                <div key={index}>
                  <label htmlFor={input.id}>{input.label}</label>
                  {input.type === "select" ? (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ marginTop: "5px" }}
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    >
                      <InputLabel htmlFor={input.id}>
                        {input.placeholder}
                      </InputLabel>
                      <Select
                        id={input.id}
                        value={input.id === "category" ? category : subcategory}
                        onChange={(e) => {
                          if (input.id === "category")
                            setCategory(e.target.value);
                          else setSubcategory(e.target.value);
                        }}
                        label={input.placeholder}
                        fullWidth
                      >
                        <MenuItem value="" disabled>
                          <em>{input.placeholder}</em>
                        </MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="fashion">Fashion</MenuItem>
                        <MenuItem value="home">Home</MenuItem>
                        <MenuItem value="sports">Sports</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      id={input.id}
                      name={input.id}
                      placeholder={input.placeholder}
                      label={input.placeholder}
                      type={input.type || "text"}
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: "20px" }}>
              <h5>Specifications</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      type="text"
                      placeholder="Enter feature name"
                      label="Enter feature name"
                      value={feature.name}
                      onChange={(e) => {
                        const updatedFeatures = [...features];
                        updatedFeatures[index].name = e.target.value;
                        setFeatures(updatedFeatures);
                      }}
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    />
                    <TextField
                      type="text"
                      placeholder="Enter feature details"
                      label="Enter feature details"
                      value={feature.details}
                      onChange={(e) => {
                        const updatedFeatures = [...features];
                        updatedFeatures[index].details = e.target.value;
                        setFeatures(updatedFeatures);
                      }}
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={handleAddFeature}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add Specifications
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h5>Variants</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <AddVariant />
              </div>
            </div>

            {/* Shipping Details Section */}
            <div style={{ marginBottom: "20px" }}>
              <h5>Shipping Details</h5>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                {/* Weight Input */}
                <div style={{ flex: 1 }}>
                  <TextField
                    id="weight"
                    label="Weight"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      marginTop: "5px",
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#f9f9f9",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#777",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "lightblue",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "blue",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "darkblue",
                      },
                    }}
                  />
                </div>

                {/* Toggle Switch for Free Shipping */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={isFreeShipping}
                      onChange={handleFreeShippingToggle}
                      name="freeShipping"
                      color="primary"
                    />
                  }
                  label="Free Shipping"
                />
              </div>

              {/* Shipping Charge Input if Free Shipping is Disabled */}
              {!isFreeShipping && (
                <div style={{ marginTop: "10px" }}>
                  <TextField
                    id="shippingCharge"
                    label="Shipping Charge"
                    type="number"
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      marginTop: "5px",
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#f9f9f9",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#777",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "lightblue",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "blue",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "darkblue",
                      },
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={isReturnPolicyEnabled}
                    onChange={handleSwitchChange}
                    name="returnPolicySwitch"
                    color="primary"
                  />
                }
                label="Enable Return Policy"
              />
              {isReturnPolicyEnabled && (
                <TextField
                  label="Days up to which return can be done"
                  type="number"
                  value={returnDays}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h5> Meta Field</h5>
              <TextField
                id="metaName"
                name="metaName"
                label="Meta Name"
                placeholder="Title"
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: "5px",
                  borderRadius: "10px", // Rounded corners
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px", // Apply to input field
                    backgroundColor: "#f9f9f9", // Light background color
                  },
                  "& .MuiInputLabel-root": {
                    color: "#777", // Soft label color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "lightblue", // Light blue border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "blue", // Darker blue border on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkblue", // Even darker blue border on focus
                  },
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Input Fields */}
              {[
                {
                  id: "Description",
                  label: "Description",
                  placeholder: "Enter Description ",
                  type: "text",
                },
                {
                  id: "keywords",
                  label: "Keywords",
                  placeholder: "Enter Keywords",
                  type: "text",
                },
              ].map((input, index) => (
                <div key={index}>
                  <label htmlFor={input.id}>{input.label}</label>
                  {input.type === "select" ? (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      style={{ marginTop: "5px" }}
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    ></FormControl>
                  ) : (
                    <TextField
                      id={input.id}
                      name={input.id}
                      placeholder={input.placeholder}
                      label={input.placeholder}
                      type={input.type || "text"}
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Offers */}
            {/* <div style={{ marginBottom: "20px" }}>
              <h5>Offers</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {offers.map((offer, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <TextField
                      type="text"
                      placeholder="Enter offer name"
                      label="Enter offer name"
                      value={offer.name}
                      onChange={(e) => {
                        const updatedOffers = [...offers];
                        updatedOffers[index].name = e.target.value;
                        setOffers(updatedOffers);
                      }}
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    />
                    <TextField
                      type="text"
                      placeholder="Enter offer details"
                      label="Enter offer details"
                      value={offer.details}
                      onChange={(e) => {
                        const updatedOffers = [...offers];
                        updatedOffers[index].details = e.target.value;
                        setOffers(updatedOffers);
                      }}
                      fullWidth
                      variant="outlined"
                      sx={{
                        marginTop: "5px",
                        borderRadius: "10px", // Rounded corners
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px", // Apply to input field
                          backgroundColor: "#f9f9f9", // Light background color
                        },
                        "& .MuiInputLabel-root": {
                          color: "#777", // Soft label color
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "lightblue", // Light blue border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "blue", // Darker blue border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkblue", // Even darker blue border on focus
                        },
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOffer(index)}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={handleAddOffer}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add Offers
                </button>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

// Debounce function to avoid too frequent updates
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default AddProduct;
