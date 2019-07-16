import React, { Component } from "react";
import InputBox from "Components/InputBox";
import Button from "Components/Button";
import "./Login.scss";

class Login extends Component {
  this.handleOnclick = this.handleOnclick.bind(this)
  handleOnclick = e => {
    
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="loginContents">
          <div className="loginHeadText">
            <h2>Sign in</h2>
          </div>
          <div className="loginInputArea">
            <div>
              <InputBox
                type="text"
                classname="login_input"
                placeholder="e-mail address"
              />
              <p>e-mail 미일치</p>
            </div>
            <div>
              <InputBox
                type="password"
                classname="login_input"
                placeholder="Password"
              />
              <p>password 미일치</p>
            </div>
          </div>
          <Button
            className="signupBtn"
            text="로그인"
            click={this.handleOnclick}
          />
        </div>
      </div>
    );
  }
}

export default Login;