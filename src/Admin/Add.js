import { useEffect, useState } from "react";
import add from "./add.css"
import useRefresh from "../hook/useRefresh";
import axios from "../api/axios";
import NavBar from "../common-components/Navbar";

function Add(props){
    const [title,setTitle]=useState("");
    const [price,setPrice]=useState(0);
    const [description,setDes]=useState("");
    const [author,setAuthor]=useState('')
    const [image,setImage]=useState("");
    const [publishername,setPublisher]=useState('')
    const [publishingdate,setDate]=useState({})
    const [categories,setCategories]=useState('')
    const [cont,setCont]=useState('')
    const [pages,setPages]=useState('')
    const refresh = useRefresh();





const formSubmit=async(e)=>{
e.preventDefault();

        try {
            const accessToken = await refresh();
            console.log("access token: " + accessToken);
            const res = await axios.post("/books",
            {
                title,
                price,
                image,
                description,
                author,
                publishername,
                publishingdate,
                categories,
                cont,
                pages
            },
            
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true

            }).then((data)=>{console.log(data)});
            
           
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
}

    return(
        
        <>
       <NavBar/>
       <h1 className="hed">Add book details</h1>
<form class="form" onSubmit={formSubmit}>
    


        <label>
        <input class="input" type="text"  default="a" placeholder="" required="true" onChange={(e)=>{setImage(e.target.value)}}/>
        <span>photo link</span>

        </label>
            
    <label>
        <input class="input" type="text"  default="a" placeholder="" required="true" onChange={(e)=>{setTitle(e.target.value)}}/>
        <span>product title</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="true" onChange={(e)=>{setPrice(e.target.value)}}/>
        <span>price</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="true" onChange={(e)=>{setAuthor(e.target.value)}}/>
        <span>author</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="true" onChange={(e)=>{setPublisher(e.target.value)}}/>
        <span>publisher</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="true" onChange={(e)=>{setCategories(e.target.value)}}/>
        <span>category</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="true" onChange={(e)=>{setCont(e.target.value)}}/>
        <span>count</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="true" onChange={(e)=>{setPages(e.target.value)}}/>
        <span>pages</span>
    </label> 
    <label>
    <input   type="text" className="input" onChange={(e)=>{setDate( e.target.value)}} id="date"/>
<span>published at</span>
    </label>
    <span className="dess">product description</span>
    <label >
        <textarea class="input01" placeholder=""  onChange={(e)=>setDes(e.target.value)} rows="6" required=""></textarea>
    
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

export default Add;