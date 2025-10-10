import { ApiError } from "../utils/api-error.js";

// roles can be: ADMIN, SELLER, WHOLESALER, etc.
export const authorizeRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.user) {
			throw new ApiError(401, "Unauthorized: User not found in request");
		}

		if (!allowedRoles.includes(req.user.role)) {
			throw new ApiError(
				403,
				`Access denied: Role '${req.user.role}' not authorized for this action`,
			);
		}

		next();
	};
};
