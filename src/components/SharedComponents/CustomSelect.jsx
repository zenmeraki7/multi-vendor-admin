import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function CustomSelect({ id, name, value, onChange, label, MenuItems = [] }) {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange({ target: { name, value } }); // Pass name and value
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      style={{ marginTop: "5px" }}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#f5f5f5", // Light background when readonly
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
        value={value}
        onChange={handleChange}
        label={label}
        fullWidth
      >
        {MenuItems.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
