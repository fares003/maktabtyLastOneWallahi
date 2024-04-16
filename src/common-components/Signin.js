import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./Navbar";

function Signin() {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <NavBar />
            <form className="container signup-container" >
                <div className="cardy">
                    <a className="singup">Login</a>

                    <div className="inputBox1">
                        <input type="text" required="required" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="user">Email</span>
                    </div>

                    <div className="inputBox">
                        <input type="password" required="required" value={password} onChange={(p) => setPassword(p.target.value)} />
                        <span>Password</span>
                    </div>

                    <button className="enter" type="submit">Enter</button>
                </div>
            </form>
        </>
    );
}

export default Signin;
