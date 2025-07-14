
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.post('/', async (req, res) => {
//   const { type, userInfo, jobDescription } = req.body;

//   let prompt;
//   if (type === 'resume') {
//     prompt = `Generate a professional resume for the following user:\nUser Info: ${JSON.stringify(userInfo)}\nJob Description: ${jobDescription}`;
//   } else {
//     prompt = `Write a tailored cover letter for the following user:\nUser Info: ${JSON.stringify(userInfo)}\nJob Description: ${jobDescription}`;
//   }

//   console.log("🗝️ Groq API Key:", process.env.GROQ_API_KEY);

//   try {
// const response = await axios.post(
//   'https://api.groq.com/openai/v1/chat/completions',
//   {
//     model: 'llama3-8b-8192',
//     messages: [
//       { role: 'system', content: 'You are a professional resume and cover letter writer.' },
//       { role: 'user', content: prompt }
//     ],
//     temperature: 0.7
//   },
//   {
//     headers: {
//       'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//       'Content-Type': 'application/json'
//     }
//   }
// );


//     res.json({ text: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error("❌ Groq API error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate from Groq API" });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { type, userInfo, jobDescription } = req.body;

  const prompt = type === 'resume'
    ? `Generate a professional resume for:\n\n${JSON.stringify(userInfo, null, 2)}\n\nJob Description:\n${jobDescription}`
    : `Write a tailored cover letter for:\n\n${JSON.stringify(userInfo, null, 2)}\n\nJob Description:\n${jobDescription}`;

  console.log("🗝️ Groq API Key:", process.env.GROQ_API_KEY);

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192', // 💎 Best quality model
        messages: [
          { role: 'system', content: 'You are a professional resume and cover letter writer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Groq API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate from Groq API" });
  }
});

module.exports = router;

