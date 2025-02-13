// src/Chatbot.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // State to manage chat visibility

    // Load messages from localStorage when the component mounts
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
        if (storedMessages) {
            setMessages(storedMessages);
        }
    }, []);

    // Save messages to localStorage whenever messages change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:5000/predict', { message: input });
            const botMessage = { text: response.data.response, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { text: 'Error: Unable to get response', sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setInput('');
    };

    const toggleChat = () => {
        setIsOpen((prev) => !prev); // Toggle chat visibility
    };

    // Helper function to check if the message is a URL
    const isLink = (text) => {
        return text.startsWith('http://') || text.startsWith('https://');
    };

    return (
        <>
            {isOpen && (
                <div className="chatbot">
                    <div className="chatbot__messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chatbot__message chatbot__${msg.sender}`}>
                                <span className="chatbot__icon">{msg.sender === 'user' ? '👤' : '🤖'}</span>
                                {isLink(msg.text) && msg.sender === 'bot' ? (
                                    <a href={msg.text} target="_blank" rel="noopener noreferrer" className="chatbot__link">
                                        Click here
                                    </a>
                                ) : (
                                    <span className="chatbot__text">{msg.text}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <form className="chatbot__form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="chatbot__input"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            required
                        />
                        <button type="submit" className="chatbot__button">Send</button>
                    </form>
                </div>
            )}
            <div className="chatbot__icon-container" onClick={toggleChat}>
                💬 {/* Message icon */}
            </div>
        </>
    );
};

export default Chatbot;
