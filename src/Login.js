import React from 'react';
import fire from './config/fire';
import "./login.css"

class Login extends React.Component {

  signUp() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log('Successfully Signed Up');
      })
      .catch((err) => {
        console.log('Error: ' + err.toString());
      })
  }

  login() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((u) => {
        console.log('Successfully Logged In');
      })
      .catch((err) => {
        console.log('Error: ' + err.toString());
      })
  }

  render() {
    return (
      // <div style={{ textAlign: 'center' }}>
      //   <div>
      //     <div>Email</div>
      //     <input id="email" placeholder="Enter Email.." type="text"/>
      //   </div>
      //   <div>
      //     <div>Password</div>
      //     <input id="password" placeholder="Enter Password.." type="text"/>
      //   </div>
      //   <button style={{margin: '10px'}} onClick={this.login}>Login</button>
      //   <button style={{margin: '10px'}} onClick={this.signUp}>Sign Up</button>
      // </div>

      <div>

                <head>
                    <meta charset="utf-8" />
                    <title>LOGIN TO ALLY</title>
                    <link rel="stylesheet" href="login.css"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"  />
                </head >
            
            <div class="login-box">

                <div class="logo">
                        {/* <img src="/logo.jpeg" alt="mec"> */}
                </div>
                <h3> ALUMNI</h3>

                <div class="textbox">
                <i class="fas fa-user"></i>
                <input id="email" type="text" placeholder="Mail ID" />
                </div>
                <br/>
                <div class="textbox">
                <i class="fas fa-lock"></i>
                <input id="password" type="password" placeholder="Password" />
                </div>
                <br/>
                <input type="button" class="btn" onClick={this.login} value="LOGIN" />
                <br />
                <div class="forgot">
                <a href="#">Forgot password?</a>
                </div>
            <br/>  
             </div>
           </div>

    )
  }
}

export default Login;