import React from "react";
import TextField from "@mui/material/TextField";
function CustomInput({ id, name, label, placeholder, value, onChange,type="text" ,readOnly}) {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      type={type}
      sx={{
        height: "56px", // Ensure same height as Select
        "& .MuiOutlinedInput-root": {
          height: "56px", // Match Select height
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "#1976d2",
            borderRadius: "8px",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        },
      }}
    />
  );
}

export default CustomInput;
