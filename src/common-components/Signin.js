import { useState } from "react";
import axios from "../api/axios";
import NavBar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SIGNIN_URL = '/login';

function Signin() {
    const { setAuth } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [roles, setRoles] = useState([]); // Initialize roles as an empty array
    const Navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(SIGNIN_URL, { email, password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            console.log(JSON.stringify(res.data.result.roles));
            const accessToken = res.data.accessToken;
            const roles = res.data.roles;
            const firstname=res.data.result.firstname
            const lastname=res.data.result.lastname
            const id=res.data.id

           // Set the roles array in the component state
            setAuth({ email, password, accessToken,  roles,firstname,lastname,id });
            setSuccess(true);

            setTimeout(() => {
                Navigate(from, { replace: true })
            }, 1000);

        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response');
            } else if (error.response.status === 400) {
                setErrMsg('Missing email or password');
            } else if (error.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed')
            }
        }
    };

    return (
        <>
            <NavBar />
            <form className="container signup-container" onSubmit={handleSubmit}>
                <div className="cardy">
                    <h2 className="signup">Login</h2>

                    <div className="inputBox1">
                    {/* <FontAwesomeIcon icon={faEnvelope} /> */}
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
