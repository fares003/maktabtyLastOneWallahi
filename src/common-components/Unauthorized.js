import { Container } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "./Navbar";

function Unauthorized(){

    return(

<>
<NavBar/>
<Container>
<Row className="mt-5">
<Col>
<h2>
    Your Unauthorized to Access this page 
</h2>
</Col>
</Row>

</Container>
</>

    )
}
export default Unauthorized