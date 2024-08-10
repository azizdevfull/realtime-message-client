// src/Message.jsx
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import echo from '../echo';

const Message = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('Component mounted');
        
        // Set up real-time listener
        echo.channel('messages-channel')
            .listen('MessageEvent', (e) => {
                console.log(e);
                
                setMessages(prevMessages => [...prevMessages, e.message]);
                toast.success(`New message: ${e.message.message}`);
            });

        return () => {
            // Clean up the listener on component unmount
            echo.leaveChannel('messages-channel');
        };
    }, []);
    return (
        <div>
            <h1>Messages Page</h1>
            <div>
                <h2>Message List:</h2>
                <ul>
                    <li>dasasd</li>
                    <li>dasasd</li>
                    <li>dasasd</li>
                    <li>dasasd</li>
                    <li>dasasd</li>

                    {messages.map((msg, index) => (
                        <li key={index}>{msg.message}</li>
                    ))}
                </ul>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Message;
