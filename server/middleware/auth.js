const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get user from database
    const user = await User.findById(decoded.userId)
      .select('-password')
      .populate('department', 'name code');

    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or inactive user' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }
    return res.status(500).json({ 
      success: false, 
      message: 'Authentication error' 
    });
  }
};

// Middleware to check if user has required role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

// Middleware to check if user belongs to specific department
const authorizeDepartment = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  // Admin can access all departments
  if (req.user.role === 'Admin') {
    return next();
  }

  // Check if user's department matches the requested department
  const requestedDepartmentId = req.params.departmentId || req.body.departmentId;
  
  if (requestedDepartmentId && req.user.department && 
      req.user.department._id.toString() !== requestedDepartmentId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Department mismatch.' 
    });
  }

  next();
};

// Middleware to check if user is accessing their own data
const authorizeOwnData = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  // Admin can access all data
  if (req.user.role === 'Admin') {
    return next();
  }

  const requestedUserId = req.params.userId || req.body.userId;
  
  if (requestedUserId && req.user._id.toString() !== requestedUserId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Can only access own data.' 
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  authorizeRole,
  authorizeDepartment,
  authorizeOwnData
};
