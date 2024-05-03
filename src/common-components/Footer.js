import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faEnvelope,faPhone,faPrint } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faXTwitter,faGoogle,faInstagram,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
      <>
      <div className="d-flex flex-column min-vh-100" style={{ justifyContent: "flex-end" }}>
        <div className="container-fluid my-5 p-0 mb-0">
          <footer
            className="text-center text-lg-start text-white"
            style={{ backgroundColor: "black" }}
          >
            <div className="container p-4 pb-0">
              <section className="">
                <div className="row">
                  <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">
                      FAMA 7AGA GROUP
                    </h6>
                    <p>
                     we are a 3rd level computer and information science 
                     team looking for better performance and we trying to 
                     be the best team in FCIS
                    </p>
                  </div>
  
                  <hr className="w-100 clearfix d-md-none" />
  
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                    <p>
                      <a className="text-white">palagrism detector</a>
                    </p>
                    <p>
                      <a className="text-white">e-bit electronics</a>
                    </p>
                    <p>
                      <a className="text-white">waslny</a>
                    </p>
                    <p>
                      <a className="text-white">E7gezly</a>
                    </p>
                  </div>
  
                  <hr className="w-100 clearfix d-md-none" />
  
                  <hr className="w-100 clearfix d-md-none" />
  
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                    <p><FontAwesomeIcon icon={faHouse} />    Cairo , SE 6221101, EG</p>
                    <p><FontAwesomeIcon icon={faEnvelope} />    fzakaria369@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone} />    + 0111 593 9532</p>
                    <p><FontAwesomeIcon icon={faPrint} />    + 0114 573 9668</p>
                  </div>
  
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
  
                    <a
                      className="btn btn-primary btn-floating m-1"
                      style={{ backgroundColor: "#3b5998" }}
                      href="https://www.facebook.com/profile.php?id=100071942924658"
                      role="button"
                    ><FontAwesomeIcon icon={faFacebook} />
                    </a>
  
                    <a
                      className="btn btn-primary btn-floating m-1"
                      style={{ backgroundColor: "#55acee" }}
                      href="https://twitter.com/farestech3"
                      role="button"
                    ><FontAwesomeIcon icon={faXTwitter} />
                    </a>
  
                    <a
                      className="btn btn-primary btn-floating m-1"
                      style={{ backgroundColor: "#dd4b39" }}
                      href="https://google.com"
                      role="button"
                    ><FontAwesomeIcon icon={faGoogle} />
                    </a>
  
                    <a
                      className="btn btn-primary btn-floating m-1"
                      style={{ backgroundColor: "#ac2bac" }}
                      href="https://www.instagram.com/fzakaria003?igsh=ZHhybHptbXh4Z2Nn"
                      role="button"
                    ><FontAwesomeIcon icon={faInstagram} />
                    </a>
  
                    <a
                      className="btn btn-primary btn-floating m-1"
                      style={{ backgroundColor: "#0082ca" }}
                      href="https://www.linkedin.com/in/fares-zakaria-69b18a1a5/"
                      role="button"
                    ><FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                      className="btn btn-primary btn-floating m-1"
                      style={{ backgroundColor: "#333333" }}
                      href="https://github.com/fares003"
                      role="button"
                    ><FontAwesomeIcon icon={faGithub} />
                    </a>
                  </div>
                </div>
              </section>
            </div>
  
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2020 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">ELFAMA7AGA.com</a>
            </div>
          </footer>
        </div>
        </div>
      </>
    );
  }
  
  export default Footer;
  