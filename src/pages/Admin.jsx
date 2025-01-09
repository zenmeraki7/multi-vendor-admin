import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
function Admin() {
  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Left Profile Section */}
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
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOYjBEK4eaJZnQcg651SM1OyzuzWXY9JZrqYM6fL0_BlEiZmSmDQst0lxjdKHDRRRTc2QdZCtF79H01fEb_u5eXQ"
            alt="Admin"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <h3>Admin</h3>

          <p style={{ marginTop: "10px", color: "gray" }}>
            Last visit at 27/12/2024
          </p>
          <button
            style={{
              background: "linear-gradient(to right,rgb(230, 75, 77),rgb(227, 131, 82))", 
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginLeft: "140px",
            }}
          >
            <LogoutIcon /> 
          </button>

          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <p>
              <strong>Email:</strong> admin@gmail.com
            </p>
          
            <p>
              <strong>Phone:</strong> 9437999888
            </p>
          </div>
        </div>

        {/* Right Profile Details Section */}
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
            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* DOB */}
            <div>
              <label htmlFor="birthday">DOB</label>
              <input
                id="birthday"
                type="date"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="pwd">Password</label>
              <input
                id="pwd"
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* City */}
            <div>
              <label htmlFor="designation">Designation</label>
              <input
                id="designation"
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* Birthday */}
            <div>
              <label htmlFor="role">Role</label>
              <input
                id="birthday"
                type="text"
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
              background:
                "linear-gradient(to right,rgb(66, 182, 197),rgb(16, 168, 161))",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <SaveIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
