// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	getStocksThunk,
// 	addStockThunk,
// 	updateStockThunk,
// 	deleteStockThunk,
// 	updateSellingPriceThunk,
// } from "./stockThunk";

// import StockCard from "./StockCard";

// const StockDashboard = () => {
// 	const dispatch = useDispatch();
// 	const { list: stocks, loading } = useSelector((state) => state.stocks);

// 	const [form, setForm] = useState({
// 		name: "",
// 		pricePerBox: "",
// 		totalBoxes: "",
// 		currentQuantity: "",
// 		sellingPrice: "",
// 	});

// 	const handleChange = (e) => {
// 		setForm({ ...form, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		// if (!form.name) return;

// 		const name = form.name?.trim();
// 		if (!name) return alert("Please enter a stock name");

// 		// Generate a 3-character alphanumeric stock code
// 		const code = generateCode(form.name);

// 		const price = Number(form.pricePerBox) || 0;
// 		const boxes = Number(form.totalBoxes) || 0;
// 		const totalValue = price * boxes;

// 		dispatch(
// 			addStockThunk({
// 				...form,
// 				name,
// 				code,
// 				totalValue,
// 				sellingPrice: Number(form.sellingPrice),
// 			}),
// 		);

// 		setForm({
// 			name: "",
// 			pricePerBox: "",
// 			totalBoxes: "",
// 			currentQuantity: "",
// 			sellingPrice: "",
// 		});
// 	};

// 	const generateCode = (name) => {
// 		const cleaned = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
// 		let code = "";
// 		while (code.length < 3 && cleaned.length > 0) {
// 			const index = Math.floor(Math.random() * cleaned.length);
// 			code += cleaned[index];
// 		}
// 		if (code.length < 3)
// 			code += Math.random()
// 				.toString(36)
// 				.substring(2, 5 - code.length)
// 				.toUpperCase();
// 		return code;
// 	};

// 	useEffect(() => {
// 		dispatch(getStocksThunk());
// 	}, [dispatch]);

// 	return (
// 		<div className="p-6">
// 			<h2 className="text-2xl font-bold mb-4 text-center">
// 				📦 Stock Dashboard
// 			</h2>

// 			<form
// 				onSubmit={handleSubmit}
// 				className="flex flex-wrap gap-3 mb-6 justify-center"
// 			>
// 				<input
// 					type="text"
// 					name="name"
// 					placeholder="Stock Name"
// 					value={form.name}
// 					onChange={handleChange}
// 					className="border p-2 rounded w-40"
// 					required
// 				/>
// 				<input
// 					type="number"
// 					name="pricePerBox"
// 					placeholder="Price per Box"
// 					value={form.pricePerBox}
// 					onChange={handleChange}
// 					className="border p-2 rounded w-32"
// 				/>
// 				<input
// 					type="number"
// 					name="sellingPrice"
// 					placeholder="Selling Price per Box"
// 					value={form.sellingPrice}
// 					onChange={handleChange}
// 					className="border p-2 rounded w-full"
// 					required
// 				/>

// 				<input
// 					type="number"
// 					name="totalBoxes"
// 					placeholder="Total Boxes"
// 					value={form.totalBoxes}
// 					onChange={handleChange}
// 					className="border p-2 rounded w-32"
// 				/>
// 				<input
// 					type="number"
// 					name="currentQuantity"
// 					placeholder="Current Qty"
// 					value={form.currentQuantity}
// 					onChange={handleChange}
// 					className="border p-2 rounded w-32"
// 				/>
// 				<button
// 					type="submit"
// 					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// 				>
// 					Add Stock
// 				</button>
// 			</form>

// 			{loading ? (
// 				<p className="text-center">Loading...</p>
// 			) : (
// 				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 					{stocks.length > 0 ? (
// 						stocks.map((stock) => (
// 							<StockCard
// 								key={stock._id}
// 								stock={stock}
// 								onDelete={() => dispatch(deleteStockThunk(stock._id))}
// 								onEdit={(updated) =>
// 									dispatch(updateStockThunk({ id: stock._id, data: updated }))
// 								}
// 							/>
// 						))
// 					) : (
// 						<p className="col-span-full text-center text-gray-500">
// 							No stocks available.
// 						</p>
// 					)}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default StockDashboard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getStocksThunk,
	addStockThunk,
	updateStockThunk,
	deleteStockThunk,
	updateSellingPriceThunk,
} from "./stockThunk";
import StockCard from "./StockCard";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Spinner,
	Alert,
} from "react-bootstrap";
import {
	Package,
	Plus,
	BarChart3,
	DollarSign,
	TrendingUp,
	AlertCircle,
} from "lucide-react";
import AddStockModal from "./AddStockModal";

