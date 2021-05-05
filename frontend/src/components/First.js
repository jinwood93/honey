import { useState } from "react";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import bee from "../images/bee.PNG";
import fish from "../images/fish.PNG";
import tera from "../images/tera.PNG";
import "../App.css";

function First() {
  console.log("부모렌더링");

  

 
  return (
    <div>
      <Advertising ></Advertising>

      <Link to="/login">로그인</Link>
      <Link to="/register" onClick={onchange}>
        회원가입
      </Link>
    </div>
  );
}

function Advertising() {

  console.log("자식렌더링");
 
  return (
    <div>
      <div>
      <img src={bee} className="img"></img>
        
      </div>
    </div>
  );
}

export default First;
