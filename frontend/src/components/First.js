import { useState } from "react";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import bee from "../images/bee.PNG";
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
    <div>
      <Advertising exit={exit}></Advertising>

      <Link to="/login">로그인</Link>
      <Link to="/register" onClick={onchange}>
        회원가입
      </Link>
    </div>
  );
}

function Advertising(props) {
  const [slide, setslide] = useState(3);
  console.log("자식렌더링");
  // useEffect(() => {
  //   setTimeout(() => {
  //     setslide(slide + 1);
  //   }, 2000);
  //   setTimeout(() => {
  //    setslide(slide + 2);
  //   }, 4000);
  //   setTimeout(() => {
  //     setslide(slide + 3);
  //   }, 6000);
  // }, []);
  // useEffect(() => {
  //   let mounted = true;
  //   if(mounted==true){
  //     console.log(slide)
  //   console.log("자식리렌더링")
  //   setTimeout(() => {
  //      setslide(slide + 1);
  //       }, 2500);

  //     }

  //     return ()=>
  //     (mounted=false)

  // },[slide])

  return (
    <div>
      <div>
        -광고 이미지-
        {slide % 3 == 0 ? <img src={bee} className="img"></img> : null}
      </div>
      <div>
        {slide % 3 == 1 ? <img src={fish} className="img"></img> : null}
      </div>
      <div>
        {slide % 3 == 2 ? <img src={tera} className="img"></img> : null}
      </div>
    </div>
  );
}

export default First;
