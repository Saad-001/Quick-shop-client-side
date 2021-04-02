import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import signInImage from '../../ProductsImages/preview.png';
import googleBtn from '../../ProductsImages/GButton.jpg';
import './Login.css';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/checkOut" } };

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result)
                console.log(result.user)
                const signedInUser = {name: result.user.displayName , email: result.user.email}
                // console.log(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from);
                }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    return (
        <div className="container" style={{backgroundImage: `URL(${signInImage})`, height:'100vh', backgroundRepeat: 'no-repeat'}}>
            <div className="signInBtnDiv" style={{height: '100px'}}>
                <img style={{height: '100px', cursor:'pointer'}} onClick={handleGoogleSignIn} src={googleBtn} alt=""/>                
            </div>
        </div>
    );
};

export default Login;