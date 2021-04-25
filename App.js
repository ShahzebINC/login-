import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import NavBar from "./NavBar";
import About from './About';
import Contact from './Contact';
import Home from "./Home";
import Service from './Service';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Forgetpassword from './Forgetpassword'
import {db} from "./firebase";
import { useEffect, useState } from 'react';

const App = () =>{
    const [user,setUser] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [hasAccount,setHasAccount] = useState(false);

    const clearInputs = () =>{
        setEmail("");
        setPassword("");

    }
    const clearErrors = () =>{
        setEmailError("");
        setPasswordError("");
    }
    const handleLogin = ()=>{
        clearErrors();
        db
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
                setEmailError(err.message);
                break;
                case "auth/wrong-password":
                setPasswordError(err.message);
            }
            
        })   
    }
    const handleSignup = ()=>{
        clearErrors();
        db
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err =>{
            switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
                setEmailError(err.message);
                break;
                case "auth/weak-password":
                setPasswordError(err.message);
            }  
        }) 
    }
    const handleLogout = ()=>{
        db.auth().signOut();
    }

    const authListener = () =>{
        db.auth().onAuthStateChanged(user =>{
            if(user)
            {
                clearInputs();
                setUser(user);
            }
            else{
                setUser("");
            }
           
        })
    }
    useEffect(()=> {
        authListener();
    }, [authListener] );

    return (
        <>
        
        <BrowserRouter>
        <NavBar/>   
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Service" component={Service} />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Forgetpassword" component={Forgetpassword} />
            <Route exact path="/Dashboard" component={Dashboard}/>
            {
                user ? (
                    <>
                    <Dashboard/>
                    </>
                ) : (
            
            <Route exact path="/Login" render={(props) =><Login email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
            handleLogin={handleLogin} 
            handleSignup={handleSignup} 
            hasAccount={hasAccount} 
            setHasAccount={setHasAccount} 
            emailError={emailError} 
            setEmailError={setEmailError}
            passwordError={passwordError}{...props}/>}/>
            )};
            <Redirect to="/" />       
            </Switch>
            </BrowserRouter>
        </>
    );
};
export default App;