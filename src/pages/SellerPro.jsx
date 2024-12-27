import React from "react";
import "./SellerPro.css"; // Separate CSS file for styling

const SellerPro = () => {
  return (
    <div className="seller-profile-container">
      <h1>Seller Profile</h1>

      {/* Personal Details Section */}
      <section className="profile-section">
        <h3>Personal Details</h3>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Enter your full name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />

        <label htmlFor="phoneNum">Phone Number</label>
        <input type="text" id="phoneNum" placeholder="Enter your phone number" />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" placeholder="Enter your address" />

        <label htmlFor="zipCode">Zip Code</label>
        <input type="number" id="zipCode" placeholder="Enter your zip code" />

        <label htmlFor="city">City</label>
        <input type="text" id="city" placeholder="Enter your city" />

        <label htmlFor="state">State</label>
        <input type="text" id="state" placeholder="Enter your state" />

        <label htmlFor="country">Country</label>
        <input type="text" id="country" placeholder="Enter your country" />
      </section>

      {/* Company Details Section */}
      <section className="profile-section">
        <h3>Company Details</h3>
        <label htmlFor="companyName">Company Name</label>
        <input type="text" id="companyName" placeholder="Enter your company name" />

        <label htmlFor="website">Website</label>
        <input type="url" id="website" placeholder="Enter your website URL" />

        <label htmlFor="companyIcon">Company Icon</label>
        <input type="file" id="companyIcon" />
      </section>

      {/* Bank Details Section */}
      <section className="profile-section">
        <h3>Bank Details</h3>
        <label htmlFor="accountHolderName">Account Holder Name</label>
        <input type="text" id="accountHolderName" placeholder="Enter account holder name" />

        <label htmlFor="accountNumber">Account Number</label>
        <input type="text" id="accountNumber" placeholder="Enter account number" />

        <label htmlFor="ifscCode">IFSC Code</label>
        <input type="text" id="ifscCode" placeholder="Enter IFSC code" />

        <label htmlFor="bankName">Bank Name</label>
        <input type="text" id="bankName" placeholder="Enter bank name" />

        <label htmlFor="bankDocument">Upload Bank Document (e.g., Canceled Cheque)</label>
        <input type="file" id="bankDocument" />
      </section>

      {/* KYC Details Section */}
      <section className="profile-section">
        <h3>KYC Details</h3>
        <label htmlFor="panNumber">PAN Number</label>
        <input type="text" id="panNumber" placeholder="Enter PAN number" />

        <label htmlFor="panDocument">Upload PAN Document</label>
        <input type="file" id="panDocument" />

        <label htmlFor="gstNumber">GSTIN Number</label>
        <input type="text" id="gstNumber" placeholder="Enter GSTIN number" />

        <label htmlFor="gstDocument">Upload GSTIN Document</label>
        <input type="file" id="gstDocument" />
      </section>

      {/* Support Contact Section */}
      <section className="profile-section">
        <h3>Support Contact</h3>
        <label htmlFor="supportEmail">Support Email</label>
        <input type="email" id="supportEmail" placeholder="Enter support email" />

        <label htmlFor="supportPhone">Support Phone</label>
        <input type="text" id="supportPhone" placeholder="Enter support phone number" />
      </section>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default SellerPro;
