import React, {Fragment, useState} from 'react';
import { useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';

const USER_LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password ) {
      token
    }
  }
`;

const USER_SIGNUP = gql`
  mutation signupMutation($username: String!, $password: String!) {
    register(username: $username, password: $password ) {
      id username
    }
  }
`;


const Loginform = (props) => {
    const [loginState, loginUpdate] = useState({
        redirect: "login"
    });

    const [userlogin, { loginerror }] = useMutation(USER_LOGIN, 
        {
            onCompleted({login}) {

                localStorage.setItem('token', login.token);
                 //redirect to movies
                 loginUpdate({
                    redirect: "movies"
                });
            },
            onError(error){
                alert(error)
            }
    });

    const [usersignup, { signuperror }] = useMutation(USER_SIGNUP, 
        {
            onCompleted({login}) {

                localStorage.setItem('token', login.token);
                //redirect to movies
                loginUpdate({
                    redirect: "movies"
                });
            },
            onError(error){
                alert(error)
            }
        });


    const loginHandler = (e) => {
        e.preventDefault();

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;

        userlogin({ variables: { username, password } });
    }

    const signupHandler = (e) => {
        e.preventDefault();

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value;

        usersignup({ variables: { username, password } });

    }


   let loginform = (
   <Fragment>
       <p>Please login to your account and if you are not registered, use <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>loginUpdate({redirect: "signup"})}>signup</span> to register.</p>
        <div className="loginform">
            <form onSubmit={loginHandler}>
            <div>
                <label>Username:</label>
                <input type="text" name="username"></input>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"></input>
            </div>
            <div>
                <button className="button">Login</button>
            </div>
            </form>
        </div>
   </Fragment>);

   let signupform = (
    <Fragment>
       <p>Please use the form below to register.</p>
       <div className="loginform">
   <form onSubmit={signupHandler}>
       <div>
           <label>Username:</label>
           <input type="text" name="username"></input>
       </div>
       <div>
           <label>Password:</label>
           <input type="password" name="password"></input>
       </div>
       <div>
           <button className="button">Register</button>
       </div>
   </form>
   </div>
   <p>back to <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>loginUpdate({redirect: "login"})}>login</span> page.</p>
                       
   </Fragment>);
   
    let content = null;
    if(loginState.redirect === "login")
        content = loginform
    else if(loginState.redirect === "signup") {
        content = signupform

    } else if(loginState.redirect === "movies") {
        content = <Redirect to="movies" />;
    } else {

    }


    return content
}

export  default Loginform ;