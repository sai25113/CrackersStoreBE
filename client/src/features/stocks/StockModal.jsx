import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const StockModal = ({
	show,
	onHide,
	title,
	initialValues = {},
	fields = [],
	onSubmit,
}) => {
	const [form, setForm] = useState({ ...initialValues });

	useEffect(() => {
		setForm({ ...initialValues });
	}, [initialValues, show]);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>

			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					{fields.map((f) => (
						<Form.Group className="mb-2" key={f.name}>
							<Form.Label>{f.label}</Form.Label>
							<Form.Control
								type={f.type || "text"}
								name={f.name}
								value={form[f.name] || ""}
								onChange={handleChange}
								placeholder={f.placeholder || ""}
								required={f.required || false}
							/>
						</Form.Group>
					))}
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Save
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default StockModal;
