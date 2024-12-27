import React, { useState } from "react";
import JoditEditor from "jodit-react";
import AddVariant from "../components/AddVariant";

function AddProduct() {
  const [productImages, setProductImages] = useState([]);
  const [features, setFeatures] = useState([{ name: "", details: "" }]);
  const [offers, setOffers] = useState([{ name: "", details: "" }]); // Added missing offers state
  const [description, setDescription] = useState("");

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

  const config = {
    readonly: false,
  };

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "10px auto" }}>
      <h2>Add Product</h2>
      <br />
      <div style={{ display: "flex", gap: "30px" }}>
        {/* Image Upload Section */}
        <div style={{ flex: "1" }}>
          <h3>Product Images</h3>
          <br />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {[...Array(4)].map((_, index) => (
              <label key={index} style={{ cursor: "pointer" }}>
                <input type="file" style={{ display: "none" }} />
                <img
                  src="https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                  alt=""
                  height={"100px"}
                  width={"100px"}
                />
              </label>
            ))}
          </div>
          <div style={{ marginTop: "20px" }}>
            <h3>Product Thumbnail</h3>
            <br />
            <label style={{ cursor: "pointer" }}>
              <input type="file" style={{ display: "none" }} />
              <img
                src="https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png"
                alt=""
                height={"100px"}
                width={"100px"}
              />
            </label>
          </div>

          {/* Product Description Editor */}
          <div style={{ marginTop: "20px" }}>
            <h3>Product Description</h3>
            <JoditEditor
              value={description}
              config={config}
              onChange={(newContent) => setDescription(newContent)}
            />
          </div>
        </div>

        {/* Form Section */}
        <div style={{ flex: "1" }}>
          <form>
            {/* Product Name */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Enter product name"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  paddingRight: "2px",
                }}
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
                { id: "brandName", label: "Brand Name", placeholder: "Enter brand name" },
                { id: "category", label: "Category", placeholder: "Select Category", type: "select" },
                { id: "subcategory", label: "Sub-Category ", placeholder: "Enter Sub-category price", type: "select" },
                { id: "salePrice", label: "Sale Price", placeholder: "Enter sale price", type: "number" },
                { id: "stockQuantity", label: "Stock Quantity", placeholder: "Enter stock quantity", type: "number" },
              ].map((input, index) => (
                <div key={index}>
                  <label htmlFor={input.id}>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      id={input.id}
                      name={input.id}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    >
                      <option value="">{input.placeholder}</option>
                    </select>
                  ) : (
                    <input
                      type={input.type || "text"}
                      id={input.id}
                      name={input.id}
                      placeholder={input.placeholder}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        paddingRight: "2px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ marginBottom: "20px" }}>
              <h3>Specifications</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                {features.map((feature, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Enter feature name"
                      value={feature.name}
                      onChange={(e) => {
                        const updatedFeatures = [...features];
                        updatedFeatures[index].name = e.target.value;
                        setFeatures(updatedFeatures);
                      }}
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                         width:'200px'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Enter feature details"
                      value={feature.details}
                      onChange={(e) => {
                        const updatedFeatures = [...features];
                        updatedFeatures[index].details = e.target.value;
                        setFeatures(updatedFeatures);
                      }}
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                         width:'200px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      style={{
                        backgroundColor: "red",
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
                <AddVariant />
              </div>
            </div>

            {/* Offers */}
            <div style={{ marginBottom: "20px" }}>
              <h3>Offers</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  
                }}
              >
                {offers.map((offer, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Enter offer name"
                      value={offer.name}
                      onChange={(e) => {
                        const updatedOffers = [...offers];
                        updatedOffers[index].name = e.target.value;
                        setOffers(updatedOffers);
                      }}
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        width:'200px'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Enter offer details"
                      value={offer.details}
                      onChange={(e) => {
                        const updatedOffers = [...offers];
                        updatedOffers[index].details = e.target.value;
                        setOffers(updatedOffers);
                      }}
                      style={{
                        flex: "1",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        width:'200px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOffer(index)}
                      style={{
                        backgroundColor: "red",
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;