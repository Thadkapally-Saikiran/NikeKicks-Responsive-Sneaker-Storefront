// --- Slider & Product Data Setup ---
const wrapper = document.querySelector(".sliderWrapper");
// Selects the container that holds all slider items.
const menuItems = document.querySelectorAll(".menuItem");
// Gets all the clickable menu items for the slider navigation.

const products = [
  // Array of product objects with details for each product.
  {
    id: 1,
    title: "Air Force",
    price: 119,
    desc: "The classic Nike Air Force 1 offers iconic style with a timeless silhouette and superior comfort for everyday wear.",
    colors: [
      { code: "black", img: "./img/air.png" },
      { code: "darkblue", img: "./img/air2.png" },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    desc: "Elevate your game with Nike Air Jordan — a perfect blend of performance and style that pays homage to basketball heritage.",
    colors: [
      { code: "lightgray", img: "./img/jordan.png" },
      { code: "green", img: "./img/jordan2.png" },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    desc: "Step into the spotlight with the Nike Blazer, merging retro aesthetics with modern design for a versatile look.",
    colors: [
      { code: "lightgray", img: "./img/blazer.png" },
      { code: "green", img: "./img/blazer2.png" },
      { code: "red", img: "./img/blazer3.png" } // New red option added
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    desc: "Bold and innovative, the Nike Crater delivers a contemporary design with an edge for the modern trendsetter.",
    colors: [
      { code: "black", img: "./img/crater.png" },
      { code: "lightgray", img: "./img/crater2.png" },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    desc: "Embrace a carefree, streetwise style with Nike Hippie — where relaxed vibes meet modern flair.",
    colors: [
      { code: "gray", img: "./img/hippie.png" },
      { code: "black", img: "./img/hippie2.png" },
    ],
  },
];

let chosenProduct = products[0];
// Initially, the first product is selected.
const currentProductImg = document.querySelector(".productImg");
// Element where the product image will be displayed.
const currentProductTitle = document.querySelector(".productTitle");
// Element for displaying the product title.
const currentProductPrice = document.querySelector(".productPrice");
// Element for showing the product price.
const productDesc = document.querySelector(".productDesc");
// Paragraph element for the product description.
const colorsContainer = document.querySelector(".colors");
// Container where color options will be dynamically rendered.
const currentProductSizes = document.querySelectorAll(".size");
// Collection of all the size option elements.
const productButton = document.querySelector(".productButton");
// "Buy Now!" button that opens the payment modal.
const addToCartButton = document.querySelector(".addToCartButton");
// "Add to Cart" button to store the product locally.

let selectedSize = "";
// Variable to keep track of the chosen size by the user.

// Event listener for each menu item to enable slider navigation and product update.
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Move the slider to the appropriate section based on index.
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    // Update the currently chosen product.
    chosenProduct = products[index];
    // Update product title in the UI.
    currentProductTitle.textContent = chosenProduct.title;
    // Update product price.
    currentProductPrice.textContent = "$" + chosenProduct.price;
    // Update product description text.
    productDesc.textContent = chosenProduct.desc;
    // Set the product image to the first color option.
    currentProductImg.src = chosenProduct.colors[0].img;
    // Dynamically render the available color options.
    renderProductColors(chosenProduct);
  });
});

// Function to create and display color options dynamically.
function renderProductColors(product) {
  colorsContainer.innerHTML = "";
  // Clear any previously rendered color options.
  product.colors.forEach((colorOption) => {
    const colorDiv = document.createElement("div");
    // Create a new div for each color option.
    colorDiv.classList.add("color");
    // Apply the CSS class for styling the color div.
    colorDiv.style.backgroundColor = colorOption.code;
    // Set the background color based on the product's option.
    colorDiv.addEventListener("click", () => {
      // When clicked, update the product image to the chosen color’s image.
      currentProductImg.src = colorOption.img;
    });
    // Append the color option to the colors container.
    colorsContainer.appendChild(colorDiv);
  });
}

renderProductColors(chosenProduct);
// Render the color options for the default selected product.
productDesc.textContent = chosenProduct.desc;
// Set the product description for the default product.

// Add event listeners for size selection elements.
currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    // Reset styling for all size elements.
    currentProductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    // Highlight the clicked size element.
    size.style.backgroundColor = "black";
    size.style.color = "white";
    // Save the selected size.
    selectedSize = size.textContent;
  });
});

