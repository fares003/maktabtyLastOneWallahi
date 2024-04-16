import "../style/signup.css"
import NavBar from "./Navbar";

function Signup(){

    return(
    
        <>
        <NavBar/>
    <div class="container signup-container">
            <div class="cardy">
                <a class="singup">Sign Up</a>
                <div class="inputBox1">
                    <input type="text" required="required"/>
                    <span class="user">Email</span>
                </div>
    
                <div class="inputBox">
                    <input type="text" required="required"/>
                    <span>Username</span>
                </div>
    
                <div class="inputBox">
                    <input type="password" required="required"/>
                    <span>Password</span>
                </div>
                <div class="inputBox">
                    <input type="password" required="required"/>
                    <span>confirm password</span>
                </div>
                
                <button class="enter">Enter</button>
    
            </div>
        </div>
    
    
    </>
    
    )}

export default Signup;