const StockDashboard = () => {
	const dispatch = useDispatch();
	const { list: stocks, loading, error } = useSelector((state) => state.stocks);
	const [showAddModal, setShowAddModal] = useState(false);

	// Calculate dashboard statistics
	const dashboardStats = {
		totalItems: stocks.length,
		totalValue: stocks.reduce((sum, stock) => sum + (stock.totalValue || 0), 0),
		lowStock: stocks.filter((stock) => stock.currentQuantity < 10).length,
		avgMargin:
			stocks.length > 0
				? stocks.reduce((sum, stock) => {
						const margin =
							((stock.sellingPrice - stock.pricePerBox) / stock.pricePerBox) *
							100;
						return sum + (isNaN(margin) ? 0 : margin);
					}, 0) / stocks.length
				: 0,
	};

	const handleAddStock = (stockData) => {
		dispatch(addStockThunk(stockData));
		setShowAddModal(false);
	};

	useEffect(() => {
		dispatch(getStocksThunk());
	}, [dispatch]);

	return (
		<Container fluid className="p-4 bg-light min-vh-100">
			{/* Header Section */}
			<Row className="mb-4">
				<Col>
					<Card className="shadow-sm border-0">
						<Card.Body className="text-center py-4">
							<div className="d-flex align-items-center justify-content-center mb-3">
								<Package size={32} className="text-primary me-3" />
								<div>
									<h1 className="h2 fw-bold text-primary mb-1">
										Stock Dashboard
									</h1>
									<p className="text-muted mb-0">
										Manage your inventory efficiently
									</p>
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Stats Overview */}
			<Row className="mb-4">
				<Col md={3} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Total Items</h6>
									<h3 className="fw-bold text-primary mb-0">
										{dashboardStats.totalItems}
									</h3>
								</div>
								<div className="bg-primary bg-opacity-10 p-3 rounded">
									<Package size={24} className="text-primary" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Total Value</h6>
									<h3 className="fw-bold text-success mb-0">
										₹{dashboardStats.totalValue.toLocaleString()}
									</h3>
								</div>
								<div className="bg-success bg-opacity-10 p-3 rounded">
									<DollarSign size={24} className="text-success" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Low Stock</h6>
									<h3 className="fw-bold text-warning mb-0">
										{dashboardStats.lowStock}
									</h3>
								</div>
								<div className="bg-warning bg-opacity-10 p-3 rounded">
									<AlertCircle size={24} className="text-warning" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Avg. Margin</h6>
									<h3 className="fw-bold text-info mb-0">
										{dashboardStats.avgMargin.toFixed(1)}%
									</h3>
								</div>
								<div className="bg-info bg-opacity-10 p-3 rounded">
									<BarChart3 size={24} className="text-info" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Stock Items Header */}
			<Row className="mb-4">
				<Col>
					<div className="d-flex justify-content-between align-items-center">
						<h4 className="mb-0 fw-semibold">Stock Items</h4>
						<Button
							variant="primary"
							className="d-flex align-items-center"
							onClick={() => setShowAddModal(true)}
						>
							<Plus size={18} className="me-2" />
							Add New Stock
						</Button>
					</div>
				</Col>
			</Row>

			{/* Error Alert */}
			{error && (
				<Row className="mb-3">
					<Col>
						<Alert variant="danger" className="d-flex align-items-center">
							<AlertCircle size={20} className="me-2" />
							{error}
						</Alert>
					</Col>
				</Row>
			)}

			{/* Loading State */}
			{loading ? (
				<Row>
					<Col className="text-center">
						<Card className="border-0 shadow-sm">
							<Card.Body className="py-5">
								<Spinner
									animation="border"
									variant="primary"
									className="me-3"
								/>
								<span className="text-muted">Loading stocks...</span>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			) : (
				/* Stock Grid */
				<Row>
					{stocks.length > 0 ? (
						stocks.map((stock) => (
							<Col
								key={stock._id}
								xs={12}
								sm={6}
								lg={4}
								xl={3}
								className="mb-3"
							>
								<StockCard
									stock={stock}
									onDelete={() => dispatch(deleteStockThunk(stock._id))}
									onEdit={(updated) =>
										dispatch(updateStockThunk({ id: stock._id, data: updated }))
									}
									onUpdateSellingPrice={(id, sellingPrice) =>
										dispatch(updateSellingPriceThunk({ id, sellingPrice }))
									}
								/>
							</Col>
						))
					) : (
						<Col>
							<Card className="border-0 shadow-sm">
								<Card.Body className="text-center py-5">
									<Package size={48} className="text-muted mb-3" />
									<h5 className="text-muted">No stocks available</h5>
									<p className="text-muted mb-3">
										Get started by adding your first stock item
									</p>
									<Button
										variant="primary"
										onClick={() => setShowAddModal(true)}
										className="d-flex align-items-center mx-auto"
									>
										<Plus size={18} className="me-2" />
										Add New Stock
									</Button>
								</Card.Body>
							</Card>
						</Col>
					)}
				</Row>
			)}

			{/* Add Stock Modal */}
			<AddStockModal
				show={showAddModal}
				onHide={() => setShowAddModal(false)}
				onSave={handleAddStock}
			/>
		</Container>
	);
};

export default StockDashboard;
