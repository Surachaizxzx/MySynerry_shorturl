import React, { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://shortei.vercel.app/api/query");
                setData(response.data);
            } catch (err) {
                setError("Failed to fetch data");
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {data.map((link) => (
                    <li key={link.id}>
                        original_url: {link.original_url}, short_url: {link.short_url}, Click Count: {link.clicklink}
                    </li>
                ))}
            </ul>
        </div>
    );
}
