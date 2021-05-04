import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Subinformation() {
  let history = useHistory();
  const [img, setProfileImg] = useState(null);
  const [Sex, setSex] = useState("");
  const [Username, setUsername] = useState("");
  const [Birth, setBirth] = useState("");
  const [FirstDate, setFirstDate] = useState("");

  const onsubmit = (e) => {
    axios.post("/subinformation", {
      Sex: Sex,
      Username: Username,
      Birth: Birth,
      FirstDate: FirstDate,
    });
    e.preventDefault();
    console.log(img);
    const formData = new FormData();
    formData.append("file", img);

    return axios
      .post("/subinformation", formData)

      .then((res) => {
        alert("회원가입 성공");
        history.push("/login");
      })
      .catch((err) => {});
  };

  return (
    <div>
      연결 성공!
      <p></p>
      프로필을 입력해주세요.
      <p></p>
      <form onSubmit={onsubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setProfileImg(e.target.files[0]);
          }}
        ></input>
        남성
        <input
          type="radio"
          name="sex"
          value="남성"
          onClick={(e) => {
            setSex(e.target.value);
          }}
        ></input>
        여성
        <input
          type="radio"
          name="sex"
          value="여성"
          onClick={(e) => {
            setSex(e.target.value);
          }}
        ></input>
        <p></p>
        이름
        <input
          type="text"
          value={Username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <p></p>
        생일
        <input
          type="date"
          onChange={(e) => {
            setBirth(e.target.value);
          }}
        ></input>
        <p></p>
        처음만난날
        <input
          type="date"
          onChange={(e) => {
            setFirstDate(e.target.value);
          }}
        ></input>
        <button type="submit">작성완료</button>
      </form>
    </div>
  );
}

export default Subinformation;
