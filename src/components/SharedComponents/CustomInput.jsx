import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CustomInput({ id, name, label, placeholder, value, onChange, type = "text", readOnly, icon, onIconClick }) {
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
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <IconButton onClick={onIconClick} edge="end">
              {icon === "eye" ? <FaEye /> : <FaEyeSlash />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
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
