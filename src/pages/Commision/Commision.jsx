import React, { useState } from "react";
import("./Commision.css");
import {
    Form,
    Row,
    Col,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Card,
} from "react-bootstrap";

const Commission = () => {
    const [commissionType, setCommissionType] = useState("%");
    const [globalCommission, setGlobalCommission] = useState(10);
    const [enableMaxCommission, setEnableMaxCommission] = useState(false);

    const handleCommissionTypeChange = (value) => setCommissionType(value);
    const handleGlobalCommissionChange = (e) => setGlobalCommission(e.target.value);
    const toggleMaxCommission = () => setEnableMaxCommission(!enableMaxCommission);

    return (
        <div className="container mt-5">
            <Card className="shadow-sm rounded border-1 no-hover">
                <Card.Body>
                    <h3 className="mb-4">Global Commission Settings</h3>

                    {/* Note Section */}
                    <div
                        className="p-3 mb-4"
                        style={{ backgroundColor: "#fff8d6", borderRadius: "8px", border: "1px solid #ffe8a1" }}
                    >
                        <p className="text-muted mb-2">
                            <strong className="text-danger">Note:</strong>
                        </p>
                        <ul className="text-muted ps-4">
                            <li>
                                <strong>%:</strong> In this type of commission, the percentage amount will be deducted from the base price of the product.
                            </li>
                            <li>
                                <strong>Fixed:</strong> In this type of commission, the fixed amount will be deducted from the base price.
                            </li>
                            <li>
                                <strong>% + Fixed:</strong> First, the percentage amount will be deducted from the base price of the product, and then a fixed amount will be deducted from the remaining amount.
                            </li>
                            <li>
                                <strong>Fixed + %:</strong> First, a fixed amount will be deducted from the base price, and then the percentage amount will be deducted from the remaining price.
                            </li>
                        </ul>
                    </div>

                    <Form>
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Global Commission Type</Form.Label>
                                    <Form.Select
                                        value={commissionType}
                                        onChange={(e) => handleCommissionTypeChange(e.target.value)}
                                    >
                                        <option value="%">%</option>
                                        <option value="Fixed">Fixed</option>
                                        <option value="% + Fixed">% + Fixed</option>
                                        <option value="Fixed + %">Fixed + %</option>
                                    </Form.Select>
                                    <Form.Text className="text-muted">
                                        Choose global commission type.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* New Row for Global Commission */}
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Global Commission</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={globalCommission}
                                        onChange={handleGlobalCommissionChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Enter global commission.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Enable Maximum Commission</Form.Label>
                            <div className="d-flex align-items-center">
                                <ToggleButtonGroup
                                    type="radio"
                                    name="maxCommission"
                                    value={enableMaxCommission ? "Enabled" : "Disabled"}
                                >
                                    <ToggleButton
                                        id="maxCommissionEnable"
                                        variant={enableMaxCommission ? "success" : "outline-secondary"}
                                        onClick={toggleMaxCommission}
                                    >
                                        Enable
                                    </ToggleButton>
                                    <ToggleButton
                                        id="maxCommissionDisable"
                                        variant={!enableMaxCommission ? "danger" : "outline-secondary"}
                                        onClick={toggleMaxCommission}
                                    >
                                        Disable
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <Form.Text className="text-muted d-block mt-2">
                                From this option, you can opt for maximum commission from a seller per order.
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Commission;
