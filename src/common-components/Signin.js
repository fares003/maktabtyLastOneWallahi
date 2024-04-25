import { useState } from "react";
import axios from "../api/axios";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

const SIGNIN_URL = '/login';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const Navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(SIGNIN_URL, { email, password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            console.log(res.data);
            console.log(res.data.accessToken);
            setSuccess(true);

       
                setTimeout(() => {
                    Navigate('/')
                }, 1000);
            
        } catch (error) {
            if (!error.response) {
                setErrMsg('No server response');
            } else if (error.response.status === 409) {
                setErrMsg('This email is already in use');
            } else {
                setErrMsg('Login failed');
            }
        }
    };

    return (
        <>
            <NavBar />
            <form className="container signup-container" onSubmit={handleSubmit}>
                <div className="cardy">
                    <a className="signup">Login</a>

                    <div className="inputBox1">
                        <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="user">Email</span>
                    </div>

                    <div className="inputBox">
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span>Password</span>
                    </div>

                    <button className="enter" type="submit">Enter</button>
                </div>
            </form>
            {errMsg && <div className="error">{errMsg}</div>}
            {success && <div className="success">Login successful</div>}
        </>
    );
}

export default Signin;
