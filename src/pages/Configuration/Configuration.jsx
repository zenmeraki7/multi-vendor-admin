import React, { useState } from "react";

import { AlertCircle, Info } from 'lucide-react';
// import { ToggleButton } from "react-bootstrap";

const Configuration = () => {
  const [paymentMethodRequired, setPaymentMethodRequired] = useState(false);
  const [mandatoryFields, setMandatoryFields] = useState({
    sellerName: false,
    shopName: false,
  });
  const [settings, setSettings] = useState({
    allowFulfillItem: false,
    autoApproveSeller: false,
    addByCsv: false,
    viewCustomerDetails: false,
    viewCustomerEmail: false,
    viewCustomerContact: false,
    restrictSellerSignup: false,
    emailVerification: false,
    useOwnCurrency: false,
    changeWeightUnit: false,
    restrictFeedback: false,
    updateSellerHandle: false,
    redirectEmailVerification: false,
    addShopNameAtSignup: false,
    autoApproveFeedback: false,
    advanceFeedback: false,
    ssoEnabled: false
    

  });

  const [sellerPolicy, setSellerPolicy] = useState('normal');
  const [sellerSignupOption, setSellerSignupOption] = useState('email');
  const [viewTotalDue, setViewTotalDue] = useState(false);
  const [lowInventoryNotification, setLowInventoryNotification] = useState(false);

  
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '24px'
    },

    breadcrumb: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '24px',
      padding: '24px'
    },
    cardHeader: {
      marginBottom: '16px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#666',
      fontSize: '16px'
    },
    section: {
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px'
    },
    switch: {
      position: 'relative',
      display: 'inline-block',
      width: '60px',
      height: '34px',
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    switchSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '0.4s',
      borderRadius: '34px',
      border: '2px solid #ccc'
    },
    switchSliderButton: {
      position: 'absolute',
      content: '""',
      height: '26px',
      width: '26px',
      left: '2px',
      bottom: '2px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      transform: 'translateX(0)'
    },
    switchSliderButtonChecked: {
      transform: 'translateX(26px)',
      backgroundColor: 'white'
    },
    switchSliderChecked: {
      backgroundColor: '#2196F3',
      borderColor: '#2196F3'
    },
    switchLabel: {
      fontSize: '12px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'white',
      fontWeight: '600',
      userSelect: 'none',
      textTransform: 'uppercase'
    },
    switchLabelOn: {
      right: '6px',
      display: 'none'
    },
    switchLabelOff: {
      left: '6px'
    },
    switchContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    },
    switchText: {
      flex: 1,
      marginRight: '20px'
    },
    switchTitle: {
      fontWeight: '600',
      marginBottom: '8px',
      color: '#333'
    },
    switchDescription: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.5'
    },
    warning: {
      display: 'flex',
      gap: '8px',
      backgroundColor: '#fff3cd',
      padding: '16px',
      borderRadius: '8px',
      color: '#856404'
    },
    warningIcon: {
      flexShrink: 0
    },
    checkboxContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkbox: {
      width: '16px',
      height: '16px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500'
    },
    settingSection: {
      marginBottom: '24px',
      borderBottom: '1px solid #eee',
      paddingBottom: '24px'
    },
    settingTitle: {
      fontSize: '16px',
      color: '#333',
      fontWeight: '600',
      marginBottom: '8px'
    },
    settingDescription: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '16px'
    },
    toggleWrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    toggleContainer: {
      width: '70px',
      height: '34px',
      position: 'relative',
      cursor: 'pointer',
      background: 'transparent',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '2px',
      overflow: 'hidden'
    },
    noButton: {
      width: '50%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: '#dc3545',
      borderRadius: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'opacity 0.3s ease'
    },
    yesButton: {
      width: '50%',
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      backgroundColor: '#4CAF50',
      borderRadius: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'opacity 0.3s ease'
    },
    inactiveButton: {
      opacity: 0.3
    },
    activeButton: {
      opacity: 1
    },
    settingSection: {
      marginBottom: '24px',
      borderBottom: '1px solid #eee',
      paddingBottom: '20px'
    },
    settingTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px'
    },
    settingDescription: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '20px'
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    noteContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderLeft: '4px solid #17a2b8',
      marginBottom: '20px'
    },
    noteText: {
      fontSize: '14px',
      color: '#666',
      margin: 0,
      fontStyle: 'italic'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '14px',
      color: '#333'
    },
    
  }
  const additionalStyles = {
    infoNote: {
      color: '#666',
      fontStyle: 'italic',
      fontSize: '14px',
      marginTop: '8px'
    }
  };

  const ToggleButton = ({ isActive, onChange }) => (
    <div 
      style={styles.toggleContainer} 
      onClick={onChange}
    >
      <div style={{
        ...styles.noButton,
        ...(isActive ? styles.inactiveButton : styles.activeButton)
      }}>
        NO
      </div>
      <div style={{
        ...styles.yesButton,
        ...(isActive ? styles.activeButton : styles.inactiveButton)
      }}>
        YES
      </div>
    </div>
  );

  return (
    <div style={styles.container}>

      <div style={styles.breadcrumb}>
        DASHBOARD / SELLER MANDATORY CONFIGURATION
      </div>

      {/* Main Content */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.title}>Seller Mandatory Configurations</h2>
          <p style={styles.subtitle}>
            Here you need to set the mandatory configurations for the sellers that they need to configure in the seller panel to add the product.
          </p>
        </div>
      </div>

      {/* Payment Details */}

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>PAYMENT DETAILS</h3>
        <div style={styles.switchContainer}>
          <div style={styles.switchText}>
            <h4 style={styles.switchTitle}>SET PAYMENT METHOD</h4>
            <p style={styles.switchDescription}>
              From this option, you can make it mandatory for sellers to set a payment method to receive their earnings.
            </p>
          </div>
          <label style={styles.switch}>
            <input
              type="checkbox"
              style={styles.switchInput}
              checked={paymentMethodRequired}
              onChange={(e) => setPaymentMethodRequired(e.target.checked)}
            />
            <span style={{
              ...styles.switchSlider,
              ...(paymentMethodRequired ? styles.switchSliderChecked : {})
            }}>
              <span style={{
                ...styles.switchSliderButton,
                ...(paymentMethodRequired ? styles.switchSliderButtonChecked : {})
              }} />
              <span style={{ ...styles.switchLabel, ...styles.switchLabelOff }}>
                {!paymentMethodRequired && 'OFF'}
              </span>
              <span style={{
                ...styles.switchLabel,
                ...styles.switchLabelOn,
                display: paymentMethodRequired ? 'block' : 'none'
              }}>
                ON
              </span>
            </span>
          </label>
        </div>
      </div>
      <div style={styles.warningContainer}>

        <div style={styles.warning}>
          <AlertCircle style={styles.warningIcon} />
          <div style={styles.warningContent}>
            <div style={styles.warningTitle}>
              <span>WARNING:</span>
            </div>
            <p style={styles.warningText}>
              In case you make the configurations mandatory for the sellers, the sellers need to configure the required details then only the "Add Product" option will appear in the seller panel.
            </p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div style={styles.card} className="mt-4">
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>MY ACCOUNT DETAILS</h3>
          <h4 style={{ fontWeight: '500', marginBottom: '16px' }}>SET MANDATORY FIELDS FOR SELLER ACCOUNT</h4>
          <div style={styles.checkboxContainer}>
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={mandatoryFields.sellerName}
                onChange={(e) => setMandatoryFields(prev => ({ ...prev, sellerName: e.target.checked }))}
              />
              <label style={styles.label}>SELLER NAME</label>
            </div>
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={mandatoryFields.shopName}
                onChange={(e) => setMandatoryFields(prev => ({ ...prev, shopName: e.target.checked }))}
              />
              <label style={styles.label}>SHOP NAME</label>
            </div>
          </div>
        </div>
      </div>


      <div style={styles.container}>
        <div style={styles.sectionContainer}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
            SELLER CONFIGURATION
          </h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Configure your Seller's here.
          </p>

          {/* Allow Seller to Fulfill Item */}
          <div style={styles.settingSection}>
            <h3 style={styles.settingTitle}>ALLOW SELLER TO FULFILL ITEM</h3>
            <ToggleButton
              isActive={settings.allowFulfillItem}
              onChange={() => setSettings(prev => ({
                ...prev,
                allowFulfillItem: !prev.allowFulfillItem
              }))}
            />
            <p style={styles.settingDescription}>
              From this Option, You can allow the sellers to fulfill their order products.
            </p>
          </div>

          {/* Auto Approve Seller */}
          <div style={styles.settingSection}>
            <h3 style={styles.settingTitle}>AUTO APPROVE SELLER</h3>
            <ToggleButton
              isActive={settings.autoApproveSeller}
              onChange={() => setSettings(prev => ({
                ...prev,
                autoApproveSeller: !prev.autoApproveSeller
              }))}
            />
            <p style={styles.settingDescription}>
              From this Option, You can approve a new seller automatically.
            </p>
          </div>

          {/* Seller Add by CSV */}
          <div style={styles.settingSection}>
            <h3 style={styles.settingTitle}>SELLER ADD BY CSV</h3>
            <ToggleButton
              isActive={settings.addByCsv}
              onChange={() => setSettings(prev => ({
                ...prev,
                addByCsv: !prev.addByCsv
              }))}
            />
            <p style={styles.settingDescription}>
              From this Option, You can add new sellers in your store by uploading a CSV file containing seller details.
            </p>
          </div>

          {/* Allow Seller to View Customer Details */}
          <div style={styles.settingSection}>
            <h3 style={styles.settingTitle}>ALLOW SELLER TO VIEW CUSTOMER DETAILS</h3>
            <ToggleButton
              isActive={settings.viewCustomerDetails}
              onChange={() => setSettings(prev => ({
                ...prev,
                viewCustomerDetails: !prev.viewCustomerDetails
              }))}
            />
            <p style={styles.settingDescription}>
              From this Option, You can allow sellers to view customer details for their orders.
            </p>
          </div>
          <div style={styles.settingSection}>
            <h4 style={styles.settingTitle}>ALLOW SELLER TO VIEW CUSTOMER EMAIL</h4>
            <ToggleButton
              isActive={settings.viewCustomerEmail}
              onChange={() => setSettings(prev => ({
                ...prev,
                viewCustomerEmail: !prev.viewCustomerEmail
              }))}
            />
            <p style={styles.settingDescription}>
              From this Option, You can allow seller to view customer email.
            </p>
          </div>

          <div style={styles.settingSection}>
            <h4 style={styles.settingTitle}>ALLOW SELLER TO VIEW CUSTOMER CONTACT NUMBER</h4>
            <ToggleButton
              isActive={settings.viewCustomerContact}
              onChange={() => setSettings(prev => ({
                ...prev,
                viewCustomerContact: !prev.viewCustomerContact
              }))}
            />
            <p style={styles.settingDescription}>
              From this Option, You can allow seller to view customer contact number.
            </p>
          </div>
        </div>

        {/* Seller Policy */}
        <div style={styles.settingSection}>
          <h3 style={styles.sectionTitle}>SELLER POLICY</h3>
          <select
            style={styles.select}
            value={sellerPolicy}
            onChange={(e) => setSellerPolicy(e.target.value)}
          >
            <option value="normal">Normal Seller Policy</option>
            <option value="strict">Strict Seller Policy</option>
            <option value="lenient">Lenient Seller Policy</option>
          </select>
        </div>

        {/* Restrict Seller Signup */}
        <div style={styles.settingSection}>
          <h3 style={styles.sectionTitle}>RESTRICT SELLER SIGNUP</h3>
          <ToggleButton
            isActive={settings.restrictSellerSignup}
            onChange={() => setSettings(prev => ({
              ...prev,
              restrictSellerSignup: !prev.restrictSellerSignup
            }))}
          />
          <p style={styles.settingDescription}>
            Enable this option to restrict new seller signups.
          </p>
        </div>

        {/* Email Verification */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>SELLER EMAIL VERIFICATION</h3>
        <ToggleButton
          isActive={settings.emailVerification}
          onChange={() => setSettings(prev => ({
            ...prev,
            emailVerification: !prev.emailVerification
          }))}
        />
        <p style={styles.settingDescription}>
          From this option, you can verify your sellers email before Sign in.
        </p>
      </div>

      {/* Currency Settings */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>ALLOW SELLER TO USE THEIR OWN CURRENCY</h3>
        <ToggleButton
          isActive={settings.useOwnCurrency}
          onChange={() => setSettings(prev => ({
            ...prev,
            useOwnCurrency: !prev.useOwnCurrency
          }))}
        />
        <p style={styles.settingDescription}>
          From this option, Seller can add product price in its own currency. <a href="#" style={styles.link}>Learn More</a>
        </p>
      </div>

      {/* Weight Unit Settings */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>ALLOW SELLER TO CHANGE WEIGHT UNIT</h3>
        <ToggleButton
          isActive={settings.changeWeightUnit}
          onChange={() => setSettings(prev => ({
            ...prev,
            changeWeightUnit: !prev.changeWeightUnit
          }))}
        />
        <p style={styles.settingDescription}>
          From this option, Seller can add/update product weight unit.
        </p>
      </div>

      {/* Feedback Settings */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>RESTRICT SELLER TO DISABLE FEEDBACK</h3>
        <ToggleButton
          isActive={settings.restrictFeedback}
          onChange={() => setSettings(prev => ({
            ...prev,
            restrictFeedback: !prev.restrictFeedback
          }))}
        />
        <p style={styles.settingDescription}>
          From this option, you can restrict sellers from disabling feedback on their products.
        </p>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#333',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ↑
      </button>
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>UPDATE SELLER HANDLE</h3>
        <ToggleButton
          isActive={settings.updateSellerHandle}
          onChange={() => setSettings(prev => ({
            ...prev,
            updateSellerHandle: !prev.updateSellerHandle
          }))}
        />
        <p style={styles.settingDescription}>
          Enabling this option, you can update seller handle.
        </p>
      </div>

      {/* Email Verification Redirect */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>ALLOW TO REDIRECT NEW PAGE FOR SELLER EMAIL VERIFICATION</h3>
        <ToggleButton
          isActive={settings.redirectEmailVerification}
          onChange={() => setSettings(prev => ({
            ...prev,
            redirectEmailVerification: !prev.redirectEmailVerification
          }))}
        />
        <p style={styles.settingDescription}>
          From this option, you can verify your sellers email before Sign-in another page.
        </p>
      </div>

      {/* Shop Name at Signup */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>ALLOW SELLER TO ADD SHOP NAME AT SIGNUP PAGE</h3>
        <ToggleButton
          isActive={settings.addShopNameAtSignup}
          onChange={() => setSettings(prev => ({
            ...prev,
            addShopNameAtSignup: !prev.addShopNameAtSignup
          }))}
        />
        <p style={styles.settingDescription}>
          From this option, Seller will add the shop name at signup page.
        </p>
      </div>

      {/* Auto Approve Feedback */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>AUTO APPROVE SELLER FEEDBACK</h3>
        <ToggleButton
          isActive={settings.autoApproveFeedback}
          onChange={() => setSettings(prev => ({
            ...prev,
            autoApproveFeedback: !prev.autoApproveFeedback
          }))}
        />
        <p style={styles.settingDescription}>
          From this option all seller feedbacks will be auto approved.
        </p>
      </div>

      {/* Advance Seller Feedback */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>ADVANCE SELLER FEEDBACK</h3>
        <ToggleButton
          isActive={settings.advanceFeedback}
          onChange={() => setSettings(prev => ({
            ...prev,
            advanceFeedback: !prev.advanceFeedback
          }))}
        />
        <p style={styles.settingDescription}>
          From this option advance feedback option will be enabled
        </p>
        <div style={styles.noteContainer}>
          <Info size={16} color="#17a2b8" />
          <p style={styles.noteText}>
            In order to use Advance Feedback you need to create and enable atleast one feedback option.
          </p>
        </div>
      </div>

      {/* SSO for Seller */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>SSO (SINGLE SIGN ON) FOR SELLER</h3>
        <ToggleButton
          isActive={settings.ssoEnabled}
          onChange={() => setSettings(prev => ({
            ...prev,
            ssoEnabled: !prev.ssoEnabled
          }))}
        />
        <p style={styles.settingDescription}>
          From this option SSO "Single Sign ON" will be enabled
        </p>
        <div style={styles.noteContainer}>
          <Info size={16} color="#17a2b8" />
          <p style={styles.noteText}>
            In Order to use SSO feature you need to add store name from SSO config.
          </p>
        </div>
      </div>

      {/* Seller Signup Option */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>SELLER SIGNUP OPTION</h3>
        <select 
          style={styles.select}
          value={sellerSignupOption}
          onChange={(e) => setSellerSignupOption(e.target.value)}
        >
          <option value="email">EMAIL</option>
          <option value="phone">PHONE</option>
          <option value="both">BOTH</option>
        </select>
      </div>

      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>ALLOW SELLER TO VIEW TOTAL DUE (SELLER EARNING)</h3>
        <ToggleButton
          isActive={viewTotalDue}
          onChange={() => setViewTotalDue(prev => !prev)}
        />
        <p style={styles.settingDescription}>
          From this option Allow Seller To View Total Due (Seller Earning) On Seller Dashboard
        </p>
      </div>

      {/* Low Inventory Notification Setting */}
      <div style={styles.settingSection}>
        <h3 style={styles.settingTitle}>SEND MAIL NOTIFICATION TO SELLERS ON LOW INVENTORY</h3>
        <ToggleButton
          isActive={lowInventoryNotification}
          onChange={() => setLowInventoryNotification(prev => !prev)}
        />
        <p style={styles.settingDescription}>
          By using this feature, you can inform the seller via email about product's low inventory.
        </p>
      </div>

      {/* Additional note about seller signup */}
      <div style={styles.settingSection}>
        <p style={additionalStyles.infoNote}>
          This configuration provides sellers to Signup & Signin by Email, Contact Number or both.
        </p>
      </div>

      
    
    </div>


    </div >
  );
};

export default Configuration;
