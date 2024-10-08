import React from "react";
import './css/Index.css'
import link from './image/link.png'
export default function Section() {
    return (
        <section style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            margin: '10vh'
        }}>
            <div style={{
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', flexFlow: "column"
            }}>
                <h1 className="paragraph">The best way <br />to show case <br />your project.</h1><br />
                <p className="paragraph">put your link url in website <br />to make Short Url & QR Code </p>
            </div>
            <div className="img">
                <img src={link} alt="link" />
            </div>

        </section>
    )
}