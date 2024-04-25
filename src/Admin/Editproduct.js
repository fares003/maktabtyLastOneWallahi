import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import Add from "./Add";
import axios from 'axios';

function Editproduct(){


    const [title,setTitle]=useState("");
    const [price,setPrice]=useState(0);
    const [description,setDes]=useState("");

    const [product,setProducts]=useState([]);
    let {productid}=useParams();
    const dp_url="http://localhost:9000/products";
    

    useEffect(()=>{
fetch(dp_url+"/"+productid).then((res)=>res.json()).then((data)=>{setProducts(data)});

    },[])
    const formSubmit=(e)=>{
        e.preventDefault();
        
        {
        axios.put(`http://localhost:9000/products/${product.id}`,{
            title: title || product.title,
            price: price || product.price,
            description: description || product.description,
        }).then((data)=>{console.log(data)});
        }
    }
    const handledata=(e)=>{
if(e.target.value){
    setTitle(e.target.value);
}
else{
    setTitle(product.id);
}
    }
return(

    <>
  
  <form class="form" onSubmit={formSubmit} >
    
    <div class="flex">
        <label>
            <input class="input" type="number" placeholder="" required="" />
            <span>id</span>
        </label>

        <label>
            <input class="input" type="text" placeholder="" required=""/>
            <span>last name</span>
        </label>
    </div>  
            
    <label>
        <input class="input" type="text" defaultValue={product.title}  default="a" placeholder="" onChange={(e)=>setTitle(e.target.value || product.title )}/>
        <span>product title</span>
    </label> 
    <label>
        <input class="input" type="text" defaultValue={product.price} placeholder=""  onChange={(e)=>setPrice(e.target.value)} required="" />
        <span>price</span>
    </label> 
    <span className="des">product description</span>
    <label >
        <textarea class="input01" placeholder="" defaultValue={product.description}  onChange={(e)=>handledata(e)} rows="6" required=""></textarea>
    
    </label>
    
    <button href="#" class="fancy">
      <span class="top-key"></span>
      <span class="text">submit</span>
      <span class="bottom-key-1"></span>
      <span class="bottom-key-2"></span>
    </button>
</form>     

    </>
);


}

export default Editproduct;