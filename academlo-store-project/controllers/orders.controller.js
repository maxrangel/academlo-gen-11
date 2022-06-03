// Models
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Product } = require('../models/product.model');
const { Order } = require('../models/order.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const getUserCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
    include: [{ model: ProductInCart, include: [{ model: Product }] }],
  });

  res.status(200).json({ status: 'success', cart });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  // Validate that the product has enough stock for the cart
  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Invalid product', 404));
  } else if (quantity < 0 || quantity > product.quantity) {
    return next(
      new AppError(
        `This product only has ${product.quantity} items available`,
        400
      )
    );
  }

  // Fetch current active cart, if it doesn't exist, create a new one
  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  // Create new cart if it doesn't exist
  if (!cart) {
    const newCart = await Cart.create({ userId: sessionUser.id });

    // Add product to the cart
    await ProductInCart.create({ cartId: newCart.id, productId, quantity });
  } else {
    // User already has a cart
    // Validate if product already exists in the cart
    const productInCart = await ProductInCart.findOne({
      where: { cartId: cart.id, productId },
    });

    // Send error if it exists
    if (productInCart && productInCart.status === 'active') {
      return next(
        new AppError('You already have that product in your cart', 400)
      );
    } else if (productInCart && productInCart.status === 'removed') {
      // Put back the product in the cart (update to active)
      await productInCart.update({ status: 'active', quantity });
    } else if (!productInCart) {
      // Add new product to current cart
      await ProductInCart.create({ cartId: cart.id, productId, quantity });
    }
  }

  res.status(200).json({ status: 'success' });
});

const updateProductInCart = catchAsync(async (req, res, next) => {
  const { newQty, productId } = req.body;
  const { sessionUser } = req;

  // Get user's cart
  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
  });

  if (!cart) {
    return next(new AppError('Must create a cart first', 400));
  }

  // Validate that the product exists in the cart
  const productInCart = await ProductInCart.findOne({
    where: { status: 'active', cartId: cart.id, productId },
    include: [{ model: Product }],
  });

  if (!productInCart) {
    return next(new AppError('This product does not exist in your cart', 404));
  }

  // Validate that the updated qty is not a negative number or exceeds the available stock
  if (newQty < 0 || newQty > productInCart.product.quantity) {
    return next(
      new AppError(
        `Invalid selected quantity, this product only has ${productInCart.product.quantity} items available`,
        400
      )
    );
  }

  // If newQty is 0, remove product from cart (update status)
  if (newQty === 0) {
    await productInCart.update({ quantity: 0, status: 'removed' });
  } else if (newQty > 0) {
    // Update product in cart to new qty
    await productInCart.update({ quantity: newQty });
  }

  res.status(200).json({ status: 'success' });
});

const purchaseCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  // Get user's cart and get products in cart
  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
    include: [
      {
        model: ProductInCart,
        where: { status: 'active' },
        include: [{ model: Product }],
      },
    ],
  });

  if (!cart) {
    return next(new AppError('This user does not have a cart yet.', 400));
  }

  // await ProductInCart.findAll({ where: { cartId: cart.id } });

  // Loop products in cart to do the following (map async)
  let totalPrice = 0;

  const cartPromises = cart.productInCarts.map(async productInCart => {
    //  Substract to stock
    const updatedQty = productInCart.product.quantity - productInCart.quantity;

    await productInCart.product.update({ quantity: updatedQty });

    //  Calculate total price
    const productPrice = productInCart.quantity * +productInCart.product.price;
    totalPrice += productPrice;

    //  Mark products to status purchased
    return await productInCart.update({ status: 'purchased' });
  });

  await Promise.all(cartPromises);

  // Create order to user
  const newOrder = await Order.create({
    userId: sessionUser.id,
    cartId: cart.id,
    totalPrice,
  });

  await cart.update({ status: 'purchased' });

  res.status(200).json({ status: 'success', newOrder });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
