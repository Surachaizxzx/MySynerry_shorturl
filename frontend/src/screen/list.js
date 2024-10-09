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
    //<ul>
    //     {data.map((link) => (
    //         <li key={link.id}>
    //             original_url: {link.original_url}, short_url: {link.short_url}, Click Count: {link.clicklink}
    //         </li>
    //     ))}
    // </ul>
    return (
        <div >
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>original_url</th>
                        <th>short_url</th>
                        <th>Click Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((link) => (
                        <tr key={link.id}>
                            <td>{link.id}</td>
                            <td>{link.original_url}</td>
                            <td>{link.short_url}</td>
                            <td>{link.clicklink}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
