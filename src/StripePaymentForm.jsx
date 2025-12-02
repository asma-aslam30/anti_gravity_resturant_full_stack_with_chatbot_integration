import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard } from 'lucide-react';

const StripePaymentForm = ({ amount, onSuccess, onError, checkoutForm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: checkoutForm.name,
          email: checkoutForm.email,
          phone: checkoutForm.phone,
          address: {
            line1: checkoutForm.address,
            city: checkoutForm.city,
            postal_code: checkoutForm.zipCode,
          },
        },
      });

      if (error) {
        console.error(error);
        onError(error.message);
        setProcessing(false);
        return;
      }

      // In a real app, you would send paymentMethod.id to your server
      // to create a payment intent and confirm the payment
      // console.log('Payment Method Created:', paymentMethod);

      // Simulate successful payment
      setTimeout(() => {
        setProcessing(false);
        onSuccess();
      }, 2000);

    } catch (err) {
      console.error(err);
      onError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#a0a0a0',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
      invalid: {
        color: '#ff4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="card-element-wrapper">
        <CardElement options={cardElementOptions} />
      </div>
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="btn btn-primary btn-place-order"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)} with Card`}
      </button>
    </form>
  );
};

export default StripePaymentForm;
