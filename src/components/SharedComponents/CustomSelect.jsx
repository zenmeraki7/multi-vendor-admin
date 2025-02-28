import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CustomSelect({ id, name, value, onChange, label, MenuItems = [] }) {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange({ target: { name, value } });  // Pass the updated value correctly
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      style={{ marginTop: "5px" }}
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
    >
      <InputLabel>{label}</InputLabel>
      <Select
        id={id}
        value={value || ""}  // Ensure that the value is either the selected one or empty string
        onChange={handleChange}
        label={label}
        fullWidth
      >
        {MenuItems.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
