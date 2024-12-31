import React from "react";
import TextField from "@mui/material/TextField";
function CustomInput({ id, name, label, placeholder, value, onChange,type="text" }) {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      type={type}
      sx={{
        marginTop: "5px",
        marginBottom: "15px",
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
  );
}

export default CustomInput;
