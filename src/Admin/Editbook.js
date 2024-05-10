import { useDispatch, useSelector } from "react-redux";
import NavBar from "../common-components/Navbar"
import { fetchProducts } from "../rtk/slices/products-slice";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../style/Edit.css"
import Button from 'react-bootstrap/Button';
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useRefresh from "../hook/useRefresh";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


function Editbook() {
    const axiosPrivate = useAxiosPrivate();

    const [products,setProducts] = useState([]);
    const refresh = useRefresh();
    const Navigate=useNavigate()
    const [msg,setMsg]=useState('')
    const deleteBook=async(Id)=>{
        try {
            const accessToken = await refresh();
            const res = await axiosPrivate.delete(`/books/${Id}`,)
               
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    }
    const handleDelete = async (Id) => {

        Swal.fire({
            title: "are you sure you want to delete this book permanently?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteBook(Id)
              Swal.fire("Saved!", "", "success");
              setTimeout(()=>{window.location.reload(false)},2000)
              
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });


      

    }

    const getBooks = async () => {
        try {
          const response = await axiosPrivate.get(`/books`);
          console.log(response.data);
          setProducts(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    
      useEffect(() => {
        getBooks();
      }, []);

return (
    <>
        <NavBar />
        <Container className="Edit_cont">
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>author</th>
                        <th>price</th>
                        <th>count</th>
                        <th></th>
                        <th></th>


                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.title}</td>
                                <td>{product.author}</td>
                                <td>{product.price}</td>
                                <td>{product.cont}</td>
                                <td><Link to={`/update/${product._id}`} class="btn btn-secondary" role="button">update</Link></td>
                                <td><Button variant="danger" onClick={()=>{handleDelete(product._id)}}>Delete</Button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </Container>



    </>
)
}
export default Editbook