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
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "#1976d2", // Blue border by default
            borderRadius: "8px",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2", // Blue border on hover as well
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2", // Blue border when focused
          },
        },
      }}
    />
  );
}

export default CustomInput;
