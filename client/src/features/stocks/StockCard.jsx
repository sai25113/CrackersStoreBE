// import React, { useState } from "react";
// import { useDispatch } from "react-redux";

// import { updateSellingPriceThunk } from "./stockThunk";
// const StockCard = ({ stock, onEdit, onDelete }) => {
// 	const [editing, setEditing] = useState(false);
// 	const [form, setForm] = useState({
// 		name: stock.name,
// 		pricePerBox: stock.pricePerBox,
// 		totalBoxes: stock.totalBoxes,
// 		currentQuantity: stock.currentQuantity,
// 		sellingPrice: stock.sellingPrice,
// 	});

// 	const [open, setOpen] = useState(false);
// 	const [newPrice, setNewPrice] = useState(stock.sellingPrice);
// 	const dispatch = useDispatch();

// 	const handleUpdate = () => {
// 		dispatch(
// 			updateSellingPriceThunk({
// 				id: stock._id,
// 				sellingPrice: Number(newPrice),
// 			}),
// 		);
// 		setOpen(false);
// 	};

// 	const handleChange = (e) => {
// 		setForm({ ...form, [e.target.name]: e.target.value });
// 	};

// 	const handleSave = () => {
// 		const totalValue =
// 			Number(form.pricePerBox || 0) * Number(form.totalBoxes || 0);
// 		onEdit({ ...form, totalValue });
// 		setEditing(false);
// 	};

// 	const handleIncreaseStock = (stock) => {
// 		const addBoxes = Number(
// 			prompt(`Enter number of boxes to add for ${stock.name}:`, "0"),
// 		);
// 		if (!addBoxes || addBoxes <= 0) return;

// 		const updatedTotalBoxes = Number(stock.totalBoxes) + addBoxes;
// 		const updatedTotalValue = updatedTotalBoxes * Number(stock.pricePerBox);

// 		onEdit({
// 			...stock,
// 			totalBoxes: updatedTotalBoxes,
// 			currentQuantity: updatedTotalBoxes,
// 			totalValue: updatedTotalValue,
// 			sellingPrice: Number(form.sellingPrice),
// 		});
// 	};

// 	return (
// 		<div className="bg-white shadow-md p-4 rounded-xl border">
// 			{editing ? (
// 				<>
// 					<input
// 						name="name"
// 						value={form.name}
// 						onChange={handleChange}
// 						className="border p-1 rounded w-full mb-2"
// 					/>
// 					<input
// 						name="pricePerBox"
// 						type="number"
// 						value={form.pricePerBox}
// 						onChange={handleChange}
// 						className="border p-1 rounded w-full mb-2"
// 					/>
// 					<input
// 						name="totalBoxes"
// 						type="number"
// 						value={form.totalBoxes}
// 						onChange={handleChange}
// 						className="border p-1 rounded w-full mb-2"
// 					/>
// 					<input
// 						name="currentQuantity"
// 						type="number"
// 						value={form.currentQuantity}
// 						onChange={handleChange}
// 						className="border p-1 rounded w-full mb-2"
// 					/>
// 					<div className="flex justify-between mt-2">
// 						<button
// 							onClick={handleSave}
// 							className="bg-green-500 text-white px-3 py-1 rounded"
// 						>
// 							Save
// 						</button>
// 						<button
// 							onClick={() => setEditing(false)}
// 							className="bg-gray-400 text-white px-3 py-1 rounded"
// 						>
// 							Cancel
// 						</button>
// 					</div>
// 				</>
// 			) : (
// 				<>
// 					<h3 className="font-bold text-lg">{stock.name}</h3>
// 					<p className="text-sm text-gray-600">Code: {stock.code}</p>
// 					<p>Price/Box: ₹{stock.pricePerBox}</p>
// 					<p>Selling Price: ₹{stock.sellingPrice}</p>
// 					<p>Total Boxes: {stock.totalBoxes}</p>
// 					<p>Current Qty: {stock.currentQuantity}</p>
// 					<p>Total Value: ₹{stock.totalValue}</p>
// 					<div className="flex justify-between mt-3">
// 						<button
// 							onClick={() => setEditing(true)}
// 							className="bg-yellow-500 text-white px-3 py-1 rounded"
// 						>
// 							Edit
// 						</button>
// 						<button
// 							onClick={onDelete}
// 							className="bg-red-500 text-white px-3 py-1 rounded"
// 						>
// 							Delete
// 						</button>
// 						<button
// 							onClick={() => handleIncreaseStock(stock)}
// 							className="bg-green-600 text-white px-3 py-1 rounded"
// 						>
// 							Increase Stock
// 						</button>
// 						<button
// 							className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
// 							onClick={() => setOpen(true)}
// 						>
// 							Update Selling Price
// 						</button>
// 						{open && (
// 							<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
// 								<div className="bg-white p-6 rounded-lg w-80 shadow-lg">
// 									<h4 className="text-lg font-bold mb-2">
// 										Update Selling Price
// 									</h4>
// 									<input
// 										type="number"
// 										value={newPrice}
// 										onChange={(e) => setNewPrice(e.target.value)}
// 										className="border rounded p-2 w-full mb-3"
// 									/>
// 									<div className="flex justify-end gap-2">
// 										<button
// 											className="px-3 py-1 bg-gray-400 rounded text-white"
// 											onClick={() => setOpen(false)}
// 										>
// 											Cancel
// 										</button>
// 										<button
// 											className="px-3 py-1 bg-green-600 rounded text-white"
// 											onClick={handleUpdate}
// 										>
// 											Save
// 										</button>
// 									</div>
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default StockCard;

