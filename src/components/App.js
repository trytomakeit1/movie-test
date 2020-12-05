import React, {Component} from 'react';
import '../style.css';

import Loginform from './Loginform';



class App extends Component {


    loginHandler(e){
        e.preventDefault();
        console.log("Login form submitted");
   }
    render(){

        return (
        <div className="container">
            <p>Please login to your account and if you are not registered, use 
              singup to register.</p>
            
            <Loginform onsubmit={this.loginHandler}/>

        </div>)
    }

}

export default App;
