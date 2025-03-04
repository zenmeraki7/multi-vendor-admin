import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import BackupIcon from "@mui/icons-material/Backup";
import { BASE_URL } from "../utils/baseUrl";
import { Link } from "react-router-dom";
import CustomInput from "../components/SharedComponents/CustomInput"; // Importing CustomInput
import { logoutUser } from "../utils/authUtils";
import CustomButton from "../components/SharedComponents/CustomButton";

function Admin() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // New state for the profile image

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${BASE_URL}/api/admin/get-auth-admin`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setAdminData((prevData) => {
          if (JSON.stringify(prevData) !== JSON.stringify(response.data.data)) {
            return response.data.data;
          }
          return prevData;
        });

        setLoading(false);
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 404 || err.response.status === 401)
        ) {
          logoutUser(); // Call logoutUser if 404 or 401 status code
        }
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []); // ✅ Ensures it runs only once on mount

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Update profile image preview
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div
          style={{
            flex: "1 1 300px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <img
            src={
              profileImage ||
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOYjBEK4eaJZnQcg651SM1OyzuzWXY9JZrqYM6fL0_BlEiZmSmDQst0lxjdKHDRRRTc2QdZCtF79H01fEb_u5eXQ"
            } // Show selected image or default
            alt="Admin"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <h3>{adminData.fullName}</h3>
          <p style={{ marginTop: "10px", color: "gray" }}>
            Last login at: {new Date(adminData.lastLogin).toLocaleString()}
          </p>
          <div className="row display-flex">
            <div className="col-6">
              <Link to="/login">
                <CustomButton
                  variant="contained"
                  style={{ marginTop: "20px", marginLeft: "100px",width: "50px", height: "50px", minWidth: "50px" }}
                  icon={LogoutIcon}
                ></CustomButton>
              </Link>
            </div>
            <div className="col-6">
  <label
    htmlFor="image-upload"
    style={{
      backgroundColor: "#2563EB",
      marginTop: "20px",
      color: "#ffffff",
      borderRadius: "10px",
      width: "50px",
      height: "50px",
      minWidth: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1E40AF")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
  >
    <BackupIcon style={{ fontSize: "18px" }} />
  </label>
  <input
    id="image-upload"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    style={{ display: "none" }} // Hide the actual file input
  />
</div>

          </div>

          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <p>
              <strong>Email:</strong> {adminData.email}
            </p>
            <p>
              <strong>Role:</strong> {adminData.role}
            </p>
          </div>
        </div>

        <div
          style={{
            flex: "2 1 600px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>My Profile Details</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <CustomInput
              id="fullName"
              label="Name"
              value={adminData.fullName || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="email"
              label="Email"
              type="email"
              value={adminData.email || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="dob"
              label="Date of Birth"
              type="date"
              value={adminData.dob || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="phoneNumber"
              label="Phone Number"
              value={adminData.phoneNumber || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="designation"
              label="Designation"
              value={adminData.designation || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="role"
              label="Role"
              value={adminData.role || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="state"
              label="State"
              value={adminData.state || ""}
              onChange={handleInputChange}
            />
            <CustomInput
              id="country"
              label="Country"
              value={adminData.country || ""}
              onChange={handleInputChange}
            />
          </div>

          <CustomButton variant="contained" icon={SaveIcon}   style={{ marginTop: "20px" }}>
            Save
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default Admin;
