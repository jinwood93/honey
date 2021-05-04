import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function Subinformation() {
  const email = useSelector((store) => store.registeremailReducer.email);
  let history = useHistory();
  const [imgFile, setImgFile] = useState(null);
  const [Sex, setSex] = useState("");
  const [Username, setUsername] = useState("");
  const [Birth, setBirth] = useState("");
  const [FirstDate, setFirstDate] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (Birth === "" || FirstDate === "" || Sex === "" || FirstDate === "") {
      alert("모두 입력 해주세요!");
    } else {
      const formData = new FormData();
      formData.append("Email", email);
      formData.append("Sex", Sex);
      formData.append("Username", Username);
      formData.append("Birth", Birth);
      formData.append("FirstDate", FirstDate);
      formData.append("file", imgFile);

      return axios
        .post("/subinformation", formData)

        .then((res) => {
          alert("회원가입 성공");
          history.push("/login");
        })
        .catch((err) => {});
    }
  };

  return (
    <div>
      연결 성공!
      <p></p>
      프로필을 입력해주세요.
      <p></p>
      <form onSubmit={onsubmit}>
        <img
          src={imgBase64}
          style={{
            backgroundColor: "#efefef",
            width: "150px",
            height: "150px",
          }}
        ></img>
        <input type="file" name="file" onChange={handleChangeFile}></input>
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
