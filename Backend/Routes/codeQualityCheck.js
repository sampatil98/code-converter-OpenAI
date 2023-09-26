const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    require('dotenv').config()

    const OpenAI = require("openai");

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const { code } = req.body;

    // Construct the prompt for GPT-3.5
    const prompt = `Please evaluate the quality of the following Code: ${code} on a scale of 0% to 100%.
     The quality criteria are specified, which can include factors like readability, efficiency, maintainability, and adherence to best practices. You can customize these criteria based on your specific requirements.`;

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