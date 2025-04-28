import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple, dark, neobrutalism } from '@clerk/themes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('your-publishable-key-here');
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider appearance={{
        baseTheme: [shadesOfPurple],
      }} publishableKey={PUBLISHABLE_KEY}>
        <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </ClerkProvider>
  </StrictMode>
)
