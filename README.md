# Rangtaali - Event Ticketing Website

A modern, responsive event ticketing website built with Next.js, TypeScript, Tailwind CSS, and Stripe integration for secure online ticket purchases.

## Features

- 🎫 **Event Details Page** - Beautiful hero section with event information
- 💳 **Stripe Integration** - Secure payment processing for ticket purchases
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI/UX** - Smooth animations and beautiful design
- 🔒 **Secure Payments** - PCI-compliant payment processing
- 📧 **Email Receipts** - Automatic email confirmations
- 🎭 **Multiple Ticket Types** - VIP, Premium, and General admission options

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Payment**: Stripe
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rangtaali
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Stripe keys:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

4. **Get Stripe API Keys**
   - Sign up at [stripe.com](https://stripe.com)
   - Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Copy your publishable and secret keys
   - Replace the placeholder keys in `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Customizing the Event

Edit the event details in `app/page.tsx`:

```typescript
const eventDetails = {
  title: "Your Event Title",
  subtitle: "Your event description",
  date: "December 15, 2024",
  time: "7:00 PM - 11:00 PM",
  venue: "Your Venue Name",
  address: "Your Venue Address",
  // ... more details
}
```

### Ticket Types

Modify ticket types in `components/TicketSelector.tsx`:

```typescript
const ticketTypes: TicketType[] = [
  {
    id: 'vip',
    name: 'VIP Experience',
    price: 299,
    description: 'Premium seating with exclusive amenities',
    available: 50,
    benefits: [
      'Premium front-row seating',
      'Exclusive VIP lounge access',
      // ... more benefits
    ]
  },
  // ... more ticket types
]
```

### Styling

The website uses Tailwind CSS with custom colors. You can customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef7ee',
        500: '#ed7519',
        // ... more shades
      },
      // ... more colors
    }
  }
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
3. **Deploy**

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
```

## Testing Payments

Use Stripe's test card numbers for testing:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## Project Structure

```
rangtaali/
├── app/
│   ├── api/
│   │   └── create-payment-intent/
│   │       └── route.ts          # Stripe payment API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main event page
├── components/
│   ├── CheckoutForm.tsx          # Payment form
│   ├── Footer.tsx                # Footer component
│   ├── Header.tsx                # Navigation header
│   └── TicketSelector.tsx        # Ticket selection modal
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # This file
```

## Features in Detail

### Event Page
- Hero section with event image and details
- Event description and highlights
- Venue information
- Call-to-action sections

### Ticket Selection
- Multiple ticket types (VIP, Premium, General)
- Real-time price calculation
- Quantity selection with availability limits
- Detailed benefits for each ticket type

### Payment Processing
- Secure Stripe integration
- Customer information collection
- Real-time payment validation
- Success/error handling
- Email receipts

### Responsive Design
- Mobile-first approach
- Smooth animations
- Touch-friendly interface
- Optimized for all screen sizes

## Security

- All payments are processed securely through Stripe
- No sensitive payment data is stored on your server
- PCI DSS compliant
- HTTPS enforced in production

## Support

For issues and questions:

1. Check the [Stripe Documentation](https://stripe.com/docs)
2. Review [Next.js Documentation](https://nextjs.org/docs)
3. Open an issue in this repository

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using Next.js and Stripe 