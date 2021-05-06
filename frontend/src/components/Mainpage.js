import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../src/App.css'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import gallery from "../images/gallery.png";
import calendar from "../images/calendar.png";
import chatUi from "../images/peach_ui.png";
import heart from "../images/heart.png";
import testUi from "../images/apeach_walking.gif";
function Mainpage() {
  let history = useHistory();

  const [firstdate,setfirstdate]=useState(null);
  const[myimg,setmyimg]=useState(null)
  const[partnerimg,setpartnerimg]=useState(null)
  useEffect(async() => {
    axios.get('/auth').then((res)=>{if(res.data.isAuth===false){alert("로그인을 다시해주세요");history.push('/login')};setmyimg(res.data.profileimage);
      let day=res.data.firstdate
      let newday=day.replace(/-/gi,'')
      let lastday=newday.slice(0,8)
      
      function getdday( targetYYYYMMDD )
{
let ONE_DAY_MIL_SEC = 1000 * 60 * 60 * 24;
let yyyy = targetYYYYMMDD.substr(0,4);
let mm =  targetYYYYMMDD.substr(4,2);
let dd =  targetYYYYMMDD.substr(6,2);
let now = new Date();
let target = new Date();
target.setFullYear(yyyy, mm-1, dd);
let gap = Math.floor( ( now.getTime() - target.getTime() ) / ONE_DAY_MIL_SEC);
if( gap == 0 ){
return "D-DAY";
}else{
return gap>0?"D+"+gap:"D"+gap;
}
return gap;
}
      
      let dday=getdday(lastday)
      setfirstdate(dday)

      axios.post('/findmylove',{authCode:res.data.authCode}).then((res)=>{
        
        axios.post('/findmypartner',{code:res.data.lovecode}).then((res)=>{
          console.log(res.data)
            setpartnerimg(res.data.partnerimg);
        })
      })

    })
    
  }, [])
    const mypagelink=()=>{

    }
  return (
    <div className="Main-body">
      <div className="backimg">
        <div className="Main-head">
          <div className="profileimg"><img src={partnerimg} className="user-profileimg"></img></div>
          <div className="Main-date">
            <span>처음 만난 날
          <p style={{ color: "orange" }}>8일{firstdate}</p>
              <p><span>이름</span><span><img src={heart}></img></span><span>이름</span></p>
            </span>
          </div>
          <Link to="/mypage" className="profileimg"><img src={myimg} className="user-profileimg Main-myImg"></img></Link>
        </div>
        <div className="Main-footer">
          <div className="Main-ui">
            <Link to="/calendar"><img src={calendar} className="Main-ui-img" /></Link>
          </div>
          <div className="Main-ui">
            <Link to="/chat"><img src={chatUi} className="Main-ui-img" /></Link>
          </div>
          <div className="Main-ui">
            <Link to="/gallary"><img src={gallery} className="Main-ui-img" /></Link>
          </div>
        </div>
      </div>
    </div>);

}

export default Mainpage;
