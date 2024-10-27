const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Chatbot Route
app.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Send message to ChatGPT
        const chatGptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const chatGptMessage = chatGptResponse.data.choices[0].message.content;

        // Send message to Gemini (Google)
        const geminiResponse = await axios.post('YOUR_GEMINI_API_ENDPOINT', {
            prompt: userMessage,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const geminiMessage = geminiResponse.data.response;

        // Combine responses
        res.json({
            chatGpt: chatGptMessage,
            gemini: geminiMessage,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with AI models');
    }
});

// Export API
exports.api = functions.https.onRequest(app);
