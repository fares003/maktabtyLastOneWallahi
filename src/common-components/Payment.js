import {loadStripe}from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hook/useAxiosPrivate'
import CheckOut from './CheckOut'
import NavBar from './Navbar'
import { Elements } from '@stripe/react-stripe-js';
function Payment(){
    const [stripePromises,setStripePromises]=useState(null)
    const [clientSecret,setClientSecret]=useState('')
    const axiosPrivate=useAxiosPrivate()
    useEffect(() => {
        const initStripe = async () => {
            const { data } = await axiosPrivate.get('/config');
            const publishableKey = data.publishableKey;
            console.log(publishableKey)
            setStripePromises(loadStripe(publishableKey));
        };

        initStripe();

        return () => {
            // Clean up Stripe instance here if needed
        };
    }, [axiosPrivate]);
    useEffect(() => {
        const initStripePayment = async () => {
            const { data } = await axiosPrivate.post('/create-payment-intent', {});
            const paymentIntentClientSecret = data.clientSecret;
            console.log(paymentIntentClientSecret)

            setClientSecret(paymentIntentClientSecret);
        };

        initStripePayment();
    }, [axiosPrivate]);
return(
<>
<NavBar/>
{stripePromises && clientSecret && (
    <Elements stripe={stripePromises} options={{ clientSecret }}>
        <CheckOut />
    </Elements>
)}

</>
)
}
export default Payment