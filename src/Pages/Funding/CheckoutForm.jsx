import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import '../Funding/style.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ handleCencel, funding, closeModal }) => {
  const stripe = useStripe();
  const navigate = useNavigate()
  const { user } = useAuth()
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setError] = useState('')
  const [processing, setProcessing] = useState('')
  useEffect(() => {
    if (funding && funding > 0) {
      getClientSecret(funding);
    }
  }, [funding]);

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post('/create-payment-intent', { price });
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
      setProcessing(false)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }
    const { error: ConfirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName
        }
      }
    })
    if (ConfirmError) {
      setError(ConfirmError.message)
      setProcessing(false)
      return
    }
    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        fund: funding,
        transectionId: paymentIntent.id,
        date: new Date(),
        email: user?.email,
        name: user?.displayName
      }
      try {
        const { data } = await axiosSecure.post('/fund-details', paymentInfo)
       if(data.insertedId){
        navigate('/funding')
        closeModal()
       }
        
      } catch (error) {
        console.log(error);
      }
    }
    setProcessing(false)
  };

  return (
    <>
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
        <div className='flex gap-5 justify-center'>
          <button className='btn' type="submit" disabled={!stripe || !clientSecret || processing}>
            Payment
          </button>
          <button className='btn' onClick={handleCencel}>Cancel</button>
        </div>
      </form>
      {cardError && <p className='text-red-600 '>{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
