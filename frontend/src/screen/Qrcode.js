import React from "react";
import './css/shorturl.css'
export default function QrCode() {
    return (
        <div className="contrainner">
            <div className="msg"><label for="urlinput">Create QR Code</label> </div >
            <form className="Form">
                <input type="text" className="Input form-control form-control-sm  " id="urlinput"></input>
                <button className="btn btn-lg mt-3 bg-success btn-secondary ">Create</button>
            </form>
        </div >
    )

}