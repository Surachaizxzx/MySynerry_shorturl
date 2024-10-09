import React from "react";
import myBackGround from './image/logo.png'
import { NavLink } from 'react-router-dom'
import './css/Index.css'
export default function Navbar() {
    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between'
        }}>
            <div className="Logo">
                <img src={myBackGround} alt="logo" />
                <h1>Short Url</h1>
            </div>
            <div className="contrainer ">
                <ul className="list">
                    <NavLink className={({ isActive }) => isActive ? "listitemActive " : "listitem"} to="/" >Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "listitemActive " : "listitem"} to="/ShortUrl">Create Short url</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "listitemActive " : "listitem"} to="/List">Short Link History</NavLink>
                </ul>
            </div>
        </nav >

    )
}