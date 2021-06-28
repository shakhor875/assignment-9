import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebace.config';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';
import './Login.css'
import { UserContext } from '../../App';
import Google from'./Icon/google.png'
import fb from './Icon/fb.png'



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [passwordError, setPasswordError] = useState()
    const [newUser , setNewUser] = useState(false)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } }
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
        successful: false
    })

    // Email & password valid start//

    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.value === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.value === "password") {
            const isPasswordValid = e.target.value.length > 7;
            const passwordHasValid = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasValid;
        }
        if (e.target.value === "confirmPassword") {
            const isPasswordValid = e.target.value.length > 7;
            const passwordHasValid = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasValid;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
     // Email & password valid end//


    // Form submit in firebase signUp start//

    const handleSignUp = (e) => {
        const newUserInfo = { ...user }
        if (user.name && user.email && user.password && user.confirmPassword) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    newUserInfo.error = "";
                    newUserInfo.successful = true;
                    setUser(newUserInfo);
                    console.log(res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.successful = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);

                });
        }
        e.preventDefault();
    }

    // Form submit in firebase signUp end //


    //  Form submit in firebase logIn start//

    const handleLogin = (event) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email: email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setPasswordError(errorMessage);
            });
        event.preventDefault();
    }

 //  Form submit in firebase logIn  end//




    

    // Google sign in method start//

    const handelGoogleSignIn = () => {
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                console.log(result)
                const {displayName ,  photoURL} = result.user;
                const signedInUser ={ name: displayName,img:photoURL}
                setLoggedInUser  (signedInUser);
                history.replace(from)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    // Google sign in method end //

    // facebook sign in method start //
   
    const handelFacebookSignIn = () =>{
        const FbProvider = new firebase.auth.FacebookAuthProvider();

        firebase
  .auth()
  .signInWithPopup(FbProvider)
  .then((result) => {
    const {displayName , email} = result.user;
    const signedInUser ={ name: displayName, email : email}
    setLoggedInUser  (signedInUser);
    history.replace(from);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    }

    return (
        <div className="container">

            {
                user.successful ? <p className="text-success text-center mt-5">successfully Created Account</p>
                :
                <p className="text-danger text-center">{user.error}</p>
            }

            <p className="text-center text-danger mb-3">{passwordError}</p>

            <div className="form">
                {newUser && <h5 className="mb-4"> Create an Account</h5>}
                {!newUser && <h5 className="mb-4">Log In</h5>}
                <form>
                   {newUser &&  <input className="form-control" onBlur={handleBlur} placeholder="Your name" name="name" type="text" />}
                    <br />
                    <input type="email" className="form-control" onBlur={handleBlur} placeholder="Your Email" name="email" id="" />
                    <br />
                    <input type="password" className="form-control" onBlur={handleBlur} placeholder="Your password" name="password" id="" />
                    <br />
                    {newUser &&  <input type="password" className="form-control" onBlur={handleBlur} placeholder="Confirm Your password" name="confirm-password" id="" />}
                    <br />
                    {newUser && <input type="submit" className="form-control btn btn-info" onClick={handleSignUp} value="Create New Account" />}
                    <br />
                   {!newUser &&  <input type="submit" className="form-control btn btn-info" onClick={handleLogin} value="Log in" />}
                </form>

            {
                newUser && <h6 className="mt-3 text-center">Already Have a Account ?
                 <span className="link" onClick={() =>setNewUser(!newUser)}>log in</span>   
                </h6>
            }
            {
                !newUser && <h6 className="mt-3 text-center">Don't Have Account ?
                  <span className="link" onClick={() =>setNewUser(!newUser)}>Create New Account</span>
                </h6>
            }

            </div>

            <h1 className="StateLine"><span className="stateLine">Or</span></h1>

                              {/* Facebook provider  */}

            <div className="icon text-center" onClick={handelFacebookSignIn}>
                <img src={fb} alt="" />
                <span>Continue with Facebook</span>
            </div>

                                {/* google provider */}

            <div className="icon text-center" onClick={handelGoogleSignIn}>
                <img src={Google} alt="" />
                <span>Continue with Google</span>
            </div>
        </div>
    );
};

export default Login;