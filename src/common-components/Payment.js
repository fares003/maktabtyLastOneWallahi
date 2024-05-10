import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import CheckOut from './CheckOut';
import NavBar from './Navbar';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const {priceAfterShipping,totalSum}=useCart()
    let  finalPrice = priceAfterShipping > 0 ? priceAfterShipping * 100 : totalSum * 100;

    useEffect(() => {
        const initStripe = async () => {
            try {
                const { data } = await axiosPrivate.get('/config');
                const publishableKey = data.publishableKey;
                setStripePromise(loadStripe(publishableKey));
            } catch (error) {
                console.error('Error initializing Stripe:', error);
                // Handle error, e.g., show an error message to the user
            } finally {
                setLoading(false);
            }
            
        };

console.log(priceAfterShipping)
        initStripe();

        return () => {
            // Clean up Stripe instance here if needed
        };
    }, [axiosPrivate]);
    useEffect(()=>{
finalPrice=priceAfterShipping*100
    },[priceAfterShipping])
    useEffect(() => {
        const initStripePayment = async () => {
            try {
                
                console.log(finalPrice);
                const finalPriceRounded = Math.round(finalPrice);

                const { data } = await axiosPrivate.post('/create-payment-intent', { amount: finalPriceRounded });
                const paymentIntentClientSecret = data.clientSecret;
                setClientSecret(paymentIntentClientSecret);
            } catch (error) {
                console.error('Error initializing Stripe payment:', error);
            }
        };
    
        if (!loading) {
            initStripePayment();
        }
    }, [ totalSum, loading]);
    
    return (
        <>
            <NavBar />
            {loading && <p>Loading...</p>}
            {!loading && stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOut />
                </Elements>
            )}
        </>
    );
}

export default Payment;
