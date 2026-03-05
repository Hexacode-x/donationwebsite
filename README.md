#  - Donate & Make a Difference landing page tamplate
India's Premier Donation Platform - Connecting donors with verified causes across the nation.

## Description

DharamSeva is a modern, secure donation platform designed for India. It enables users to contribute to various social causes including education, healthcare, rural development, and disaster relief. The platform features a beautiful glassmorphism UI, secure payment processing, and complete transparency in fund allocation.

## Features

- **Modern Glassmorphism UI** - Beautiful gradient backgrounds with glass-effect cards
- **Multiple Donation Causes** - Support education, healthcare, rural development, and disaster relief
- **Secure Payment Gateway** - UPI, Credit/Debit Cards, Net Banking support
- **Real-time Progress Tracking** - Visual progress bars for each cause
- **Donation History** - Track all your donations with localStorage persistence
- **Tax Benefits** - 80G tax deduction information displayed
- **Newsletter Subscription** - Stay updated with causes and success stories
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Toast Notifications** - Real-time feedback for all user actions
- **Keyboard Shortcuts** - ESC key to close modals
- **Smooth Animations** - Floating orbs, card hovers, and modal transitions

## File Structure

```
IMGPDF/
├── index.html          # Main HTML file with page structure
├── styles.css          # All CSS styles (glassmorphism, animations, etc.)
├── script.js           # JavaScript functions (modals, forms, localStorage)
└── README.md           # This documentation file
```

## Installation

### Prerequisites
- A local web server (XAMPP, WAMP, Ampps, or similar)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Setup Steps

1. **Clone or Download** the project files to your web server directory:
   - For Ampps: `C:\Program Files\Ampps\www\IMGPDF\`
   - For XAMPP: `C:\xampp\htdocs\IMGPDF\`

2. **Start your web server** (Apache/Nginx)

3. **Open in browser**:
   - Navigate to `http://localhost/IMGPDF/`

4. **No build process required** - The project uses CDN for TailwindCSS and Font Awesome

## Usage

### Making a Donation

1. Click "Donate Now" button or select a specific cause
2. Choose donation amount (₹100, ₹200, ₹500, ₹1000, ₹2000, or custom)
3. Select frequency (One-time or Monthly)
4. Choose payment method (UPI, Card, or Net Banking)
5. Fill in your details (Name, Email, Phone)
6. Click "Proceed to Pay"
7. View success confirmation and download receipt

### Viewing Donation History

1. Click the clock icon in the navigation bar
2. View all your past donations
3. Download receipts for tax purposes

### Newsletter Subscription

1. Scroll to the newsletter section
2. Enter your email address
3. Click "Subscribe"

## Customization Guide

### Changing Colors

Edit `styles.css` CSS variables in the `:root` section:

```css
:root {
    --primary: #ff6b35;      /* Main orange color */
    --secondary: #f7c548;    /* Yellow accent */
    --accent: #00875a;       /* Green for success */
    --dark: #1a1a2e;         /* Dark background */
    --light: #f8f9fa;        /* Light text */
}
```

### Adding New Causes

1. In `index.html`, add new cause cards in the "Top Causes" section
2. Update the `setCause()` function in `script.js` with new cause mappings
3. Add corresponding onclick handlers: `onclick="setCause('newcause'); openDonationModal();"`

### Modifying Payment Methods

Edit the payment method section in `index.html` within the donation modal.

### Changing Branding

- **Logo**: Update the SVG in the navigation section
- **Name**: Replace "DharamSeva" text throughout `index.html`
- **Footer**: Update social links and copyright information

### Adding Backend Integration

Replace the simulated payment processing in `processDonation()` function with actual API calls:

```javascript
async function processDonation() {
    // ... validation code ...
    
    const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, cause, donorInfo })
    });
    
    // Handle response...
}
```

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure |
| CSS3 | Styling and animations |
| JavaScript (ES6+) | Interactive functionality |
| TailwindCSS (CDN) | Utility-first CSS framework |
| Font Awesome (CDN) | Icon library |
| Google Fonts | Inter and Poppins typography |
| LocalStorage | Client-side data persistence |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## API Endpoints (For Backend Integration)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/donate` | POST | Process donation payment |
| `/api/history` | GET | Fetch donation history |
| `/api/newsletter` | POST | Subscribe to newsletter |
| `/api/receipt` | GET | Generate donation receipt |

## Security Considerations

- All form inputs are validated client-side
- Email validation using regex pattern
- Payment processing should be moved to secure backend
- Implement CSRF protection for production
- Use HTTPS in production environment
- Sanitize all user inputs on the server

## Author

**Hexacode-x**

- GitHub: [@Hexacode-x](https://github.com/Hexacode-x)
- Project: Donation website Tamplate

## License

This project is created for educational and demonstration purposes.

## Acknowledgments

- Designed with ❤️ for India


---

&copy; 2026 Hexacode . All rights reserved.
