import React, { useEffect, useState } from "react";
import NavBar from "../common-components/Navbar";
import { useCart } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/cart.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useBooks } from "../context/GetBooks";
import { Link } from "react-router-dom";

function Cart() {
  const {cart, uniqueBooks,totalSum ,deleteItemFromCart,deleteAllCart} = useCart();
  const {books,getBooks}=useBooks()
  const habdleDeleteElement=(id)=>{
deleteItemFromCart(id)
  }

  useEffect(() => {
    const genres = uniqueBooks.map((book) => book.categories);
    getBooks(genres, ""); 
  }, [cart]);
  const similarBooks = books.filter((book) => !uniqueBooks.some((uniqueBook) => uniqueBook._id === book._id));
const handleDeleteAll=()=>{
  
  Swal.fire({
    title: "are you sure you want to delete All cart permanently?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      deleteAllCart()
      Swal.fire("Saved!", "", "success");
      
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

const {addItemToCart}=useCart()


const handleAddToCart = (id) => {
    addItemToCart(id);
  };

  const shuffledSimilarBooks = similarBooks.sort(() => Math.random() - 0.5);
const randomFiveSimilarBooks = shuffledSimilarBooks.slice(0, 5);

return (
  <>
    <NavBar />
    <Container fluid className="cart-container">
      <Row>
        <Col className="first" sm={3}>
          <div className="check-out">
            <p>
              Total Price <span>{totalSum.toFixed(2)} EG</span>
            </p>
            <p>
              Total unique Books count <span>{uniqueBooks.length} Book</span>
            </p>
            <p>
              Total Books count <span>{cart.length} Book</span>
            </p>
            <div className="butt">
            {cart.length > 0 ? (
              <div className="buttsOfButts">
        <Link to="/payment" size="lg" className="btn btn-success" role="button">
          Pay By credit card
        </Link>
         <Link to="/deliveryPay" size="lg" className="btn btn-info" role="button">
         Pay at delivery
       </Link>
       </div>
      ) : (
        <button disabled className="btn btn-success" role="button">
          No items in cart
        </button>
      )}
            </div>
          </div>
          <div className="recommend">


          {cart.length > 0 ? (
  <>
    <h3>You May Also Like</h3>
    {randomFiveSimilarBooks.map((book) => {
      return (
        <div className="similar" key={book._id}>
          <img src={book.image} alt={book.title} />
          <p>{book.title}</p>
          <p className="pricee">{book.price} EG</p>
          <Button variant="success" onClick={() => handleAddToCart(book._id)}>Add to cart</Button>
        </div>
      );
    })}
  </>
) : (
<h3 style={{ color: "black" }}>no items in cart</h3>
)}




           
          
          </div>
        </Col>
        <Col sm={9}>
          <div className="books">
            
          {cart.length > 0 ? (
              <Button variant="danger" className="mb-3" onClick={() => handleDeleteAll()}>Clear All cart</Button>

) : (
  <Button variant="danger" disabled className="mb-3" >No items in cart</Button>
)}
            {uniqueBooks.map((book) => {
               let priceElement = (
                <span className="price">{`$${Math.floor(book.price)}`}</span>
              );
              if (book.sale) {
                const priceBeforeSale = `$${Math.floor(book.price)}`;
                const priceAfterSale = `$${Math.floor(
                  book.price * (1 - book.sale / 100)
                )}`;
                priceElement = (
                  <div className="sale-price">
                    <span className="original-price">{priceBeforeSale}</span>
                    <span>{priceAfterSale}</span>
                  </div>
                );}
              return (
                <div key={book._id} className="book">
                  <span className="pricee">
                    {priceElement} EG (x{book.count})
                  </span>
                  <div className="info">
                    <div className="controlles">
                      <p>{book.title}</p>
                      <div>
                        <Button variant="danger" onClick={() => habdleDeleteElement(book._id)}>delete from cart</Button>
                      </div>
                    </div>
                    <img src={book.image} className="imagee" alt={book.title} />
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  </>
);

}

export default Cart;
