import React from "react";

const Admin = () => {
  return (
    <div style={{ padding: "30px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Left Profile Section */}
        <div style={{
          flex: "1 1 300px", 
          backgroundColor: "#fff", 
          padding: "20px", 
          borderRadius: "10px", 
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
          textAlign: "center"
        }}>
          <img 
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOYjBEK4eaJZnQcg651SM1OyzuzWXY9JZrqYM6fL0_BlEiZmSmDQst0lxjdKHDRRRTc2QdZCtF79H01fEb_u5eXQ" 
            alt="Admin" 
            style={{ width: "200px", height: "200px", borderRadius: "50%", marginBottom: "10px" }} 
          />
          <h3>Admin</h3>
        
          <p style={{ marginTop: "10px", color: "gray" }}>Last visit at 27/12/2024</p>
          <button style={{
            backgroundColor: "red", 
            color: "#fff", 
            border: "none", 
            padding: "10px", 
            borderRadius: "5px", 
            marginTop: "20px"
          }}>
            LOG OUT
          </button>
          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <p><strong>Email:</strong> admin@gmail.com</p>
            <p><strong>Country:</strong> India</p>
            <p><strong>Phone:</strong> 9437999888</p>
          </div>
        </div>

        {/* Right Profile Details Section */}
        <div style={{
          flex: "2 1 600px", 
          backgroundColor: "#fff", 
          padding: "20px", 
          borderRadius: "10px", 
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ marginBottom: "20px" }}>My Profile Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input 
                id="name" 
                type="text" 
                defaultValue="Admin" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
                
              />
            </div>
            {/* Street Address */}
            <div>
              <label htmlFor="address">Street Address</label>
              <input 
                id="address" 
                type="text" 
                defaultValue="abc" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                defaultValue="admin@gmail.com" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
                
              />
            </div>
            {/* Zip Code */}
            <div>
              <label htmlFor="zip">Zip Code</label>
              <input 
                id="zip" 
                type="text" 
                defaultValue="123543" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
                
              />
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input 
                id="phone" 
                type="text" 
                defaultValue="9437999888" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
             
              />
            </div>
            {/* City */}
            <div>
              <label htmlFor="city">City</label>
              <input 
                id="city" 
                type="text" 
                defaultValue="Cochin" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
     
              />
            </div>
            {/* Birthday */}
            <div>
              <label htmlFor="birthday">Birthday</label>
              <input 
                id="birthday" 
                type="date" 
                defaultValue="2002-03-13" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
               
              />
            </div>
            {/* Country */}
            <div>
              <label htmlFor="country">Country</label>
              <select 
                id="country" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
            
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            {/* Gender */}
            <div>
              <label htmlFor="gender">Gender</label>
              <input 
                id="gender" 
                type="text" 
                defaultValue="Male" 
                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }} 
             
              />
            </div>
           
          </div>
          <button className="btn btn-primary mt-3">
              Save
            </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
