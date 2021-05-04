import axios from "axios";
import React from "react";

function Mainpage() {

    const logout=()=>{
        axios.get('/logout')
    }
  return <div><h1>메인페이지</h1>
        <button onClick={logout}></button>
  </div>;

}

export default Mainpage;
