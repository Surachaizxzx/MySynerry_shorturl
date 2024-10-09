import React, { useState, useRef } from "react";
import axios from "axios";
import './css/shorturl.css'
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from 'html-to-image';
export default function ShortUrl() {
    const [urlInput, setUrlInput] = useState(""); // เก็บลิ้ง
    const [error, setError] = useState(""); // ผิดมั้ย
    const [shortUrl, setShortUrl] = useState(""); // เก็บ URL ที่ถูกย่อ
    const originalQrRef = useRef(null); // Ref สำหรับ Original URL QR Code
    const shortQrRef = useRef(null);    // Ref สำหรับ Short URL QR Code
    const onChangeUrl = (value) => {
        setUrlInput(value);
        setShortUrl("");
        setError("");
    }
    const onClickLink = async (event) => {
        event.preventDefault();
        const urlPattern = /^(https?:\/\/[^\s]+)/; // รูปแบบสำหรับตรวจสอบ URL
        if (!urlPattern.test(urlInput)) {
            setError("กรุณากรอก URL ที่ถูกต้อง ครับ");
            return;
        }
        setError("");
        try {
            const response = await axios.post("https://shortei.vercel.app/api/keep_url", { url: urlInput });
            console.log(response.data); // นำมาใช้งานเพื่อไม่ให้เกิดข้อผิดพลาด
            const message = response.data.message;
            if (message === "URL already exists") {
                setShortUrl(`${response.data.shortUrl}`); // ตั้งค่า shortUrl เป็นว่าง
                setError(`URL นี้มีการสร้างไว้แล้ว นี้คือ short url`); // แจ้งเตือนว่ามีการสร้าง URL ซ้ำ
            }
            else {
                const shortUrl = response.data.shortUrl; // เข้าถึง shortUrl
                setShortUrl(shortUrl);
                setError("");
            }
        } catch (err) {
            setError("เกิดข้อผิดพลาดในการสร้าง Short URL ");
            console.error(err);
        }
    }
    const onClickRemoveLink = (event) => {
        event.preventDefault();
        setShortUrl("");
        setUrlInput("");
        setError("");
    }
    const onSaveQRCode = (qrRef) => {
        if (qrRef.current) {
            toPng(qrRef.current) //เเปลงองค์ประกอบ เป็นPng
                .then((dataUrl) => {
                    const link = document.createElement('a'); //สร้าง เเเอดทริบิ้ว a
                    link.download = 'qrcode.png'; //ระบุชืิ่อไฟล์
                    link.href = dataUrl; //ให้ลิ้ง hrefมัน มีค่าคือ dataurl
                    link.click(); //กดปุปดาวโหลดเลย
                })
                .catch((err) => {
                    console.error('Error saving QR code:', err);
                });

        }
    }
    const onCopyLink = (link) => {
        navigator.clipboard.writeText(link)
            .then(() => {
                setError("ลิงก์ถูกคัดลอกเรียบร้อยแล้ว!");
            })
            .catch((err) => {
                setError("เกิดข้อผิดพลาดในการคัดลอกลิงก์");
                console.error(err);
            });
    }
    return (
        <>
            <div className="contrainner">
                <div className="msg"><label htmlFor="urlinput">Create Short URls</label> </div >
                <form className="Form">
                    <input type="text" className="Input form-control form-control-sm " placeholder="Enter Your Url" value={urlInput} id="urlinput" onChange={(e) => onChangeUrl(e.target.value)}></input>
                    {error && <div className="text-danger p-2">{error}</div>}
                    <button className="btn btn-lg mt-3 bg-success btn-secondary " onClick={onClickLink} >Create</button>
                    <button className="btn btn-lg mt-3 bg-danger btn-secondary  " onClick={onClickRemoveLink} >Reset</button>
                </form>
            </div >
            {shortUrl && ( //เป็นจริงหรือไม่ถ้าเป็นจริงก็มาทำdiv
                <div className="link_qr">
                    Short URL: <br /><a href={shortUrl} target="_blank" className="p-5" rel="noopener noreferrer">{shortUrl}</a>
                    <div className="qrcodes">
                        <div className="QRS">
                            <QRCodeCanvas className="QR" ref={originalQrRef} value={urlInput} />
                            <p className="QR">{urlInput}</p>
                            <div>
                                <button className="btn btn-md mt-3 bg-success btn-secondary" onClick={() => onSaveQRCode(originalQrRef)}>Save Original Url QR Code </button>
                                <div><button className="button btn btn-md mt-3 bg-secondary btn-secondary" onClick={() => onCopyLink(urlInput)}><i class="bi bi-box-arrow-in-down">Copy</i></button></div>
                            </div>
                        </div>
                        <div className="QRS">
                            <QRCodeCanvas className="QR" ref={shortQrRef} value={shortUrl} />
                            <p className="QR">{shortUrl}</p>
                            <div>
                                <button className="btn btn-md mt-3 bg-success btn-secondary" onClick={() => onSaveQRCode(shortQrRef)}>Save Short Url QR Code</button>
                                <div><button className="button btn btn-md mt-3 bg-secondary btn-secondary" onClick={() => onCopyLink(shortUrl)}><i class="bi bi-box-arrow-in-down">Copy</i></button></div>
                            </div>
                        </div>
                    </div >

                </div >

            )
            }
        </>
    )

}