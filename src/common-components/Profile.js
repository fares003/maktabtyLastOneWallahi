import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useAuth from "../hook/useAuth";
import NavBar from "./Navbar";
import '../style/profile.css'
import Swal from "sweetalert2";
import  image1 from'../common-components/images/Retro Colorful Business Card Front.jpg'
import blanAvatar from'../common-components/images/Blank-Avatar.png'
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [edit, setEdit] = useState(false);
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
  const [image,setImage]=useState("")
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


  const featchUser = async () => {
    try {
      const res = await axiosPrivate.get(`/user/${auth.id}`);
      setUserInfo(res.data); // Assuming the response is an object containing user information
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    featchUser();
  }, [edit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
if(pwd){
  if(!validPwd||!validPwdConfirm){
    setErrMsg("please try agin and enter valid password")
    return;
  }
}
if(email){
  if(!validEmail){
    setErrMsg("please try agin and enter valid Email")
    return;
  }
}
    try {
      const userData = {
        ...(email && { email: email }),
        ...(firstname && { firstname: firstname }),
        ...(lastname && { lastname: lastname }),
        ...(pwd && { password: pwd }),
        ...(image && { image: image }),
      };
      const res = await axiosPrivate.put(`/user/${auth.id}`, userData);
      console.log(res)
      setSuccess(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
  setEdit(false)
    } catch (error) {
      if (error.response?.status === 409) {
        setErrMsg("This email is already in use");

      } else if (!error.response) {
        setErrMsg("No server response");

      } else {
        setErrMsg("Registration failed");
      }
    }
  };
  return (
<body className="profile-body">

<NavBar />
      <Container fluid className="profile-cont pt-5">
        <Row className="profile-row">
          <Col >
          <div className="main-cont">
            <div className="butts">
            <Button variant="danger" onClick={() =>!edit? setEdit(true):setEdit(false)}>
              {!edit?<>Edit</>:<>Profile info</>}
              
            </Button>

            </div>
            {!edit ? (
              <div className="profile">
                <img src={userInfo.image?userInfo.image:blanAvatar} alt="user" />
                <p>{userInfo.email}</p>
                <p>{userInfo.firstname} {userInfo.lastname}</p>
              </div>
            ) : (
              <div className="edit-profile">
                <form onSubmit={handleSubmit}>
              <label>
              <span>Email</span>
              <input class="input" type="text" placeholder={userInfo.email}aria-describedby="uidnote"autoComplete="false" onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  aria-invalid={validEmail ? "false" : "true"}
                  onChange={(e) => setEmail(e.target.value)} />
              <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail ? "instructions" : "off"
                  }
                >
                  Email must contain the '@' symbol and end by ".com". Please
                  enter a valid email address.
                </p>
              
          </label> 
              <label>
              <span>First name</span>
              <input class="input" type="text" placeholder={userInfo.firstname} autoComplete="off"  onChange={(e)=>{setFirstName(e.target.value)}}/>
           
          </label> 
          <label>
          <span>Last name</span>
              <input class="input" type="text" placeholder={userInfo.lastname} autoComplete="off"  onChange={(e)=>{setLastName(e.target.value)}}/>
            
          </label> 
          <label>
          <span>Password</span>
              <input class="input" type="password" placeholder="Enter the new password" onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  aria-invalid={validPwd ? "false" : "true"}
                  onChange={(e) => setPwd(e.target.value)}
                  aria-describedby="pidnote"
                  autoComplete="false"/>
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
          </label> 
          <label>
          <span>confirm password</span>
              <input class="input" type="password" placeholder="Enter the new password"onFocus={() => setPwdConfirmFocus(true)}
                  onBlur={() => setPwdConfirmFocus(false)}
                  onChange={(e) => setPwdConfirm(e.target.value)}
                  aria-describedby="cidnote"
                  autoComplete="false"/>
             <p id="cidnote"
                  className={
                    !pwdConfirmFocus && !validPwdConfirm&&pwdConfirm? "instructions" : "off"
                  } >Please Confirm Your password correctly</p>
          </label> 
          <label>
          <span>image</span>
              <input class="input" type="text" placeholder="Enter valid image link" autoComplete="off"  onChange={(e)=>{setImage(e.target.value)}}/>
             
          </label> 
          <Button disabled={!email&&!pwd&&!firstname&&!lastname&&!image} variant="success" type="submit" size="lg">submit</Button>
          <p>{errMsg?errMsg:''}</p>
          </form>
          </div>
            )}
            </div>
          </Col>
          <Col >
          <img className="fantasy-img" src={image1}/>
          </Col>
        </Row>
      </Container>
    </body>
  );
}

export default Profile;
