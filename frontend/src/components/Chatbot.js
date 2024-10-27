import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSendMessage = async () => {
        const response = await axios.post('YOUR_FIREBASE_FUNCTIONS_URL/chatbot', { message: userMessage });
        setResponses([...responses, { user: userMessage, bot: response.data }]);
        setUserMessage('');
    };

    return (
        <div>
            <h2>Chatbot</h2>
            <div>
                {responses.map((resp, index) => (
                    <div key={index}>
                        <p><strong>You:</strong> {resp.user}</p>
                        <p><strong>Bot:</strong> {resp.bot.chatGpt}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
