import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registeremail } from "../actions/reg";
function Register(props) {
  let history = useHistory();

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    props.registeremail(email);
    axios
      .post("/register", { email: email, password: password })
      .then((res) => {
        res.data.success === true
          ? history.push("/code")
          : alert(res.data.message);
      });
  };

  return (
    <div>
      <h1>허니챗에 처음 오신 것을 환영 합니다!</h1>
      <h1>회원으로 가입해주세요</h1>
      <form onSubmit={onsubmit}>
        <input
          type="text"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
        ></input>
        <input
          type="text"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        ></input>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = {
  registeremail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
