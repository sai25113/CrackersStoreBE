import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Package, AlertCircle } from "lucide-react";

const AddStockModal = ({ show, onHide, onSave }) => {
	const [form, setForm] = useState({
		name: "",
		pricePerBox: "",
		totalBoxes: "",
		currentQuantity: "",
		sellingPrice: "",
	});
	const [errors, setErrors] = useState({});

	const generateCode = (name) => {
		const cleaned = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
		let code = "";
		while (code.length < 3 && cleaned.length > 0) {
			const index = Math.floor(Math.random() * cleaned.length);
			code += cleaned[index];
		}
		if (code.length < 3)
			code += Math.random()
				.toString(36)
				.substring(2, 5 - code.length)
				.toUpperCase();
		return code;
	};

	const validateForm = () => {
		const newErrors = {};

		if (!form.name?.trim()) {
			newErrors.name = "Stock name is required";
		}

		if (!form.sellingPrice || Number(form.sellingPrice) <= 0) {
			newErrors.sellingPrice = "Valid selling price is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		const name = form.name.trim();
		const code = generateCode(name);
		const price = Number(form.pricePerBox) || 0;
		const boxes = Number(form.totalBoxes) || 0;
		const totalValue = price * boxes;
		const currentQuantity = Number(form.currentQuantity) || boxes;

		onSave({
			...form,
			name,
			code,
			totalValue,
			sellingPrice: Number(form.sellingPrice),
			pricePerBox: price,
			totalBoxes: boxes,
			currentQuantity: currentQuantity,
		});

		// Reset form
		setForm({
			name: "",
			pricePerBox: "",
			totalBoxes: "",
			currentQuantity: "",
			sellingPrice: "",
		});
		setErrors({});
	};

	const handleClose = () => {
		setForm({
			name: "",
			pricePerBox: "",
			totalBoxes: "",
			currentQuantity: "",
			sellingPrice: "",
		});
		setErrors({});
		onHide();
	};

	return (
		<Modal show={show} onHide={handleClose} size="lg">
			<Modal.Header closeButton>
				<Modal.Title className="d-flex align-items-center">
					<Package size={20} className="me-2" />
					Add New Stock
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					{Object.keys(errors).length > 0 && (
						<Alert variant="danger">
							<AlertCircle size={16} className="me-2" />
							Please fix the errors below
						</Alert>
					)}

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Stock Name *</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={form.name}
									onChange={handleChange}
									isInvalid={!!errors.name}
									placeholder="Enter stock name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Selling Price per Box *</Form.Label>
								<Form.Control
									type="number"
									name="sellingPrice"
									value={form.sellingPrice}
									onChange={handleChange}
									isInvalid={!!errors.sellingPrice}
									placeholder="Enter selling price"
									min="0"
									step="0.01"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.sellingPrice}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Price per Box</Form.Label>
								<Form.Control
									type="number"
									name="pricePerBox"
									value={form.pricePerBox}
									onChange={handleChange}
									placeholder="Enter purchase price"
									min="0"
									step="0.01"
								/>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Total Boxes</Form.Label>
								<Form.Control
									type="number"
									name="totalBoxes"
									value={form.totalBoxes}
									onChange={handleChange}
									placeholder="Enter total boxes"
									min="0"
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="mb-3">
						<Form.Label>Current Quantity</Form.Label>
						<Form.Control
							type="number"
							name="currentQuantity"
							value={form.currentQuantity}
							onChange={handleChange}
							placeholder="Enter current quantity"
							min="0"
						/>
						<Form.Text className="text-muted">
							If left empty, will be set to total boxes value
						</Form.Text>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Add Stock
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default AddStockModal;
