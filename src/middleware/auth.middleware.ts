import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  admin?: {
    adminId: string;
    role: string;
  };
}

interface AdminTokenPayload {
  adminId: string,
  role: string;
}

import jwt from "jsonwebtoken";

function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }
  
  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }
    const decoded = jwt.verify(
      token,
       process.env.JWT_SECRET
      ) as AdminTokenPayload;
    req.admin = {
      adminId: decoded.adminId,
      role: decoded.role,
    };

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  };
};

module.exports = requireAuth;