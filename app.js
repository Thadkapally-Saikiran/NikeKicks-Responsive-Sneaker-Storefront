// ------------------------
// Slider and Product Data Setup
// ------------------------

// Select the container element that holds all slider items.
// This element will be animated to show different products.
const wrapper = document.querySelector(".sliderWrapper");

// Select all menu item elements (navigation buttons) for the slider.
// These elements are used for navigating between different products.
const menuItems = document.querySelectorAll(".menuItem");

// Define an array of product objects.
// Each product object contains an id, title, price, and available color options.
const products = [
  {
    id: 1,                            // Unique identifier for the product
    title: "Air Force",               // Product title/name
    price: 119,                       // Price of the product in dollars
    colors: [                         // Array of available color options
      { code: "black", img: "./img/air.png" },    // Each color has a color code and an image URL
      { code: "darkblue", img: "./img/air2.png" },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      { code: "lightgray", img: "./img/jordan.png" },
      { code: "green", img: "./img/jordan2.png" },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      { code: "lightgray", img: "./img/blazer.png" },
      { code: "green", img: "./img/blazer2.png" },
      { code: "red", img: "./img/blazer3.png" } // New red blazer option added for variety
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      { code: "black", img: "./img/crater.png" },
      { code: "lightgray", img: "./img/crater2.png" },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      { code: "gray", img: "./img/hippie.png" },
      { code: "black", img: "./img/hippie2.png" },
    ],
  },
];

// Set the first product in the array as the initially chosen product.
let chosenProduct = products[0];

// Select the product image element where the current product's image is displayed.
const currentProductImg = document.querySelector(".productImg");

// Select the element that displays the current product's title.
const currentProductTitle = document.querySelector(".productTitle");

// Select the element that displays the product's price.
const currentProductPrice = document.querySelector(".productPrice");

// Select the container that will hold and render the product's color options dynamically.
const colorsContainer = document.querySelector(".colors");

// Select all the size option elements (for example: 42, 43, 44).
const currentProductSizes = document.querySelectorAll(".size");

// ------------------------
// Menu Items Event Listeners & Slider Transition
// ------------------------

// Add a click event listener to each menu item
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Animate the slider by setting the transform style.
    // Multiply the index by -100vw to shift the slider to the correct position.
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Update the chosen product based on the clicked menu item's index.
    chosenProduct = products[index];

    // Update the product title text content to reflect the selected product.
    currentProductTitle.textContent = chosenProduct.title;
    
    // Update the product price with a dollar sign and the selected product's price.
    currentProductPrice.textContent = "$" + chosenProduct.price;
    
    // Set the product image to the first color option of the selected product.
    currentProductImg.src = chosenProduct.colors[0].img;

    // Call function to dynamically render the color options for the chosen product.
    renderProductColors(chosenProduct);
  });
});

// ------------------------
// Function: renderProductColors
// ------------------------

// This function dynamically creates color option elements for a given product.
function renderProductColors(product) {
  // Clear any previously rendered color elements.
  colorsContainer.innerHTML = "";

  // Loop through each color option available in the product.
  product.colors.forEach((colorOption) => {
    // Create a new div element for the color option.
    const colorDiv = document.createElement("div");
    // Add the CSS class 'color' to the new element for styling.
    colorDiv.classList.add("color");
    // Set the background color of the div using the color code from the product data.
    colorDiv.style.backgroundColor = colorOption.code;
    
    // Add a click event listener to update the product image when this color is selected.
    colorDiv.addEventListener("click", () => {
      // Change the product image source to the image associated with the selected color.
      currentProductImg.src = colorOption.img;
    });
    
    // Append the newly created color div to the container holding all color options.
    colorsContainer.appendChild(colorDiv);
  });
}

// Render color options for the default selected product when the page first loads.
renderProductColors(chosenProduct);

// ------------------------
// Size Selection Logic
// ------------------------

