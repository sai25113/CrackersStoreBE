// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getStocksThunk } from "../stocks/stockThunk";
// import { createSaleThunk } from "./salesThunk";

// const SalesPage = () => {
// 	const dispatch = useDispatch();
// 	const { list: stocks } = useSelector((s) => s.stocks);
// 	const [cart, setCart] = useState([]);
// 	const [discountType, setDiscountType] = useState("amount");
// 	const [discountValue, setDiscountValue] = useState(0);

// 	useEffect(() => {
// 		dispatch(getStocksThunk());
// 	}, [dispatch]);

// 	const addToCart = (stock) => {
// 		const quantity = Number(prompt(`Enter quantity for ${stock.name}:`, 1));
// 		if (!quantity || quantity <= 0) return;
// 		setCart((prev) => {
// 			const exists = prev.find((i) => i.stockId === stock._id);
// 			if (exists)
// 				return prev.map((i) =>
// 					i.stockId === stock._id
// 						? { ...i, quantity: i.quantity + quantity }
// 						: i,
// 				);
// 			return [
// 				...prev,
// 				{ stockId: stock._id, name: stock.name, quantitySold: quantity },
// 			];
// 		});
// 	};

// 	const subtotal = cart.reduce((acc, item) => {
// 		const stock = stocks.find((s) => s._id === item.stockId);
// 		return acc + (stock?.sellingPrice || 0) * item.quantitySold;
// 	}, 0);

// 	const finalTotal =
// 		discountType === "percent"
// 			? subtotal - subtotal * (discountValue / 100)
// 			: subtotal - discountValue;

// 	const handleCheckout = () => {
// 		if (!cart.length) return alert("No items selected");
// 		dispatch(
// 			createSaleThunk({
// 				items: cart,
// 				discountType,
// 				discountValue,
// 			}),
// 		);
// 		// alert("Sale created successfully!");
// 		setCart([]);
// 		setDiscountValue(0);
// 	};

// 	return (
// 		<div className="p-6">
// 			<h2 className="text-2xl font-bold mb-4">Sell Crackers</h2>

// 			{/* Stock List */}
// 			<div className="grid grid-cols-3 gap-4">
// 				{stocks.map((s) => (
// 					<div key={s._id} className="border p-3 rounded-lg">
// 						<h3 className="font-semibold">{s.name}</h3>
// 						<p>Available: {s.currentQuantity}</p>
// 						<p>Selling Price: ₹{s.sellingPrice}</p>
// 						<button
// 							onClick={() => addToCart(s)}
// 							className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
// 						>
// 							Add to Cart
// 						</button>
// 					</div>
// 				))}
// 			</div>

// 			{/* Cart Summary */}
// 			<div className="mt-6 border-t pt-4">
// 				<h3 className="text-xl font-semibold">Cart</h3>
// 				{cart.map((item) => {
// 					const stock = stocks.find((s) => s._id === item.stockId);
// 					const total = (stock?.sellingPrice || 0) * item.quantitySold;
// 					return (
// 						<div
// 							key={item.stockId}
// 							className="flex justify-between border-b py-2"
// 						>
// 							<span>
// 								{item.name} × {item.quantitySold}
// 							</span>
// 							<span>₹{total}</span>
// 						</div>
// 					);
// 				})}

// 				<div className="mt-3">
// 					<label>Discount Type:</label>
// 					<select
// 						className="ml-2 border rounded px-2 py-1"
// 						value={discountType}
// 						onChange={(e) => setDiscountType(e.target.value)}
// 					>
// 						<option value="amount">Amount</option>
// 						<option value="percent">Percent</option>
// 					</select>

// 					<input
// 						type="number"
// 						className="ml-2 border rounded px-2 py-1 w-24"
// 						placeholder="Value"
// 						value={discountValue}
// 						onChange={(e) => setDiscountValue(Number(e.target.value))}
// 					/>
// 				</div>

// 				<h4 className="mt-3 text-lg font-bold">
// 					Final Total: ₹{finalTotal.toFixed(2)}
// 				</h4>

// 				<button
// 					onClick={handleCheckout}
// 					className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
// 				>
// 					Checkout & Generate Bill
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default SalesPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStocksThunk } from "../stocks/stockThunk";
import { createSaleThunk } from "./salesThunk";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Form,
	Table,
	Badge,
	Alert,
	Modal,
	InputGroup,
	ListGroup,
} from "react-bootstrap";
import {
	ShoppingCart,
	Plus,
	Minus,
	Trash2,
	Receipt,
	Package,
	IndianRupee,
	Percent,
	Shield,
	Zap,
	Search,
} from "lucide-react";

