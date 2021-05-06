import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../src/App.css'
import { useHistory } from "react-router-dom";
import apeach from "../images/apeach_walking.gif"
function Mypage() {
    let history = useHistory();
    const [img,setimg]=useState(null);
    const [username,setusername]=useState(null);
    const [birth,setbirth]=useState(null);
    const [firstdate,setfirstdate]=useState(null);
    const [Sex, setSex] = useState("");

    useEffect(() => {
        axios.get('/auth').then((res)=>{
            if(res.data.isAuth===false){alert("로그인다시해주세요");history.push('/login')}
            setimg(res.data.profileimage);
            setusername(res.data.username);
            let newbirth=res.data.birth.slice(0,10)
            setbirth(newbirth);
            let newfirstdate=res.data.firstdate.slice(0,10)
            setfirstdate(newfirstdate);
            setSex(res.data.sex);
        })
    }, [])

    const logout=()=>{
        axios.get('/logout').then((res)=>{
            if(res.data.success===true){
                history.push('/login')
            }
        })
    }
    const pwdChange=()=>{
        axios.get('/PasswordChange').then((res)=>{
            if(res.data.success===true){
                history.push('/login')
            }
        })
    }
    return (
        <div className="Mypage-body">
            <div className="Mypage-profile">
                <div className="profileimgyo"><img src={img} className="user-profileimg" /></div>
                <div className="Mypage-form">
                    <div>
                        <div className="Mypage-weak">이름</div>
                        <p className="Mypage-bold">김진우{username}</p>
                        <div className="Mypage-bold">생일</div>
                        <p className="Mypage-high">김진우{birth}</p>
                        <div className="Mypage-bold">성별</div>
                        <p className="Mypage-high MyPage-hr">김진우{Sex}</p>
                    </div>
                    <p className="Mypage-weak">계정 연결 정보</p>
                    <div className="Mypage-bold">처음 만난 날 </div>
                    <p className="Mypage-high">김진우{firstdate}</p>
                    <div className="Mypage-bold">내 계정 </div>
                    <p className="Mypage-weak">김진우</p>
                    <div className="Mypage-bold">상대방 계정 </div>
                    <p className="Mypage-weak MyPage-hr">김진우</p>
                    <div className="btn-Mypage-form">
                        <div class="btn-mypage"><button type="button" className="btn-logout" onClick={logout}>Logout</button></div>
                        <div class="btn-mypage"><button type="button" className="btn-pwChange" onClick={pwdChange}>Change Password</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage
