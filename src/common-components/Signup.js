import { useEffect, useRef, useState } from "react";
import "../style/signup.css";
import NavBar from "./Navbar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
const REGISTER_URL='/register'
function Signup() {
  const userRef = useRef();
  const ErrRef = useRef();

  const [firstname, setFirstName] = useState("");
  const [firstnameFocus, setFirstNameFocus] = useState(false);

  const [lastname, setLastName] = useState("");
  const [lastnameFocus, setLastNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwdConfirm, setPwdConfirm] = useState("");
  const [validPwdConfirm, setValidPwdConfirm] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [image, setImage] = useState(null);
const [imageFocus, setImageFocus] = useState(false);
  const Navigate=useNavigate()

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === pwdConfirm;
    setValidPwdConfirm(match);
  }, [pwd, pwdConfirm]);

  useEffect(() => {
    setErrMsg("");
  }, [firstname, lastname, pwd, pwdConfirm, email, image]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const e1 = EMAIL_REGEX.test(email);
    const e2 = PWD_REGEX.test(pwd);
    if (!e1 || !e2) {
      setErrMsg("Invalid entry please try again");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("password", pwd);
      formData.append("image", image);
  
      const res = await axios.post(REGISTER_URL, formData, {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });
  
      console.log(res.data);
      console.log(res.accessToken);
      setSuccess(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 409) {
        setErrMsg("No server response");
      } else if (!error.response) {
        setErrMsg("This email is already in use");
      } else {
        setErrMsg("Registration failed");
      }
      ErrRef.current.focus();
    }
  };
  

  return (
    <>
      <NavBar />
      <section>
        <p
          ref={ErrRef}
          className={errMsg ? "errMsg1" : "off"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="container signup-container">
            <div className="cardy">
              <a className="singup">Sign Up</a>
              <div className="inputBox1">
                <input
                  type="text"
                  required="required"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  aria-invalid={validEmail ? "false" : "true"}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="uidnote"
                  autoComplete="false"
                />
                <span className="user">Email</span>
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail ? "instructions" : "off"
                  }
                >
                  Email must contain the '@' symbol and end by ".com". Please
                  enter a valid email address.
                </p>
              </div>

              <div className="inputBox">
                <input
                  type="text"
                  required="required"
                  onFocus={() => setFirstNameFocus(true)}
                  onBlur={() => setFirstNameFocus(false)}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="false"

                />
                <span>First Name</span>
              </div>

              <div className="inputBox">
                <input
                  type="text"
                  required="required"
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="false"

                />
                <span>Last Name</span>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  required="required"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  aria-invalid={validPwd ? "false" : "true"}
                  onChange={(e) => setPwd(e.target.value)}
                  aria-describedby="pidnote"
                  autoComplete="false"

                />
                <span>Password</span>
                <p
                  id="pidnote"
                  className={
                    pwdFocus && pwd && !validPwd ? "instructions" : "off"
                  }
                >
                  At least one lowercase alphabet i.e. [a-z]
                  <br />
                  At least one uppercase alphabet i.e. [A-Z]
                  <br />
                  At least one Numeric digit i.e. [0-9]
                  <br />
                  At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’,
                  ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
                  <br />
                  Also, the total length must be in the range [8-15]
                  <br />
                </p>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  required="required"
                  onFocus={() => setPwdConfirmFocus(true)}
                  onBlur={() => setPwdConfirmFocus(false)}
                  onChange={(e) => setPwdConfirm(e.target.value)}
                  aria-describedby="cidnote"
                  autoComplete="false"


                />
                <span>Confirm Password</span>
                <p id="cidnote"
                  className={
                    !pwdConfirmFocus && !validPwdConfirm&&pwdConfirm? "instructions" : "off"
                  } >Please Confirm Your password correctly</p>
              </div>
              <div className="inputBox">
  <input
    type="file"
    required="required"
    onFocus={() => setImageFocus(true)}
    onBlur={() => setImageFocus(false)}
    onChange={handleImageChange}
    aria-describedby="imageNote"
    autoComplete="false"
  />
  <span>Profile Image</span>
  <p
    id="imageNote"
    className={imageFocus && !image ? "instructions" : "off"}
  >
    Please upload your profile image.
  </p>
</div>
              <button className="enter" type="submit" disabled={!validEmail||!validPwd||!validPwdConfirm||!firstname||!lastname?true:false}>
                Enter
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Signup;
