# NikeKicks - Responsive Sneaker Storefront 👟🛒

![](Nike.png)

Welcome to **NikeKicks**, a stylish and responsive eCommerce frontend project that emulates a Nike-inspired sneaker shopping experience. Built using HTML, CSS, JavaScript, and a local JSON server, this project showcases a clean UI, interactive cart, order tracking, and a smooth payment simulation.

---


## 🚀 Features

- 🏠 **Homepage** with hero section, featured products, and "Add to Cart" functionality
- 🛍️ **Cart Page** to review and update cart items
- ✅ **Order Placement** simulation and **Order Tracking**
- 💳 **Payment Success** page with confirmation UI
- 🎨 Fully responsive design using custom CSS
- 📦 **Data Persistence** using JSON server (`db.json`)

## Technologies Used 🛠️
- HTML5
- CSS3
- JavaScript (Vanilla)
- Axios
- JSON Server (Local REST API)

## Use Case 📌
This project is ideal for showcasing:

- Frontend development skills
- UI/UX design principles
- API integration using JSON server
- eCommerce web app simulations

---

## 📁 Project Structure

```
NikeKicks/
│
├── img/                      # All images used across the site
├── server/
│   └── db.json               # JSON server file storing payment/order data
│
├── index.html               # Homepage with hero section, products, etc.
├── index.js                 # Script for product interaction and cart buttons
├── cart.html                # Shopping cart UI
├── cart.js                  # Handles cart operations
├── order.html               # Displays placed orders
├── order.js                 # Fetches and deletes orders
├── payment_success.html     # Success page after payment
├── app.js                   # Axios setup or main logic if used
├── style.css                # All site-wide styles
└── README.md                # (To be created using the below content)
```

---

## Setup & Installation ⚙️

### 1. Clone repository
```bash
git clone https://github.com/yourusername/nike-ecommerce-store.git
cd nike-ecommerce-store
```

### 2. Install dependencies
```
npm install -g json-server
npm install axios
```

### 3. Start JSON Server
Create db.json with initial data:
```
{
  "payments": []
}
```
Start server:
```
json-server --watch db.json --port 3000
```

### 4. Run the Application
```
Open index.html in your browser
```

## Testing 🧪
1. Add products to cart
2. Proceed to checkout
3. Use test payment details:
   - Card: 4242 4242 4242 4242
   - Date: Any future date
   - CVV: Any 3 digits

## Important Notes:
1. Replace image paths in HTML/CSS files according to your actual image locations
2. Add proper product images to the img/ directory
3. For real deployment, you'd want to:
   - Add proper error handling
   - Implement actual payment gateway
   - Add user authentication
   - Set up proper database
   - Add more product details










