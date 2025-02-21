import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbox() {
  const [expanded, setExpanded] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleExpand = (itemText) => {
    setExpanded(expanded === itemText ? "" : itemText);
  };

  const menuItems = [
    { text: "Overview", icon: "📊", path: "/" },
    {
      text: "Sellers",
      icon: "👥",
      subItems: [
        { text: "Sellers Listing", icon: "📋", path: "/sellers" },
        {
          text: "Seller Form Settings",
          icon: "⚙️",
          path: "/seller-form-settings",
        },
        { text: "Shop Page Settings", icon: "🏪", path: "/shop-page-settings" },
      ],
    },
    { text: "Orders", icon: "📦", path: "/orders" },
    { text: "User Details", icon: "👤", path: "/user" },
    { text: "Reviews", icon: "⭐", path: "/reviews" },
    {
      text: "Product Management",
      icon: "🛍️",
      subItems: [{ text: "Product List", icon: "📝", path: "/product-list" }],
    },
    {
      text: "Manage Categories",
      icon: "📁",
      subItems: [
        { text: "Category-Type", icon: "🏷️", path: "/category-type" },
        { text: "Category", icon: "📑", path: "/category" },
        { text: "Subcategory", icon: "📂", path: "/sub-category" },
      ],
    },
    { text: "Bank Management", icon: "🏦", path: "/bank-management" },
    { text: "Country Management", icon: "🌎", path: "/country-management" },
    { text: "State Management", icon: "🏛️", path: "/state-management" },
    { text: "Transaction", icon: "💳", path: "/transaction" },
    { text: "Configuration", icon: "🛠️", path: "/configuration" },
    {
      text: "Settings",
      icon: "⚙️",
      subItems: [{ text: "General Settings", icon: "🔧", path: "/" }],
    },
  ];

  const MenuItem = ({ item, depth = 0 }) => {
    const isActive = location.pathname === item.path;
    const hasSubItems = item.subItems?.length > 0;
    const isExpanded = expanded === item.text;

    return (
      <div style={{ marginBottom: "4px" }}>
        <div
          onClick={() =>
            hasSubItems ? handleExpand(item.text) : navigate(item.path)
          }
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            marginLeft: `${depth * 16}px`,
            borderRadius: "10px",
            backgroundColor: isActive ? "#2563EB" : "transparent",
            color: isActive ? "#ffffff" : "#64748b",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "14px",
            fontWeight: isActive ? 600 : 500,
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.color = "#2563EB";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#64748b";
            }
          }}
        >
          <span
            style={{
              marginRight: "12px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.icon}
          </span>
          <span style={{ flex: 1 }}>{item.text}</span>
          {hasSubItems && (
            <span
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                fontSize: "12px",
              }}
            >
              ▼
            </span>
          )}
        </div>
        {hasSubItems && isExpanded && (
          <div
            style={{
              marginTop: "4px",
              overflow: "hidden",
              transition: "all 0.2s ease",
            }}
          >
            {item.subItems.map((subItem) => (
              <MenuItem key={subItem.text} item={subItem} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <style>
        {`
          ::-webkit-scrollbar {
            width: 4px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.text} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Navbox;
