export type CheckoutFormValues = {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    paymentMethod: 'credit' | 'paypal' | 'bank'
    cardNumber?: string
    cardName?: string
    expiry?: string
    cvv?: string
    notes?: string
  }