import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../common-components/Navbar";
import "../style/inventory.css";
import {
  faHouse,
  faUser,
  faCartShopping,
  faPenToSquare,
  faChartBar,
  faPlus,
  faList,
  faCircleQuestion,
  faRightFromBracket,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../common-components/images/code.png";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useBooks } from "../context/GetBooks";
import { useEffect } from "react";

function Inventory() {
    const {getBooks,books}=useBooks()
    useEffect(()=>{
getBooks("","")
    },[])
    const lowStockBooks=books.filter((book)=>book.cont<=50 &&book.cont!==0);
    const outOfTheStock=books.filter((book)=>book.cont==0);

  return (
    <>
      <NavBar />
      <Container fluid className="containerr p-0">
        <Row>
          <Col className="dash-cols">
            <nav className="fake-nav">
              <ul className="fake-ul">
                <li>
                  <Link to="/inventory" className="logo fake-a">
                    <img src={image} alt="" />
                    <span className="nav-item">DashBoard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="fake-a">
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="nav-item">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="fake-a">
                    <FontAwesomeIcon icon={faUser} />

                    <span className="nav-item">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="fake-a">
                  <FontAwesomeIcon icon={faCartShopping} />{" "}                    
                    <span className="nav-item">cart</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Add" className="fake-a">
                  <FontAwesomeIcon icon={faPlus} />                                      
                    <span className="nav-item">Add books</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Edit" className="fake-a">
                  <FontAwesomeIcon icon={faPenToSquare} />                    
                    <span className="nav-item">Edit books</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Genres" className="fake-a">
                    <FontAwesomeIcon icon={faList} />
                    <span className="nav-item">Genres</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Orders" className="fake-a">
                  <FontAwesomeIcon icon={faSort} />                    
                    <span className="nav-item">Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/Help" className="fake-a">
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    <span className="nav-item">Help</span>
                  </Link>
                </li>

              </ul>
            </nav>
          </Col>
          <Col className="dash-cols secondo">
            <div className="products-Analytics">
              <div className="products-num all-booky">
                <p> Total Number of products is</p> <span>{books.length}</span> book
              </div>
              <div className="products-num out-off">
                <p> Out of the stock</p> <span>{outOfTheStock.length}</span> book
              </div>
              <div className="products-num low-stock">
                <p> Low stock books</p> <span>{lowStockBooks.length}</span> book
              </div>
            </div>
            <Container className="Edit_cont">
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Sale</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                    {outOfTheStock.map((book,index)=>{
                        return(
                        
                 <tr key={book._id}  >
                 <td className="out">{index+1}</td>
                 <td className="out">{book.title}</td>
                 <td className="out">{book.cont}</td>
                 <td className="out">{book.price}</td>
                 <td className="out">{book.sale}%</td>
                 <td><Link to={`/update/${book._id}`} class="btn btn-secondary" role="button">update</Link></td>
               </tr>
                        )
                    })}
                    {lowStockBooks.map((book,index)=>{
                        return(
                        
                 <tr key={book._id} >
                 <td className="low">{index+1}</td>
                 <td className="low">{book.title}</td>
                 <td className="low">{book.cont}</td>
                 <td className="low">{book.price}</td>
                 <td className="low">{book.sale}%</td>
                 <td><Link to={`/update/${book._id}`} class="btn btn-secondary" role="button">update</Link></td>

               </tr>
                        )
                    })}
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Inventory;
