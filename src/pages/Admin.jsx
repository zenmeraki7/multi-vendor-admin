import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import BackupIcon from "@mui/icons-material/Backup";
import { BASE_URL } from "../utils/baseUrl";
import { Link } from "react-router-dom";

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

        setAdminData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

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
                <button
                  style={{
                    background: "linear-gradient(45deg, #556cd6, #19857b)",
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginLeft: "100px",
                  }}
                >
                  <LogoutIcon />
                </button>
              </Link>
            </div>
            <div className="col-6">
              <label
                htmlFor="image-upload"
                style={{
                  background: "linear-gradient(45deg, #556cd6, #19857b)",

                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginRight: "110px",
                  cursor: "pointer", // Makes it clickable
                }}
              >
                <BackupIcon />
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
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="fullName"
                type="text"
                value={adminData.fullName || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={adminData.email || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={adminData.dob || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                value={adminData.phoneNumber || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="designation">Designation</label>
              <input
                id="designation"
                type="text"
                value={adminData.designation || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                value={adminData.role || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="role">State</label>
              <input
                id="state"
                type="state"
                value={adminData.state || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label htmlFor="role">Country</label>
              <input
                id="country"
                type="text"
                value={adminData.country || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3"
            style={{
              color: "#fff",
              background: "linear-gradient(45deg, #556cd6, #19857b)",

              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <SaveIcon /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
