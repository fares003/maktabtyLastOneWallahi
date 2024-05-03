import { useTypingEffect } from "../hook/typing-effect";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faMagnifyingGlass,faMoneyBillWave,faPercent,faArrowTrendUp,faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from 'react-bootstrap/Image';
import image1 from './images/Gadget Mat.jpg'
function Landing(){
    const text=useTypingEffect("Welcome in Maktabty, your favorite books with best price",200);
    return(
    <>
        <div className="landing-container">
            <div className="coll coll1 first-img">
                {/* <img src={image1} className="land-img"></img> */}
            </div>
            <div className="info coll">
                <p>{text}</p>
            </div>
        </div>
        <Container className="search-landing-area  justify-content-center">
            <Row className="d-flex flex-column justify-content-center align-items-center landing-cont">
                <Col>
                    <h3>Search Books</h3>
                </Col>
                <Col className="search">
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                        <Form className="d-flex align-items-center">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </InputGroup>
                </Col>
            </Row>

            <Row className="sales-col">
            <Col xs={6} >
            <Image src={image1}  className="img" />

            </Col>
        <Col xs={6} className="why-us" >
            <h4>why us ?</h4>
<ul>
    <li className="land"><FontAwesomeIcon className="icon1" icon={faMoneyBillWave} /> Best price in the market</li>
    <li className="land"><FontAwesomeIcon className="icon2" icon={faPercent} /> Monthly Sales</li>
    <li className="land"><FontAwesomeIcon className="icon3" icon={faBook} /> Always Updated</li>
    <li className="land"><FontAwesomeIcon className="icon4" icon={faArrowTrendUp} /> Always Trendy</li>

</ul>

        </Col>
            </Row>
        </Container>
    </>
    );
}

export default Landing;
