import { useTypingEffect } from "../hook/typing-effect";
import image1 from "./pexels-ricky-esquivel-1907785.jpg"
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function Landing(){
    const text=useTypingEffect("Welcome in Maktabty, your favorite books with best price",200);
    return(<>
    <div className="landing-container">
        <div className="coll coll1">
    
{/* <img src={image1} className="land-img"></img> */}
</div>
<div className="info coll">
<p>{text}</p>
    </div>
    </div>
    </>);

}
export default Landing;