// --- Payment Process with Axios ---
const payment = document.querySelector(".payment");
// Selects the payment modal container.
const close = document.querySelector(".close");
// Selects the element used to close the payment modal.

productButton.addEventListener("click", () => {
  // When the "Buy Now!" button is clicked, display the payment modal.
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  // When the close element (X) is clicked, hide the payment modal.
  payment.style.display = "none";
});

// Gather the payment form input field elements.
const payButton = document.querySelector(".payButton");
// Button that initiates the checkout process.
const nameInput = document.querySelector("input[placeholder='John Doe']");
// Input for the customer's name.
const phoneInput = document.querySelector("input[placeholder='+1 234 5678']");
// Input for the customer's phone number.
const addressInput = document.querySelector("input[placeholder='Elton St 21 22-145']");
// Input for the customer's address.
const cardNumberInput = document.querySelector("input[placeholder='Card Number']");
// Input for the credit/debit card number.
const expiryMonthInput = document.querySelector("input[placeholder='mm']");
// Input for the card's expiry month.
const expiryYearInput = document.querySelector("input[placeholder='yyyy']");
// Input for the card's expiry year.
const cvvInput = document.querySelector("input[placeholder='cvv']");
// Input for the card's CVV (security code).

payButton.addEventListener("click", () => {
  // Validate payment form fields using regular expressions.
  const cardNumberPattern = /^\d{16}$/;
  // Regular expression to ensure card number is exactly 16 digits.
  const expiryMonthPattern = /^(0[1-9]|1[0-2])$/;
  // Pattern to allow months from 01 to 12.
  const expiryYearPattern = /^\d{4}$/;
  // Pattern to validate a 4-digit year.
  const cvvPattern = /^\d{3}$/;
  // Pattern to validate a 3-digit CVV (adjust if needed for 3-4 digits).

  if (!cardNumberPattern.test(cardNumberInput.value)) {
    // Check if card number is valid.
    alert("Invalid card number. It must be 16 digits.");
    return;
  }
  if (!expiryMonthPattern.test(expiryMonthInput.value)) {
    // Check if expiry month is valid.
    alert("Invalid expiry month. Use MM format between 01 and 12.");
    return;
  }
  if (!expiryYearPattern.test(expiryYearInput.value)) {
    // Check if expiry year is valid.
    alert("Invalid expiry year. It must be 4 digits (e.g., 2025).");
    return;
  }
  if (!cvvPattern.test(cvvInput.value)) {
    // Check if CVV is valid.
    alert("Invalid CVV. It must be 3 digits.");
    return;
  }

  // Construct an object with all the payment data.
  const paymentData = {
    customer: {
      name: nameInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
    },
    cardInfo: {
      cardNumber: cardNumberInput.value,
      expiryMonth: expiryMonthInput.value,
      expiryYear: expiryYearInput.value,
      cvv: cvvInput.value,
    },
    product: {
      title: currentProductTitle.textContent,
      price: currentProductPrice.textContent,
      image: currentProductImg.src,
      size: selectedSize || "Not selected",
      // Includes the selected size or defaults if none chosen.
    },
    date: new Date().toISOString(),
    // Timestamp for the payment in ISO format.
  };

  // Use Axios to POST the paymentData to the JSON server endpoint.
  axios
    .post("http://localhost:3000/payments", paymentData)
    .then((response) => {
      // If the server responds successfully, alert the user.
      alert("Payment Successful!");
      // Redirect the user to a payment success page.
      window.location.href = "payment_success.html";
    })
    .catch((error) => {
      // Log the error if the payment request fails.
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again later.");
    });
});

// --- Add to Cart Feature ---
// When the "Add to Cart" button is clicked, store product details in localStorage.
addToCartButton.addEventListener("click", () => {
  // Create an object with the current product data.
  const productData = {
    title: currentProductTitle.textContent,
    price: currentProductPrice.textContent,
    image: currentProductImg.src,
    size: selectedSize || "Not selected",
    // Includes selected size or a default message.
  };
  // Retrieve existing cart data from localStorage, or default to an empty array.
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  // Add the current product data to the cart array.
  existingCart.push(productData);
  // Save the updated cart back to localStorage.
  localStorage.setItem("cart", JSON.stringify(existingCart));
  // Notify the user that the product was added to cart.
  alert("Product added to cart!");
});