const SalesPage = () => {
	const dispatch = useDispatch();
	const { list: stocks } = useSelector((s) => s.stocks);
	const { loading: saleLoading } = useSelector((s) => s.sales);

	const [cart, setCart] = useState([]);
	const [discountType, setDiscountType] = useState("amount");
	const [discountValue, setDiscountValue] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [showBillModal, setShowBillModal] = useState(false);
	const [saleCompleted, setSaleCompleted] = useState(false);
	const [lastSale, setLastSale] = useState(null);

	useEffect(() => {
		dispatch(getStocksThunk());
	}, [dispatch]);

	// Filter stocks based on search
	const filteredStocks = stocks.filter((stock) =>
		stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const addToCart = (stock) => {
		const quantity = 1; // Default quantity
		if (quantity > stock.currentQuantity) {
			alert(`Only ${stock.currentQuantity} items available in stock!`);
			return;
		}

		setCart((prev) => {
			const exists = prev.find((i) => i.stockId === stock._id);
			if (exists) {
				const newQuantity = exists.quantitySold + quantity;
				if (newQuantity > stock.currentQuantity) {
					alert(`Cannot add more than ${stock.currentQuantity} items!`);
					return prev;
				}
				return prev.map((i) =>
					i.stockId === stock._id ? { ...i, quantitySold: newQuantity } : i,
				);
			}
			return [
				...prev,
				{
					stockId: stock._id,
					name: stock.name,
					quantitySold: quantity,
					sellingPrice: stock.sellingPrice,
					code: stock.code,
				},
			];
		});
	};

	const updateQuantity = (stockId, newQuantity) => {
		const stock = stocks.find((s) => s._id === stockId);
		if (newQuantity > stock.currentQuantity) {
			alert(`Only ${stock.currentQuantity} items available!`);
			return;
		}
		if (newQuantity < 1) {
			removeFromCart(stockId);
			return;
		}

		setCart((prev) =>
			prev.map((item) =>
				item.stockId === stockId
					? { ...item, quantitySold: newQuantity }
					: item,
			),
		);
	};

	const removeFromCart = (stockId) => {
		setCart((prev) => prev.filter((item) => item.stockId !== stockId));
	};

	const clearCart = () => {
		setCart([]);
		setDiscountValue(0);
	};

	// Calculate totals
	const subtotal = cart.reduce((acc, item) => {
		return acc + (item.sellingPrice || 0) * item.quantitySold;
	}, 0);

	const discountAmount =
		discountType === "percent"
			? subtotal * (discountValue / 100)
			: discountValue;

	const finalTotal = Math.max(0, subtotal - discountAmount);
	const taxAmount = finalTotal * 0.0; // 18% GST
	const grandTotal = finalTotal + taxAmount;

	const handleCheckout = async () => {
		if (!cart.length) {
			alert("Please add items to cart before checkout!");
			return;
		}

		const saleData = {
			items: cart,
			discountType,
			discountValue,
			subtotal,
			discountAmount,
			taxAmount,
			grandTotal,
			finalTotal: grandTotal,
		};

		try {
			const result = await dispatch(createSaleThunk(saleData)).unwrap();
			setLastSale(result);
			setSaleCompleted(true);
			setShowBillModal(true);
			setCart([]);
			setDiscountValue(0);
		} catch (error) {
			alert("Error creating sale: " + error.message);
		}
	};

	const handleCloseBill = () => {
		setShowBillModal(false);
		setSaleCompleted(false);
	};

	return (
		<Container fluid className="p-4 bg-light min-vh-100">
			<Row>
				<Col>
					{/* Header */}
					<Card className="border-0 shadow-sm mb-4">
						<Card.Body className="py-4">
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h1 className="h3 fw-bold text-primary mb-2">
										<ShoppingCart className="me-3" size={32} />
										Point of Sale
									</h1>
									<p className="text-muted mb-0">
										Process sales and generate bills instantly
									</p>
								</div>
								<Badge bg="primary" className="fs-6 p-3">
									<IndianRupee size={16} className="me-1" />
									Available Items: {stocks.length}
								</Badge>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				{/* Products Section */}
				<Col lg={8}>
					<Card className="border-0 shadow-sm h-100">
						<Card.Header className="bg-white border-0 py-3">
							<div className="d-flex justify-content-between align-items-center">
								<h5 className="mb-0 fw-semibold">Available Products</h5>
								<div className="w-50">
									<InputGroup>
										<InputGroup.Text>
											<Search size={16} />
										</InputGroup.Text>
										<Form.Control
											type="text"
											placeholder="Search products..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</InputGroup>
								</div>
							</div>
						</Card.Header>
						<Card.Body>
							<Row>
								{filteredStocks.map((stock) => (
									<Col key={stock._id} xs={12} sm={6} md={4} className="mb-3">
										<Card className="h-100 border-0 shadow-hover">
											<Card.Body className="text-center">
												<div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
													<Package size={24} className="text-primary" />
												</div>
												<h6 className="fw-bold text-dark mb-1">{stock.name}</h6>
												<Badge bg="light" text="dark" className="mb-2">
													{stock.code}
												</Badge>
												<div className="mb-2">
													<small className="text-muted">Price:</small>
													<div className="fw-bold text-success">
														₹{stock.sellingPrice}
													</div>
												</div>
												<div className="mb-3">
													<small className="text-muted">In Stock:</small>
													<div
														className={`fw-semibold ${
															stock.currentQuantity < 10
																? "text-warning"
																: "text-success"
														}`}
													>
														{stock.currentQuantity} units
													</div>
												</div>
												<Button
													variant="primary"
													size="sm"
													onClick={() => addToCart(stock)}
													disabled={stock.currentQuantity === 0}
													className="w-100 d-flex align-items-center justify-content-center"
												>
													<Plus size={16} className="me-1" />
													Add to Cart
												</Button>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Card.Body>
					</Card>
				</Col>

				{/* Cart Section */}
				<Col lg={4}>
					<Card
						className="border-0 shadow-sm sticky-top"
						style={{ top: "20px" }}
					>
						<Card.Header className="bg-white border-0 py-3">
							<div className="d-flex justify-content-between align-items-center">
								<h5 className="mb-0 fw-semibold">
									<ShoppingCart className="me-2" size={20} />
									Shopping Cart
								</h5>
								{cart.length > 0 && (
									<Button
										variant="outline-danger"
										size="sm"
										onClick={clearCart}
									>
										<Trash2 size={14} className="me-1" />
										Clear
									</Button>
								)}
							</div>
						</Card.Header>

						<Card.Body>
							{cart.length === 0 ? (
								<div className="text-center py-5">
									<ShoppingCart size={48} className="text-muted mb-3" />
									<p className="text-muted">Your cart is empty</p>
									<small className="text-muted">
										Add products from the list
									</small>
								</div>
							) : (
								<>
									{/* Cart Items */}
									<ListGroup variant="flush" className="mb-3">
										{cart.map((item) => (
											<ListGroup.Item key={item.stockId} className="px-0">
												<div className="d-flex justify-content-between align-items-start">
													<div className="flex-grow-1">
														<h6 className="fw-semibold mb-1">{item.name}</h6>
														<small className="text-muted">
															Code: {item.code}
														</small>
														<div className="mt-2">
															<div className="d-flex align-items-center">
																<Button
																	variant="outline-secondary"
																	size="sm"
																	onClick={() =>
																		updateQuantity(
																			item.stockId,
																			item.quantitySold - 1,
																		)
																	}
																>
																	<Minus size={12} />
																</Button>
																<span className="mx-3 fw-bold">
																	{item.quantitySold}
																</span>
																<Button
																	variant="outline-secondary"
																	size="sm"
																	onClick={() =>
																		updateQuantity(
																			item.stockId,
																			item.quantitySold + 1,
																		)
																	}
																>
																	<Plus size={12} />
																</Button>
															</div>
														</div>
													</div>
													<div className="text-end">
														<div className="fw-bold text-success">
															₹
															{(item.sellingPrice * item.quantitySold).toFixed(
																2,
															)}
														</div>
														<div className="text-muted small">
															₹{item.sellingPrice} × {item.quantitySold}
														</div>
														<Button
															variant="outline-danger"
															size="sm"
															className="mt-2"
															onClick={() => removeFromCart(item.stockId)}
														>
															<Trash2 size={12} />
														</Button>
													</div>
												</div>
											</ListGroup.Item>
										))}
									</ListGroup>

									{/* Discount Section */}
									<Card className="bg-light border-0">
										<Card.Body>
											<h6 className="fw-semibold mb-3">Discount</h6>
											<Row className="g-2 mb-3">
												<Col>
													<Form.Select
														value={discountType}
														onChange={(e) => setDiscountType(e.target.value)}
														size="sm"
													>
														<option value="amount">Amount (₹)</option>
														<option value="percent">Percentage (%)</option>
													</Form.Select>
												</Col>
												<Col>
													<Form.Control
														type="number"
														placeholder="Value"
														value={discountValue}
														onChange={(e) =>
															setDiscountValue(Number(e.target.value))
														}
														min="0"
														size="sm"
													/>
												</Col>
											</Row>
										</Card.Body>
									</Card>

									{/* Totals */}
									<div className="mt-3">
										<div className="d-flex justify-content-between mb-2">
											<span className="text-muted">Subtotal:</span>
											<span className="fw-semibold">
												₹{subtotal.toFixed(2)}
											</span>
										</div>
										{discountValue > 0 && (
											<div className="d-flex justify-content-between mb-2 text-danger">
												<span>Discount:</span>
												<span>-₹{discountAmount.toFixed(2)}</span>
											</div>
										)}
										<div className="d-flex justify-content-between mb-2">
											<span className="text-muted">GST (%):</span>
											<span>₹{taxAmount.toFixed(2)}</span>
										</div>
										<hr />
										<div className="d-flex justify-content-between mb-3">
											<strong className="fs-5">Grand Total:</strong>
											<strong className="fs-5 text-success">
												₹{grandTotal.toFixed(2)}
											</strong>
										</div>

										<Button
											variant="success"
											size="lg"
											className="w-100 d-flex align-items-center justify-content-center"
											onClick={handleCheckout}
											disabled={saleLoading || cart.length === 0}
										>
											{saleLoading ? (
												<>
													<div className="spinner-border spinner-border-sm me-2" />
													Processing...
												</>
											) : (
												<>
													<Receipt size={20} className="me-2" />
													Checkout & Generate Bill
												</>
											)}
										</Button>
									</div>
								</>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Bill Modal */}
			<Modal show={showBillModal} onHide={handleCloseBill} size="lg" centered>
				<Modal.Header closeButton className="bg-success text-white">
					<Modal.Title className="d-flex align-items-center">
						<Receipt size={24} className="me-2" />
						Sale Completed Successfully!
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{lastSale && (
						<Card className="border-0">
							<Card.Body>
								<div className="text-center mb-4">
									<div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
										<Shield size={32} className="text-success" />
									</div>
									<h4 className="text-success fw-bold">Thank You!</h4>
									<p className="text-muted">
										Your sale has been processed successfully
									</p>
								</div>

								<Row className="text-center mb-4">
									<Col>
										<div className="border-end">
											<div className="text-muted small">Sale ID</div>
											<strong>#{lastSale.saleId || lastSale._id}</strong>
										</div>
									</Col>
									<Col>
										<div className="border-end">
											<div className="text-muted small">Date</div>
											<strong>{new Date().toLocaleDateString()}</strong>
										</div>
									</Col>
									<Col>
										<div>
											<div className="text-muted small">Time</div>
											<strong>{new Date().toLocaleTimeString()}</strong>
										</div>
									</Col>
								</Row>

								<Table borderless className="mb-4">
									<thead>
										<tr>
											<th>Item</th>
											<th className="text-center">Qty</th>
											<th className="text-end">Price</th>
											<th className="text-end">Total</th>
										</tr>
									</thead>
									<tbody>
										{lastSale.items.map((item, index) => (
											<tr key={index}>
												<td>{item.name}</td>
												<td className="text-center">{item.quantitySold}</td>
												<td className="text-end">₹{item.sellingPrice}</td>
												<td className="text-end">
													₹{(item.sellingPrice * item.quantitySold).toFixed(2)}
												</td>
											</tr>
										))}
									</tbody>
								</Table>

								<div className="bg-light p-3 rounded">
									<div className="d-flex justify-content-between">
										<strong>Grand Total:</strong>
										<strong className="fs-5 text-success">
											₹{lastSale.grandTotal?.toFixed(2)}
										</strong>
									</div>
								</div>
							</Card.Body>
						</Card>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleCloseBill}>
						Close
					</Button>
					<Button variant="primary" onClick={handleCloseBill}>
						<Zap size={16} className="me-1" />
						New Sale
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default SalesPage;
