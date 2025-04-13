const orderContainer = document.getElementById("orderContainer");
// Selects the container div where orders will be rendered.

// Function to fetch and display orders from the JSON server.
function fetchOrders() {
  axios
    .get("http://localhost:3000/payments")
    // GET request to the JSON server to retrieve all payment records.
    .then((response) => {
      orderContainer.innerHTML = "";
      // Clear any existing order items before rendering new ones.
      const orders = response.data;
      // Extract the array of orders from the response.
      if (orders.length === 0) {
        // If there are no orders, display a message.
        orderContainer.innerHTML = "<p>No orders found.</p>";
        return;
      }
      // Iterate over each order in the array.
      orders.forEach((order) => {
        const orderItem = document.createElement("div");
        // Create a new div element for the order.
        orderItem.classList.add("order-item");
        // Add CSS class for order styling.
        orderItem.innerHTML = `
          <div class="order-details">
            <h3>${order.product.title} - ${order.product.price}</h3>
            <p>Size: ${order.product.size}</p>
            <p>${new Date(order.date).toLocaleString()}</p>
          </div>
          <button class="delete-btn" data-id="${order.id}">Delete</button>
        `;
        // The inner HTML contains order details and a delete button with a data attribute.
        orderContainer.appendChild(orderItem);
        // Append the order item to the container.
      });
      // After orders are rendered, add event listeners for each delete button.
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          // Retrieve the specific order id from the clicked button.
          deleteOrder(id);
          // Call deleteOrder function to remove the order.
        });
      });
    })
    .catch((error) => {
      // Log errors if fetching orders fails.
      console.error("Error fetching orders:", error);
      orderContainer.innerHTML = "<p>Error loading orders.</p>";
      // Display an error message to the user.
    });
}

// Function to delete an order based on its ID.
function deleteOrder(id) {
  axios
    .delete(`http://localhost:3000/payments/${id}`)
    // Send a DELETE request to remove the order with the provided id.
    .then(() => {
      alert("Order deleted.");
      // Alert the user that the order was removed.
      fetchOrders(); // Refresh the orders list after deletion.
    })
    .catch((error) => {
      // Log errors if deletion fails.
      console.error("Error deleting order:", error);
      alert("Could not delete the order.");
    });
}

// Call fetchOrders when the page loads to display orders.
fetchOrders();
