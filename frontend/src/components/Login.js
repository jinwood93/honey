import React from "react";
import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { registeremail } from "../actions/reg";
import apeachWalking from "../images/apeach_walking.gif";
import "../App.css";
function Login() {
  let history = useHistory();
  const [help, sethelp] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const eonChange = (e) => {
    setemail(e.target.value);
  };
  const ponChange = (e) => {
    setpassword(e.target.value);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    axios
      .post("/first/login", { email: email, password: password })
      .then((res) => {
        if (res.data.loginSuccess === true) {
          history.push("/mainpage");
        } else {
          alert(res.data.message);
        }
      });
  };
  return (
    <div className="Login-body">
      <div className="Login-info">
        <div className="Login-img">
          <img src={apeachWalking} className="Login-thum"></img>
        </div>
        <form className="Login-form" onSubmit={onsubmit}>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div>
              E-mail:
              <input
                className="Login-input"
                type="email"
                value={email}
                onChange={eonChange}
                placeholder="이메일을 입력해주세요"
              ></input>
              <br />
              Password:
              <input
                className="Login-input"
                type="password"
                value={password}
                onChange={ponChange}
                placeholder="비밀번호를 입력해주세요"
              ></input>
            </div>
          </div>
          <br />
          <button type="submit" style={{}}>
            로그인
          </button>
        </form>

        <button
          onClick={() => {
            sethelp(true);
          }}
        >
          로그인 정보를 모르시겠나요??
        </button>
      </div>
      {help === true ? <Modal></Modal> : null}
    </div>
  );
}

function Modal() {
  let history = useHistory();
  const [email, setemail] = useState("");
  const [check, setcheck] = useState(false);
  const [checkuser, setcheckuser] = useState("");
  const dispatch = useDispatch();

  const findmypassword = () => {
    axios.post("/first/findmypassword", { email: email }).then((res) => {
      alert(res.data.text);
      setcheck(res.data.check);
    });
  };

  const sendemail = (e) => {
    e.preventDefault();
    axios.post("/first/sendemail", { checkuser: checkuser }).then((res) => {
      if (res.data.auth == true) {
        dispatch(registeremail(email));
        history.push("/passwordchange");
      } else {
        alert("인증번호를 정확하게 입력해주세요!");
      }
    });
  };

  const changecheck = (e) => {
    setcheckuser(e.target.value);
  };

  return (
    <div>
      이메일:
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      ></input>
      <button onClick={findmypassword}>비밀 번호 찾기</button>
      <p></p>
      {check === true ? (
        <input value={checkuser} onChange={changecheck}></input>
      ) : null}
      {check === true ? (
        <button onClick={sendemail}>인증번호확인</button>
      ) : null}
    </div>
  );
}

export default Login;
