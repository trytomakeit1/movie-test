import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const USER_LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password ) {
      token
    }
  }
`;




const Loginform = (props) => {


    const [userlogin, { error }] = useMutation(USER_LOGIN, 
        {
            onCompleted({login}) {

                localStorage.setItem('token', login.token)
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

    return (
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
    )
}

export  default Loginform ;