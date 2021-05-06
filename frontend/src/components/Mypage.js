import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../src/App.css";
import { useHistory } from "react-router-dom";
function Mypage() {
  let history = useHistory();
  const [img, setimg] = useState(null);
  const [username, setusername] = useState(null);
  const [birth, setbirth] = useState(null);
  const [firstdate, setfirstdate] = useState(null);

  useEffect(() => {
    axios.get("/first/auth").then((res) => {
      if (res.data.isAuth === false) {
        alert("로그인다시해주세요");
        history.push("/login");
      }
      setimg(res.data.profileimage);
      setusername(res.data.username);
      let newbirth = res.data.birth.slice(0, 10);
      setbirth(newbirth);
      let newfirstdate = res.data.firstdate.slice(0, 10);
      setfirstdate(newfirstdate);
    });
  }, []);

  const logout = () => {
    axios.get("/first/logout").then((res) => {
      if (res.data.success === true) {
        history.push("/login");
      }
    });
  };
  return (
    <div>
      -my page-
      <div>
        <div className="profileimgyo">
          <img src={img} className="user-profileimg"></img>
        </div>

        <div>이름:{username}</div>
        <div>생일:{birth}</div>
        <div>처음 만난 날:{firstdate}</div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={logout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Mypage;
