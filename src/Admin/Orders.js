import { Button, Container, Spinner, Table } from "react-bootstrap"
import { useOrder } from "../context/OrdersContext"
import NavBar from "../common-components/Navbar"
import '../style/orders.css'
import useAxiosPrivate from "../hook/useAxiosPrivate"
import { useState } from "react"
import Swal from "sweetalert2"
function Orders() {
    const { orders } = useOrder();
    const axiosPrivate = useAxiosPrivate();
    const [orderStates, setOrderStates] = useState({});
  
    const handleOrderState = async (id) => {
      try {
        const state = orderStates[id];
        if (state) {
          await axiosPrivate.put(`/order/${id}`, { state: state });
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload(false)
      } catch (error) {
        console.error(error);
      }
    };
  const deleteOrder=async(id)=>{
    try {
       
          Swal.fire({
            title: "are you sure you want to delete this book permanently?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await axiosPrivate.delete(`/order/${id}`);
                Swal.fire("Saved!", "", "success");
              setTimeout(()=>{window.location.reload(false)},2000)
              
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
      } catch (error) {
        console.error(error);
      }
  }
    const handleChange = (id, newState) => {
      setOrderStates((prevState) => ({
        ...prevState,
        [id]: newState
      }));
    };
  
    if (!orders) {
      return <div> <Spinner animation="border" variant="dark" /> </div>; // Or any other loading indicator
    }
  const handleRefund=async(id)=>{
    try {
        Swal.fire({
          title: "are you sure you want to refund money for this user?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await axiosPrivate.put(`/order/refund/${id}`, { refund:"yes" });
            Swal.fire("Saved!", "", "success");
            setTimeout(()=>{window.location.reload(false)},2000)
            
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
    return (
      <>
        <NavBar />
        <Container fluid className="orders-cont">
          <Table striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>user Email</th>
                <th>City</th>
                <th>street</th>
                <th>Building</th>
                <th>Phone</th>
                <th>amount</th>
                <th>payment method</th>
                <th>state</th>
                <th>items count</th>
                <th>edit state</th>
                <th>Delete</th>
                <th>Refund</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.email}</td>
                  <td>{order.city}</td>
                  <td>{order.street}</td>
                  <td>{order.building}</td>
                  <td>{order.phone}</td>
                  <td>{order.amount}</td>
                  <td>{order.payment}</td>
                  <td>{order.state}</td>
                  <td>{order.books.length}</td>
                  <td>
                    <select className="select-state" onChange={(e) => handleChange(order._id, e.target.value)}>
                      <option value="" disabled selected>Select the new state</option>
                      <option value="waiting">waiting</option>
                      <option value="Done">Done</option>
                      <option value="Failed">Failed</option>
                    </select>
                    <Button variant="success" className="state-save-but" onClick={() => handleOrderState(order._id)}>save</Button>
                  </td>
                <td><Button variant="danger"onClick={() => deleteOrder(order._id)}>Delete</Button> </td>
                <td>{order.refund?order.refund:"no refund"}</td>
                <td><Button variant="success" disabled={order.state!=="Failed"||order.refund==="yes"} className="state-save-but" onClick={() => handleRefund(order._id)}>Refund</Button></td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
  
  export default Orders;
  