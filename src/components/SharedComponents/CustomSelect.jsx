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
      sx={{
        height: "56px", // Match CustomInput height
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          height: "56px", // Ensure same height
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
