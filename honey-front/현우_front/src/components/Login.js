import React from "react";
import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { registeremail } from "../actions/reg";
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
    axios.post("/login", { email: email, password: password }).then((res) => {
      if (res.data.loginSuccess === true) {
        history.push("/mainpage");
      } else {
        alert(res.data.message);
      }
    });
  };
  return (
    <div>
      <form onSubmit={onsubmit}>
        이메일:<input type="email" value={email} onChange={eonChange}></input>
        <div></div>
        비밀번호:
        <input type="password" value={password} onChange={ponChange}></input>
        <div></div>
        <button type="submit">로그인</button>
      </form>

      <button
        onClick={() => {
          sethelp(true);
        }}
      >
        로그인 정보를 모르시겠나요??
      </button>
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
    axios.post("/findmypassword", { email: email }).then((res) => {
      alert(res.data.text);
      setcheck(res.data.check);
    });
  };

  const sendemail = (e) => {
    e.preventDefault();
    axios.post("/sendemail", { checkuser: checkuser }).then((res) => {
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
