import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
function CustomSelect({id,value,onChange,label,MenuItems=[]}) {
  return (
    <FormControl
    fullWidth
    variant="outlined"
    style={{ marginTop: "5px" }}
    sx={{
      marginTop: "5px",
      borderRadius: "10px", // Rounded corners
      marginBottom: "15px",
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
  >
    <InputLabel >{label}</InputLabel>
    <Select
      id={id}
      //value={value}
     // onChange={onChange}
      label={label}
      fullWidth
    >
        {MenuItems.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
      
    </Select>
  </FormControl>
  )
}

export default CustomSelect