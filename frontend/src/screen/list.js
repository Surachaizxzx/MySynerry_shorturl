import React, { useEffect, useState } from "react";
import axios from "axios";
export default function List() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://shortei.vercel.app/api/querye").then((Response) => {
            setData(Response.data);
        })
    }, []);
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {data.map((link) => (
                    <li key={link.id}>
                        original_url : {link.original_url}, short url: {link.short_url},count Click :{link.clicklink}
                    </li>
                ))}
            </ul>
        </div>
    );
}