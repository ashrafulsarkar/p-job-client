import React, { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51KDAe6KO6BmatJB4FsD7ma4lvNHYU6PHTsgSgXIYITjPecJmrEHLMSasS6eZvMKYa9pliQESI0xVsketUaVYFf7K00MLJ5No3u');
const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const {handleClose} = props;
    console.log(handleClose);
  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe} onClick={() => handleClose(false)}>
          Pay
        </button>
      </form>
    );
  };
  
const Checkout = (props) => {
    
      return (
        <Elements stripe={stripePromise}>
            <CheckoutForm handleClose={props.handleClose} />
        </Elements>
      );
};

export default Checkout;