import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Checkbox,
  Alert,
  Container,
} from '@mui/material';

const SellerFormSettings = () => {
  const [formFields, setFormFields] = useState([
    { name: "Seller Description", required: true, visible: true },
    { name: "Seller Policy", required: true, visible: true },
    { name: "City", required: true, visible: true },
    { name: "Country/State", required: true, visible: true },
    { name: "Seller Contact Number", required: true, visible: true },
    { name: "Store Short Description", required: true, visible: true },
    { name: "Store Address", required: true, visible: true },
    { name: "Zipcode", required: true, visible: true },
    { name: "Latitude", required: false, visible: false },
    { name: "Longitude", required: false, visible: false },
    { name: "Locality", required: false, visible: false },
    { name: "Street", required: false, visible: false },
  ]);

  const handleCheckboxChange = (index, key) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = !updatedFields[index][key];
    setFormFields(updatedFields);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Seller Form Configuration
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field Name</TableCell>
                <TableCell align="center">Required</TableCell>
                <TableCell align="center">Visible</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formFields.map((field, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {field.name}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={field.required}
                      onChange={() => handleCheckboxChange(index, "required")}
                      disabled={!field.visible}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={field.visible}
                      onChange={() => handleCheckboxChange(index, "visible")}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="warning" sx={{ mt: 3 }}>
        Note: Required will take effect only if it is visible.
        </Alert>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '16px', 
          marginTop: '24px' 
        }}>
          <Button 
            variant="outlined" 
            color="error"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
          >
            Save
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default SellerFormSettings;