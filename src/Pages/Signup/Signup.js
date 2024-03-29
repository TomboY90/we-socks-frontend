/* eslint-disable no-unused-expressions */
/* eslint-disable no-dupe-keys */
import React, { Component } from "react";
import Layout from "Components/Layout";
import InputBox from "Components/InputBox";
import Button from "Components/Button";
import Select from "Components/Select";
import { API_URL, TOKEN_KEY } from "config";
import "./Signup.scss";

const yearArr = ["출생년도"];
const monthArr = ["월"];
const dayArr = ["일"];

for (let i = 1960; i < 2020; i++) {
  yearArr.push(`${i}`);
}
for (let i = 1; i < 13; i++) {
  if (i < 10) {
    monthArr.push(`0${i}`);
  }
  if (i > 10) {
    monthArr.push(`${i}`);
  }
}
for (let i = 1; i < 32; i++) {
  if (i < 10) {
    dayArr.push(`0${i}`);
  }
  if (i > 10) {
    dayArr.push(`${i}`);
  }
}

class Signup extends Component {
  state = {
    textShow: "",
    email: "",
    checkEmail: "",
    nickname: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
    year: "",
    month: "",
    day: ""
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value.trim()
    });
  };

  handleOnClick = () => {
    fetch(`${API_URL}user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: this.state.nickname,
        email: this.state.email,
        password: this.state.password,
        phone_number: this.state.phoneNumber,
        birthday:
          this.state.year + "-" + this.state.month + "-" + this.state.day
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          alert("회원가입을 축하드립니다!! 로그인 페이지로 이동합니다.");
          this.props.history.push({
            pathname: "/login"
          });
        }

        if (data.error_code === "EMAIL_ALREADY_EXISTS") {
          this.setState({
            checkEmail: "이메일 중복"
          });
        }
      });
  };
  render() {
    return (
      <Layout>
        <div className="signupContainer">
          <div className="signupContents">
            <header className="signupHeader">
              <h1>Sign up</h1>
            </header>
            <div className="signupId">
              <InputBox
                type="email"
                name="email"
                placeholder="e-mail"
                classname="signupIdInput"
                onChange={this.handleInput}
              />
              <p
                className={
                  this.state.checkEmail.length < 2
                    ? "showEmailText1"
                    : "showEmailText2"
                }
              >
                {this.state.checkEmail}
              </p>
            </div>
            <div className="signupPw">
              <InputBox
                classname="signupPwInput"
                placeholder="password"
                type="password"
                name="password"
                onChange={this.handleInput}
              />
              <p className="showPwText1"></p>
            </div>
            <div className="signupPw">
              <InputBox
                type="password"
                placeholder="Confirm password"
                classname="signupPwInput"
                name="rePassword"
                onChange={this.handleInput}
              />
              <p
                className={`${
                  this.state.password !== this.state.rePassword
                    ? "showPwText2"
                    : "hiddenPwText"
                }`}
              >
                입력하신 비밀번호가 일치하지 않습니다.
              </p>
            </div>
            <div className="signupNick">
              <InputBox
                type="text"
                className="signupNickInput"
                placeholder="nickname"
                name="nickname"
                onChange={this.handleInput}
              />
            </div>
            <div className="signupBirth">
              <div className="signupBirthInput">
                <Select
                  className="signupYearInputSelect"
                  name="year"
                  ref_array={yearArr}
                  makeSelection={this.handleInput}
                />
                <Select
                  className="signupMonthInputSelect"
                  name="month"
                  ref_array={monthArr}
                  makeSelection={this.handleInput}
                />
                <Select
                  className="signupDayInputSelect"
                  name="day"
                  ref_array={dayArr}
                  makeSelection={this.handleInput}
                />
              </div>
            </div>
            <div className="signupPhoneNum">
              <div className="signupPhoneNumInput">
                <InputBox
                  type="text"
                  placeholder="PhoneNumber"
                  name="phoneNumber"
                  handleChange={this.handleInput}
                />
              </div>
            </div>
            <Button
              className="signupBtn"
              text="Sign up"
              onClick={this.handleOnClick}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Signup;
