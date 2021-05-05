import { useState } from "react";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import apeach from "../images/apeach_star.gif";
import fish from "../images/fish.PNG";
import tera from "../images/tera.PNG";
import "../App.css";

function First() {
  console.log("부모렌더링");

  useEffect(() => {
    console.log("부모리렌더링");
  });
  
  const [exit, setexit] = useState(false);
  const onchange = () => {
    setexit(true);
  };
  return (
    <div
    style={{
      height:'100%',
    }}
    >
      <Advertising exit={exit}></Advertising>
      <div
        style={{
          margin: "auto",
          marginTop: "60px",
          textAlign: "center",
          backgroundColor:'#DCE5E2',
          paddingBottom:'25px',
        
        }}
      >
        <div
        style={{
          boxSizing:'border-box',
          margin:'auto',
          padding:'20px'
        }}
        >
          <Link
            to="/login"
            style={{
              margin: "auto",
              textAlign: "center",
              padding: "4px",
              fontSize: "18px",
              textDecoration: "none",
              color: "#ECCED0",
              textDecorationLine: "none",
              border: "1px solid #ECCED0",
              borderRadius: "5px",
              backgroundColor:'#B6B7B2',
            }}
          >Login</Link>
          </div>
          <div style={{
            margin:'auto',
            marginTop:'90px',
            display:'block',
            textDecoration: "none",
            textDecorationLine: "none",
            textAlign:'center',
            
          }}>
            <p>
              아직 아이디가 없으신가요?
              <br />
              <Link to="/register" className="register_login" onClick={onchange}
              style={{
                textAlign:'center',
                margin:'auto',
                display:'block',
                textDecoration: "none",
                textDecorationLine: "none",
              }}  
              >
                Sign-up
              </Link>
            </p>
          </div>
      </div>
    </div>
  );
}

function Advertising() {

  console.log("자식렌더링");
 
  return (
    <div>
      <div style={{objectFit:'fill', textAlign: "center",}}>
        
        <img src={apeach} className="img"></img>
      </div>
     
    </div>
  );
}

export default First;
