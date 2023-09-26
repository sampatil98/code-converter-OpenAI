const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    require('dotenv').config()

    const OpenAI = require("openai");

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const { code, targetLanguage } = req.body;

    // Construct the prompt for GPT-3.5
    const prompt = `Please debug the following Code: ${code}`;

    try {
        // Call the GPT-3.5 API to convert code
        const openaiResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            // max_tokens: 50, // Adjust as needed
        });
        res.status(200).send({
            isError: false,
            convertedCode: openaiResponse.choices[0].message.content
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            message: error
        })
    }
});

module.exports = router;