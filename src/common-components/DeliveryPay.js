import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { useOrder } from "../context/OrdersContext";
import { Button, Container } from "react-bootstrap";
import cities from '../citesDistance.json';
import useAuth from "../hook/useAuth";
import NavBar from "./Navbar";
import Swal from "sweetalert2";
const PHONE_REGEX = /^01[0-2]\d{8}$/;


function DeliveryPay(){
    const {auth}=useAuth()
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [shipping, setShipping] = useState(0);
 
    const { totalSum ,cart,setPrice,uniqueBooksMap,uniqueBooks,deleteAllCart} = useCart();
    const [distance,setDistance]=useState(0)
    const [phone,setPhone]=useState(0)
    const [street,setStreet]=useState(0)
    const [building,setBuilding]=useState(0)
    const [selectedCity, setSelectedCity] = useState('');
    const axiosPrivate = useAxiosPrivate();
    

    const {addOrder}=useOrder()
    const state="waiting"
    const payment="atShipping"
    
    const [validPhone,setValidPhone]=useState(0)
    const books = cart.map((book) => book._id);

    const handleBooksCount = async () => {
        try {
          const res = await axiosPrivate.put(`/updateCount`, { ids: books });
          if (res.status === 200) {
            console.log('Counts updated successfully:', res.data);
          } else {
            console.error('Failed to update counts:', res.status);
          }
        } catch (error) {
          console.error('Error updating counts:', error);
        }
      };
      
  
      useEffect(()=>{
  if(distance<=300){
      setShipping(50)
  }else if(distance>300&&distance<600){
      setShipping(70)
  }
  else{
      setShipping(120)
  }
      },[distance])
  
  
      
      useEffect(() => {
          const result = PHONE_REGEX.test(phone);
          setValidPhone(result);
          
        }, [phone]);
  

    const handleSubmit=(e)=>{
e.preventDefault()
e.preventDefault();
const newOrder={
  
    email: auth.email ,
    city: selectedCity,
    street: street,
    building: building,
    phone:phone,
    state:state,
    amount:(totalSum+shipping).toFixed(2),
    payment:payment,
    books:books      
    

}
setPrice(shipping)
addOrder(newOrder)
setIsProcessing(false);
setMessage("Payment successful!");
handleBooksCount()
deleteAllCart()
Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 2000,
  })
  .then(() => {
    window.location.href = 'http://localhost:3000/cart';
  });

    }
    return(<>
<NavBar/>
<Container className="checkout-cont">
            <form id="payment-form" onSubmit={handleSubmit}>
                <div className="total-amount">
                    <p>Items: {totalSum.toFixed(2)} EG </p>
                    <p>Shipping: {shipping} EG</p>
                    <p>Total amount: {(shipping+totalSum).toFixed(2)} EG</p>

                </div>
                <label htmlFor="cites" className="genres-label">Please choose your City/Area</label>
<select
    id="cites"
    name="cites"
    required
    onChange={(e) => {
        setSelectedCity(e.target.value);
        setDistance(Number(cities.find(city => city.city === e.target.value).distance));
    }}
    value={selectedCity}
>
    <option value="" disabled selected>Select your city</option>
    {cities.map((city, index) => (
        <option key={index} value={city.city}>{city.city}</option>
    ))}
</select>

                <label htmlFor="street" className="genres-label">street name</label>
                    <input type="text" placeholder="e.g. tal3t harb street" required id="street" onChange={(e)=>setStreet(e.target.value)}/>
                    <label htmlFor="building" className="genres-label">Building name/no</label>
                    <input type="text" placeholder="e.g. Rahma Tower" onChange={(e)=>setBuilding(e.target.value)} required id="building"/>
                    <label htmlFor="phone" className="genres-label">Phone Number</label>
                    <input type="text"
                  placeholder="e.g. 01XXXXXXXXX" 
                  onChange={(e) => setPhone(e.target.value)}
                  aria-describedby="pidnote"
                  pattern="^01[0-2]\d{1,8}$" 
                  required 
                  id="phone"
                  />
                  <p
                  id="pidnote"
                  className={
                    phone && !validPhone  ? "instructions" : "off"
                  }
                >

              please Enter valid phone number
                </p>
                <Button variant="success" type="submit" disabled={isProcessing} id="submit">
                    <span id="button-text">
                        {isProcessing ? 'Processing' : 'Pay Now'}
                    </span>
                </Button>
                </form>
                </Container>
    </>)
}
export default DeliveryPay