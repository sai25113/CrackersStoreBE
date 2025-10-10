// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getSalesThunk } from "./salesThunk";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // const SalesHistoryPage = () => {
// // 	const dispatch = useDispatch();
// // 	const { list: sales, loading } = useSelector((s) => s.sales);

// // 	useEffect(() => {
// // 		dispatch(getSalesThunk());
// // 	}, [dispatch]);

// // 	const downloadBill = (sale) => {
// // 		const doc = new jsPDF();
// // 		doc.setFontSize(16);
// // 		doc.text("Crackers Stall - Sales Bill", 14, 15);
// // 		doc.setFontSize(10);
// // 		doc.text(`Date: ${new Date(sale.createdAt).toLocaleString()}`, 14, 22);

// // 		// Table of items
// // 		const items = sale.items.map((item, i) => [
// // 			i + 1,
// // 			item.name,
// // 			item.quantity,
// // 			`₹${item.pricePerItem}`,
// // 			`₹${item.total}`,
// // 		]);

// // 		doc.autoTable({
// // 			startY: 28,
// // 			head: [["#", "Item", "Qty", "Price", "Total"]],
// // 			body: items,
// // 		});

// // 		let y = doc.autoTable.previous.finalY + 10;
// // 		doc.text(`Subtotal: ₹${sale.subtotal.toFixed(2)}`, 14, y);
// // 		y += 6;
// // 		doc.text(
// // 			`Discount (${sale.discountType === "percent" ? sale.discountValue + "%" : "₹" + sale.discountValue})`,
// // 			14,
// // 			y,
// // 		);
// // 		y += 6;
// // 		doc.setFontSize(12);
// // 		doc.text(`Final Total: ₹${sale.totalAmount.toFixed(2)}`, 14, y);

// // 		doc.save(`Bill_${new Date(sale.createdAt).toLocaleDateString()}.pdf`);
// // 	};

// // 	if (loading) return <p className="p-6 text-gray-500">Loading sales...</p>;

// // 	return (
// // 		<div className="p-6">
// // 			<h2 className="text-2xl font-bold mb-4">Sales History</h2>
// // 			{!sales.length ? (
// // 				<p>No sales recorded yet.</p>
// // 			) : (
// // 				<div className="space-y-4">
// // 					{sales.map((sale) => (
// // 						<div key={sale._id} className="border p-4 rounded-lg shadow-sm">
// // 							<div className="flex justify-between">
// // 								<div>
// // 									<h3 className="font-semibold text-lg">
// // 										Bill Date: {new Date(sale.createdAt).toLocaleString()}
// // 									</h3>
// // 									<p className="text-sm text-gray-600">
// // 										Items: {sale.items.length}
// // 									</p>
// // 								</div>
// // 								<button
// // 									onClick={() => downloadBill(sale)}
// // 									className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// // 								>
// // 									Download PDF
// // 								</button>
// // 							</div>

// // 							<table className="w-full mt-2 text-sm border-t">
// // 								<thead>
// // 									<tr className="text-left border-b">
// // 										<th className="py-1">Item</th>
// // 										<th>Qty</th>
// // 										<th>Price</th>
// // 										<th>Total</th>
// // 									</tr>
// // 								</thead>
// // 								<tbody>
// // 									{sale.items.map((item, i) => (
// // 										<tr key={i} className="border-b">
// // 											<td>{item.name}</td>
// // 											<td>{item.quantity}</td>
// // 											<td>₹{item.pricePerItem}</td>
// // 											<td>₹{item.total}</td>
// // 										</tr>
// // 									))}
// // 								</tbody>
// // 							</table>

// // 							<div className="mt-2 text-right">
// // 								<p>Subtotal: ₹{sale.subtotal.toFixed(2)}</p>
// // 								<p>
// // 									Discount (
// // 									{sale.discountType === "percent"
// // 										? sale.discountValue + "%"
// // 										: "₹" + sale.discountValue}
// // 									)
// // 								</p>
// // 								<p className="font-bold text-lg text-green-700">
// // 									Total: ₹{sale.totalAmount.toFixed(2)}
// // 								</p>
// // 							</div>
// // 						</div>
// // 					))}
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default SalesHistoryPage;

// const SalesHistoryPage = () => {
// 	const dispatch = useDispatch();
// 	const { list: sales, loading, error } = useSelector((s) => s.sales);

// 	useEffect(() => {
// 		dispatch(getSalesThunk());
// 	}, [dispatch]);

// 	console.log(sales);

// 	if (loading) return <p className="p-6">Loading sales...</p>;
// 	if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

