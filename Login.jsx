import React from 'react';
import { Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {FacebookLoginButton} from 'react-social-login-buttons';
import "./Login.css";

const Login = (props) =>{
    const {email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError}= props;
    return (  
        <div className="loginstyler">
        <Form className="login-form">
            <h1><span className="font-weight-bold">Aamdani</span>.com</h1>
            <h2 className="text-center">Welcome</h2>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="Email" required value={email} onChange={(e) =>setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>
            </FormGroup>
            <div className="btnContainer">
                {hasAccount?(
                    <>
                    <button onClick={handleLogin} className="loginbutton btn btn-dark btn-lg btn-block" >Sign In</button>
                    <p>Don't have an account ?<span  onClick={()=> setHasAccount(!hasAccount)}> Sign Up</span>
                    </p>
                    </>
                ):(
                <>
                <button onClick={handleSignup} className="loginbutton btn btn-dark btn-lg btn-block" >Sign up</button>
                <p>Have an account ?<span onClick={()=> setHasAccount(!hasAccount)}> Sign In</span>
                </p>
                </>
                )}
            </div>
            <div className="text-center pt-3">
                Or continue with your social account
            </div>
            <FacebookLoginButton className="mt-3 mb-3"/>
        </Form>
        </div>
    );
};
export default Login;
