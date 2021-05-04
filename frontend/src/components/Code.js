import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";
import socketio from "socket.io-client";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
function Code(props) {
  let history = useHistory();
  console.log("gg");
  let connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  const socket = socketio.connect("http://localhost:5000", connectionOptions);

  const [Code, setCode] = useState("");
  const [uCode, usetCode] = useState("");

  useEffect(() => {
    console.log("찾아낸다");
    axios
      .post("/code", { email: props.state.email })
      .then((response) => setCode(response.data.randomCode));
  }, []);
  console.log("cocoo" + Code);
  const lovecode = (e) => {
    usetCode(e.target.value);
  };

  const conn = () => {
    console.log("코드코드" + Code);
    socket.emit("send code", { code: uCode, mycode: Code });
  };

  useEffect(() => {
    socket.on(Code, (message) => {
      console.log("메시지" + message);
      console.log(typeof message);
      if (typeof message == "boolean") {
        if (message == true) {
          axios
            .post("/lovecode", { authCode1: Code, authCode2: uCode })
            .then((res) => {
              res.data.success === true
                ? history.push("subinformation")
                : console.log("커플실패", res.data.err);
            });
        } else if (message == false) {
          alert("연결을 거부했습니다");
        } else {
          alert("타입이잘못됨");
        }
      } else {
        confirmAlert({
          title: "",
          message:
            message +
            "이코드의 사용자가 당신과의 연결을 원합니다 허락 하시겠습니까??",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                console.log("지금코드" + message);

                socket.emit("send code", { code: message, select: true });
                history.push("subinformation");
              },
            },
            {
              label: "No",
              onClick: () => {
                socket.emit("send code", { code: uCode, select: false });
              },
            },
          ],
        });
      }
    });
  });

  return (
    <div>
      <h1>서로의 코드를 입력하여 연결해 주세요</h1>
      <h4>내 초대 코드</h4>
      <input type="text" readOnly value={Code}></input>
      <h4>상대방 초대코드를 전달받으셨나요?</h4>
      <input type="text" value={uCode} onChange={lovecode}></input>
      <button onClick={conn}>연결하기</button>
      <h2>{props.state.email}</h2>
    </div>
  );
}

function getemail(state) {
  console.log(state);
  return {
    state: state.registeremailReducer,
  };
}

export default connect(getemail)(Code);