// Add click event listeners to each size option element.
currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    // First, reset the background and text color for all size elements.
    currentProductSizes.forEach((s) => {
      s.style.backgroundColor = "white"; // Reset background to white
      s.style.color = "black";           // Reset text color to black
    });
    // Highlight the clicked size option by setting its background color to black.
    size.style.backgroundColor = "black";
    // Change the text color to white to improve visibility.
    size.style.color = "white";
  });
});

// ------------------------
// Payment Process and JSON Server Integration
// ------------------------

// Select the "Buy Now!" button that triggers the payment modal.
const productButton = document.querySelector(".productButton");

// Select the payment modal container element.
const payment = document.querySelector(".payment");

// Select the close button (typically an 'X') within the payment modal.
const close = document.querySelector(".close");

// When the user clicks the "Buy Now!" button, display the payment modal.
productButton.addEventListener("click", () => {
  // Show the payment modal by setting its display style to "flex".
  payment.style.display = "flex";
});

// When the close button is clicked, hide the payment modal.
close.addEventListener("click", () => {
  // Hide the payment modal by setting its display style to "none".
  payment.style.display = "none";
});

// ------------------------
// Payment Form Elements
// ------------------------

// Select the "Checkout!" button inside the payment modal.
const payButton = document.querySelector(".payButton");

// Select the input elements for personal and card information using their placeholder attributes.
const nameInput = document.querySelector("input[placeholder='John Doe']");                   // Input for customer's name
const phoneInput = document.querySelector("input[placeholder='+1 234 5678']");                 // Input for customer's phone number
const addressInput = document.querySelector("input[placeholder='Elton St 21 22-145']");         // Input for customer's address
const cardNumberInput = document.querySelector("input[placeholder='Card Number']");            // Input for credit/debit card number
const expiryMonthInput = document.querySelector("input[placeholder='mm']");                    // Input for the card's expiry month
const expiryYearInput = document.querySelector("input[placeholder='yyyy']");                   // Input for the card's expiry year
const cvvInput = document.querySelector("input[placeholder='cvv']");                           // Input for the card's CVV code

// ------------------------
// Payment Submission Event
// ------------------------

// Add a click event listener to the "Checkout!" button to trigger the payment process.
payButton.addEventListener("click", () => {
  // Construct an object containing all the payment data from the form fields.
  const paymentData = {
    customer: {
      // Capture personal details from the corresponding input fields.
      name: nameInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
    },
    cardInfo: {
      // Capture card details from the payment form fields.
      cardNumber: cardNumberInput.value,
      expiryMonth: expiryMonthInput.value,
      expiryYear: expiryYearInput.value,
      cvv: cvvInput.value,
    },
    product: {
      // Capture product details from the current product display.
      title: currentProductTitle.textContent,      // Product title text
      price: currentProductPrice.textContent,        // Product price text (includes the '$' sign)
      image: currentProductImg.src,                  // Image source URL of the product
    },
    // Record the current date and time in ISO format for the transaction timestamp.
    date: new Date().toISOString(),
  };

  // Send a POST request to the JSON server to process the payment.
  // Make sure that a json-server is running on localhost:3000 to handle this request.
  fetch("http://localhost:3000/payments", {
    method: "POST",   // Specify the HTTP method as POST for sending data.
    headers: {
      "Content-Type": "application/json",  // Indicate that the request body is JSON.
    },
    // Convert the paymentData object to a JSON string before sending.
    body: JSON.stringify(paymentData),
  })
    // Process the response from the JSON server.
    .then((response) => {
      // If the response status is not OK (i.e., 200-level status), throw an error.
      if (!response.ok) {
        throw new Error("Payment failed");
      }
      // Otherwise, parse the JSON response.
      return response.json();
    })
    .then((data) => {
      // Payment was successful: notify the user.
      alert("Payment successful!");
      // Hide the payment modal after successful payment.
      payment.style.display = "none";
      // Optionally, you could also clear the input fields here.
    })
    .catch((error) => {
      // Log any errors that occurred during the process to the console.
      console.error("Error processing payment:", error);
      // Alert the user that payment failed and to try again later.
      alert("Payment failed. Please try again later.");
    });
});
