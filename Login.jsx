import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { auth } from './Firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const signIn = e => {
        e.preventDefault();

        //firebase stuff happens here.
        auth.signInWithEmailAndPassword(email,password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        //firebase stuff happens here.
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            console.log(auth);
            if(auth){
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>
            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={p => setPassword(p.target.value)} />
                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>
                <p>By Signing in you accept to amazon terms of use.</p>
                <button onClick={register} className='login__registerButton'>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login