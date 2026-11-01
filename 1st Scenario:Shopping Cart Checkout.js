//Product list and cart
const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 3 },
  { id: 2, name: "Mouse", price: 25, stock: 10 },
  { id: 3, name: "Headset", price: 100, stock: 5 }
];

let cart = [];


// Add a product to the cart // If the product is already in the cart, increase its quantity. // Do not add it if the requested quantity would exceed the stock. 

function addProductToCart(productId, quantity = 1) {
  const product = products.find((item) => item.id === productId);

  // Check that the product exists.
  if (!product) {
    return { success: false, message: "Product not found." };
  }

  // Check that the quantity is a positive whole number.
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return {
      success: false,
      message: "Quantity must be a positive integer."
    };
  }

  // Find out whether this product is already in the cart.
  const cartItem = cart.find((item) => item.id === productId);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  // Check the combined quantity against the available stock.
  if (currentQuantity + quantity > product.stock) {
    return {
      success: false,
      message: `Only ${product.stock} ${product.name}(s) are in stock.`
    };
  }

  // Increase the existing cart item's quantity / add the product to the cart for the first time.
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
    });
  }

  return { success: true, message: `${product.name} added to the cart.` };
}


//Remove a product from the cart
function removeProductFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  // Return a message if the product is not in the cart.
  if (itemIndex === -1) {
    return { success: false, message: "Product is not in the cart." };
  }

  // Remove one item from the cart using its position.
  cart.splice(itemIndex, 1);

  return { success: true, message: "Product removed from the cart." };
}


// Calculate the subtotal
function calculateSubtotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}


// Create the checkout summary + rules for discount and tax
function getCheckoutSummary() {
  const subtotal = calculateSubtotal();

  // The discount is zero unless the subtotal is greater than $1000.
  const discount = subtotal > 1000 ? subtotal * 0.10 : 0;

  // Subtract the discount before calculating tax.
  const amountAfterDiscount = subtotal - discount;

  // Calculate tax on the discounted amount.
  const tax = amountAfterDiscount * 0.11;

  // Add the tax to get the final amount due.
  const total = amountAfterDiscount + tax;

  return {
    items: cart,
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}


//Example usage
addProductToCart(1, 1); // Add 1 Laptop
addProductToCart(2, 2); // Add 2 Mice
addProductToCart(2, 1); // Increase the Mouse quantity by 1

console.log(getCheckoutSummary());

//Remove the Laptop, then show the updated summary.
removeProductFromCart(1);
console.log(getCheckoutSummary());
