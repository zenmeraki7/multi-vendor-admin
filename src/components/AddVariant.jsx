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
            <img src="https://files.oaiusercontent.com/file-62uCHgnfmiGB3eUXfYXYQA?se=2024-12-27T05%3A02%3A03Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D11560fdc-5a0c-4613-9c83-4615aaa88b02.webp&sig=G2Xt5Sh9gBRVtt0Fvnf9R%2BVN1MoWwEl8j3XU3Y3iXbo%3D" alt="" height={'350px'} width={'350px'} />
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