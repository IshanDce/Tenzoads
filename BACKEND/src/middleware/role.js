export const requireSuperAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Access restricted to Superadmin users only',
    });
  }
  next();
};

