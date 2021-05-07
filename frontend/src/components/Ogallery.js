import axios from 'axios'
import React, { useEffect, useState} from "react";
import "../../src/App.css";
function Ogallery() {
    const[authCode,setauthCode]=useState(null)
    const[modalon,setmodalon]=useState(null)
    const[img,setimg]=useState([])
    useEffect(() => {
        axios.get('/first/auth').then((res)=>{setauthCode(res.data.authCode)});
    }, [])
    const show=()=>{
      setmodalon(false);
      axios.post('/work/gallery',{authCode:authCode}).then((res)=>{
      setimg(res.data)
      })
    }
    return (
        <div>
          
            <h1>Photo Gallery App</h1>
            <button onClick={()=>{setmodalon(true)}}>업로드</button>
            <button onClick={show} >갤러리</button>

      
           {modalon===true?<Oupload authCode={authCode}></Oupload>:<Ophoto img={img}></Ophoto>}
           
        </div>
    )
}

function Oupload(props){
    const [imgFile, setImgFile] = useState(null);
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



    const uploading=()=>{
        const formData = new FormData();
        formData.append("authCode",props.authCode);
        formData.append("file", imgFile);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios
        .post("/work/photos", formData, config)

        .then((res) => {
          if(res.data.success===true){
              alert("업로드 성공!")
          }
     
        })
    }
    return(
        <div>
            <img
            src={imgBase64}
            style={{
              backgroundColor: "#efefef",
              width: "157px",
              height: "150px",
            }}
          ></img>
            <input type="file" name="file" onChange={handleChangeFile}></input>
            <button onClick={uploading}>업로드</button>
        </div>
    )
}

function Ophoto(props){

  
     
  
    return(<div>
        <h2>갤러리 페이지</h2>
         { props.img.map(function(e){
        return <img src={`/uploads/${e}`} style={{ "height" : "150px", "width" : "150px"}}></img>
      })}
       
    </div>)
}
export default Ogallery