// 	return (
// 		<div className="p-6">
// 			<h2 className="text-2xl font-bold mb-4">Sales History</h2>

// 			<table className="w-full border-collapse border border-gray-400">
// 				<thead className="bg-gray-100">
// 					<tr>
// 						<th className="border px-3 py-2">Bill No</th>
// 						<th className="border px-3 py-2">Customer</th>
// 						<th className="border px-3 py-2">Date</th>
// 						<th className="border px-3 py-2">Total (₹)</th>
// 						<th className="border px-3 py-2">Discount (₹)</th>
// 						<th className="border px-3 py-2">Final Total (₹)</th>
// 						<th className="border px-3 py-2">Profit (₹)</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{sales.length === 0 && (
// 						<tr>
// 							<td colSpan="7" className="text-center py-4">
// 								No sales recorded yet
// 							</td>
// 						</tr>
// 					)}
// 					{sales.map((sale) => (
// 						<tr key={sale._id} className="hover:bg-gray-50">
// 							<td className="border px-3 py-2">{sale.billNo}</td>
// 							<td className="border px-3 py-2">{sale.customerName || "-"}</td>
// 							<td className="border px-3 py-2">
// 								{new Date(sale.date).toLocaleString()}
// 							</td>
// 							<td className="border px-3 py-2">
// 								{sale.totalBeforeDiscount.toFixed(2)}
// 							</td>
// 							<td className="border px-3 py-2">
// 								{sale.discountAmount.toFixed(2)}
// 							</td>
// 							<td className="border px-3 py-2">{sale.finalTotal.toFixed(2)}</td>
// 							<td className="border px-3 py-2 text-green-600 font-semibold">
// 								{sale.profit.toFixed(2)}
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };

// export default SalesHistoryPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalesThunk } from "./salesThunk";
import {
	Container,
	Row,
	Col,
	Card,
	Table,
	Button,
	Form,
	InputGroup,
	Badge,
	Spinner,
	Alert,
	Modal,
	Dropdown,
} from "react-bootstrap";
import {
	History,
	Download,
	Filter,
	Search,
	Calendar,
	Eye,
	IndianRupee,
	TrendingUp,
	Users,
	FileText,
	BarChart3,
	RefreshCw,
	MoreVertical,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesHistoryPage = () => {
	const dispatch = useDispatch();
	const { list: sales, loading, error } = useSelector((s) => s.sales);

	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("all");
	const [selectedSale, setSelectedSale] = useState(null);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [sortBy, setSortBy] = useState("date");
	const [sortOrder, setSortOrder] = useState("desc");

	useEffect(() => {
		dispatch(getSalesThunk());
	}, [dispatch]);

	// Filter and sort sales
	const filteredAndSortedSales = sales
		.filter((sale) => {
			const matchesSearch =
				sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				sale.billNo?.toString().includes(searchTerm);

			const saleDate = new Date(sale.date);
			const today = new Date();
			const yesterday = new Date(today);
			yesterday.setDate(yesterday.getDate() - 1);

			let matchesDate = true;
			switch (dateFilter) {
				case "today":
					matchesDate = saleDate.toDateString() === today.toDateString();
					break;
				case "yesterday":
					matchesDate = saleDate.toDateString() === yesterday.toDateString();
					break;
				case "week":
					const weekAgo = new Date(today);
					weekAgo.setDate(weekAgo.getDate() - 7);
					matchesDate = saleDate >= weekAgo;
					break;
				case "month":
					const monthAgo = new Date(today);
					monthAgo.setMonth(monthAgo.getMonth() - 1);
					matchesDate = saleDate >= monthAgo;
					break;
				default:
					matchesDate = true;
			}

			return matchesSearch && matchesDate;
		})
		.sort((a, b) => {
			let aValue, bValue;

			switch (sortBy) {
				case "date":
					aValue = new Date(a.date);
					bValue = new Date(b.date);
					break;
				case "amount":
					aValue = a.finalTotal;
					bValue = b.finalTotal;
					break;
				case "profit":
					aValue = a.profit;
					bValue = b.profit;
					break;
				case "customer":
					aValue = a.customerName || "";
					bValue = b.customerName || "";
					break;
				default:
					aValue = new Date(a.date);
					bValue = new Date(b.date);
			}

			if (sortOrder === "asc") {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
			}
		});

	// Calculate summary statistics
	const summaryStats = {
		totalSales: filteredAndSortedSales.length,
		totalRevenue: filteredAndSortedSales.reduce(
			(sum, sale) => sum + sale.finalTotal,
			0,
		),
		totalProfit: filteredAndSortedSales.reduce(
			(sum, sale) => sum + sale.profit,
			0,
		),
		averageSale:
			filteredAndSortedSales.length > 0
				? filteredAndSortedSales.reduce(
						(sum, sale) => sum + sale.finalTotal,
						0,
					) / filteredAndSortedSales.length
				: 0,
	};

	const downloadBill = (sale) => {
		const doc = new jsPDF();

		// Header
		doc.setFontSize(20);
		doc.setTextColor(13, 110, 253);
		doc.text("CRACKERSPRO", 105, 15, { align: "center" });

		doc.setFontSize(12);
		doc.setTextColor(0, 0, 0);
		doc.text("Sales Invoice", 105, 25, { align: "center" });

		// Company Info
		doc.setFontSize(10);
		doc.text("CrackersPro Inventory Management", 14, 35);
		doc.text("Phone: +91 XXXXXXXXXX", 14, 40);
		doc.text("Email: info@crackerspro.com", 14, 45);

		// Bill Info
		doc.text(`Bill No: ${sale.billNo}`, 140, 35);
		doc.text(`Date: ${new Date(sale.date).toLocaleDateString()}`, 140, 40);
		doc.text(`Time: ${new Date(sale.date).toLocaleTimeString()}`, 140, 45);

		if (sale.customerName) {
			doc.text(`Customer: ${sale.customerName}`, 14, 55);
		}

		// Table
		const items = sale.items.map((item, i) => [
			i + 1,
			item.name,
			item.quantitySold || item.quantity,
			`₹${(item.sellingPrice || item.pricePerItem).toFixed(2)}`,
			`₹${((item.sellingPrice || item.pricePerItem) * (item.quantitySold || item.quantity)).toFixed(2)}`,
		]);

		doc.autoTable({
			startY: 65,
			head: [["#", "Item Name", "Qty", "Unit Price", "Total"]],
			body: items,
			styles: { fontSize: 9 },
			headStyles: { fillColor: [13, 110, 253] },
		});

		let y = doc.autoTable.previous.finalY + 10;

		// Totals
		doc.setFontSize(10);
		doc.text(`Subtotal: ₹${sale.totalBeforeDiscount.toFixed(2)}`, 140, y);
		y += 6;
		doc.text(`Discount: ₹${sale.discountAmount.toFixed(2)}`, 140, y);
		y += 6;
		doc.text(`GST (18%): ₹${(sale.finalTotal * 0.18).toFixed(2)}`, 140, y);
		y += 6;
		doc.setFontSize(12);
		doc.setFont(undefined, "bold");
		doc.text(`Grand Total: ₹${sale.finalTotal.toFixed(2)}`, 140, y);

		// Footer
		doc.setFont(undefined, "normal");
		doc.setFontSize(8);
		doc.text("Thank you for your business!", 105, 280, { align: "center" });
		doc.text("Terms & Conditions Apply", 105, 285, { align: "center" });

		doc.save(
			`Invoice_${sale.billNo}_${new Date(sale.date).toLocaleDateString()}.pdf`,
		);
	};

	const viewSaleDetails = (sale) => {
		setSelectedSale(sale);
		setShowDetailModal(true);
	};

	const refreshData = () => {
		dispatch(getSalesThunk());
	};

	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(field);
			setSortOrder("desc");
		}
	};

	const getSortIcon = (field) => {
		if (sortBy !== field) return null;
		return sortOrder === "asc" ? "↑" : "↓";
	};

	if (loading) {
		return (
			<Container fluid className="p-4 bg-light min-vh-100">
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: "50vh" }}
				>
					<Spinner animation="border" variant="primary" className="me-3" />
					<span className="fs-5">Loading sales history...</span>
				</div>
			</Container>
		);
	}

	return (
		<Container fluid className="p-4 bg-light min-vh-100">
			{/* Header */}
			<Row className="mb-4">
				<Col>
					<Card className="border-0 shadow-sm">
						<Card.Body className="py-4">
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h1 className="h3 fw-bold text-primary mb-2">
										<History className="me-3" size={32} />
										Sales History
									</h1>
									<p className="text-muted mb-0">
										Track and analyze your sales performance
									</p>
								</div>
								<Button
									variant="outline-primary"
									onClick={refreshData}
									className="d-flex align-items-center"
								>
									<RefreshCw size={16} className="me-2" />
									Refresh
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Summary Cards */}
			<Row className="mb-4">
				<Col xl={3} lg={6} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Total Sales</h6>
									<h3 className="fw-bold text-primary mb-0">
										{summaryStats.totalSales}
									</h3>
								</div>
								<div className="bg-primary bg-opacity-10 p-3 rounded">
									<FileText size={24} className="text-primary" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={3} lg={6} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Total Revenue</h6>
									<h3 className="fw-bold text-success mb-0">
										₹{summaryStats.totalRevenue.toFixed(2)}
									</h3>
								</div>
								<div className="bg-success bg-opacity-10 p-3 rounded">
									<IndianRupee size={24} className="text-success" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={3} lg={6} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">Total Profit</h6>
									<h3 className="fw-bold text-warning mb-0">
										₹{summaryStats.totalProfit.toFixed(2)}
									</h3>
								</div>
								<div className="bg-warning bg-opacity-10 p-3 rounded">
									<TrendingUp size={24} className="text-warning" />
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={3} lg={6} className="mb-3">
					<Card className="border-0 shadow-sm h-100">
						<Card.Body>
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<h6 className="card-title text-muted mb-2">
										Avg. Sale Value
									</h6>
									<h3 className="fw-bold text-info mb-0">
										₹{summaryStats.averageSale.toFixed(2)}
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

			{/* Filters and Search */}
			<Row className="mb-4">
				<Col>
					<Card className="border-0 shadow-sm">
						<Card.Body>
							<div className="d-flex flex-wrap gap-3 align-items-center">
								<div className="flex-grow-1">
									<InputGroup style={{ maxWidth: "400px" }}>
										<InputGroup.Text>
											<Search size={16} />
										</InputGroup.Text>
										<Form.Control
											type="text"
											placeholder="Search by customer name or bill number..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</InputGroup>
								</div>

								<div className="d-flex gap-2">
									<InputGroup style={{ width: "auto" }}>
										<InputGroup.Text>
											<Filter size={16} />
										</InputGroup.Text>
										<Form.Select
											value={dateFilter}
											onChange={(e) => setDateFilter(e.target.value)}
										>
											<option value="all">All Time</option>
											<option value="today">Today</option>
											<option value="yesterday">Yesterday</option>
											<option value="week">Last 7 Days</option>
											<option value="month">Last 30 Days</option>
										</Form.Select>
									</InputGroup>
								</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Error Alert */}
			{error && (
				<Row className="mb-4">
					<Col>
						<Alert variant="danger" className="d-flex align-items-center">
							<Alert variant="danger" className="mb-0">
								Error loading sales data: {error}
							</Alert>
						</Alert>
					</Col>
				</Row>
			)}

			{/* Sales Table */}
			<Row>
				<Col>
					<Card className="border-0 shadow-sm">
						<Card.Header className="bg-white border-0 py-3">
							<div className="d-flex justify-content-between align-items-center">
								<h5 className="mb-0 fw-semibold">
									Sales Records ({filteredAndSortedSales.length})
								</h5>
								<div className="text-muted small">
									Sorted by: {sortBy} ({sortOrder})
								</div>
							</div>
						</Card.Header>
						<Card.Body className="p-0">
							{filteredAndSortedSales.length === 0 ? (
								<div className="text-center py-5">
									<History size={48} className="text-muted mb-3" />
									<h5 className="text-muted">No sales records found</h5>
									<p className="text-muted">
										{searchTerm || dateFilter !== "all"
											? "Try adjusting your filters"
											: "No sales have been recorded yet"}
									</p>
								</div>
							) : (
								<div className="table-responsive">
									<Table hover className="mb-0">
										<thead className="bg-light">
											<tr>
												<th
													style={{ cursor: "pointer" }}
													onClick={() => handleSort("billNo")}
													className="py-3"
												>
													Bill No {getSortIcon("billNo")}
												</th>
												<th
													style={{ cursor: "pointer" }}
													onClick={() => handleSort("customer")}
													className="py-3"
												>
													Customer {getSortIcon("customer")}
												</th>
												<th
													style={{ cursor: "pointer" }}
													onClick={() => handleSort("date")}
													className="py-3"
												>
													Date & Time {getSortIcon("date")}
												</th>
												<th className="py-3">Items</th>
												<th
													style={{ cursor: "pointer" }}
													onClick={() => handleSort("amount")}
													className="py-3 text-end"
												>
													Total Amount {getSortIcon("amount")}
												</th>
												<th className="py-3 text-end">Discount</th>
												<th
													style={{ cursor: "pointer" }}
													onClick={() => handleSort("profit")}
													className="py-3 text-end"
												>
													Profit {getSortIcon("profit")}
												</th>
												<th className="py-3 text-center">Actions</th>
											</tr>
										</thead>
										<tbody>
											{filteredAndSortedSales.map((sale) => (
												<tr key={sale._id} className="border-bottom">
													<td className="py-3">
														<Badge bg="primary" className="fs-6">
															#{sale.billNo}
														</Badge>
													</td>
													<td className="py-3">
														<div className="d-flex align-items-center">
															<Users size={16} className="text-muted me-2" />
															{sale.customerName || "Walk-in Customer"}
														</div>
													</td>
													<td className="py-3">
														<div className="d-flex align-items-center">
															<Calendar size={14} className="text-muted me-2" />
															<small>
																{new Date(sale.date).toLocaleDateString()}
																<br />
																<span className="text-muted">
																	{new Date(sale.date).toLocaleTimeString()}
																</span>
															</small>
														</div>
													</td>
													<td className="py-3">
														<Badge bg="light" text="dark">
															{sale.items?.length || 0} items
														</Badge>
													</td>
													<td className="py-3 text-end fw-semibold">
														₹{sale.finalTotal.toFixed(2)}
													</td>
													<td className="py-3 text-end text-danger">
														-₹{sale.discountAmount.toFixed(2)}
													</td>
													<td className="py-3 text-end">
														<Badge bg="success" className="fs-6">
															₹{sale.profit.toFixed(2)}
														</Badge>
													</td>
													<td className="py-3 text-center">
														<Dropdown>
															<Dropdown.Toggle
																variant="outline-primary"
																size="sm"
																id="dropdown-basic"
																className="border-0"
															>
																<MoreVertical size={16} />
															</Dropdown.Toggle>

															<Dropdown.Menu>
																<Dropdown.Item
																	onClick={() => viewSaleDetails(sale)}
																	className="d-flex align-items-center"
																>
																	<Eye size={16} className="me-2" />
																	View Details
																</Dropdown.Item>
																<Dropdown.Item
																	onClick={() => downloadBill(sale)}
																	className="d-flex align-items-center"
																>
																	<Download size={16} className="me-2" />
																	Download PDF
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Sale Detail Modal */}
			<Modal
				show={showDetailModal}
				onHide={() => setShowDetailModal(false)}
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="d-flex align-items-center">
						<FileText size={20} className="me-2" />
						Sale Details - Bill #{selectedSale?.billNo}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedSale && (
						<>
							<Row className="mb-4">
								<Col md={6}>
									<h6 className="text-muted">Customer</h6>
									<p className="fw-semibold">
										{selectedSale.customerName || "Walk-in Customer"}
									</p>
								</Col>
								<Col md={6}>
									<h6 className="text-muted">Date & Time</h6>
									<p className="fw-semibold">
										{new Date(selectedSale.date).toLocaleString()}
									</p>
								</Col>
							</Row>

							<h6 className="text-muted mb-3">Items Sold</h6>
							<Table bordered>
								<thead className="bg-light">
									<tr>
										<th>Item Name</th>
										<th className="text-center">Qty</th>
										<th className="text-end">Unit Price</th>
										<th className="text-end">Total</th>
									</tr>
								</thead>
								<tbody>
									{selectedSale.items.map((item, index) => (
										<tr key={index}>
											<td>{item.name}</td>
											<td className="text-center">
												{item.quantitySold || item.quantity}
											</td>
											<td className="text-end">
												₹{(item.sellingPrice || item.pricePerItem).toFixed(2)}
											</td>
											<td className="text-end">
												₹
												{(
													(item.sellingPrice || item.pricePerItem) *
													(item.quantitySold || item.quantity)
												).toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</Table>

							<div className="bg-light p-3 rounded mt-3">
								<Row>
									<Col md={6}>
										<div className="d-flex justify-content-between mb-2">
											<span>Subtotal:</span>
											<span>
												₹{selectedSale.totalBeforeDiscount.toFixed(2)}
											</span>
										</div>
										<div className="d-flex justify-content-between mb-2 text-danger">
											<span>Discount:</span>
											<span>-₹{selectedSale.discountAmount.toFixed(2)}</span>
										</div>
										<div className="d-flex justify-content-between mb-2">
											<span>GST (%):</span>
											<span>₹{(selectedSale.finalTotal * 0.0).toFixed(2)}</span>
										</div>
									</Col>
									<Col md={6}>
										<div className="text-end">
											<h5 className="text-success mb-1">
												Grand Total: ₹{selectedSale.finalTotal.toFixed(2)}
											</h5>
											<h6 className="text-warning">
												Profit: ₹{selectedSale.profit.toFixed(2)}
											</h6>
										</div>
									</Col>
								</Row>
							</div>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						onClick={() => setShowDetailModal(false)}
					>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							downloadBill(selectedSale);
							setShowDetailModal(false);
						}}
						className="d-flex align-items-center"
					>
						<Download size={16} className="me-2" />
						Download PDF
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default SalesHistoryPage;
