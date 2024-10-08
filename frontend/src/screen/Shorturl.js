import React, { useState } from "react";
import axios from "axios";
import './css/shorturl.css'
export default function ShortUrl() {
    const [urlInput, setUrlInput] = useState(""); // เก็บลิ้ง
    const [error, setError] = useState(""); // ผิดมั้ย
    const [shortUrl, setShortUrl] = useState(""); // เก็บ URL ที่ถูกย่อ
    const onClickLink = async (event) => {
        event.preventDefault();
        const urlPattern = /^(https?:\/\/[^\s]+)/; // รูปแบบสำหรับตรวจสอบ URL
        if (!urlPattern.test(urlInput)) {
            setError("กรุณากรอก URL ที่ถูกต้อง ครับ");
            return;
        }
        setError("");
        try {
            const response = await axios.post("https://my-synerry-shorturl.vercel.app/api/keep_url", { url: urlInput });
            console.log(response.data); // นำมาใช้งานเพื่อไม่ให้เกิดข้อผิดพลาด
            const message = response.data.message;
            if (message === "URL already exists") {
                setShortUrl(response.data.original); // ตั้งค่า shortUrl เป็นว่าง
                setError("URL นี้มีการสร้างไว้แล้ว นี้คือ short url"); // แจ้งเตือนว่ามีการสร้าง URL ซ้ำ
            }
            else {
                const shortUrl = response.data.shortUrl; // เข้าถึง shortUrl
                setShortUrl(shortUrl);
                setError("");
            }
        } catch (err) {
            setError("เกิดข้อผิดพลาดในการสร้าง Short URL");
            console.error(err);
        }
    }
    return (
        <div className="contrainner">
            <div className="msg"><label htmlFor="urlinput">Create Short URls</label> </div >
            <form className="Form">
                <input type="text" className="Input form-control form-control-sm " value={urlInput} id="urlinput" onChange={(e) => setUrlInput(e.target.value)}></input>
                {error && <div className="text-danger p-2">{error}</div>}
                <button className="btn btn-lg mt-3 bg-success btn-secondary " onClick={onClickLink} >Create</button>
            </form>
            {shortUrl && ( //เป็นจริงหรือไม่ถ้าเป็นจริงก็มาทำdiv
                <div className="linkshort">
                    Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
            )}

        </div >
    )

}