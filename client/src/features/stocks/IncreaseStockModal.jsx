import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { PackagePlus } from "lucide-react";

const IncreaseStockModal = ({ show, onHide, stock, onIncrease }) => {
	const [boxesToAdd, setBoxesToAdd] = useState(1);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (boxesToAdd > 0) {
			onIncrease(Number(boxesToAdd));
		}
	};

	const handleClose = () => {
		setBoxesToAdd(1);
		onHide();
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title className="d-flex align-items-center">
					<PackagePlus size={20} className="me-2" />
					Increase Stock
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<p className="mb-3">
						Add boxes to <strong>{stock.name}</strong>
					</p>
					<Form.Group>
						<Form.Label>Number of boxes to add</Form.Label>
						<Form.Control
							type="number"
							value={boxesToAdd}
							onChange={(e) => setBoxesToAdd(e.target.value)}
							min="1"
							required
						/>
						<Form.Text className="text-muted">
							Current total: {stock.totalBoxes} boxes
						</Form.Text>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="success" type="submit">
						Add Boxes
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default IncreaseStockModal;
