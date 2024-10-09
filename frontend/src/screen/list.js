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
        <div style={{ display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center" }}>
            <h1>User List</h1>
            <table style={{ borderCollapse: 'separate', borderSpacing: '10px' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px' }}>id</th>
                        <th style={{ padding: '10px' }}>original_url</th>
                        <th style={{ padding: '10px' }}>short_url</th>
                        <th style={{ padding: '10px' }}>Click Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((link) => (
                        <tr key={link.id}>
                            <td style={{
                                padding: '10px',
                                maxWidth: '150px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', //ตัดอันเกินเเล้วทำเป็น ....
                                whiteSpace: 'nowrap' //ไม่ต้องขึ้นบรรทัดใหม่
                            }}>
                                {link.id}
                            </td>
                            <td style={{
                                padding: '10px',
                                maxWidth: '180px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {link.original_url}
                            </td>
                            <td style={{ padding: '10px' }}>{link.short_url}</td>
                            <td style={{ padding: '10px' }}>{link.clicklink}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
