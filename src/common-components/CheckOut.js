import { useState } from "react"
import { Button, Container } from "react-bootstrap"
import '../style/checkOut.css'
import { useStripe,useElements } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
function CheckOut(){
    const [message,setMessage]=useState('')
    const [isProcessing,setIsProcessing]=useState('')
    const stripe=useStripe()
    const elements=useElements()


const handleSubmit=async(e)=>{
e.preventDefault()
if(!stripe||!elements){
    return
}
setIsProcessing(true)
const {error}=await stripe.confirmPayment({

    elements,
    confirmParams:{
        return_url:`${window.location.origin}/completion`
    }
})
if(error){
    setMessage(error)
}
setIsProcessing(false)
}
    return(
    <Container className="checkout-cont">
    <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement/>
        <Button variant="success" disabled={isProcessing} id="submit">
<span id="button-text">
{isProcessing?'processing':'pay now'}
</span>
</Button>
{message && <div id="payment-message">{message}</div>}
    </form>
    </Container>
    )
}

export default CheckOut