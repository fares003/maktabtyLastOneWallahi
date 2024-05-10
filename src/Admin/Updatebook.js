import { useEffect, useState } from "react";
import NavBar from "../common-components/Navbar";
import useRefresh from "../hook/useRefresh";
import axios from "../api/axios";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Col, Container, Image, Row } from "react-bootstrap";
import '../style/update.css'
import { useGenre } from "../context/GenresContext";
function Updatebook() {
  const axiosPrivate = useAxiosPrivate();

  const [product, setProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDes] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [publishername, setPublisher] = useState("");
  const [publishingdate, setDate] = useState("");
  const [categories, setCategories] = useState("");
  const [cont, setCont] = useState("");
  const [pages, setPages] = useState("");
  const [sale, setSale] = useState("");
  const { allGenres} = useGenre();

  const refresh = useRefresh();
  const params = useParams();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 770);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 770);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const accessToken = await refresh();
        console.log("access token: " + accessToken);
        const response = await axiosPrivate(`/books/${params.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProductInfo();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        ...(title && { title }),
        ...(price && { price }),
        ...(image && { image }),
        ...(description && { description }),
        ...(author && { author }),
        ...(publishername && { publishername }),
        ...(publishingdate && { publishingdate }),
        ...(categories && { categories }),
        ...(cont && { cont }),
        ...(pages && { pages }),
        ...(sale && { sale }),

      };

      const res = await axiosPrivate.put(`/books/${params.id}`, requestData);
      console.log(res);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  };

  return (
    <>
      <NavBar />
      <Container className="product-details-container">
        <Row>
          <Col sm={5} className="book-main-info">
            <div className={isSmallScreen ? "" : "fixed-content"}>
              <h3>{product.title}</h3>

              <Image src={product.image} fluid className="book-image" />
              <p>{product.price}$ EG</p>

              <p>{product.author}</p>
              <p>{product.cont} book available</p>
            </div>
          </Col>
          <Col sm={7} className="book-additional-info">
            <h1 className="hed">Update book details</h1>
            <form className="form formy" onSubmit={formSubmit}>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
                <span>photo link</span>
              </label>

              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <span>product title</span>
              </label>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <span>price</span>
              </label>
              <label>
                <input
                  class="input"
                  type="text"
                  placeholder=""
                  required={false}
                  onChange={(e) => {
                    setSale(e.target.value);
                  }}
                />
                <span>Discount%</span>
              </label>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
                <span>author</span>
              </label>

              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={publishername}
                  onChange={(e) => {
                    setPublisher(e.target.value);
                  }}
                />
                <span>publisher</span>
              </label>
              <label className="genress">
              <label for="genres" className="genres-label">Choose a Genre:</label>
    <select id="genres" name="genres" onChange={(e) => setCategories(e.target.value)} required="true">
    {allGenres.map((Genre)=>{
        return(

            <option key={Genre._id}>{Genre.genre}</option>

        )
    })}
    </select>

    </label>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={cont}
                  onChange={(e) => {
                    setCont(e.target.value);
                  }}
                />
                <span>count</span>
              </label>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required={false}
                  value={pages}
                  onChange={(e) => {
                    setPages(e.target.value);
                  }}
                />
                <span>pages</span>
              </label>
              <label>
                <input
                  type="date"
                  className="input"
                  value={publishingdate}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  id="date"
                />
                <span>published at</span>
              </label>
              <span className="dess">product description</span>
              <label>
                <textarea
                  className="input01"
                  placeholder=""
                  onChange={(e) => setDes(e.target.value)}
                  rows="6"
                  required={false}
                  value={description}
                ></textarea>
              </label>

              <button href="#" className="fancy">
                <span className="top-key"></span>
                <span className="text">submit</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Updatebook;
