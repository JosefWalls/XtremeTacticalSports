import React, {useState} from 'react';
import "./Login.css";
import { auth } from '../../firebase';
import { useHistory } from 'react-router';

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((user) => history.push("/SiteManagement"))
        .catch(err => console.log(err.message))
    }

    return (
        <div className="login">
            <div className="login__card">
                <h2>Enter Email</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <h2>Enter Password</h2>
                <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <footer>
                    <button onClick={handleLogin}>Login</button>
                </footer>
            </div>
        </div>
    )
};

export default Login;