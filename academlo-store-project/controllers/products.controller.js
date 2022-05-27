const { catchAsync } = require('../utils/catchAsync');

const getAllProducts = catchAsync(async (req, res, next) => {});

const getProductById = catchAsync(async (req, res, next) => {});

const createProduct = catchAsync(async (req, res, next) => {});

const updateProduct = catchAsync(async (req, res, next) => {});

const deleteProduct = catchAsync(async (req, res, next) => {});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