import React, { useState } from "react";
import { Card, Button, Form, Modal, Row, Col, Badge } from "react-bootstrap";
import {
	Edit3,
	Trash2,
	Package,
	Tag,
	DollarSign,
	Box,
	TrendingUp,
	Save,
	X,
	PackagePlus,
} from "lucide-react";

const StockCard = ({ stock, onEdit, onDelete, onUpdateSellingPrice }) => {
	const [editing, setEditing] = useState(false);
	const [showSellingPriceModal, setShowSellingPriceModal] = useState(false);
	const [showIncreaseStockModal, setShowIncreaseStockModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [form, setForm] = useState({
		name: stock.name,
		pricePerBox: stock.pricePerBox,
		totalBoxes: stock.totalBoxes,
		currentQuantity: stock.currentQuantity,
		sellingPrice: stock.sellingPrice,
	});
	const [newPrice, setNewPrice] = useState(stock.sellingPrice);
	const [boxesToAdd, setBoxesToAdd] = useState(1);

	// Calculate profit margin
	const profitMargin =
		((stock.sellingPrice - stock.pricePerBox) / stock.pricePerBox) * 100;
	const isLowStock = stock.currentQuantity < 10;

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		const totalValue =
			Number(form.pricePerBox || 0) * Number(form.totalBoxes || 0);
		onEdit({
			...form,
			totalValue,
			pricePerBox: Number(form.pricePerBox),
			totalBoxes: Number(form.totalBoxes),
			currentQuantity: Number(form.currentQuantity),
			sellingPrice: Number(form.sellingPrice),
		});
		setEditing(false);
	};

	const handleUpdateSellingPrice = () => {
		onUpdateSellingPrice(stock._id, Number(newPrice));
		setShowSellingPriceModal(false);
	};

	const handleIncreaseStock = () => {
		if (boxesToAdd > 0) {
			const updatedTotalBoxes = Number(stock.totalBoxes) + Number(boxesToAdd);
			const updatedTotalValue = updatedTotalBoxes * Number(stock.pricePerBox);

			onEdit({
				...stock,
				totalBoxes: updatedTotalBoxes,
				currentQuantity: updatedTotalBoxes,
				totalValue: updatedTotalValue,
				sellingPrice: Number(stock.sellingPrice),
			});
			setShowIncreaseStockModal(false);
			setBoxesToAdd(1);
		}
	};

	const handleDelete = () => {
		onDelete();
		setShowDeleteModal(false);
	};

	const cancelEdit = () => {
		setForm({
			name: stock.name,
			pricePerBox: stock.pricePerBox,
			totalBoxes: stock.totalBoxes,
			currentQuantity: stock.currentQuantity,
			sellingPrice: stock.sellingPrice,
		});
		setEditing(false);
	};

	return (
		<>
			<Card className="h-100 shadow-sm border-0">
				<Card.Body>
					{editing ? (
						<div>
							<Form.Group className="mb-2">
								<Form.Label className="small fw-bold">Name</Form.Label>
								<Form.Control
									name="name"
									value={form.name}
									onChange={handleChange}
									size="sm"
								/>
							</Form.Group>

							<Row>
								<Col>
									<Form.Group className="mb-2">
										<Form.Label className="small fw-bold">Price/Box</Form.Label>
										<Form.Control
											name="pricePerBox"
											type="number"
											value={form.pricePerBox}
											onChange={handleChange}
											size="sm"
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-2">
										<Form.Label className="small fw-bold">
											Total Boxes
										</Form.Label>
										<Form.Control
											name="totalBoxes"
											type="number"
											value={form.totalBoxes}
											onChange={handleChange}
											size="sm"
										/>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label className="small fw-bold">Current Qty</Form.Label>
								<Form.Control
									name="currentQuantity"
									type="number"
									value={form.currentQuantity}
									onChange={handleChange}
									size="sm"
								/>
							</Form.Group>

							<div className="d-flex gap-2">
								<Button
									variant="success"
									size="sm"
									onClick={handleSave}
									className="d-flex align-items-center"
								>
									<Save size={14} className="me-1" />
									Save
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onClick={cancelEdit}
									className="d-flex align-items-center"
								>
									<X size={14} className="me-1" />
									Cancel
								</Button>
							</div>
						</div>
					) : (
						<div>
							{/* Header */}
							<div className="d-flex justify-content-between align-items-start mb-3">
								<h6 className="fw-bold mb-0 text-truncate">{stock.name}</h6>
								<Badge
									bg={isLowStock ? "warning" : "light"}
									text={isLowStock ? "dark" : "dark"}
									className="ms-2"
								>
									{stock.code}
								</Badge>
							</div>

							{/* Stock Details */}
							<div className="mb-3">
								<div className="d-flex align-items-center mb-2 small">
									<Tag size={14} className="text-muted me-2" />
									<span className="text-muted">Purchase:</span>
									<strong className="ms-1">₹{stock.pricePerBox}</strong>
								</div>
								<div className="d-flex align-items-center mb-2 small">
									<DollarSign size={14} className="text-success me-2" />
									<span className="text-muted">Selling:</span>
									<strong className="ms-1 text-success">
										₹{stock.sellingPrice}
									</strong>
								</div>
								<div className="d-flex align-items-center mb-2 small">
									<Box size={14} className="text-primary me-2" />
									<span className="text-muted">Boxes:</span>
									<strong className="ms-1">{stock.totalBoxes}</strong>
								</div>
								<div className="d-flex align-items-center mb-2 small">
									<Package size={14} className="text-info me-2" />
									<span className="text-muted">Current Qty:</span>
									<strong className="ms-1">{stock.currentQuantity}</strong>
								</div>
								<div className="d-flex align-items-center mb-2 small">
									<TrendingUp size={14} className="text-warning me-2" />
									<span className="text-muted">Profit Margin:</span>
									<strong className="ms-1 text-success">
										{profitMargin.toFixed(1)}%
									</strong>
								</div>
								<hr className="my-2" />
								<div className="d-flex align-items-center small">
									<DollarSign size={14} className="text-primary me-2" />
									<span className="text-muted">Total Value:</span>
									<strong className="ms-1 text-primary">
										₹{stock.totalValue}
									</strong>
								</div>
							</div>

							{/* Actions */}
							<div className="d-grid gap-2">
								<Button
									variant="outline-warning"
									size="sm"
									onClick={() => setEditing(true)}
									className="d-flex align-items-center justify-content-center"
								>
									<Edit3 size={14} className="me-1" />
									Edit
								</Button>

								<Button
									variant="outline-success"
									size="sm"
									onClick={() => setShowIncreaseStockModal(true)}
									className="d-flex align-items-center justify-content-center"
								>
									<PackagePlus size={14} className="me-1" />
									Increase Stock
								</Button>

								<Button
									variant="outline-primary"
									size="sm"
									onClick={() => setShowSellingPriceModal(true)}
									className="d-flex align-items-center justify-content-center"
								>
									<DollarSign size={14} className="me-1" />
									Update Price
								</Button>

								<Button
									variant="outline-danger"
									size="sm"
									onClick={() => setShowDeleteModal(true)}
									className="d-flex align-items-center justify-content-center"
								>
									<Trash2 size={14} className="me-1" />
									Delete
								</Button>
							</div>
						</div>
					)}
				</Card.Body>
			</Card>

			{/* Update Selling Price Modal */}
			<Modal
				show={showSellingPriceModal}
				onHide={() => setShowSellingPriceModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="d-flex align-items-center">
						<DollarSign size={20} className="me-2" />
						Update Selling Price
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="mb-3">
						Update selling price for <strong>{stock.name}</strong>
					</p>
					<Form.Group>
						<Form.Label>New Selling Price</Form.Label>
						<Form.Control
							type="number"
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
							min="0"
							step="0.01"
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowSellingPriceModal(false)}
					>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleUpdateSellingPrice}>
						Update Price
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Increase Stock Modal */}
			<Modal
				show={showIncreaseStockModal}
				onHide={() => setShowIncreaseStockModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="d-flex align-items-center">
						<PackagePlus size={20} className="me-2" />
						Increase Stock
					</Modal.Title>
				</Modal.Header>
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
					<Button
						variant="secondary"
						onClick={() => setShowIncreaseStockModal(false)}
					>
						Cancel
					</Button>
					<Button variant="success" onClick={handleIncreaseStock}>
						Add Boxes
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="d-flex align-items-center">
						<Trash2 size={20} className="me-2 text-danger" />
						Confirm Delete
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						Are you sure you want to delete <strong>{stock.name}</strong>?
					</p>
					<p className="text-muted small">This action cannot be undone.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Delete Stock
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default StockCard;
