import { useTypingEffect } from "../hook/typing-effect";
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