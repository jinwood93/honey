import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../src/App.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Mainpage() {
  let history = useHistory();

  const [firstdate, setfirstdate] = useState(null);
  const [myimg, setmyimg] = useState(null);
  const [partnerimg, setpartnerimg] = useState(null);
  useEffect(async () => {
    axios.get("/first/auth").then((res) => {
      console.log(res.data);
      if (res.data.isAuth === false) {
        alert("로그인을 다시해주세요");
        history.push("/login");
      }
      setmyimg(res.data.profileimage);
      let day = res.data.firstdate;
      let newday = day.replace(/-/gi, "");
      let lastday = newday.slice(0, 8);

      function getdday(targetYYYYMMDD) {
        let ONE_DAY_MIL_SEC = 1000 * 60 * 60 * 24;
        let yyyy = targetYYYYMMDD.substr(0, 4);
        let mm = targetYYYYMMDD.substr(4, 2);
        let dd = targetYYYYMMDD.substr(6, 2);
        let now = new Date();
        let target = new Date();
        target.setFullYear(yyyy, mm - 1, dd);
        let gap = Math.floor(
          (now.getTime() - target.getTime()) / ONE_DAY_MIL_SEC
        );
        if (gap == 0) {
          return "D-DAY";
        } else {
          return gap > 0 ? "D+" + gap : "D" + gap;
        }
        return gap;
      }

      let dday = getdday(lastday);
      setfirstdate(dday);

      axios
        .post("/first/findmylove", { authCode: res.data.authCode })
        .then((res) => {
          axios
            .post("/first/findmypartner", { code: res.data.lovecode })
            .then((res) => {
              console.log(res.data);
              setpartnerimg(res.data.partnerimg);
            });
        });
    });
  }, []);
  const mypagelink = () => {};
  return (
    <div>
      <div className="backimg">
        <h2>함께한 날</h2>
        <h3 style={{ color: "orange" }}>{firstdate}</h3>
        <nav className="profileimg">
          <img src={partnerimg} className="user-profileimg"></img>
        </nav>
        <Link to="/mypage">
          <nav className="profileimg">
            <img
              src={myimg}
              className="user-profileimg"
              onClick={mypagelink}
            ></img>
          </nav>
        </Link>
      </div>
      <Link to="/calendar">캘린더이미지</Link>
      <Link to="/chat">채팅방이미지</Link>
      <Link to="/gallary">앨범이미지</Link>
    </div>
  );
}

export default Mainpage;
