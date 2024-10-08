import React, { useState } from "react";
import './css/shorturl.css'

export default function ShortUrl() {
    const [urlInput, setUrlInput] = useState(""); // เก็บลิ้ง
    const [error, setError] = useState(""); // ผิดมั้ย
    const onClickLink = (event) => {
        event.preventDefault();
        const urlPattern = /^(https?:\/\/[^\s]+)/; // รูปแบบสำหรับตรวจสอบ URL
        if (!urlPattern.test(urlInput)) {
            setError("กรุณากรอก URL ที่ถูกต้อง ครับ");
            return;
        }
        setError("");
        // ทำสิ่งที่ต้องการกับ URL ที่ถูกต้อง เช่น ส่งไปยังเซิร์ฟเวอร์
    }
    return (
        <div className="contrainner">
            <div className="msg"><label htmlFor="urlinput">Create Short URls</label> </div >
            <form className="Form">
                <input type="text" className="Input form-control form-control-sm " value={urlInput} id=" urlinput" onChange={(e) => setUrlInput(e.target.value)}></input>
                {error && <div className="text-danger">{error}</div>}
                <button className="btn btn-lg mt-3 bg-success btn-secondary " onClick={onClickLink} >Create</button>
            </form>
        </div >
    )

}