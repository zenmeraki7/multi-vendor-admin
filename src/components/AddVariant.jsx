import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './AddVariant.css'
function AddVariant() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}
        style={{
          marginTop: "5px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "20px",
        }}
      >
        Add Variant
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Variants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
          <label>
            <input type="file" style={{display:'none'}}/>
            <img src="https://cdn.pixabay.com/photo/2013/07/12/12/55/oldtimer-146524_640.png" alt="variant" height={'350px'} width={'350px'} />
          </label>
            </div>
            <div className="col-6">
              <FloatingLabel controlId="floatingInput" label="Attribute" className="mb-3 mt-4">
                <Form.Control type="text" placeholder="Attribute" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Value"className="mb-3">
                <Form.Control type="text" placeholder="Value" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Additional Price" className="mb-3">
                <Form.Control type="text" placeholder="Additional Price" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Stock"className="mb-3">
                <Form.Control type="text" placeholder="Stock" />
              </FloatingLabel>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddVariant