const cartContainer = document.getElementById("cartContainer");
// Select the container where the cart items will be displayed

// Function to retrieve cart items from localStorage
function getCartItems() {
  // Try to parse the cart data stored in localStorage; if none exists, return an empty array
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save the updated cart items array back to localStorage
function saveCartItems(items) {
  // Stringify the array and store it under the key "cart" in localStorage
  localStorage.setItem("cart", JSON.stringify(items));
}

// Function to render cart items on the page
function renderCart() {
  const items = getCartItems();
  // Clear previous content in the cart container before rendering
  cartContainer.innerHTML = "";
  if (items.length === 0) {
    // If there are no items, display a friendly message
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  // Loop through each item in the cart
  items.forEach((item, index) => {
    // Create a new div for each cart item
    const cartItem = document.createElement("div");
    // Set the CSS class for styling the cart item
    cartItem.className = "cart-item";
    // Set inner HTML with product details and action buttons
    cartItem.innerHTML = `
      <div>
        <h3>${item.title} - ${item.price}</h3>
        <p>Size: ${item.size}</p>
      </div>
      <div class="action-buttons">
        <!-- Button to edit the cart item with a data attribute storing its index -->
        <button class="edit-cart-btn" data-index="${index}">Edit</button>
        <!-- Button to remove the cart item with a data attribute storing its index -->
        <button class="remove-cart-btn" data-index="${index}">Remove</button>
      </div>
    `;
    // Append the created cart item to the container
    cartContainer.appendChild(cartItem);
  });
  // Add event listeners to all remove buttons
  document.querySelectorAll(".remove-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Retrieve the data-index attribute of the clicked button
      const index = e.target.getAttribute("data-index");
      // Call the function to remove the item at that index
      removeCartItem(index);
    });
  });
  // Add event listeners to all edit buttons
  document.querySelectorAll(".edit-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Get the index for the item to be edited
      const index = e.target.getAttribute("data-index");
      // Call the function to edit the item at that index
      editCartItem(index);
    });
  });
}

// Function to remove an item from the cart given its index
function removeCartItem(index) {
  let items = getCartItems();
  // Remove the item from the array
  items.splice(index, 1);
  // Save the updated cart back to localStorage
  saveCartItems(items);
  // Re-render the cart to reflect changes
  renderCart();
}

// Function to edit an item in the cart (specifically, its size)
function editCartItem(index) {
  let items = getCartItems();
  // Get the current item data using the provided index
  let itemToEdit = items[index];
  // Define allowed sizes for the product
  const allowedSizes = ["42", "43", "44"];
  // Prompt the user to enter a new size, pre-filling the current size value
  let newSize = prompt(
    `Edit size for ${itemToEdit.title} (current size: ${itemToEdit.size}).\nEnter new size (${allowedSizes.join(", ")}):`,
    itemToEdit.size
  );
  // Check if the user provided a value and if it's non-empty after trimming whitespace
  if (newSize !== null && newSize.trim() !== "") {
    // Regular expression to ensure the new size is one of the allowed options
    const sizeRegex = /^(42|43|44)$/;
    if (!sizeRegex.test(newSize.trim())) {
      // Alert the user if the input is invalid
      alert(`Invalid size. Please enter one of the following: ${allowedSizes.join(", ")}.`);
      return;
    }
    // Update the cart item with the new size
    itemToEdit.size = newSize.trim();
    items[index] = itemToEdit;
    // Save the updated cart back to localStorage
    saveCartItems(items);
    // Re-render the cart to update the displayed data
    renderCart();
  }
}

// Initial render call when the script loads
renderCart();
