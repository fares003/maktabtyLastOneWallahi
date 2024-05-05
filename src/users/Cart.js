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

function Cart() {
  const { cart ,deleteItemFromCart,deleteAllCart} = useCart();
  const {books,getBooks}=useBooks()
  console.log(books)
  const habdleDeleteElement=(id)=>{
deleteItemFromCart(id)
  }
  const uniqueBooksMap = new Map();
  cart.forEach((book) => {
    if (uniqueBooksMap.has(book._id)) {
      // Increment the count if the book already exists in the map
      uniqueBooksMap.set(book._id, uniqueBooksMap.get(book._id) + 1);
    } else {
      // Add the book to the map with a count of 1 if it doesn't exist
      uniqueBooksMap.set(book._id, 1);
    }

  });
  const uniqueBooks = Array.from(uniqueBooksMap, ([id, count]) => ({
    ...cart.find((book) => book._id === id),
    count,
  }));
  const totalSum = uniqueBooks.reduce((sum, item) => sum + item.price * item.count, 0);
  console.log(uniqueBooks)
  useEffect(() => {
    const genres = uniqueBooks.map((book) => book.categories);
    console.log(genres);
    getBooks(genres, ""); 
  }, [cart]);
  const similarBooks = books.filter((book) => !uniqueBooks.some((uniqueBook) => uniqueBook._id === book._id));
console.log(similarBooks)
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
              Total Price <span>{totalSum} EG</span>
            </p>
            <p>
              Total unique Books count <span>{uniqueBooks.length} Book</span>
            </p>
            <p>
              Total Books count <span>{cart.length} Book</span>
            </p>
            <div className="butt">
              <Button size="lg">To checkout Process</Button>
            </div>
          </div>
          <div className="recommend">
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
          </div>
        </Col>
        <Col sm={9}>
          <div className="books">
            <Button variant="danger" className="mb-3" onClick={() => handleDeleteAll()}>Clear All cart</Button>
            {uniqueBooks.map((book) => {
              return (
                <div key={book._id} className="book">
                  <span className="pricee">
                    {book.price} EG (x{book.count})
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
