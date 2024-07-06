import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const LeftSection = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const promptHistory = async () => {
            try {
                const response = await axios.get("http://localhost:5000/history");
                let extractedData = [];
                if (Array.isArray(response.data)) {
                    extractedData = response.data;
                } else if (typeof response.data === 'object' && response.data !== null) {
                    for (const key in response.data) {
                        if (Array.isArray(response.data[key])) {
                            extractedData = response.data[key];
                            break;
                        }
                    }
                }
                if (extractedData.length > 0)
                    setData(extractedData);
                else
                    console.error("No array found in the response data:", response.data);
            } catch (error) {
                console.error("Error while fetching data:", error);
            }
        };
        promptHistory();
    }, []);

    return (
        <section className='leftsection'>
            <div className='newchat'>
                <div>
                    <img src={logo} alt="gemini-ai-logo" height={50} width={50} style={{ borderRadius: "50%" }} />
                    <p className='textone'>New Chat</p>
                </div>
                <div className='edit'>
                    <EditIcon />
                </div>
            </div>
            <div className='allchat'>
                {data.length > 0 ? (
                    data.map((chat) => (
                        <div key={chat._id} className='chat'>
                            <p className='textone'>{chat.prompt}</p>
                        </div>
                    ))
                ) : (
                    <p>No chats available.</p>
                )}
            </div>
            <div className='newchat'>
                <div>
                    Username functionalities is under development
                </div>
            </div>
        </section>
    );
};

export default LeftSection;
